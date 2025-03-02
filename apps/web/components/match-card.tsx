"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Clock, CheckCircle, XCircle, MessageSquare } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
// import { submitFeedback } from "@/lib/actions"

const statusIcons = {
  in_review: <Clock className="h-4 w-4" />,
  done: <CheckCircle className="h-4 w-4" />,
  canceled: <XCircle className="h-4 w-4" />,
}

const statusColors = {
  in_review: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  done: "bg-green-100 text-green-800 hover:bg-green-200",
  canceled: "bg-red-100 text-red-800 hover:bg-red-200",
}

export interface Match {
  candidateName: string;
  jobTitle: string;
  analysis: string;
  feedback?: string | null;
  status: "in_review" | "done" | "canceled";
  createdAt: string;
  id: string;
}

export default function MatchCard({ match }: { match: Match }) {
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)

  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) return

    setIsSubmitting(true)
    // await submitFeedback(match.id, feedback)
    setIsSubmitting(false)
    setShowFeedbackForm(false)
    setFeedback("")
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{match.candidateName}</CardTitle>
          <Badge variant="outline" className={`flex items-center gap-1 ${statusColors[match.status]}`}>
            {statusIcons[match.status]}
            {match.status.replace("_", " ")}
          </Badge>
        </div>
        <CardDescription>Match for: {match.jobTitle}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-1">Analysis</h3>
            <p className="text-sm text-muted-foreground">{match.analysis}</p>
          </div>

          {match.feedback && (
            <div>
              <h3 className="text-sm font-medium mb-1">Feedback</h3>
              <p className="text-sm text-muted-foreground">{match.feedback}</p>
            </div>
          )}

          {showFeedbackForm && match.status === "in_review" && (
            <div className="space-y-2">
              <Textarea
                placeholder="Enter your feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="resize-none"
                rows={3}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowFeedbackForm(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSubmitFeedback} disabled={isSubmitting || !feedback.trim()}>
                  Submit
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="w-full flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            Created {formatDistanceToNow(new Date(match.createdAt), { addSuffix: true })}
          </span>

          {match.status === "in_review" && !showFeedbackForm && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setShowFeedbackForm(true)}
            >
              <MessageSquare className="h-4 w-4" />
              Provide Feedback
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

