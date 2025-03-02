import { getMatches } from "@/lib/data"
import MatchCard from "./match-card"
import { StatusFilter } from "./status-filter"
import { MatchStats } from "./match-stats"
import { Match } from "./match-card"

export default async function MatchDashboard() {
    const matches = await getMatches() as Match[];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <MatchStats matches={matches} />
        <StatusFilter />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  )
}

