"use client"

import { Line } from "react-chartjs-2"
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  Filler,
  Tooltip,
} from "chart.js"
import { CFO_HEADCOUNT } from "@/lib/fixtures"
import {
  CHART_TEXT,
  CHART_GRID,
  CHART_BORDER,
  CHART_SERIES,
} from "@/lib/chartConfig"

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  Filler,
  Tooltip
)

export function HeadcountChart() {
  return (
    <Line
      data={{
        labels: CFO_HEADCOUNT.labels,
        datasets: [
          {
            data: CFO_HEADCOUNT.active,
            borderColor: CHART_SERIES.accent,
            backgroundColor: "rgba(123,91,214,0.08)",
            pointBackgroundColor: CHART_SERIES.accent,
            pointRadius: 3.5,
            borderWidth: 1.75,
            tension: 0.3,
            fill: true,
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
          },
        },
        scales: {
          x: {
            ticks: { color: CHART_TEXT, font: { size: 10, weight: 500 } },
            grid: { display: false },
            border: { color: CHART_BORDER },
          },
          y: {
            min: 0,
            max: 7,
            ticks: {
              color: CHART_TEXT,
              font: { size: 10, weight: 500 },
              stepSize: 1,
            },
            grid: { color: CHART_GRID },
            border: { color: CHART_BORDER },
          },
        },
      }}
    />
  )
}
