import { ProductCard } from "@/components/marketplace/product-card";
import { List, Wheat, Milk, Grape, Carrot, Beef, PlusCircle, Package, DollarSign, ShieldCheck, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";


const products = [
  { name: "Organic Corn", quantity: "500kg", price: "1.2 ETH/kg", delivery: "24h", verified: true, image: "https://picsum.photos/400/300?random=1", dataAiHint: "corn field" },
  { name: "Fresh Milk", quantity: "200L", price: "2.5 ETH/L", delivery: "48h", verified: true, image: "https://picsum.photos/400/300?random=2", dataAiHint: "milk bottle" },
  { name: "Free-Range Livestock", quantity: "50 head", price: "500 ETH/head", delivery: "On Request", verified: true, image: "https://picsum.photos/400/300?random=3", dataAiHint: "cattle pasture" },
  { name: "Heirloom Tomatoes", quantity: "150kg", price: "3.0 ETH/kg", delivery: "24h", verified: false, image: "https://picsum.photos/400/300?random=4", dataAiHint: "heirloom tomatoes" },
  { name: "Artisanal Cheese", quantity: "50kg", price: "15 ETH/kg", delivery: "72h", verified: true, image: "https://picsum.photos/400/300?random=5", dataAiHint: "artisanal cheese" },
  { name: "Winter Wheat", quantity: "1000kg", price: "0.8 ETH/kg", delivery: "On Request", verified: true, image: "https://picsum.photos/400/300?random=6", dataAiHint: "wheat field" },
];

const categories = [
    { name: "All Products", icon: List },
    { name: "Grains", icon: Wheat },
    { name: "Dairy", icon: Milk },
    { name: "Fruits", icon: Grape },
    { name: "Vegetables", icon: Carrot },
    { name: "Livestock", icon: Beef },
]

const orders = [
    { orderId: "ORD001", customer: "0xAb...c1d2", product: "Organic Corn", amount: "5 ETH", status: "Shipped" },
    { orderId: "ORD002", customer: "0xCd...e3f4", product: "Fresh Milk", amount: "2.5 ETH", status: "Processing" },
    { orderId: "ORD003", customer: "0xEf...g5h6", product: "Artisanal Cheese", amount: "15 ETH", status: "Delivered" },
];

const getStatusBadge = (status: string) => {
    switch(status) {
        case "Shipped": return "default";
        case "Processing": return "secondary";
        case "Delivered": return "outline";
        default: return "outline";
    }
}

export default function DeFarmPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold">DeFarm</h1>
        <p className="mt-2 text-lg text-muted-foreground">The decentralized hub for regenerative agriculture.</p>
      </div>
      
      <Tabs defaultValue="marketplace">
        <div className="flex justify-center mb-8">
            <TabsList className="bg-card/50 border border-border">
                <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
                <TabsTrigger value="dashboard">Farmer Dashboard</TabsTrigger>
            </TabsList>
        </div>

        <TabsContent value="marketplace">
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/4 lg:w-1/5">
                    <h2 className="text-xl font-semibold mb-4 text-accent">Categories</h2>
                    <div className="flex flex-col gap-2">
                        {categories.map((category, index) => (
                            <a key={index} href="#" className="flex items-center gap-3 p-2 rounded-md text-foreground/80 hover:bg-secondary hover:text-foreground transition-colors">
                                <category.icon className="w-5 h-5" />
                                <span>{category.name}</span>
                            </a>
                        ))}
                    </div>
                </aside>
                <main className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                    <ProductCard key={index} {...product} />
                    ))}
                </div>
                </main>
            </div>
        </TabsContent>

        <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="bg-card/50 border-border/50 shadow-lg">
                        <CardHeader>
                            <CardTitle>Track Orders</CardTitle>
                            <CardDescription>Monitor incoming orders for your products.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map(order => (
                                        <TableRow key={order.orderId}>
                                            <TableCell className="font-mono">{order.orderId}</TableCell>
                                            <TableCell className="font-mono">{order.customer}</TableCell>
                                            <TableCell>{order.product}</TableCell>
                                            <TableCell className="text-accent font-semibold">{order.amount}</TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusBadge(order.status)} className={order.status === 'Shipped' ? 'bg-accent text-accent-foreground' : ''}>{order.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-border/50 shadow-lg">
                        <CardHeader>
                            <CardTitle>Smart Contract Farming Insurance</CardTitle>
                            <CardDescription>Secure on-chain insurance for your crops and livestock.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                                <div className="flex items-center gap-4">
                                    <ShieldCheck className="text-accent h-8 w-8"/>
                                    <div>
                                        <p className="font-bold">Coverage Status</p>
                                        <p className="text-green-400 font-semibold">Active - 85% Covered</p>
                                    </div>
                                </div>
                                <Button className="glow-on-hover bg-accent text-accent-foreground hover:bg-accent/90">
                                    <FileText className="mr-2 h-4 w-4" /> File a Claim
                                </Button>
                            </div>
                            <div>
                                <Label>Coverage Progress</Label>
                                <Progress value={85} className="h-2 mt-1"/>
                                <p className="text-xs text-muted-foreground mt-1">Next premium due in 15 days.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-8">
                     <Card className="bg-card/50 border-border/50 shadow-lg">
                        <CardHeader>
                            <CardTitle>Earnings Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                                <div className="flex items-center gap-3">
                                    <DollarSign className="text-accent"/>
                                    <span className="font-medium">Total Revenue</span>
                                </div>
                                <span className="font-bold text-lg">1,234 ETH</span>
                           </div>
                           <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Package className="text-accent"/>
                                    <span className="font-medium">Orders Fulfilled</span>
                                </div>
                                <span className="font-bold text-lg">42</span>
                           </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-border/50 shadow-lg">
                        <CardHeader>
                            <CardTitle>Add New Product</CardTitle>
                            <CardDescription>List and tokenize a new product on the marketplace.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="productName">Product Name</Label>
                                <Input id="productName" placeholder="e.g., Organic Corn" className="bg-background" />
                            </div>
                            <div>
                                <Label htmlFor="category">Category</Label>
                                <Select>
                                    <SelectTrigger id="category" className="bg-background">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-card">
                                        <SelectItem value="grains">Grains</SelectItem>
                                        <SelectItem value="dairy">Dairy</SelectItem>
                                        <SelectItem value="fruits">Fruits</SelectItem>
                                        <SelectItem value="vegetables">Vegetables</SelectItem>
                                        <SelectItem value="livestock">Livestock</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input id="quantity" placeholder="e.g., 500kg" className="bg-background"/>
                            </div>
                             <div>
                                <Label htmlFor="price">Price (ETH)</Label>
                                <Input id="price" placeholder="e.g., 1.2 ETH/kg" className="bg-background" />
                            </div>
                            <div>
                                <Label htmlFor="delivery">Delivery Options</Label>
                                <Input id="delivery" placeholder="e.g., 24h" className="bg-background" />
                            </div>
                            <Button className="w-full glow-on-hover bg-accent text-accent-foreground hover:bg-accent/90">
                                <PlusCircle className="mr-2 h-4 w-4" /> Add & Tokenize Product
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
