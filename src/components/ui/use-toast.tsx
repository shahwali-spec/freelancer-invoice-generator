// src/components/ui/use-toast.tsx
"use client"

import * as React from "react"
import { toast as sonnerToast } from "sonner"
import { type VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

const toastVariants = cva("", {
    variants: {
        variant: {
            default: "",
            destructive: "bg-red-500 text-white",
        },
    },
    defaultVariants: {
        variant: "default",
    },
})

export type ToastOptions = {
    title?: string
    description?: string
    action?: React.ReactNode
} & VariantProps<typeof toastVariants>

export function useToast() {
    const toast = React.useCallback(
        ({ title, description, action, variant }: ToastOptions) => {
            sonnerToast.custom((id) => (
                <div
                    className={`rounded-lg border p-4 shadow-md ${toastVariants({ variant })}`}
                >
                    {title && <div className="font-medium">{title}</div>}
                    {description && <div className="text-sm text-muted-foreground">{description}</div>}
                    {action && <div className="mt-2">{action}</div>}
                </div>
            ))
        },
        []
    )

    return { toast }
}
