import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sprout, ShieldCheck, User, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const leaderboardData = [
    { rank: 1, name: "Region Alpha", score: "9,876", type: "Region" },
    { rank: 2, name: "Farmer Sarah", score: "8,543", type: "Contributor" },
    { rank: 3, name: "Region Gamma", score: "7,123", type: "Region" },
    { rank: 4, name: "Wildlife Org X", score: "6,543", type: "Contributor" },
];

export function SustainabilityScoreboard() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold text-foreground">Sustainability Scoreboard</h2>
        <p className="mt-2 text-lg text-muted-foreground">Tracking our collective impact on the planet.</p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="bg-card/50 border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle>Global Metrics</CardTitle>
            <CardDescription>Ecosystem-wide sustainability achievements.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6 pt-2">
            <div className="bg-secondary p-4 rounded-lg">
              <Sprout className="h-8 w-8 text-accent mb-2" />
              <p className="text-2xl font-bold">1,200 Ha</p>
              <p className="text-sm text-muted-foreground">Reforestation</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <Globe className="h-8 w-8 text-accent mb-2" />
              <p className="text-2xl font-bold">5,000 tCO₂e</p>
              <p className="text-sm text-muted-foreground">Carbon Offset</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <ShieldCheck className="h-8 w-8 text-accent mb-2" />
              <p className="text-2xl font-bold">14,302</p>
              <p className="text-sm text-muted-foreground">Animals Insured</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <User className="h-8 w-8 text-accent mb-2" />
              <p className="text-2xl font-bold">1,500+</p>
              <p className="text-sm text-muted-foreground">Contributors</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle>Impact Leaderboard</CardTitle>
            <CardDescription>Top contributing regions and individuals.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Rank</TableHead>
                  <TableHead>Contributor</TableHead>
                  <TableHead className="text-right">Impact Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((item) => (
                  <TableRow key={item.rank}>
                    <TableCell className="font-bold text-lg">{item.rank}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className={item.type === 'Region' ? 'bg-primary' : 'bg-secondary'}>{item.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <Badge variant={item.type === 'Region' ? 'default' : 'secondary'} className={item.type === 'Region' ? 'bg-accent text-accent-foreground' : ''}>{item.type}</Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-accent">{item.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
