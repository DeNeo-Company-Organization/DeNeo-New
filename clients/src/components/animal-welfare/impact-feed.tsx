import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Bird, Syringe, Ambulance } from "lucide-react";

const feedItems = [
    { type: "Rescue", description: "Wildlife rescue reported in Sector Gamma.", icon: Ambulance, time: "2m ago", hash: "0x1b...e4a1" },
    { type: "Insurance", description: "Livestock herd #54 insured by Farmer Chen.", icon: Syringe, time: "15m ago", hash: "0x8c...d2b3" },
    { type: "Report", description: "Injured bird spotted near the northern farmlands.", icon: Bird, time: "1h ago", hash: "0x3f...c9d5" },
    { type: "Vet Check", description: "Routine veterinary check-up for dairy cows completed.", icon: Stethoscope, time: "3h ago", hash: "0x9a...b8e7" },
    { type: "Rescue", description: "Lost calf returned to its herd.", icon: Ambulance, time: "5h ago", hash: "0x5e...a6f9" },
    { type: "Insurance", description: "New poultry farm #12 fully insured.", icon: Syringe, time: "8h ago", hash: "0x2d...f4c1" },
    { type: "Vet Check", description: "Vaccination drive for sheep completed.", icon: Stethoscope, time: "1d ago", hash: "0x7b...3a9e" },
];

export function ImpactFeed() {
    const getBadgeVariant = (type: string) => {
        switch (type) {
            case "Rescue": return "destructive";
            case "Insurance": return "default";
            case "Report": return "secondary";
            default: return "outline";
        }
    }

  return (
    <ScrollArea className="h-[450px] w-full pr-4">
      <div className="space-y-6">
        {feedItems.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              <item.icon className="h-5 w-5 text-accent" />
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-semibold">{item.description}</p>
                        <p className="text-xs text-muted-foreground">{item.time} - <span className="font-mono">{item.hash}</span></p>
                    </div>
                     <Badge variant={getBadgeVariant(item.type)} className={item.type === 'Insurance' ? 'bg-accent text-accent-foreground' : ''}>{item.type}</Badge>
                </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
