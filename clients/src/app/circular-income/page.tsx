import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { IncomeDiagram } from "@/components/circular-income/income-diagram";
import { Leaderboard } from "@/components/circular-income/leaderboard";
import { TrendingUp, Users, Repeat } from "lucide-react";
import { DAOProposals } from "@/components/circular-income/dao-proposals";

export default function CircularIncomePage() {
  return (
    <div className="container mx-auto py-12">
        <div className="text-center mb-12">
            <h1 className="font-headline text-4xl font-bold">Circular Income</h1>
            <p className="mt-2 text-lg text-muted-foreground">Visualizing the flow of value within the DeNeo regenerative economy.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
                <Card className="bg-card/50 border-border/50 shadow-lg h-full">
                    <CardHeader>
                        <CardTitle className="text-2xl text-accent">Ecosystem Flow</CardTitle>
                        <CardDescription>How value is created and distributed among participants.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <IncomeDiagram />
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <div className="flex flex-col gap-8">
                    <Card className="bg-card/50 border-border/50 shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium">Monthly Stats</CardTitle>
                             <TrendingUp className="h-6 w-6 text-accent" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-foreground">$150,432</p>
                            <p className="text-xs text-muted-foreground">Total value circulated this month</p>
                        </CardContent>
                    </Card>
                     <Card className="bg-card/50 border-border/50 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl text-accent">DAO Governance</CardTitle>
                             <CardDescription>Vote on ecosystem proposals.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DAOProposals />
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-border/50 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl text-accent">Top Contributors</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Leaderboard />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </div>
  );
}
