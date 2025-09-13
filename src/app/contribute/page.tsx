import { TierProgression } from "@/components/contribute/tier-progression";
import { OnboardingWizard } from "@/components/contribute/onboarding-wizard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Award, Zap } from "lucide-react";

const benefits = [
    "Increased token rewards",
    "Access to exclusive marketplace items",
    "Governance voting rights",
    "Priority support",
    "Early access to new features",
    "Direct line to development team"
];

const missions = [
    { title: "Plant 5 Trees", reward: "Bonus Tokens", icon: Zap },
    { title: "Report 2 Hazards", reward: "Community Badge", icon: Award },
    { title: "Verify a Farm", reward: "Reputation Points", icon: Zap },
]

export default function ContributePage() {
    return (
        <div className="container mx-auto py-12">
            <div className="text-center mb-12">
                <h1 className="font-headline text-4xl font-bold">Contributor Portal</h1>
                <p className="mt-2 text-lg text-muted-foreground">Grow with the ecosystem and unlock new benefits.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                    <Card className="bg-card/50 border-border/50 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl text-accent">Tier Progression</CardTitle>
                            <CardDescription>Advance through tiers by contributing value to the network.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TierProgression />
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-border/50 shadow-lg mt-8">
                        <CardHeader>
                            <CardTitle className="text-2xl text-accent">Contributor Benefits</CardTitle>
                             <CardDescription>Benefits unlocked at higher tiers.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-center">
                                        <CheckCircle className="h-5 w-5 mr-3 text-accent" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                     <Card className="bg-card/50 border-border/50 shadow-lg mt-8">
                        <CardHeader>
                            <CardTitle className="text-2xl text-accent">Community Missions</CardTitle>
                             <CardDescription>Complete quests to earn rewards and build your reputation.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="space-y-4">
                                {missions.map((mission, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <mission.icon className="text-accent"/>
                                            <span className="font-medium">{mission.title}</span>
                                        </div>
                                        <span className="font-bold text-sm text-accent">{mission.reward}</span>
                                </div>
                                ))}
                           </div>
                        </CardContent>
                    </Card>
                </div>
                 <div>
                    <Card className="bg-card/50 border-border/50 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl text-accent">Become a Contributor</CardTitle>
                            <CardDescription>Start your journey by making your first on-chain contribution.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <OnboardingWizard />
                        </CardContent>
                    </Card>
                 </div>
            </div>
        </div>
    );
}
