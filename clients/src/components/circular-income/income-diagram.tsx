import { Users, Leaf, HeartHandshake, Mic, Wrench } from "lucide-react";

const participants = [
    { name: "Teachers", icon: Users, position: "top-0 left-1/2 -translate-x-1/2" },
    { name: "Farmers", icon: Leaf, position: "top-1/4 -right-2 translate-x-1/2" },
    { name: "Wildlife Pro", icon: HeartHandshake, position: "bottom-1/4 -right-2 translate-x-1/2" },
    { name: "Reporters", icon: Mic, position: "bottom-0 left-1/2 -translate-x-1/2" },
    { name: "Service Teams", icon: Wrench, position: "bottom-1/4 -left-2 -translate-x-1/2" },
];

export function IncomeDiagram() {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto my-8">
      <div className="absolute inset-8 border-2 border-dashed border-accent/50 rounded-full"></div>
      <div className="absolute inset-16 border-2 border-accent/30 rounded-full"></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 bg-primary/50 rounded-full flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold text-accent">ETH</span>
          <span className="text-xs text-foreground">Tokens</span>
        </div>
      </div>
      
      {/* SVG Arrows */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <marker id="arrowhead" markerWidth="5" markerHeight="3.5" refX="0" refY="1.75" orient="auto">
            <polygon points="0 0, 5 1.75, 0 3.5" fill="hsl(var(--accent))" />
          </marker>
        </defs>
        <path d="M 50,15 A 35,35 0 0 1 80,35" stroke="hsl(var(--accent))" strokeWidth="0.5" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="2,1" />
        <path d="M 80,35 A 35,35 0 0 1 80,65" stroke="hsl(var(--accent))" strokeWidth="0.5" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="2,1" />
        <path d="M 80,65 A 35,35 0 0 1 50,85" stroke="hsl(var(--accent))" strokeWidth="0.5" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="2,1" />
        <path d="M 50,85 A 35,35 0 0 1 20,65" stroke="hsl(var(--accent))" strokeWidth="0.5" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="2,1" />
        <path d="M 20,65 A 35,35 0 0 1 20,35" stroke="hsl(var(--accent))" strokeWidth="0.5" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="2,1" />
        <path d="M 20,35 A 35,35 0 0 1 50,15" stroke="hsl(var(--accent))" strokeWidth="0.5" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="2,1" />
      </svg>

      {participants.map((p, i) => (
        <div key={i} className={`absolute transform ${p.position} w-24`}>
          <div className="flex flex-col items-center text-center p-2 bg-background rounded-lg">
            <div className="p-2 bg-secondary rounded-full mb-1">
              <p.icon className="h-6 w-6 text-accent" />
            </div>
            <span className="text-xs font-semibold text-foreground">{p.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
