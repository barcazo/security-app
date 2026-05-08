import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { BRAND, buildWhatsAppUrl, openWhatsApp } from "@/lib/brand";

export default function FloatingWhatsApp() {
    const [open, setOpen] = useState(false);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setShown(true), 600);
        return () => clearTimeout(t);
    }, []);

    if (!shown) return null;

    return (
        <div
            className="fixed bottom-5 left-5 z-40 flex flex-col items-start gap-3"
            data-testid="floating-whatsapp"
        >
            {open && (
                <div
                    className="w-72 bg-black border border-zinc-800 shadow-2xl"
                    data-testid="whatsapp-popover"
                >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900">
                        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500">
                            // Direct Channel
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-zinc-500 hover:text-white"
                            aria-label="Close"
                            data-testid="whatsapp-popover-close"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="p-4">
                        <div className="font-display text-base font-black uppercase tracking-tight mb-1">
                            Talk to {BRAND.name}
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                            Average response under 30 minutes during business hours. We'll
                            scope your requirement and quote on the spot where possible.
                        </p>
                        <a
                            href={buildWhatsAppUrl()}
                            onClick={(e) => { e.preventDefault(); openWhatsApp(); }}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors"
                            data-testid="whatsapp-popover-cta"
                        >
                            Open WhatsApp · {BRAND.whatsappDisplay}
                        </a>
                    </div>
                </div>
            )}
            <button
                onClick={() => setOpen((o) => !o)}
                className="group relative h-14 w-14 grid place-items-center bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-2xl"
                aria-label="Chat on WhatsApp"
                data-testid="floating-whatsapp-button"
            >
                <span className="absolute inset-0 -z-10 animate-ping bg-emerald-500/40" />
                <MessageCircle className="h-6 w-6 text-white" />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-black animate-pulse-dot" />
            </button>
        </div>
    );
}
