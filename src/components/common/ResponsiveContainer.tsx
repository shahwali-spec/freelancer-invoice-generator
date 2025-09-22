//src/components/common/ResponsiveContainer.tsx
"use client";
import React from "react";

export default function ResponsiveContainer({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="
        w-full 
        max-w-7xl     /* content ki max width large screens ke liye */
        mx-auto       /* center me align */
        px-4          /* mobile padding */
        sm:px-6       /* tablet padding */
        md:px-8       /* laptop padding */
        lg:px-12      /* desktop padding */
      "
        >
            {children}
        </div>
    );
}