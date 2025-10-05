"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer
            aria-label="Site Footer"
            className="relative bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 py-16"
        >
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                {/* Top Section */}
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold shadow-md">
                                FI
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Freelancer Invoice Generator
                            </h3>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Create and send professional invoices — free, fast, and unlimited.
                            Simple tools for freelancers who value time.
                        </p>
                        <p className="text-xs text-gray-500 mt-3">
                            Built with ❤️ by Freelancer Tools — No ads, no tracking.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="hover:text-indigo-600 transition">Home</Link></li>
                            <li><Link href="/#features" className="hover:text-indigo-600 transition">Features</Link></li>
                            <li><Link href="/#about" className="hover:text-indigo-600 transition">About</Link></li>
                            <li><Link href="/#help" className="hover:text-indigo-600 transition">Help</Link></li>
                            <li><Link href="/dashboard" className="hover:text-indigo-600 transition">Dashboard</Link></li>
                        </ul>
                    </motion.div>

                    {/* Legal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/privacy-policy" className="hover:text-indigo-600 transition">Privacy Policy</Link></li>
                            <li><Link href="/terms-and-conditions" className="hover:text-indigo-600 transition">Terms & Conditions</Link></li>
                            <li><Link href="/cookie-policy" className="hover:text-indigo-600 transition">Cookie Policy</Link></li>
                        </ul>
                    </motion.div>

                    {/* Contact & Socials */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a
                                    href="mailto:support@yourdomain.com"
                                    className="flex items-center gap-2 hover:text-indigo-600 transition"
                                >
                                    <Mail className="w-4 h-4" /> support@yourdomain.com
                                </a>
                            </li>
                        </ul>

                        {/* Social Icons */}
                        <div className="flex items-center gap-5 mt-5">
                            {/* X (Twitter) */}
                            <motion.a
                                href="https://x.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="X (Twitter)"
                                whileHover={{ scale: 1.15 }}
                                className="hover:text-indigo-600 transition"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M18.244 2H21.5l-7.3 8.34L22 22h-6.243l-4.874-6.47L5.383 22H2.124l7.79-8.9L2 2h6.392l4.382 5.987L18.244 2zM17.16 19h1.64L8.04 4.874H6.3L17.16 19z" />
                                </svg>
                            </motion.a>

                            {/* LinkedIn */}
                            <motion.a
                                href="https://linkedin.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                whileHover={{ scale: 1.15 }}
                                className="hover:text-indigo-600 transition"
                            >
                                <Linkedin className="w-6 h-6" />
                            </motion.a>

                            {/* Facebook */}
                            <motion.a
                                href="https://facebook.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                whileHover={{ scale: 1.15 }}
                                className="hover:text-indigo-600 transition"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.03H8.08v-2.9h2.36V9.41c0-2.33 1.4-3.62 3.52-3.62 1.02 0 2.08.18 2.08.18v2.3h-1.17c-1.15 0-1.5.72-1.5 1.46v1.75h2.56l-.41 2.9h-2.15v7.03C18.34 21.2 22 17.06 22 12.07z" />
                                </svg>
                            </motion.a>

                            {/* YouTube */}
                            <motion.a
                                href="https://youtube.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                                whileHover={{ scale: 1.15 }}
                                className="hover:text-indigo-600 transition"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M21.8 8.001a2.7 2.7 0 0 0-1.9-1.9C18.2 6 12 6 12 6s-6.2 0-7.9.1a2.7 2.7 0 0 0-1.9 1.9A28.2 28.2 0 0 0 2 12a28.2 28.2 0 0 0 .2 3.999 2.7 2.7 0 0 0 1.9 1.9C5.8 18 12 18 12 18s6.2 0 7.9-.1a2.7 2.7 0 0 0 1.9-1.9A28.2 28.2 0 0 0 22 12a28.2 28.2 0 0 0-.2-3.999zM10 14.7V9.3l4.7 2.7L10 14.7z" />
                                </svg>
                            </motion.a>
                        </div>
                    </motion.div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 pt-6 text-center">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Freelancer Invoice Generator. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}