// TODO: Replace with actual API calls
export async function getMatches(statusFilter?: string) {
    // Mock API call
    // TODO: clean it
    await new Promise((resolve) => setTimeout(resolve, 500))
  
    const matches = generateMockMatches()
  
    if (statusFilter && statusFilter !== "all") {
      return matches.filter((match) => match.status === statusFilter)
    }
  
    return matches
  }
  
  function generateMockMatches() {
    const statuses = ["in_review", "done", "canceled"]
    const jobTitle = "Customer Support @Doctolib"
  
    return Array.from({ length: 12 }, (_, i) => {
      const createdAt = new Date()
      createdAt.setMinutes(createdAt.getMinutes() - Math.floor(Math.random() * 60))
  
      const status = i < 4 ? "in_review" : statuses[Math.floor(Math.random() * statuses.length)]
  
      return {
        id: `match-${i + 1}`,
        candidateName: `Candidate ${i + 1}`,
        jobTitle,
        analysis: `This candidate has ${Math.floor(Math.random() * 8) + 2} years of experience in customer support roles. They have worked with healthcare systems before and demonstrate strong communication skills. Their technical knowledge is ${["excellent", "good", "average"][Math.floor(Math.random() * 3)]}.`,
        status,
        createdAt: createdAt.toISOString(),
        feedback:
          status === "done"
            ? `This candidate seems ${["promising", "like a good fit", "qualified but not ideal"][Math.floor(Math.random() * 3)]} for the role.`
            : null,
      }
    })
  }
  
  