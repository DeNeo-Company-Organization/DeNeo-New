import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-24 md:py-32 lg:py-48 text-center bg-gradient-to-b from-background to-primary/10">
      <div className="container relative z-10 mx-auto">
        <h1 className="font-headline text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70 md:text-5xl lg:text-6xl">
          Decentralized Farming • Animal Welfare • Circular Income
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
          Welcome to DeNeo, a futuristic yet organic digital ecosystem merging blockchain transparency with nature-inspired visuals. Join a living, regenerative economy where every action is rewarded and tracked on-chain.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="glow-on-hover bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/marketplace">
              Enter Marketplace <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="glow-on-hover">
            <Link href="/animal-welfare">Explore Animal Welfare</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="glow-on-hover">
            <Link href="/contribute">Join as Contributor</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
