// components/auth/ProtectedClient.tsx
"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function ProtectedClient({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useUser();

  // Loading state
  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">Loading…</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}

      {!isSignedIn && (
        <div className="mt-6 p-4 border rounded-xl bg-muted/40 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            🔒 Sign in to save invoices, access your history, and manage payment methods.
          </p>
          <Link href="/sign-in" className={buttonVariants({ size: "sm" })}>
            Sign in
          </Link>
        </div>
      )}
    </motion.div>
  );
}