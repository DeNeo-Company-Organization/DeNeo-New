import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShieldCheck, Package, Truck, Leaf, Cuboid, PlusCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

export default function ProductDetailPage() {
  const product = {
    name: "Organic Corn",
    price: "1.2 ETH/kg",
    image: "https://picsum.photos/800/600?random=1",
    dataAiHint: "corn field",
    description: "Freshly harvested organic corn, grown using sustainable and regenerative farming practices. Perfect for a variety of culinary uses, from grilling to making fresh tortillas. Certified on-chain for quality and origin.",
    farmer: {
        name: "Farmer Chen",
        avatar: "FC",
        rating: 4.8,
        reviews: 124,
    },
    details: [
        { label: "Available Quantity", value: "500kg", icon: Package },
        { label: "Delivery", value: "24h", icon: Truck },
        { label: "Eco-Certification", value: "Verified", icon: Leaf },
        { label: "On-chain Record", value: "View Hash", icon: Cuboid, link: true },
    ]
  };

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <Card className="bg-card/50 border-border/50 shadow-lg overflow-hidden">
            <Image 
              src={product.image} 
              alt={product.name} 
              width={800} 
              height={600} 
              className="w-full object-cover"
              data-ai-hint={product.dataAiHint}
            />
          </Card>
        </div>
        <div>
          <h1 className="font-headline text-4xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-4 mt-4">
            <Badge variant="default" className="bg-accent text-accent-foreground">
              <ShieldCheck className="mr-1.5 h-4 w-4" /> Verified
            </Badge>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-accent fill-accent' : 'text-muted-foreground'}`} />
              ))}
              <span className="text-muted-foreground text-sm ml-1">({product.farmer.reviews} reviews)</span>
            </div>
          </div>
          <p className="mt-6 text-lg text-muted-foreground">{product.description}</p>
          
          <Separator className="my-8" />

          <div className="grid grid-cols-2 gap-6">
            {product.details.map((detail, i) => (
                <div key={i} className="flex items-center gap-3">
                    <detail.icon className="h-6 w-6 text-accent"/>
                    <div>
                        <p className="text-sm text-muted-foreground">{detail.label}</p>
                        {detail.link ? (
                             <a href="#" className="font-semibold text-accent hover:underline">{detail.value}</a>
                        ) : (
                             <p className="font-semibold">{detail.value}</p>
                        )}
                    </div>
                </div>
            ))}
          </div>

           <Separator className="my-8" />
          
            <Card className="bg-card/50 border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle>Seller Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12">
                                <AvatarFallback className="bg-secondary">{product.farmer.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold text-lg">{product.farmer.name}</p>
                                <p className="text-sm text-muted-foreground">Reputation Score: {product.farmer.rating}/5.0</p>
                            </div>
                        </div>
                         <Button variant="outline" className="glow-on-hover">View Profile</Button>
                    </div>
                     <div className="mt-4">
                        <Label>Reliability</Label>
                        <Progress value={96} className="h-2 mt-1"/>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-8">
                 <p className="text-3xl font-bold text-accent mb-4">{product.price}</p>
                 <Button size="lg" className="w-full glow-on-hover bg-accent text-accent-foreground hover:bg-accent/90">
                    <PlusCircle className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
