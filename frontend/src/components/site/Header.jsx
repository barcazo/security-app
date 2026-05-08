import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, Shield } from "lucide-react";
import { BRAND, NAV_LINKS, buildWhatsAppUrl, buildMailto } from "@/lib/brand";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const closeMenu = () => setOpen(false);

    return (
        <>
            {/* Top utility bar */}
            <div
                className="hidden md:block border-b border-zinc-900 bg-black text-zinc-400"
                data-testid="header-utility-bar"
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between py-2 font-mono text-[11px] tracking-[0.2em] uppercase">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                        <span>Online · {BRAND.serviceArea}</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <a
                            href={buildMailto()}
                            className="flex items-center gap-2 hover:text-white transition-colors"
                            data-testid="header-email-link"
                        >
                            <Mail className="h-3 w-3" /> {BRAND.email}
                        </a>
                        <a
                            href={buildWhatsAppUrl()}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 hover:text-white transition-colors"
                            data-testid="header-whatsapp-link"
                        >
                            <Phone className="h-3 w-3" /> {BRAND.whatsappDisplay}
                        </a>
                    </div>
                </div>
            </div>

            <header
                className={`sticky top-0 z-50 transition-all border-b ${
                    scrolled
                        ? "bg-black/85 backdrop-blur-xl border-zinc-900"
                        : "bg-black/60 backdrop-blur-md border-transparent"
                }`}
                data-testid="site-header"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                    <a
                        href="#top"
                        className="flex items-center gap-2.5 group"
                        data-testid="header-logo"
                    >
                        <div className="h-8 w-8 border border-zinc-700 group-hover:border-red-500 grid place-items-center transition-colors">
                            <Shield className="h-4 w-4 text-red-500" strokeWidth={2.5} />
                        </div>
                        <div className="leading-none">
                            <div className="font-display font-black text-lg tracking-tight">
                                {BRAND.name}
                            </div>
                            <div className="font-mono text-[9px] tracking-[0.25em] text-zinc-500 uppercase">
                                {BRAND.tagline}
                            </div>
                        </div>
                    </a>

                    <nav className="hidden lg:flex items-center gap-8">
                        {NAV_LINKS.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
                                data-testid={`nav-link-${l.label.toLowerCase()}`}
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <a
                            href={buildWhatsAppUrl()}
                            target="_blank"
                            rel="noreferrer"
                            className="hidden sm:inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors"
                            data-testid="header-cta-whatsapp"
                        >
                            <Phone className="h-3.5 w-3.5" />
                            WhatsApp
                        </a>
                        <button
                            onClick={() => setOpen(!open)}
                            className="lg:hidden h-10 w-10 grid place-items-center border border-zinc-800 hover:border-red-500 transition-colors"
                            aria-label="Toggle navigation"
                            data-testid="header-mobile-toggle"
                        >
                            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {open && (
                    <div
                        className="lg:hidden border-t border-zinc-900 bg-black"
                        data-testid="mobile-menu"
                    >
                        <div className="px-4 py-4 flex flex-col gap-1">
                            {NAV_LINKS.map((l) => (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    onClick={closeMenu}
                                    className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-white py-3 border-b border-zinc-900"
                                    data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                                >
                                    {l.label}
                                </a>
                            ))}
                            <a
                                href={buildWhatsAppUrl()}
                                target="_blank"
                                rel="noreferrer"
                                onClick={closeMenu}
                                className="mt-3 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em]"
                                data-testid="mobile-cta-whatsapp"
                            >
                                <Phone className="h-3.5 w-3.5" />
                                WhatsApp · {BRAND.whatsappDisplay}
                            </a>
                            <a
                                href={buildMailto()}
                                onClick={closeMenu}
                                className="inline-flex items-center justify-center gap-2 border border-zinc-700 hover:border-red-500 hover:text-red-500 text-white px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em]"
                                data-testid="mobile-cta-email"
                            >
                                <Mail className="h-3.5 w-3.5" />
                                Email · {BRAND.email}
                            </a>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
