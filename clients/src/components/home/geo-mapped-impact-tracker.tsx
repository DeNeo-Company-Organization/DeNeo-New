import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Leaf, Shield, Tractor, Megaphone } from "lucide-react";

const legendItems = [
  { icon: Tractor, label: "Active Farms", color: "text-green-400" },
  { icon: Shield, label: "Protection Zones", color: "text-blue-400" },
  { icon: Leaf, label: "Reforestation Projects", color: "text-yellow-400" },
  { icon: Megaphone, label: "Community Reports", color: "text-red-400" },
];

export function GeoMappedImpactTracker() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold text-foreground">Geo-Mapped Impact Tracker</h2>
        <p className="mt-2 text-lg text-muted-foreground">A global, real-time view of our ecosystem in action.</p>
      </div>
      <Card className="bg-card/50 border-border/50 shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className="lg:col-span-3 relative h-[400px] lg:h-[600px] bg-primary/20">
            <Image 
              src="https://picsum.photos/seed/map/1200/800" 
              alt="World Map" 
              fill 
              className="object-cover opacity-30" 
              data-ai-hint="world map"
            />
            {/* Placeholder data points */}
            <div className="absolute top-[30%] left-[25%]">
                <Tractor className="h-6 w-6 text-green-400 animate-pulse" />
            </div>
            <div className="absolute top-[50%] left-[50%]">
                <Shield className="h-8 w-8 text-blue-400 animate-pulse" />
            </div>
             <div className="absolute top-[60%] left-[70%]">
                <Leaf className="h-5 w-5 text-yellow-400 animate-pulse" />
            </div>
             <div className="absolute top-[45%] left-[10%]">
                <Megaphone className="h-6 w-6 text-red-400 animate-pulse" />
            </div>
             <div className="absolute top-[20%] left-[80%]">
                <Tractor className="h-6 w-6 text-green-400 animate-pulse" />
            </div>
          </div>
          <div className="lg:col-span-1 p-6 bg-secondary/30">
            <h3 className="text-xl font-bold mb-4 text-accent">Legend</h3>
            <ul className="space-y-4">
              {legendItems.map(item => (
                <li key={item.label} className="flex items-center gap-3">
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                  <span className="font-medium">{item.label}</span>
                </li>
              ))}
            </ul>
            <Card className="mt-8 bg-background/50">
                <CardHeader>
                    <CardTitle className="text-lg">North America</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm"><span className="font-bold">254</span> Active Farms</p>
                    <p className="text-sm"><span className="font-bold">12</span> Protection Zones</p>
                    <p className="text-sm"><span className="font-bold">45</span> Community Reports</p>
                </CardContent>
            </Card>
          </div>
        </div>
      </Card>
    </section>
  );
}
