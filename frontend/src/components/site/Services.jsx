import { useState, useMemo } from "react";
import {
    Home,
    Building2,
    Smartphone,
    Bell,
    Radio,
    Siren,
    Fingerprint,
    KeyRound,
    Zap,
    ShieldCheck,
    Wrench,
    ClipboardList,
    Plus,
} from "lucide-react";
import { SERVICES, CATEGORIES } from "@/lib/brand";

const ICON_MAP = {
    home: Home,
    building: Building2,
    smartphone: Smartphone,
    bell: Bell,
    radio: Radio,
    siren: Siren,
    fingerprint: Fingerprint,
    key: KeyRound,
    zap: Zap,
    "shield-check": ShieldCheck,
    wrench: Wrench,
    clipboard: ClipboardList,
};

export default function Services() {
    const [active, setActive] = useState("all");

    const filtered = useMemo(
        () =>
            active === "all"
                ? SERVICES
                : SERVICES.filter((s) => s.category === active),
        [active]
    );

    const counts = useMemo(() => {
        const map = { all: SERVICES.length };
        for (const s of SERVICES) {
            map[s.category] = (map[s.category] || 0) + 1;
        }
        return map;
    }, []);

    return (
        <section
            id="services"
            className="relative border-b border-zinc-900 py-24 md:py-32"
            data-testid="services-section"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    code="// 02"
                    eyebrow="Solutions"
                    title="Five verticals. One integrated system."
                    sub="Surveillance, alarms, access control, electric fencing and ongoing support — engineered to talk to each other and report into a single app."
                />

                {/* Category Tabs */}
                <div
                    className="mb-10 -mx-4 px-4 overflow-x-auto no-scrollbar"
                    data-testid="services-tabs"
                >
                    <div className="flex items-center gap-2 min-w-max border-b border-zinc-900 pb-px">
                        {CATEGORIES.map((cat) => {
                            const isActive = active === cat.id;
                            const count = counts[cat.id] || 0;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setActive(cat.id)}
                                    className={`group relative inline-flex items-center gap-2.5 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${
                                        isActive
                                            ? "text-white"
                                            : "text-zinc-500 hover:text-white"
                                    }`}
                                    data-testid={`services-tab-${cat.id}`}
                                    aria-pressed={isActive}
                                >
                                    <span
                                        className={`text-[10px] ${
                                            isActive ? "text-red-500" : "text-zinc-600"
                                        }`}
                                    >
                                        / {cat.code}
                                    </span>
                                    {cat.label}
                                    <span
                                        className={`text-[10px] ${
                                            isActive ? "text-zinc-400" : "text-zinc-700"
                                        }`}
                                    >
                                        ({count})
                                    </span>
                                    {isActive && (
                                        <span className="absolute -bottom-px left-0 right-0 h-px bg-red-500" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Services bento grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900"
                    data-testid="services-grid"
                >
                    {filtered.map((svc) => {
                        const Icon = ICON_MAP[svc.icon] || ShieldCheck;
                        return (
                            <article
                                key={svc.id}
                                className="group relative bg-[#070707] hover:bg-[#0c0c0c] transition-colors p-8 min-h-[280px] flex flex-col"
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

                {filtered.length === 0 && (
                    <div className="border border-zinc-900 p-12 text-center font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                        No services in this category yet.
                    </div>
                )}
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
