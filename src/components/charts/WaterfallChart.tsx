"use client"

import { Bar } from "react-chartjs-2"
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js"
import { CHART_DATA_WATERFALL } from "@/lib/fixtures"
import {
  CHART_TEXT,
  CHART_GRID,
  CHART_BORDER,
  CHART_SERIES,
} from "@/lib/chartConfig"

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip)

function buildBars() {
  const steps = CHART_DATA_WATERFALL.steps
  let running = 0
  const base: (number | null)[] = []
  const value: number[] = []
  const colors: string[] = []

  steps.forEach((s) => {
    if (s.kind === "total") {
      base.push(0)
      value.push(s.value)
      colors.push(CHART_SERIES.accent)
      running = s.value
    } else if (s.kind === "pos") {
      base.push(running)
      value.push(s.value)
      colors.push(CHART_SERIES.green)
      running += s.value
    } else {
      const next = running - s.value
      base.push(next)
      value.push(s.value)
      colors.push(CHART_SERIES.red)
      running = next
    }
  })

  return { base, value, colors }
}

export function WaterfallChart() {
  const { base, value, colors } = buildBars()
  return (
    <Bar
      data={{
        labels: CHART_DATA_WATERFALL.labels,
        datasets: [
          {
            label: "base",
            data: base,
            backgroundColor: "transparent",
            borderWidth: 0,
            stack: "wf",
          },
          {
            label: "value",
            data: value,
            backgroundColor: colors,
            borderWidth: 0,
            stack: "wf",
            barThickness: 24,
            borderRadius: 4,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#FFFFFF",
            borderColor: "#DEDBD2",
            borderWidth: 1,
            titleColor: "#14131C",
            bodyColor: "#4A4858",
            displayColors: false,
            cornerRadius: 6,
            filter: (item) => item.datasetIndex === 1,
            callbacks: {
              label: (ctx) => `$${(ctx.parsed.y as number).toFixed(2)}M`,
            },
          },
        },
        scales: {
          x: {
            stacked: true,
            ticks: {
              color: CHART_TEXT,
              font: { size: 10, weight: 500 },
              maxRotation: 0,
              autoSkip: false,
            },
            grid: { display: false },
            border: { color: CHART_BORDER },
          },
          y: {
            stacked: true,
            beginAtZero: true,
            ticks: {
              color: CHART_TEXT,
              font: { size: 10, weight: 500 },
              callback: (v) => `$${v}M`,
            },
            grid: { color: CHART_GRID },
            border: { color: CHART_BORDER },
          },
        },
      }}
    />
  )
}
