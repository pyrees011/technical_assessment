"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check, Filter } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function StatusFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentStatus = searchParams.get("status") || "all"

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams)
    if (status === "all") {
      params.delete("status")
    } else {
      params.set("status", status)
    }
    router.push(`/?${params.toString()}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter by Status
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={currentStatus} onValueChange={handleStatusChange}>
          <DropdownMenuRadioItem value="all">
            All
            {currentStatus === "all" && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="in_review">
            In Review
            {currentStatus === "in_review" && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="done">
            Done
            {currentStatus === "done" && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="canceled">
            Canceled
            {currentStatus === "canceled" && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

