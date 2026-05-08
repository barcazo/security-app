import { PROCESS } from "@/lib/brand";
import { SectionHeader } from "@/components/site/Services";

export default function Process() {
    return (
        <section
            id="process"
            className="relative border-b border-zinc-900 bg-[#040404] py-24 md:py-32"
            data-testid="process-section"
        >
            <div className="absolute inset-0 tactical-grid-sm opacity-40 pointer-events-none" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    code="// 03"
                    eyebrow="Engagement"
                    title="Four-step deployment protocol"
                    sub="A predictable, documented process — no surprise costs, no improvised wiring, no orphaned passwords."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900">
                    {PROCESS.map((p, i) => (
                        <div
                            key={p.step}
                            className="bg-black p-8 relative group hover:bg-[#0a0a0a] transition-colors"
                            data-testid={`process-step-${p.step}`}
                        >
                            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-600 mb-3">
                                Step {p.step}
                            </div>
                            <div className="font-display text-7xl font-black text-zinc-900 group-hover:text-red-600/80 transition-colors leading-none">
                                {p.step}
                            </div>
                            <h3 className="mt-6 font-display text-xl font-black uppercase tracking-tight">
                                {p.title}
                            </h3>
                            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                                {p.body}
                            </p>
                            {i < PROCESS.length - 1 && (
                                <div className="absolute right-2 top-8 hidden lg:block font-mono text-xs text-zinc-700">
                                    →
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
