import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/lib/brand";
import { SectionHeader } from "@/components/site/Services";

export default function FAQ() {
    return (
        <section
            id="faq"
            className="relative border-b border-zinc-900 bg-[#040404] py-24 md:py-32"
            data-testid="faq-section"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    code="// 05"
                    eyebrow="Field Manual"
                    title="Common questions answered"
                    sub="If your question isn't here, WhatsApp us — typical reply time is under 30 minutes during business hours."
                />

                <div className="border border-zinc-900 bg-black">
                    <Accordion type="single" collapsible className="w-full">
                        {FAQS.map((f, i) => (
                            <AccordionItem
                                key={i}
                                value={`item-${i}`}
                                className="border-b border-zinc-900 last:border-b-0 px-5 md:px-8"
                                data-testid={`faq-item-${i}`}
                            >
                                <AccordionTrigger className="py-6 text-left hover:no-underline group">
                                    <div className="flex items-start gap-5 pr-4">
                                        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-600 mt-1.5 shrink-0">
                                            Q.{String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="font-display text-base md:text-lg font-black uppercase tracking-tight text-white group-hover:text-red-400 transition-colors">
                                            {f.q}
                                        </span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-6 pl-[3.5rem] pr-4 text-sm text-zinc-400 leading-relaxed">
                                    {f.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
