// src/app/cookie-policy/page.tsx

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cookie Policy | YourSiteName",
    description: "Learn about how we use cookies on YourSiteName.",
};

export default function CookiePolicyPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

            <p className="mb-4">
                As of now, our website does <strong>not use any cookies</strong>, including session cookies, tracking cookies, or third-party cookies. We do not store any personal data in your browser.
            </p>

            <p className="mb-4">
                In the future, we may implement third-party services such as Google AdSense to display ads. These services may use cookies and similar technologies to personalize ads and analyze traffic.
            </p>

            <p className="mb-4">
                When such features are added, this Cookie Policy will be updated accordingly to reflect the nature and purpose of any cookies being used, and to provide you with choices regarding their usage.
            </p>

            <p className="mb-4">
                For any questions regarding this Cookie Policy, you can contact us at:{" "}
                <a href="mailto:contact@yoursite.com" className="text-blue-600 underline">
                    contact@yoursite.com
                </a>
            </p>

            <p className="text-sm text-gray-500">
                Last updated: October 4, 2025
            </p>
        </main>
    );
}
