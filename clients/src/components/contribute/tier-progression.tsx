import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

const tiers = [
    { name: "Tier A", active: true },
    { name: "Tier B", active: false },
    { name: "Tier C", active: false },
    { name: "Tier D", active: false },
]

export function TierProgression() {
  return (
    <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
        {tiers.map((tier, index) => (
            <React.Fragment key={tier.name}>
                <div className={cn(
                    "flex-1 text-center p-4 rounded-md transition-all duration-300",
                    tier.active ? "bg-accent text-accent-foreground" : "bg-muted/50 text-muted-foreground"
                )}>
                    <p className="font-bold text-lg">{tier.name}</p>
                    <p className="text-xs">{tier.active ? "Unlocked" : "Locked"}</p>
                </div>
                {index < tiers.length - 1 && (
                    <ChevronRight className={cn(
                        "h-8 w-8 mx-2",
                        tiers[index+1].active ? "text-accent" : "text-muted-foreground"
                    )} />
                )}
            </React.Fragment>
        ))}
    </div>
  );
}
