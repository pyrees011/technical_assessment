import { Suspense } from "react"
import MatchDashboard from "@/components/match-dashboard"
import { DashboardSkeleton } from "@/components/skeletons"

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Recruiter Feedback Dashboard</h1>
      <Suspense fallback={<DashboardSkeleton />}>
        <MatchDashboard />
      </Suspense>
    </main>
  )
}

