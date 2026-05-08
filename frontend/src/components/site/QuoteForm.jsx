import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Lock, Send, Loader2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SERVICES, BRAND, buildWhatsAppUrl, buildMailto, openWhatsApp } from "@/lib/brand";
import { SectionHeader } from "@/components/site/Services";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initial = {
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    website: "", // honeypot
    consent: false,
};

export default function QuoteForm() {
    const [form, setForm] = useState(initial);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const setField = (k) => (e) => {
        const value = e?.target ? e.target.value : e;
        setForm((f) => ({ ...f, [k]: value }));
        setErrors((er) => ({ ...er, [k]: undefined }));
    };

    const validate = () => {
        const e = {};
        if (form.name.trim().length < 2) e.name = "Required";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
        if (!/^\+?[\d\s\-()]{6,}$/.test(form.phone)) e.phone = "Valid phone required";
        if (!form.service) e.service = "Select a service";
        if (form.message.trim().length < 10) e.message = "Min 10 characters";
        if (!form.consent) e.consent = "Required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            toast.error("Please fix the highlighted fields");
            return;
        }
        setSubmitting(true);
        try {
            await axios.post(`${API}/quote`, {
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                service: form.service,
                message: form.message.trim(),
                website: form.website,
            });
            toast.success("Quote request received");
            setSuccess(true);
            setForm(initial);
        } catch (err) {
            const detail = err?.response?.data?.detail || "Submission failed";
            toast.error(typeof detail === "string" ? detail : "Submission failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section
            id="quote"
            className="relative border-b border-zinc-900 py-24 md:py-32"
            data-testid="quote-section"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    code="// 04"
                    eyebrow="Request Quote"
                    title="Send a brief — get an itemised reply"
                    sub="Five fields, encrypted in transit, reviewed within one business day. No spam, no resale, no unsolicited calls."
                />

                <div className="grid lg:grid-cols-12 gap-px bg-zinc-900 border border-zinc-900">
                    {/* Left side info */}
                    <aside
                        className="lg:col-span-4 bg-[#080808] p-8 md:p-10"
                        data-testid="quote-side"
                    >
                        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-3">
                            Direct channels
                        </div>
                        <h3 className="font-display text-2xl font-black uppercase mb-6">
                            Prefer to talk first?
                        </h3>
                        <div className="space-y-3 mb-10">
                            <a
                                href={buildWhatsAppUrl()}
                                onClick={(e) => { e.preventDefault(); openWhatsApp(); }}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block border border-zinc-800 hover:border-red-500 px-5 py-4 transition-colors group"
                                data-testid="quote-side-whatsapp"
                            >
                                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 group-hover:text-red-400">
                                    WhatsApp
                                </div>
                                <div className="font-display text-lg font-black mt-1">
                                    {BRAND.whatsappDisplay}
                                </div>
                            </a>
                            <a
                                href={buildMailto()}
                                className="block border border-zinc-800 hover:border-red-500 px-5 py-4 transition-colors group"
                                data-testid="quote-side-email"
                            >
                                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 group-hover:text-red-400">
                                    Email
                                </div>
                                <div className="font-display text-lg font-black mt-1 break-all">
                                    {BRAND.email}
                                </div>
                            </a>
                        </div>

                        <div className="pt-6 border-t border-zinc-900 space-y-2 font-mono text-[11px] tracking-wider text-zinc-500">
                            <div className="flex items-center gap-2">
                                <Lock className="h-3 w-3 text-emerald-400" /> 256-bit TLS in
                                transit
                            </div>
                            <div className="flex items-center gap-2">
                                <Lock className="h-3 w-3 text-emerald-400" /> Stored privately,
                                never sold
                            </div>
                            <div className="flex items-center gap-2">
                                <Lock className="h-3 w-3 text-emerald-400" /> Honeypot + rate
                                limited
                            </div>
                        </div>
                    </aside>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="lg:col-span-8 bg-black p-8 md:p-10"
                        data-testid="quote-form"
                        noValidate
                    >
                        {success && (
                            <div
                                className="mb-6 border border-emerald-700/50 bg-emerald-950/40 px-5 py-4 text-sm"
                                data-testid="quote-success-banner"
                            >
                                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-400 mb-1">
                                    Transmission acknowledged
                                </div>
                                <div className="text-zinc-300">
                                    Your request has been received. Expect a reply within one
                                    business day at the email you provided.
                                </div>
                            </div>
                        )}

                        <div className="grid sm:grid-cols-2 gap-5">
                            <Field
                                label="Full name"
                                error={errors.name}
                                testid="field-name"
                            >
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={setField("name")}
                                    autoComplete="name"
                                    maxLength={80}
                                    className={fieldClass(errors.name)}
                                    placeholder="e.g. Thandi Mokoena"
                                    data-testid="quote-input-name"
                                />
                            </Field>
                            <Field
                                label="Email address"
                                error={errors.email}
                                testid="field-email"
                            >
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={setField("email")}
                                    autoComplete="email"
                                    className={fieldClass(errors.email)}
                                    placeholder="you@domain.co.za"
                                    data-testid="quote-input-email"
                                />
                            </Field>
                            <Field
                                label="Phone / WhatsApp"
                                error={errors.phone}
                                testid="field-phone"
                            >
                                <input
                                    type="tel"
                                    value={form.phone}
                                    onChange={setField("phone")}
                                    autoComplete="tel"
                                    className={fieldClass(errors.phone)}
                                    placeholder="+27 ..."
                                    data-testid="quote-input-phone"
                                />
                            </Field>
                            <Field
                                label="Service required"
                                error={errors.service}
                                testid="field-service"
                            >
                                <Select
                                    value={form.service}
                                    onValueChange={(v) =>
                                        setForm((f) => ({ ...f, service: v }))
                                    }
                                >
                                    <SelectTrigger
                                        className={`${fieldClass(errors.service)} h-auto py-3 justify-between`}
                                        data-testid="quote-input-service"
                                    >
                                        <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                    <SelectContent
                                        className="rounded-none bg-zinc-950 border-zinc-800 text-white"
                                    >
                                        {SERVICES.map((s) => (
                                            <SelectItem
                                                key={s.id}
                                                value={s.title}
                                                className="rounded-none font-mono text-xs uppercase tracking-wider focus:bg-red-600/20 focus:text-white"
                                                data-testid={`service-option-${s.id}`}
                                            >
                                                {s.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                        </div>

                        <Field
                            label="Project brief"
                            error={errors.message}
                            testid="field-message"
                            className="mt-5"
                        >
                            <textarea
                                value={form.message}
                                onChange={setField("message")}
                                rows={5}
                                maxLength={2000}
                                className={`${fieldClass(errors.message)} resize-none`}
                                placeholder="Site type, approximate camera count, timeline, anything we should know..."
                                data-testid="quote-input-message"
                            />
                        </Field>

                        {/* Honeypot — hidden from users, visible to bots */}
                        <div
                            aria-hidden="true"
                            style={{
                                position: "absolute",
                                left: "-9999px",
                                width: 1,
                                height: 1,
                                overflow: "hidden",
                            }}
                        >
                            <label>
                                Website (leave blank)
                                <input
                                    type="text"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={form.website}
                                    onChange={setField("website")}
                                />
                            </label>
                        </div>

                        <label
                            className="mt-6 flex items-start gap-3 cursor-pointer select-none"
                            data-testid="quote-consent-label"
                        >
                            <input
                                type="checkbox"
                                checked={form.consent}
                                onChange={(e) =>
                                    setForm((f) => ({ ...f, consent: e.target.checked }))
                                }
                                className="mt-1 h-4 w-4 accent-red-600 rounded-none cursor-pointer"
                                data-testid="quote-consent-checkbox"
                            />
                            <span className="text-xs text-zinc-400 leading-relaxed">
                                I consent to {BRAND.name} contacting me about this enquiry. My
                                details are processed under POPIA and will not be shared with
                                third parties.
                                {errors.consent && (
                                    <span className="block mt-1 text-red-500 font-mono text-[10px] uppercase tracking-wider">
                                        {errors.consent}
                                    </span>
                                )}
                            </span>
                        </label>

                        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500">
                                <Lock className="h-3 w-3 text-emerald-400" />
                                Secure 256-bit encrypted submission
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] transition-colors"
                                data-testid="quote-submit-button"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Transmitting
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4" />
                                        Transmit Request
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

function fieldClass(error) {
    return `w-full bg-transparent border ${
        error ? "border-red-500" : "border-zinc-800"
    } focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 px-4 py-3 text-sm text-white placeholder:text-zinc-600 rounded-none transition-colors font-sans`;
}

function Field({ label, error, children, className = "", testid }) {
    return (
        <div className={className} data-testid={testid}>
            <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-2">
                {label}
            </label>
            {children}
            {error && (
                <div className="mt-1.5 font-mono text-[10px] tracking-wider uppercase text-red-500">
                    {error}
                </div>
            )}
        </div>
    );
}
