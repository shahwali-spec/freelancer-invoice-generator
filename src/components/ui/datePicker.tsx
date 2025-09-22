"use client"
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function DatePicker({ tooltip }: { tooltip?: string }) {
  const [date, setDate] = React.useState<Date>()

  const triggerEl = (
    <Button
      variant="outline"
      className={cn(
        "w-[240px] justify-start text-left font-normal rounded-lg",
        !date && "text-muted-foreground"
      )}
    >
      <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
      {date ? format(date, "PPP") : <span>Pick a date</span>}
    </Button>
  )

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          {tooltip ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>{triggerEl}</TooltipTrigger>
                <TooltipContent side="top">{tooltip}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            triggerEl
          )}
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 rounded-lg shadow-lg border"
          align="start"
        >
          <DayPicker
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}