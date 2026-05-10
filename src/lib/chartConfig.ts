// Shared Chart.js defaults — light theme, halo-aligned palette.
import type { ChartOptions } from "chart.js"

export const CHART_TEXT = "#76737F" // fg-3
export const CHART_GRID = "#ECEAE3" // border-hair
export const CHART_BORDER = "#DEDBD2" // border

// Series palette — pulled from the halo + accent so charts feel like brand,
// not random Chart.js defaults.
export const CHART_SERIES = {
  accent: "#7B5BD6", // accent — primary series
  green: "#1F8A5B", // RAG green — positives
  red: "#C8333A", // RAG red — deductions / negatives
  amber: "#B5781A", // RAG amber — warnings
  sky: "#50C7FA", // halo sky
  lavender: "#C4A7E7", // halo lavender
  peach: "#FFD3B0", // halo peach
}

export const baseChartOptions: ChartOptions<"bar" | "line"> = {
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
      titleFont: { family: "var(--font-sans)", size: 12, weight: 600 },
      bodyFont: { family: "var(--font-sans)", size: 11 },
      padding: 10,
      displayColors: false,
      cornerRadius: 6,
    },
  },
  scales: {
    x: {
      ticks: { color: CHART_TEXT, font: { size: 10, weight: 500 } },
      grid: { color: CHART_GRID },
      border: { color: CHART_BORDER },
    },
    y: {
      ticks: { color: CHART_TEXT, font: { size: 10, weight: 500 } },
      grid: { color: CHART_GRID },
      border: { color: CHART_BORDER },
    },
  },
}
