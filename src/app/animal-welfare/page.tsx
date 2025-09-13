import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CoverageChart } from "@/components/animal-welfare/coverage-chart";
import { ImpactFeed } from "@/components/animal-welfare/impact-feed";
import { PawPrint, ShieldCheck, Siren } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function AnimalWelfarePage() {
  return (
    <div className="container mx-auto py-12">
        <div className="text-center mb-12">
            <h1 className="font-headline text-4xl font-bold">Animal Welfare Insurance</h1>
            <p className="mt-2 text-lg text-muted-foreground">Transparent, on-chain protection for livestock and wildlife.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
                 <Card className="bg-card/50 border-border/50 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl text-accent">Coverage Dashboard</CardTitle>
                        <CardDescription>Ecosystem-wide insurance metrics.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="my-4">
                            <CoverageChart />
                        </div>
                        <div className="space-y-4">
                           <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                                <div className="flex items-center gap-3">
                                    <PawPrint className="text-accent"/>
                                    <span className="font-medium">Animals Insured</span>
                                </div>
                                <span className="font-bold text-lg">14,302</span>
                           </div>
                           <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="text-accent"/>
                                    <span className="font-medium">Welfare Actions</span>
                                </div>
                                <span className="font-bold text-lg">789</span>
                           </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl text-accent flex items-center gap-2"><Siren/> Report Emergency</CardTitle>
                        <CardDescription>Instantly report animal threats, diseases, or hazards.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="w-full glow-on-hover bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    <Siren className="mr-2 h-4 w-4" /> File Emergency Report
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-card border-border">
                                <DialogHeader>
                                <DialogTitle>New Emergency Report</DialogTitle>
                                <DialogDescription>
                                    Your report will be geo-tagged and logged on-chain.
                                </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="type" className="text-right">
                                            Type
                                        </Label>
                                        <Select>
                                            <SelectTrigger id="type" className="col-span-3 bg-background">
                                                <SelectValue placeholder="Select report type" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-card">
                                                <SelectItem value="threat">Threat</SelectItem>
                                                <SelectItem value="disease">Disease</SelectItem>
                                                <SelectItem value="hazard">Hazard</SelectItem>
                                                <SelectItem value="rescue">Rescue Needed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="location" className="text-right">
                                        Location
                                        </Label>
                                        <Input id="location" placeholder="e.g., Sector Gamma, Quadrant 4" className="col-span-3 bg-background" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="description" className="text-right">
                                        Description
                                        </Label>
                                        <Textarea id="description" placeholder="Describe the situation..." className="col-span-3 bg-background" />
                                    </div>
                                </div>
                                <DialogFooter>
                                <Button type="submit" className="glow-on-hover bg-accent text-accent-foreground hover:bg-accent/90">Submit Report</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card className="bg-card/50 border-border/50 shadow-lg h-full">
                    <CardHeader>
                        <CardTitle className="text-2xl text-accent">Animal Health Ledger</CardTitle>
                        <CardDescription>Live feed of welfare activities recorded on-chain.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ImpactFeed />
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
