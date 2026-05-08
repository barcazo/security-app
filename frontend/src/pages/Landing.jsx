import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import StatsMarquee from "@/components/site/StatsMarquee";
import Services from "@/components/site/Services";
import Process from "@/components/site/Process";
import QuoteForm from "@/components/site/QuoteForm";
import FAQ from "@/components/site/FAQ";
import Footer from "@/components/site/Footer";
import FloatingWhatsApp from "@/components/site/FloatingWhatsApp";

export default function Landing() {
    return (
        <main className="min-h-screen bg-black text-white" data-testid="landing-page">
            <Header />
            <Hero />
            <StatsMarquee />
            <Services />
            <Process />
            <QuoteForm />
            <FAQ />
            <Footer />
            <FloatingWhatsApp />
        </main>
    );
}
