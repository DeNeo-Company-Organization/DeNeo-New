import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sprout, ShieldCheck, Tractor } from "lucide-react";

const feedItems = [
    { icon: Tractor, text: "Farmer John sold 200kg maize with eco-certification.", time: "5m ago" },
    { icon: ShieldCheck, text: "Wild-keeper Ana rescued 2 elephants in Sector Beta.", time: "30m ago" },
    { icon: Sprout, text: "Community planted 500 trees in Lagos.", time: "2h ago" },
    { icon: Tractor, text: "New batch of Artisanal Cheese listed by Farmer Sarah.", time: "4h ago" },
    { icon: ShieldCheck, text: "Successful vaccination drive for livestock herd #21.", time: "8h ago" },
];

export function CommunityFeed() {
  return (
    <Card className="bg-card/50 border-border/50 shadow-lg h-full">
        <CardHeader>
            <CardTitle className="text-2xl text-accent">Impact Stories</CardTitle>
            <CardDescription>Live feed of success stories from the community.</CardDescription>
        </CardHeader>
        <CardContent>
            <ScrollArea className="h-[350px] w-full pr-4">
                <div className="space-y-6">
                    {feedItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                        <item.icon className="h-5 w-5 text-accent" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-sm">{item.text}</p>
                            <p className="text-xs text-muted-foreground">{item.time}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </ScrollArea>
        </CardContent>
    </Card>
  );
}
