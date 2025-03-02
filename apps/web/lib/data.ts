import { Match } from "@/components/match-card"

const apiBaseUrl = "http://localhost:3001/api/v1"

export async function getMatches(statusFilter?: string) {
    try {
      const response = await fetch(`${apiBaseUrl}/matches`)
      const matches = await response.json()
    
      if (statusFilter && statusFilter !== "all") {
        return matches.filter((match: Match) => match.status === statusFilter)
      }
    
      return matches
    } catch (error) {
      console.error("Failed to fetch matches", error)
      return []
    }
  }

export async function submitFeedback(matchId: string, feedback: string) {
    try {
      const response = await fetch(`${apiBaseUrl}/feedback/${matchId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback }),
      })
    
      return response.ok
    } catch (error) {
      console.error("Failed to submit feedback", error)
      return false
    }
  }
  
  