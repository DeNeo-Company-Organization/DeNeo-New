import { HeroSection } from "@/components/home/hero-section";
import { Dashboard } from "@/components/home/dashboard";
import { TokenEconomyPanel } from "@/components/home/token-economy-panel";
import { SustainabilityScoreboard } from "@/components/home/sustainability-scoreboard";
import { GeoMappedImpactTracker } from "@/components/home/geo-mapped-impact-tracker";
import { CommunityFeed } from "@/components/home/community-feed";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <Dashboard />
      <div className="container mx-auto py-16 sm:py-24 space-y-24">
        <TokenEconomyPanel />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
                <SustainabilityScoreboard />
            </div>
            <div className="lg:col-span-1">
                <CommunityFeed />
            </div>
        </div>
        <GeoMappedImpactTracker />
      </div>
    </div>
  );
}
