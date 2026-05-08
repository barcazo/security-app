import {
    Home,
    Building2,
    Server,
    Smartphone,
    Wrench,
    ClipboardList,
    Plus,
} from "lucide-react";
import { SERVICES } from "@/lib/brand";

const ICONS = {
    residential: Home,
    commercial: Building2,
    "ip-nvr": Server,
    remote: Smartphone,
    amc: Wrench,
    consult: ClipboardList,
};

export default function Services() {
    return (
        <section
            id="services"
            className="relative border-b border-zinc-900 py-24 md:py-32"
            data-testid="services-section"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    code="// 02"
                    eyebrow="Capabilities"
                    title="What we install & configure"
                    sub="Six service tracks covering the lifecycle of a CCTV deployment — survey, install, harden, hand over."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
                    {SERVICES.map((svc) => {
                        const Icon = ICONS[svc.id] || Server;
                        return (
                            <article
                                key={svc.id}
                                className="group relative bg-[#070707] hover:bg-[#0c0c0c] transition-colors p-8 min-h-[260px] flex flex-col"
                                data-testid={`service-card-${svc.id}`}
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="h-10 w-10 border border-zinc-800 group-hover:border-red-500 transition-colors grid place-items-center">
                                        <Icon className="h-4 w-4 text-red-500" />
                                    </div>
                                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-600">
                                        {svc.code}
                                    </span>
                                </div>
                                <h3 className="font-display text-xl font-black uppercase tracking-tight mb-3">
                                    {svc.title}
                                </h3>
                                <p className="text-sm text-zinc-400 leading-relaxed mb-5 flex-1">
                                    {svc.blurb}
                                </p>
                                <ul className="space-y-1.5 mb-6">
                                    {svc.bullets.map((b, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-2 font-mono text-[11px] tracking-wider text-zinc-500"
                                        >
                                            <Plus className="h-3 w-3 text-red-500 mt-0.5 shrink-0" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href="#quote"
                                    className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400 group-hover:text-red-500 transition-colors inline-flex items-center gap-2"
                                    data-testid={`service-cta-${svc.id}`}
                                >
                                    Request quote
                                    <span className="inline-block transition-transform group-hover:translate-x-1">
                                        →
                                    </span>
                                </a>
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-500/0 to-transparent group-hover:via-red-500/60 transition-colors" />
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export function SectionHeader({ code, eyebrow, title, sub }) {
    return (
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
                <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase text-zinc-500 mb-5">
                    <span className="text-red-500">{code}</span>
                    <span className="h-px w-8 bg-zinc-700" />
                    <span>{eyebrow}</span>
                </div>
                <h2 className="font-display font-black uppercase tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95] max-w-3xl">
                    {title}
                </h2>
            </div>
            {sub && (
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-md">
                    {sub}
                </p>
            )}
        </div>
    );
}
