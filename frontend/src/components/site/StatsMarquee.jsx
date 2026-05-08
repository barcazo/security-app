import { STATS } from "@/lib/brand";

export default function StatsMarquee() {
    const items = [...STATS, ...STATS, ...STATS];
    return (
        <section
            className="border-b border-zinc-900 bg-black overflow-hidden"
            data-testid="stats-marquee"
        >
            <div className="flex animate-marquee whitespace-nowrap py-6">
                {items.map((s, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-4 px-10 border-r border-zinc-900"
                    >
                        <span className="font-display text-3xl md:text-4xl font-black tracking-tight text-white">
                            {s.k}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                            {s.v}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
