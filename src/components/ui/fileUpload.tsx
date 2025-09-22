"use client"
import * as React from "react"
import { Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface FileUploadProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string
    tooltip?: string
    fileName?: string | null
    onClear?: () => void
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
    ({ className, label = "Upload file", tooltip, fileName, onClear, ...props }, ref) => {
        const inputEl = (
            <label
                className={cn(
                    "flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-muted-foreground/40 bg-background px-6 py-8 text-center transition hover:border-primary hover:bg-accent",
                    className
                )}
            >
                <Upload className="h-6 w-6 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                    {label}
                </span>
                <input
                    type="file"
                    ref={ref}
                    className="hidden"
                    {...props}
                />
            </label>
        )

        return (
            <div className="flex flex-col gap-2">
                {tooltip ? (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>{inputEl}</TooltipTrigger>
                            <TooltipContent>{tooltip}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ) : (
                    inputEl
                )}

                {fileName && (
                    <div className="flex items-center justify-between rounded-md border bg-muted/40 px-3 py-2 text-sm">
                        <span className="truncate">{fileName}</span>
                        {onClear && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClear}
                                className="h-6 w-6"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                )}
            </div>
        )
    }
)

FileUpload.displayName = "FileUpload"
export { FileUpload }