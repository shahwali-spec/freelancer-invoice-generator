"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cva, type VariantProps } from "class-variance-authority"

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
    {
        variants: {
            status: {
                Paid: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
                Unpaid: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
                Overdue: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
            },
        },
        defaultVariants: {
            status: "Unpaid",
        },
    }
)

interface StatusBadgeProps extends VariantProps<typeof badgeVariants> {
    status: "Paid" | "Unpaid" | "Overdue"
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className={cn(badgeVariants({ status }))}>
                        {status}
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="text-sm">
                        {status === "Paid"
                            ? "Invoice has been settled."
                            : status === "Unpaid"
                                ? "Invoice is pending payment."
                                : "Invoice payment is overdue."}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export { StatusBadge }
