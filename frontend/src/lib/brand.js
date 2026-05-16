// Brand & contact configuration. All UI reads from this file.
export const BRAND = {
    name: "SECTOR9",
    tagline: "Integrated Security Systems",
    region: "South Africa",
    whatsappNumber: "+27637574531",
    whatsappDisplay: "+27 63 757 4531",
    email: "bothwell@consultant.com",
    serviceArea: "Johannesburg & Surrounds · Nationwide on quote",
    hours: "Mon–Sat · 07:00 – 19:00 SAST",
};

export const buildWhatsAppUrl = (msg = "") => {
    const text = encodeURIComponent(
        msg ||
            `Hi ${BRAND.name}, I'd like a quote for security installation. Could you assist?`
    );
    return `https://wa.me/${BRAND.whatsappNumber.replace(/\D/g, "")}?text=${text}`;
};

// Robust opener — bypasses iframe sandboxing that can swallow target="_blank".
export const openWhatsApp = (msg = "") => {
    const url = buildWhatsAppUrl(msg);
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win || win.closed || typeof win.closed === "undefined") {
        try {
            window.top.location.href = url;
        } catch (_) {
            window.location.href = url;
        }
    }
};

export const buildMailto = (subject = "Security System Enquiry") =>
    `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}`;

// Service categories (used for filter tabs)
export const CATEGORIES = [
    { id: "all", label: "All", code: "00" },
    { id: "cctv", label: "CCTV", code: "C" },
    { id: "alarms", label: "Alarms", code: "A" },
    { id: "access", label: "Access Control", code: "X" },
    { id: "fencing", label: "Electric Fencing", code: "F" },
    { id: "support", label: "Maintenance", code: "M" },
];

export const SERVICES = [
    // ---- CCTV ----
    {
        id: "residential-cctv",
        category: "cctv",
        icon: "home",
        code: "C-01",
        title: "Residential CCTV",
        blurb:
            "Discreet camera placement, perimeter coverage and tamper-resistant wiring for homes and estates.",
        bullets: [
            "2–16 channel HD/4K systems",
            "Estate & boundary integration",
            "PoE and wireless options",
        ],
    },
    {
        id: "commercial-cctv",
        category: "cctv",
        icon: "building",
        code: "C-02",
        title: "Commercial CCTV",
        blurb:
            "Multi-zone surveillance for warehouses, retail and offices with role-based playback access.",
        bullets: [
            "Up to 64-channel NVR/DVR",
            "POS & access control sync",
            "Cloud + on-prem retention",
        ],
    },
    {
        id: "remote-viewing",
        category: "cctv",
        icon: "smartphone",
        code: "C-03",
        title: "Remote Viewing & App",
        blurb:
            "Mobile and desktop access with multi-user permissions and event-based push alerts.",
        bullets: [
            "iOS · Android · Web client",
            "DDNS / VPN tunnelling",
            "Push & email alerts",
        ],
    },

    // ---- ALARMS ----
    {
        id: "intruder-alarm",
        category: "alarms",
        icon: "bell",
        code: "A-01",
        title: "Intruder Alarm Systems",
        blurb:
            "Wired and wireless alarm panels with zoned PIR detectors, panic buttons and smart-app arming.",
        bullets: [
            "Paradox · IDS · DSC panels",
            "App-based arm/disarm",
            "Battery & GSM backup",
        ],
    },
    {
        id: "beam-detection",
        category: "alarms",
        icon: "radio",
        code: "A-02",
        title: "Outdoor Beam Detection",
        blurb:
            "Active infrared beams for driveways, perimeters and pre-emptive intrusion alerts before breach.",
        bullets: [
            "Single & dual-beam towers",
            "Weather-rated housings",
            "Integrated with siren & app",
        ],
    },
    {
        id: "armed-response",
        category: "alarms",
        icon: "siren",
        code: "A-03",
        title: "Armed Response Linkup",
        blurb:
            "Configuration of signal transmitters and PSIRA-aligned armed response service integration.",
        bullets: [
            "Radio + GSM signal path",
            "Account-onboarding support",
            "Monthly monitoring options",
        ],
    },

    // ---- ACCESS CONTROL ----
    {
        id: "biometric-access",
        category: "access",
        icon: "fingerprint",
        code: "X-01",
        title: "Biometric & Keypad Access",
        blurb:
            "Fingerprint, face and PIN-based door controllers with logged events and time-zone permissions.",
        bullets: [
            "ZKTeco · Hikvision · Suprema",
            "Maglock & strike-lock wiring",
            "Event log + export",
        ],
    },
    {
        id: "gate-automation",
        category: "access",
        icon: "key",
        code: "X-02",
        title: "Gate & Vehicle Automation",
        blurb:
            "Sliding and swing gate motors, intercoms, RFID tags and licence-plate-recognition options.",
        bullets: [
            "Centurion · Gemini · DACE",
            "Wireless intercom + video",
            "LPR / RFID tag integration",
        ],
    },

    // ---- ELECTRIC FENCING ----
    {
        id: "electric-fence-install",
        category: "fencing",
        icon: "zap",
        code: "F-01",
        title: "Electric Fence Installation",
        blurb:
            "Wall-top and free-standing electric fence systems with high-voltage energizers and brackets.",
        bullets: [
            "Nemtek · Stafix energizers",
            "Wall-top & stand-alone",
            "Zoned tamper monitoring",
        ],
    },
    {
        id: "fence-compliance",
        category: "fencing",
        icon: "shield-check",
        code: "F-02",
        title: "Energizer & COC Compliance",
        blurb:
            "Certificate of Compliance issuing, energizer upgrades and warning-sign placement to SANS spec.",
        bullets: [
            "Electrical CoC issued",
            "Signage to SANS 10222-3",
            "Joule & voltage test report",
        ],
    },

    // ---- MAINTENANCE / CONSULT ----
    {
        id: "amc",
        category: "support",
        icon: "wrench",
        code: "M-01",
        title: "AMC & Maintenance",
        blurb:
            "Scheduled health checks, firmware updates and rapid-response repair contracts across all systems.",
        bullets: [
            "Quarterly diagnostics",
            "Firmware patching",
            "48-hour fault SLA",
        ],
    },
    {
        id: "consult",
        category: "support",
        icon: "clipboard",
        code: "M-02",
        title: "Site Survey & Audit",
        blurb:
            "On-site assessment producing a precise system plan, cable schedule and itemised quote.",
        bullets: [
            "Free initial walkthrough",
            "Coverage & zone diagram",
            "Itemised cost breakdown",
        ],
    },
];

