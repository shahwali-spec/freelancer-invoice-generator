// src/components/ui/Navbar.tsx
"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ResponsiveContainer from "@/components/common/ResponsiveContainer"; // ✅ import added

interface NavbarProps {
    logo?: React.ReactNode;
    title?: string;
    subtitle?: string;
    actions?: React.ReactNode; // right-side actions passed from parent
    className?: string;
}

export function Navbar({
    logo,
    title,
    subtitle,
    actions,
    className,
}: NavbarProps) {
    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur",
                className
            )}
        >
            <ResponsiveContainer> {/* ✅ wrapped everything in ResponsiveContainer */}
                <div className="flex items-center justify-between py-3">
                    <Link href="/" className="flex items-center gap-3">
                        {logo}
                        <div>
                            {title && (
                                <h1 className="font-semibold tracking-tight">{title}</h1>
                            )}
                            {subtitle && (
                                <p className="text-xs text-muted-foreground">{subtitle}</p>
                            )}
                        </div>
                    </Link>
                    <div className="flex items-center gap-2">{actions}</div>
                </div>
            </ResponsiveContainer>
        </header>
    );
}