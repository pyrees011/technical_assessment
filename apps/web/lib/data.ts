// TODO: Replace with actual API calls

import { Match } from "@/components/match-card"

const apiBaseUrl = "http://localhost:3001/api/v1"

export async function getMatches(statusFilter?: string) {
    // Mock API call
    // TODO: clean it
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
    // Mock API call
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
  
  // function generateMockMatches() {
  //   const statuses = ["in_review", "done", "canceled"]
  //   const jobTitle = "Customer Support @Doctolib"
  
  //   return Array.from({ length: 12 }, (_, i) => {
  //     const createdAt = new Date()
  //     createdAt.setMinutes(createdAt.getMinutes() - Math.floor(Math.random() * 60))
  
  //     const status = i < 4 ? "in_review" : statuses[Math.floor(Math.random() * statuses.length)]
  
  //     return {
  //       id: `match-${i + 1}`,
  //       candidateName: `Candidate ${i + 1}`,
  //       jobTitle,
  //       analysis: `This candidate has ${Math.floor(Math.random() * 8) + 2} years of experience in customer support roles. They have worked with healthcare systems before and demonstrate strong communication skills. Their technical knowledge is ${["excellent", "good", "average"][Math.floor(Math.random() * 3)]}.`,
  //       status,
  //       createdAt: createdAt.toISOString(),
  //       feedback:
  //         status === "done"
  //           ? `This candidate seems ${["promising", "like a good fit", "qualified but not ideal"][Math.floor(Math.random() * 3)]} for the role.`
  //           : null,
  //     }
  //   })
  // }
  
  