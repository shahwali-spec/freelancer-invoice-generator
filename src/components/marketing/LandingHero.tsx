// src/components/LandingHero.tsx
"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LandingHero() {
    const router = useRouter();

    return (
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-24 px-6 text-center overflow-hidden">
            {/* Decorative blurred shapes */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-100 rounded-full opacity-40 blur-3xl" />
                <div className="absolute -bottom-28 -right-20 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-3xl" />
            </div>

            <motion.div
                className="relative max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Gradient Headline */}
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Freelance Invoicing, Reimagined.
                </h1>

                {/* Sub-heading */}
                <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
                    Create, preview, and send beautiful invoices in minutes—multi-currency
                    support, automatic calculations, and export to PDF, Word, or Image.
                </p>

                {/* Mini Features */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-12 text-sm text-gray-600"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
                    }}
                >
                    {[
                        "✔ Upload Freelancer & Client Logos",
                        "✔ Automated Discounts, Taxes & Totals",
                        "✔ Touch or File Upload Signatures",
                    ].map((feature) => (
                        <motion.span
                            key={feature}
                            className="bg-white border rounded-full px-4 py-1 shadow-sm hover:shadow-md transition-shadow"
                            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                        >
                            {feature}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Call-to-actions */}
                <div className="flex justify-center gap-5">
                    <Button
                        size="lg"
                        className="px-8 py-3 text-lg rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-transform"
                        onClick={() => router.push("/pricing")}
                    >
                        Start Free 7-Day Trial
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="px-8 py-3 text-lg rounded-2xl border-gray-300 hover:bg-gray-50 hover:scale-105 transition-transform"
                        onClick={() => router.push("/upgrade")}
                    >
                        View Demo
                    </Button>
                </div>

                {/* Preview Image with hover effect */}
                {/* <motion.div
                    className="mt-20"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    <img
                        src="/invoice-preview.png"
                        alt="Invoice Preview"
                        className="mx-auto rounded-xl border shadow-xl max-w-full md:max-w-3xl hover:shadow-2xl transition-shadow"
                    />
                </motion.div> */}

                {/* Scroll hint */}
                <div className="mt-12 flex justify-center animate-bounce text-gray-400 text-sm">
                    ↓ Scroll to explore features
                </div>
            </motion.div>
        </section>
    );
}