export const STATS = [
    { k: "24 / 7", v: "Monitored Systems" },
    { k: "1,200+", v: "Sites Configured" },
    { k: "48h", v: "Fault Response SLA" },
    { k: "99.9%", v: "Uptime Target" },
    { k: "5", v: "Security Verticals" },
];

export const PROCESS = [
    {
        step: "01",
        title: "Consult",
        body: "Free phone or on-site assessment to map zones, blind spots and existing infrastructure.",
    },
    {
        step: "02",
        title: "Design",
        body: "Itemised quote covering cameras, alarms, access points, fencing and recording retention.",
    },
    {
        step: "03",
        title: "Install",
        body: "Clean cable routing, weather-rated mounts, firmware-locked devices and VLAN isolation.",
    },
    {
        step: "04",
        title: "Secure",
        body: "Remote access setup, password rotation, owner handover and 12-month support window.",
    },
];

export const FAQS = [
    {
        q: "Do you handle a full site — CCTV, alarm, access and electric fence — in one project?",
        a: "Yes. Most clients prefer a single contractor for the entire perimeter and interior. We design integrated systems so the alarm, CCTV, access controller and electric fence energizer all report into one app and a single armed-response account.",
    },
    {
        q: "How long does a typical residential install take?",
        a: "A 4–8 camera CCTV install is usually completed in a single day. Adding alarm, biometric access or electric fencing extends the work to 2–4 days depending on cabling and energizer placement.",
    },
    {
        q: "Can my alarm trigger CCTV recording and notify armed response?",
        a: "Absolutely. We wire the alarm panel's outputs into the NVR so an intrusion event flags the recording, sends a push notification, and simultaneously transmits the signal to your armed-response provider via radio or GSM.",
    },
    {
        q: "Is your electric fence compliant with South African regulations?",
        a: "Yes. All electric fencing is installed to SANS 10222-3 with the correct warning signage, a Certificate of Compliance issued where the energizer is replaced or newly installed, and joule output tested against spec.",
    },
    {
        q: "What biometric and access control brands do you support?",
        a: "We work primarily with ZKTeco, Hikvision and Suprema for fingerprint and facial recognition, plus Centurion, Gemini and DACE for gate motors. Existing hardware can usually be reconfigured rather than replaced.",
    },
    {
        q: "Do you offer ongoing maintenance contracts?",
        a: "Yes — quarterly diagnostics, firmware patching and a 48-hour fault-response SLA across CCTV, alarms, access control and electric fencing. Contracts are month-to-month with no lock-in.",
    },
    {
        q: "What about POPIA, biometric data and recording compliance?",
        a: "We configure CCTV with signage prompts and retention windows aligned to POPIA, and biometric templates are stored on-device with role-based access. Compliance documentation is provided on request.",
    },
];

export const NAV_LINKS = [
    { label: "Solutions", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Quote", href: "#quote" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
];
