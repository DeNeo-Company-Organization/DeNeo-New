import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ShieldOff, Truck, Package, Cuboid, Star } from "lucide-react";

type ProductCardProps = {
  name: string;
  quantity: string;
  price: string;
  delivery: string;
  verified: boolean;
  image: string;
  dataAiHint: string;
};

export function ProductCard({ name, quantity, price, delivery, verified, image, dataAiHint }: ProductCardProps) {
  return (
    <Card className="overflow-hidden bg-card/50 border-border/50 shadow-lg hover:shadow-accent/10 hover:border-accent/50 transition-all duration-300 flex flex-col">
        <Link href="/defarm/product" className="flex flex-col flex-grow">
            <CardHeader className="p-0 relative">
                <Image
                src={image}
                alt={name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
                data-ai-hint={dataAiHint}
                />
                {verified ? (
                <Badge variant="default" className="absolute top-2 right-2 bg-accent text-accent-foreground gap-1.5">
                    <ShieldCheck className="h-4 w-4" />
                    Verified
                </Badge>
                ) : (
                    <Badge variant="secondary" className="absolute top-2 right-2 gap-1.5">
                    <ShieldOff className="h-4 w-4" />
                    Unverified
                </Badge>
                )}
            </CardHeader>
            <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg mb-2 text-foreground">{name}</CardTitle>
                <div className="text-sm text-muted-foreground space-y-2">
                <p className="flex items-center"><Package className="h-4 w-4 mr-2 text-accent" /> Quantity: <span className="font-semibold ml-1 text-foreground">{quantity}</span></p>
                <p className="flex items-center"><Truck className="h-4 w-4 mr-2 text-accent" /> Delivery: <span className="font-semibold ml-1 text-foreground">{delivery}</span></p>
                </div>
            </CardContent>
            <CardFooter className="p-4 bg-secondary/50 flex-col items-stretch space-y-3 mt-auto">
                 <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-accent">{price}</p>
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < 4 ? 'text-accent fill-accent' : 'text-muted-foreground'}`} />
                        ))}
                    </div>
                </div>
                <Button className="w-full glow-on-hover">Add to Cart</Button>
            </CardFooter>
        </Link>
    </Card>
  );
}
