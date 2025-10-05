"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function LandingNavbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { href: "#features", label: "Features" },
        { href: "#about", label: "About Us" },
        { href: "#help", label: "Help" }, // ✅ Contact → Help
    ];

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm"
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
                subtitle="Create and send professional invoices online — free, fast, and unlimited."
                actions={
                    <>
                        {/* ✅ Desktop actions */}
                        <div className="hidden md:flex items-center gap-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        buttonVariants({ variant: "ghost", size: "sm" }),
                                        "relative group",
                                        pathname === link.href
                                            ? "text-indigo-600 font-semibold"
                                            : ""
                                    )}
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                            <Link
                                href="/dashboard"
                                onClick={() => setMobileOpen(false)}
                                className={cn(buttonVariants({ variant: "default", size: "sm" }))}
                            >
                                Get Started
                            </Link>
                            <Link
                                href="/sign-in"
                                onClick={() => setMobileOpen(false)}
                                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                            >
                                Login
                            </Link>
                        </div>

                        {/* ✅ Mobile Menu */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="p-2 rounded-md text-gray-700 hover:text-indigo-600"
                            >
                                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                        {mobileOpen && (
                            <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-3 py-4 md:hidden">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={cn(
                                            buttonVariants({ variant: "ghost", size: "sm" }),
                                            pathname === link.href
                                                ? "text-indigo-600 font-semibold"
                                                : ""
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Link
                                    href="/dashboard"
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(buttonVariants({ variant: "default", size: "sm" }))}
                                >
                                    Get Started
                                </Link>
                                <Link
                                    href="/sign-in"
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                    </>
                }
            />
        </motion.div>
    );
}