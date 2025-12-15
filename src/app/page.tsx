import Features from "@/components/marketing/Features";
import Hero from "@/components/marketing/Hero";
import PricingCards from "@/components/marketing/PricingCards";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <Hero />
      <Features />
      <PricingCards />
    </main>
  );
}
