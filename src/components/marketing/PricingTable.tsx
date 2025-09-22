// src/components/PricingTable.tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function PricingTable() {
    const router = useRouter();
    const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

    const price = billing === "monthly" ? "$5" : "$50";
    const subtitle = billing === "monthly" ? "per month" : "per year (Save $10)";

    const features = [
        "Unlimited invoices & clients",
        "Automatic numbering & due-date calculation",
        "Multi-currency support (10 currencies)",
        "PDF / Word / Image export",
        "Touch or file-upload signatures",
        "Notes, terms & discount handling",
    ];

    return (
        <section className="relative py-24 bg-gradient-to-b from-blue-50 via-white to-blue-50">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.08),transparent_70%)] pointer-events-none" />

            {/* Heading */}
            <div className="text-center mb-16 relative z-10">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">
                    Simple, Transparent Pricing
                </h2>
                <p className="text-gray-600 text-lg">
                    Start your 7-day free trial — no credit card required.
                </p>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-3 mb-14 relative z-10">
                <span
                    className={`transition-colors ${billing === "monthly" ? "font-semibold text-gray-800" : "text-gray-500"
                        }`}
                >
                    Monthly
                </span>
                <Switch
                    checked={billing === "yearly"}
                    onCheckedChange={(checked) => setBilling(checked ? "yearly" : "monthly")}
                />
                <span
                    className={`transition-colors flex items-center gap-1 ${billing === "yearly" ? "font-semibold text-gray-800" : "text-gray-500"
                        }`}
                >
                    Yearly{" "}
                    <span className="text-sm text-green-600 font-medium">(Save $10)</span>
                </span>
            </div>

            {/* Pricing Card */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative max-w-md mx-auto bg-white/80 backdrop-blur-xl border border-blue-100 rounded-3xl shadow-xl p-10 z-10 hover:shadow-2xl hover:scale-[1.02] transition-transform"
            >
                {billing === "yearly" && (
                    <span className="absolute -top-5 right-6 bg-gradient-to-r from-green-500 to-emerald-400 text-white text-xs px-4 py-1 rounded-full shadow-lg">
                        Best Value
                    </span>
                )}
                <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                    Freelancer Plan
                </h3>
                <div className="flex items-end justify-center mb-8">
                    <span className="text-6xl font-extrabold text-gray-900">{price}</span>
                    <span className="ml-2 text-lg text-gray-600">{subtitle}</span>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-10 text-gray-700">
                    {features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="text-blue-500 mt-1 w-5 h-5" />
                            <span>{f}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <Button
                    size="lg"
                    className="w-full px-6 py-4 text-lg rounded-2xl shadow-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:shadow-xl hover:scale-105 transition-transform"
                    onClick={() => router.push("/dashboard")}
                >
                    Start Free 7-Day Trial
                </Button>

                <p className="text-center mt-6 text-sm text-gray-500">
                    Cancel anytime — no hidden fees.
                </p>
            </motion.div>
        </section>
    );
}