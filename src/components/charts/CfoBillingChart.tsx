"use client"

import { Chart as ReactChart } from "react-chartjs-2"
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  BarController,
  Tooltip,
} from "chart.js"
import { CFO_BILLING_CHART } from "@/lib/fixtures"
import {
  CHART_TEXT,
  CHART_GRID,
  CHART_BORDER,
  CHART_SERIES,
} from "@/lib/chartConfig"

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  BarController,
  Tooltip
)

export function CfoBillingChart() {
  return (
    <ReactChart
      type="bar"
      data={{
        labels: CFO_BILLING_CHART.labels,
        datasets: [
          {
            type: "bar" as const,
            label: "Billed (ILS)",
            data: CFO_BILLING_CHART.billed,
            backgroundColor: CHART_SERIES.accent,
            yAxisID: "y",
            barThickness: 24,
            borderRadius: 4,
            order: 2,
          },
          {
            type: "line" as const,
            label: "Hours",
            data: CFO_BILLING_CHART.hours,
            borderColor: CHART_SERIES.green,
            backgroundColor: CHART_SERIES.green,
            pointBackgroundColor: CHART_SERIES.green,
            pointRadius: 3.5,
            borderWidth: 1.75,
            yAxisID: "y1",
            tension: 0.25,
            order: 1,
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
            position: "left",
            beginAtZero: true,
            ticks: {
              color: CHART_TEXT,
              font: { size: 10, weight: 500 },
              callback: (v) => `₪${Math.round(Number(v) / 1000)}k`,
            },
            grid: { color: CHART_GRID },
            border: { color: CHART_BORDER },
          },
          y1: {
            position: "right",
            beginAtZero: true,
            ticks: {
              color: CHART_TEXT,
              font: { size: 10, weight: 500 },
              callback: (v) => `${v}h`,
            },
            grid: { display: false },
            border: { color: CHART_BORDER },
          },
        },
      }}
    />
  )
}
