"use client"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoaderProps {
    size?: number
    className?: string
    label?: string
}

export function Loader({ size = 24, className, label }: LoaderProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <Loader2
                className={cn("text-primary animate-spin", className)}
                size={size}
                strokeWidth={2.5}
            />
            {label && (
                <span
                    className="text-sm text-muted-foreground transition-opacity duration-300 opacity-100"
                >
                    {label}
                </span>
            )}
        </div>
    )
}