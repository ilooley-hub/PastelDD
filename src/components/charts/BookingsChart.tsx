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
import { CHART_DATA_BOOKINGS } from "@/lib/fixtures"
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

export function BookingsChart() {
  return (
    <ReactChart
      type="bar"
      data={{
        labels: CHART_DATA_BOOKINGS.labels,
        datasets: [
          {
            type: "bar" as const,
            label: "Bookings $M",
            data: CHART_DATA_BOOKINGS.bookings,
            backgroundColor: CHART_SERIES.accent,
            yAxisID: "y",
            barThickness: 28,
            borderRadius: 4,
            order: 2,
          },
          {
            type: "line" as const,
            label: "Conversion %",
            data: CHART_DATA_BOOKINGS.conversion,
            borderColor: CHART_SERIES.red,
            backgroundColor: CHART_SERIES.red,
            pointBackgroundColor: CHART_SERIES.red,
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
              callback: (v) => `$${v}M`,
            },
            grid: { color: CHART_GRID },
            border: { color: CHART_BORDER },
          },
          y1: {
            position: "right",
            beginAtZero: true,
            max: 100,
            ticks: {
              color: CHART_TEXT,
              font: { size: 10, weight: 500 },
              callback: (v) => `${v}%`,
            },
            grid: { display: false },
            border: { color: CHART_BORDER },
          },
        },
      }}
    />
  )
}
