import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const proposals = [
    { title: "Fund Reforestation in Region Gamma", yes: 75, no: 25 },
    { title: "Increase Livestock Insurance Payouts by 5%", yes: 60, no: 40 },
    { title: "Allocate Treasury to New Farmer Onboarding", yes: 88, no: 12 },
];

export function DAOProposals() {
    return (
        <div className="space-y-6">
            {proposals.map((p, i) => (
                <div key={i} className="p-4 bg-secondary rounded-lg">
                    <p className="font-semibold mb-2">{p.title}</p>
                    <div className="space-y-2">
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span>Yes</span>
                                <span>{p.yes}%</span>
                            </div>
                            <Progress value={p.yes} className="h-2" />
                        </div>
                         <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span>No</span>
                                <span>{p.no}%</span>
                            </div>
                            <Progress value={p.no} className="h-2" />
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <Button size="sm" className="flex-1 glow-on-hover bg-accent text-accent-foreground hover:bg-accent/90">Vote Yes</Button>
                        <Button size="sm" variant="outline" className="flex-1 glow-on-hover">Vote No</Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
