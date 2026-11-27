// demo.tsx
// (Teoripro: the component's own demo, kept as it came; web with Tailwind only. The app draws the chart with React
// Native: src/ui/trend-chart.tsx.)
import { MiniChart } from "@/components/ui/mini-chart"

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-8 w-full">
      <MiniChart />
    </main>
  )
}
