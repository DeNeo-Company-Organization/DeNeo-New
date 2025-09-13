import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const contributors = [
    { rank: 1, name: "Alice", value: "12,500 ETH", avatar: "A", color: "bg-amber-500" },
    { rank: 2, name: "Bob", value: "11,200 ETH", avatar: "B", color: "bg-slate-400" },
    { rank: 3, name: "Charlie", value: "9,800 ETH", avatar: "C", color: "bg-orange-600" },
    { rank: 4, name: "Diana", value: "8,500 ETH", avatar: "D" },
];

export function Leaderboard() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">Rank</TableHead>
                    <TableHead>Contributor</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {contributors.map(c => (
                    <TableRow key={c.rank}>
                        <TableCell className="font-medium text-lg">{c.rank}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                    {/* Placeholder for actual images */}
                                    <AvatarFallback className={c.color}>{c.avatar}</AvatarFallback>
                                </Avatar>
                                <span>{c.name}</span>
                            </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-accent">{c.value}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
