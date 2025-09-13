import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { MinusCircle, PlusCircle, Trash2, Leaf, HeartHandshake, Lock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const cartItems = [
  {
    name: "Organic Corn",
    price: 1.2,
    quantity: 2,
    image: "https://picsum.photos/400/300?random=1",
    dataAiHint: "corn field"
  },
  {
    name: "Artisanal Cheese",
    price: 15,
    quantity: 1,
    image: "https://picsum.photos/400/300?random=5",
    dataAiHint: "artisanal cheese"
  },
];

export default function CartPage() {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 5.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold">Shopping Cart</h1>
        <p className="mt-2 text-lg text-muted-foreground">Review your items and choose your impact before checkout.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2">
          <Card className="bg-card/50 border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>Your Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md object-cover" data-ai-hint={item.dataAiHint} />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.price.toFixed(2)} ETH</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-7 w-7"><MinusCircle className="h-4 w-4" /></Button>
                            <Input type="number" value={item.quantity} className="w-16 h-8 text-center bg-background" readOnly />
                            <Button variant="ghost" size="icon" className="h-7 w-7"><PlusCircle className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">{(item.price * item.quantity).toFixed(2)} ETH</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1 space-y-8">
          <Card className="bg-card/50 border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{subtotal.toFixed(2)} ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping.toFixed(2)} ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span>{tax.toFixed(2)} ETH</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-accent">{total.toFixed(2)} ETH</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full glow-on-hover bg-accent text-accent-foreground hover:bg-accent/90">
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
          <Card className="bg-card/50 border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>Choose Your Impact</CardTitle>
              <CardDescription>Magnify the positive effect of your purchase.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
                    <Checkbox id="impact-tree" />
                    <Label htmlFor="impact-tree" className="flex items-center gap-3 cursor-pointer">
                        <Leaf className="text-accent"/>
                        <span>Plant +1 Tree (0.1 ETH)</span>
                    </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
                    <Checkbox id="impact-donate" />
                    <Label htmlFor="impact-donate" className="flex items-center gap-3 cursor-pointer">
                        <HeartHandshake className="text-accent"/>
                        <span>Donate 5% to Animal Rescue</span>
                    </Label>
                </div>
                 <div className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
                    <Checkbox id="impact-lock" />
                    <Label htmlFor="impact-lock" className="flex items-center gap-3 cursor-pointer">
                        <Lock className="text-accent"/>
                        <span>Lock tokens for Circular Income</span>
                    </Label>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
