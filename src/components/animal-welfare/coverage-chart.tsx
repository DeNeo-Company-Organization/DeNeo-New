"use client"

import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { name: "Covered", value: 78, fill: "var(--color-covered)" },
  { name: "Not Covered", value: 22, fill: "var(--color-not-covered)" },
]

const chartConfig = {
  covered: {
    label: "Covered",
    color: "hsl(var(--accent))",
  },
  "not-covered": {
    label: "Not Covered",
    color: "hsl(var(--muted))",
  },
} satisfies ChartConfig

export function CoverageChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[150px]"
    >
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={75}
            startAngle={90}
            endAngle={450}
            cy="50%"
            cornerRadius={50}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
           <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-2xl font-bold"
          >
            {chartData[0].value.toFixed(0)}%
          </text>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
