import { ArrowRight, Phone, ShieldCheck, Radio, Wifi, Activity } from "lucide-react";
import { BRAND, buildWhatsAppUrl, openWhatsApp } from "@/lib/brand";

const HERO_IMG =
    "https://images.pexels.com/photos/17323801/pexels-photo-17323801.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920";

export default function Hero() {
    return (
        <section
            id="top"
            className="relative overflow-hidden border-b border-zinc-900 noise"
            data-testid="hero-section"
        >
            {/* Background image with heavy overlay */}
            <div className="absolute inset-0">
                <img
                    src={HERO_IMG}
                    alt="Surveillance control room"
                    className="h-full w-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/85 to-black" />
                <div className="absolute inset-0 tactical-grid opacity-60" />
                <div className="scan-overlay" />
            </div>

            {/* Corner brackets */}
            <CornerBrackets />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-36">
                <div className="grid lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-8">
                        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase text-zinc-400 mb-8">
                            <span className="h-px w-8 bg-red-500" />
                            <span>UNIT // CCTV-OPS · {BRAND.region}</span>
                        </div>

                        <h1 className="font-display font-black uppercase tracking-tight text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.92]">
                            Surveillance,
                            <br />
                            <span className="text-zinc-500">configured</span>
                            <br />
                            <span className="inline-flex items-baseline gap-3">
                                <span className="text-red-500">precisely.</span>
                            </span>
                        </h1>

                        <p className="mt-8 max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed">
                            CCTV installation and configuration engineered for South African
                            homes, estates and commercial sites. Hardened networks, encrypted
                            streams, and remote viewing — handed over with documentation and
                            a 12-month support window.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-3">
                            <a
                                href="#quote"
                                className="group inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white px-7 py-4 font-mono text-xs uppercase tracking-[0.25em] transition-colors shimmer-edge"
                                data-testid="hero-cta-quote"
                            >
                                Request Free Quote
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                            <a
                                href={buildWhatsAppUrl()}
                                onClick={(e) => { e.preventDefault(); openWhatsApp(); }}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 border border-zinc-700 hover:border-red-500 hover:text-red-400 text-white px-7 py-4 font-mono text-xs uppercase tracking-[0.25em] transition-colors"
                                data-testid="hero-cta-whatsapp"
                            >
                                <Phone className="h-4 w-4" />
                                Chat on WhatsApp
                            </a>
                        </div>

                        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900 max-w-2xl">
                            {[
                                { icon: ShieldCheck, label: "PSIRA Aligned" },
                                { icon: Radio, label: "On-Site Survey" },
                                { icon: Wifi, label: "Remote Setup" },
                                { icon: Activity, label: "48h SLA" },
                            ].map((b, i) => (
                                <div
                                    key={i}
                                    className="bg-black flex items-center gap-2.5 px-4 py-3"
                                    data-testid={`hero-trust-${i}`}
                                >
                                    <b.icon className="h-3.5 w-3.5 text-red-500" />
                                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-400">
                                        {b.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side: tactical readout panel */}
                    <div
                        className="lg:col-span-4 hidden lg:block"
                        data-testid="hero-readout"
                    >
                        <div className="border border-zinc-800 bg-black/60 backdrop-blur-sm p-6 space-y-5 relative">
                            <div className="absolute top-3 right-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-emerald-400 uppercase">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                                Live
                            </div>
                            <div>
                                <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-1">
                                    System Status
                                </div>
                                <div className="font-display text-2xl font-black uppercase">
                                    Operational
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-900">
                                {[
                                    { k: "1,243", v: "Active feeds" },
                                    { k: "99.97%", v: "Uptime · 30d" },
                                    { k: "48h", v: "Fault SLA" },
                                    { k: "07–19", v: "Hours SAST" },
                                ].map((s, i) => (
                                    <div key={i}>
                                        <div className="font-display text-2xl font-black">
                                            {s.k}
                                        </div>
                                        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500 mt-1">
                                            {s.v}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-4 border-t border-zinc-900 space-y-1.5">
                                {[
                                    "0231 · cam-04 · armed",
                                    "0244 · cam-09 · armed",
                                    "0258 · nvr-01 · sync ok",
                                    "0301 · cam-12 · armed",
                                ].map((line, i) => (
                                    <div
                                        key={i}
                                        className="font-mono text-[10px] tracking-wider text-zinc-500"
                                    >
                                        <span className="text-red-500">›</span> {line}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CornerBrackets() {
    const cls = "absolute h-6 w-6 border-red-500/70";
    return (
        <>
            <div className={`${cls} top-6 left-6 border-t-2 border-l-2`} />
            <div className={`${cls} top-6 right-6 border-t-2 border-r-2`} />
            <div className={`${cls} bottom-6 left-6 border-b-2 border-l-2`} />
            <div className={`${cls} bottom-6 right-6 border-b-2 border-r-2`} />
        </>
    );
}
