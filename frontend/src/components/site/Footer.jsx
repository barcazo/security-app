import { Mail, Phone, MapPin, Clock, Shield, ArrowUpRight } from "lucide-react";
import { BRAND, NAV_LINKS, buildWhatsAppUrl, buildMailto } from "@/lib/brand";

export default function Footer() {
    return (
        <footer
            id="contact"
            className="relative bg-black border-t border-zinc-900 pt-20 pb-10"
            data-testid="site-footer"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="h-10 w-10 border border-zinc-700 grid place-items-center">
                                <Shield className="h-5 w-5 text-red-500" strokeWidth={2.5} />
                            </div>
                            <div className="leading-none">
                                <div className="font-display font-black text-2xl tracking-tight">
                                    {BRAND.name}
                                </div>
                                <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase mt-1">
                                    {BRAND.tagline}
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
                            CCTV installation, configuration and remote viewing setup across{" "}
                            {BRAND.region}. Engineered for clarity, hardened for the street.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <a
                                href="#quote"
                                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors"
                                data-testid="footer-cta-quote"
                            >
                                Get a quote <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                            <a
                                href={buildWhatsAppUrl()}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 border border-zinc-700 hover:border-red-500 text-white px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors"
                                data-testid="footer-cta-whatsapp"
                            >
                                WhatsApp now
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-5">
                            // Navigate
                        </div>
                        <ul className="space-y-3">
                            {NAV_LINKS.map((l) => (
                                <li key={l.href}>
                                    <a
                                        href={l.href}
                                        className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-300 hover:text-red-500 transition-colors"
                                        data-testid={`footer-nav-${l.label.toLowerCase()}`}
                                    >
                                        — {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-5">
                            // Reach us
                        </div>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <Phone className="h-4 w-4 text-red-500 mt-0.5" />
                                <a
                                    href={buildWhatsAppUrl()}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-zinc-300 hover:text-white transition-colors"
                                    data-testid="footer-whatsapp"
                                >
                                    WhatsApp · {BRAND.whatsappDisplay}
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="h-4 w-4 text-red-500 mt-0.5" />
                                <a
                                    href={buildMailto()}
                                    className="text-zinc-300 hover:text-white transition-colors break-all"
                                    data-testid="footer-email"
                                >
                                    {BRAND.email}
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 text-red-500 mt-0.5" />
                                <span className="text-zinc-300" data-testid="footer-area">
                                    {BRAND.serviceArea}
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock className="h-4 w-4 text-red-500 mt-0.5" />
                                <span className="text-zinc-300" data-testid="footer-hours">
                                    {BRAND.hours}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-900 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-600">
                    <div data-testid="footer-copyright">
                        © {new Date().getFullYear()} {BRAND.name} · All systems reserved.
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                        Operations nominal
                    </div>
                </div>
            </div>
        </footer>
    );
}
