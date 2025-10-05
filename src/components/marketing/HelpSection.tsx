//src/components/marketing/HelpSection.tsx

"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, MessageSquare, BookOpen } from "lucide-react";
import Link from "next/link";

export default function HelpSection() {
    return (
        <section
            id="help"
            className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
        >
            {/* ✨ Decorative shapes */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-100 rounded-full opacity-30 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-3xl" />
            </div>

            <div className="relative max-w-6xl mx-auto px-4 text-center">
                {/* ✨ Heading */}
                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Need Help?
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    className="text-lg md:text-xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Whether you're stuck generating an invoice or exploring features, our
                    help section guides you every step of the way.
                </motion.p>

                {/* ✨ Help Cards */}
                <div className="grid md:grid-cols-3 gap-10">
                    {[
                        {
                            icon: <HelpCircle className="w-10 h-10 text-blue-500 mx-auto mb-4" />,
                            title: "FAQs",
                            text: "Find quick answers to the most common questions.",
                            href: "/faqs",
                            linkText: "View FAQs →",
                            color: "text-blue-600 hover:text-blue-800",
                        },
                        {
                            icon: <BookOpen className="w-10 h-10 text-green-500 mx-auto mb-4" />,
                            title: "Documentation",
                            text: "Step-by-step guides on using every feature efficiently.",
                            href: "/docs",
                            linkText: "Open Docs →",
                            color: "text-green-600 hover:text-green-800",
                        },
                        {
                            icon: <MessageSquare className="w-10 h-10 text-purple-500 mx-auto mb-4" />,
                            title: "Support",
                            text: "Still need help? Reach out to us for personalized assistance.",
                            href: "mailto:support@yourdomain.com",
                            linkText: "Contact Support →",
                            color: "text-purple-600 hover:text-purple-800",
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{
                                y: -8,
                                scale: 1.02,
                                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                            }}
                            className="transition-all duration-300"
                        >
                            <Card className="shadow-md rounded-2xl border border-gray-100 hover:border-indigo-200 bg-white/70 backdrop-blur-sm">
                                <CardContent className="p-8">
                                    {item.icon}
                                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                    <p className="text-gray-600 mb-4">{item.text}</p>
                                    <Link
                                        href={item.href}
                                        className={`${item.color} font-medium transition-colors`}
                                    >
                                        {item.linkText}
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}