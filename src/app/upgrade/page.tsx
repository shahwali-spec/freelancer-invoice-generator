// src/app/upgrade/page.tsx
import React from "react";
import Link from "next/link";
import { JSX } from "react/jsx-runtime";
// import PaddleButton from "@/components/billing/PaddleButton"; // ← اگر آپ کا path مختلف ہے تو یہاں بدل دیں

export const metadata = {
    title: "Upgrade — Freelancer Invoice Generator",
    description: "Choose a plan and unlock unlimited invoices, exports and premium features.",
};

export default function UpgradePage(): JSX.Element {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4 py-16">
            <div className="w-full max-w-3xl">
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <header className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Upgrade to Freelancer Plan</h1>
                        <p className="text-gray-600 mt-2">
                            Start with a 7-day free trial. Cancel anytime. Monthly and yearly billing supported.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Monthly Plan */}
                        <div className="border rounded-2xl p-6 flex flex-col justify-between">
                            <div>
                                <div className="text-sm text-gray-500">Monthly</div>
                                <div className="text-4xl font-extrabold text-gray-900 mt-2">
                                    $5<span className="text-lg font-medium text-gray-600">/mo</span>
                                </div>
                                <p className="text-gray-600 mt-3">
                                    Perfect if you want month-to-month flexibility. 7-day free trial included.
                                </p>
                                <ul className="mt-4 text-sm text-gray-600 space-y-2">
                                    <li>✔ Unlimited invoices & clients</li>
                                    <li>✔ Export: PDF / Word / Image</li>
                                    <li>✔ Multi-currency & automatic totals</li>
                                </ul>
                            </div>
                            <div className="mt-6">
                                {/* Paddle checkout button */}
                                {/* <PaddleButton
                                    productId="pro_01k5g814vda6579wscy6tfehsh"
                                    priceId="pri_01k5gt6gjxbq8yesykz4ntxa8f"
                                    label="Buy Freelancer Invoice Generator — $5/mo"
                                    className="w-full"
                                /> */}
                            </div>
                        </div>

                        {/* Yearly Plan */}
                        <div className="border rounded-2xl p-6 flex flex-col justify-between transform md:translate-y-4">
                            <div>
                                <div className="text-sm text-gray-500">Yearly (Save $10)</div>
                                <div className="text-4xl font-extrabold text-gray-900 mt-2">
                                    $50<span className="text-lg font-medium text-gray-600">/yr</span>
                                </div>
                                <p className="text-gray-600 mt-3">
                                    Best value — pay once and save compared to monthly billing.
                                </p>
                                <ul className="mt-4 text-sm text-gray-600 space-y-2">
                                    <li>✔ Everything in monthly</li>
                                    <li>✔ Annual discount</li>
                                    <li>✔ Priority support (future)</li>
                                </ul>
                            </div>
                            <div className="mt-6">
                                {/* <PaddleButton
                                    productId="pro_01k5g814vda6579wscy6tfehsh"
                                    priceId="pri_01k5gt6gjxbq8yesykz4ntxa8f"
                                    label="Buy Freelancer Invoice Generator — $50/yr"
                                    className="w-full"
                                /> */}
                            </div>
                        </div>
                    </div>

                    <footer className="mt-6 text-center">
                        <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-800">
                            ← Back to Pricing
                        </Link>
                    </footer>
                </div>
            </div>
        </main>
    );
}