"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function AppNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
    >
      <Navbar
        logo={
          <motion.div
            whileHover={{ rotate: 10 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold shadow-md"
          >
            FI
          </motion.div>
        }
        title="Freelancer Invoice Generator"
        subtitle="Create · Export · Send"
        actions={
          <>
            {/* ✅ Desktop actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/dashboard"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/invoices"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                Invoices
              </Link>
              <Link
                href="/dashboard/settings"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                Settings
              </Link>

              {/* 🔑 Auth Condition */}
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <Link
                  href="/sign-in"
                  className={cn(buttonVariants({ variant: "default", size: "sm" }))}
                >
                  Login
                </Link>
              </SignedOut>
            </div>

            {/* 📱 Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2 rounded-md border border-gray-300"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </>
        }
      />

      {/* 📱 Mobile sidebar */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileOpen(false)}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg flex flex-col p-5"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="self-end mb-6 p-2 rounded-md border border-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col gap-3">
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/invoices"
                onClick={() => setMobileOpen(false)}
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                Invoices
              </Link>
              <Link
                href="/dashboard/settings"
                onClick={() => setMobileOpen(false)}
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                Settings
              </Link>

              {/* 🔑 Auth Condition for Mobile */}
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <Link
                  href="/sign-in"
                  onClick={() => setMobileOpen(false)}
                  className={cn(buttonVariants({ variant: "default", size: "sm" }))}
                >
                  Login
                </Link>
              </SignedOut>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}