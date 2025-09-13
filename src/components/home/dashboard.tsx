import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CoverageChart } from "@/components/animal-welfare/coverage-chart";
import { Leaf, DollarSign, HeartHandshake } from "lucide-react";

export function Dashboard() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
            <h2 className="font-headline text-4xl font-bold text-foreground">Live Ecosystem Snapshot</h2>
            <p className="mt-2 text-lg text-muted-foreground">Real-time data from the DeNeo network.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-card/50 border-border/50 shadow-lg hover:border-accent/50 transition-colors duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Farming Stats</CardTitle>
              <Leaf className="h-6 w-6 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-foreground">500kg Corn</div>
              <p className="text-xs text-muted-foreground mt-1">+20.1% from last month</p>
              <div className="text-4xl font-bold text-foreground mt-4">200L Milk</div>
              <p className="text-xs text-muted-foreground mt-1">+12.4% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 shadow-lg hover:border-accent/50 transition-colors duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Animal Welfare Insurance</CardTitle>
              <HeartHandshake className="h-6 w-6 text-accent" />
            </CardHeader>
            <CardContent>
                <div className="h-[180px]">
                    <CoverageChart />
                </div>
                <CardDescription className="text-center">Total Ecosystem Coverage</CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 shadow-lg hover:border-accent/50 transition-colors duration-300 md:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Circular Income Ticker</CardTitle>
              <DollarSign className="h-6 w-6 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-foreground">1,234,567 ETH</div>
              <p className="text-xs text-muted-foreground mt-1">Live token rewards in circulation</p>
              <div className="mt-4">
                  <p className="text-sm font-medium">Last transaction:</p>
                  <p className="text-md text-accent font-mono">0x4a...2f9b rewarding Farmer #42</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
