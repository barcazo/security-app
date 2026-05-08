"""Backend tests for CCTV quote API."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://security-install-pro.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Health & Root ---
class TestHealth:
    def test_health(self, client):
        r = client.get(f"{API}/health", timeout=15)
        assert r.status_code == 200
        assert r.json() == {"status": "ok"}

    def test_root(self, client):
        r = client.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        assert r.json() == {"message": "CCTV API online"}


VALID_PAYLOAD = {
    "name": "TEST_John Doe",
    "email": "TEST_john@example.com",
    "phone": "+27821234567",
    "service": "CCTV Installation",
    "message": "Please send a quote for 4 cameras at home.",
}


# --- Quote create + persistence ---
class TestQuoteCreate:
    def test_create_quote_success(self, client):
        r = client.post(f"{API}/quote", json=VALID_PAYLOAD, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        # Shape
        for key in ["id", "name", "email", "phone", "service", "message", "created_at"]:
            assert key in data
        # No mongo _id leaked
        assert "_id" not in data
        # Values
        assert data["name"] == VALID_PAYLOAD["name"]
        assert data["email"] == VALID_PAYLOAD["email"]
        assert data["phone"] == VALID_PAYLOAD["phone"]
        assert data["service"] == VALID_PAYLOAD["service"]
        assert data["message"] == VALID_PAYLOAD["message"]
        assert isinstance(data["id"], str) and len(data["id"]) > 0
        # store id for next test
        pytest.created_quote_id = data["id"]

    def test_persistence_via_list(self, client):
        # Ensure a quote exists
        if not getattr(pytest, "created_quote_id", None):
            client.post(f"{API}/quote", json=VALID_PAYLOAD, timeout=30)
        r = client.get(f"{API}/quotes", timeout=15)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        assert len(items) > 0
        # No mongo _id in any item
        for it in items:
            assert "_id" not in it
            for key in ["id", "name", "email", "phone", "service", "message", "created_at"]:
                assert key in it
        # Sorted desc by created_at
        timestamps = [it["created_at"] for it in items]
        assert timestamps == sorted(timestamps, reverse=True)
        # Our created quote present
        if getattr(pytest, "created_quote_id", None):
            assert any(it["id"] == pytest.created_quote_id for it in items)


# --- Validation ---
class TestQuoteValidation:
    def _payload(self, **overrides):
        p = dict(VALID_PAYLOAD)
        p.update(overrides)
        return p

    def test_invalid_email(self, client):
        r = client.post(f"{API}/quote", json=self._payload(email="not-an-email"), timeout=15)
        assert r.status_code == 422

    def test_phone_too_short(self, client):
        r = client.post(f"{API}/quote", json=self._payload(phone="123"), timeout=15)
        assert r.status_code == 422

    def test_missing_fields(self, client):
        r = client.post(f"{API}/quote", json={"name": "Joe"}, timeout=15)
        assert r.status_code == 422

    def test_message_too_short(self, client):
        r = client.post(f"{API}/quote", json=self._payload(message="short"), timeout=15)
        assert r.status_code == 422

    def test_name_too_short(self, client):
        r = client.post(f"{API}/quote", json=self._payload(name="A"), timeout=15)
        assert r.status_code == 422


# --- Honeypot ---
class TestHoneypot:
    def test_honeypot_rejects_and_not_persisted(self, client):
        # snapshot quotes count
        before = client.get(f"{API}/quotes", timeout=15).json()
        before_count = len(before)

        payload = dict(VALID_PAYLOAD)
        payload["name"] = "TEST_HONEYPOT_USER"
        payload["website"] = "http://spam.example.com"
        r = client.post(f"{API}/quote", json=payload, timeout=15)
        assert r.status_code == 400
        assert "Invalid submission" in r.text

        after = client.get(f"{API}/quotes", timeout=15).json()
        # Not persisted
        assert len(after) == before_count
        assert not any(it["name"] == "TEST_HONEYPOT_USER" for it in after)


# --- Email soft-fail contract ---
class TestEmailSoftFail:
    def test_quote_persists_even_if_email_fails(self, client):
        """Resend test mode will reject bothwell@consultant.com; quote must still persist with 200."""
        payload = dict(VALID_PAYLOAD)
        payload["name"] = "TEST_EmailSoftFail"
        r = client.post(f"{API}/quote", json=payload, timeout=30)
        assert r.status_code == 200
        qid = r.json()["id"]
        # Verify present in list
        items = client.get(f"{API}/quotes", timeout=15).json()
        assert any(it["id"] == qid for it in items)
