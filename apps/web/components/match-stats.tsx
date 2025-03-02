import { Match } from "./match-card"

export function MatchStats({ matches }: { matches: Match[] }) {
    const totalMatches = matches.length
    const inReviewMatches = matches.filter((match) => match.status === "in_review").length
    const doneMatches = matches.filter((match) => match.status === "done").length
    const canceledMatches = matches.filter((match) => match.status === "canceled").length
  
    return (
      <div className="flex flex-wrap gap-4">
        <div className="bg-background border rounded-md px-4 py-2">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-2xl font-bold">{totalMatches}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-md px-4 py-2">
          <p className="text-sm text-yellow-800">In Review</p>
          <p className="text-2xl font-bold text-yellow-800">{inReviewMatches}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-md px-4 py-2">
          <p className="text-sm text-green-800">Done</p>
          <p className="text-2xl font-bold text-green-800">{doneMatches}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-md px-4 py-2">
          <p className="text-sm text-red-800">Canceled</p>
          <p className="text-2xl font-bold text-red-800">{canceledMatches}</p>
        </div>
      </div>
    )
  }
  
  