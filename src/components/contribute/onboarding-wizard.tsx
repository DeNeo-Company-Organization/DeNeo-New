import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";

export function OnboardingWizard() {
  return (
    <form>
        <div className="grid w-full items-center gap-6">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contribution-type">Contribution Type</Label>
                <Select>
                    <SelectTrigger id="contribution-type" className="bg-background">
                        <SelectValue placeholder="Select contribution type" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-card">
                        <SelectItem value="proof-of-work">Proof-of-Work</SelectItem>
                        <SelectItem value="listing">First Listing</SelectItem>
                        <SelectItem value="welfare-report">Welfare Report</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title / Item Name</Label>
                <Input id="title" placeholder="e.g., Organic Corn Batch #A42" className="bg-background" />
            </div>
             <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description & Evidence</Label>
                <Textarea id="description" placeholder="Provide details and link to on-chain evidence..." className="bg-background" />
            </div>
             <Button className="w-full glow-on-hover bg-accent text-accent-foreground hover:bg-accent/90">
                Submit Contribution
            </Button>
        </div>
    </form>
  );
}
