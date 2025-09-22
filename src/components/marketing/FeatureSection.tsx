// components/marketing/FeatureSection.tsx
import { FC } from "react";
import { CheckCircle } from "lucide-react";

interface FeatureItem {
    title: string;
    description: string;
}

interface FeatureGroup {
    group: string;
    items: FeatureItem[];
}

const featureGroups: FeatureGroup[] = [
    {
        group: "Freelancer Info",
        items: [
            { title: "Name & Email", description: "Freelancer can enter their name and email address." },
            { title: "Website, Phone & Tax ID", description: "Add website link, phone number, and tax ID easily." },
            { title: "Address & Logo", description: "Upload address details and your company logo." },
            { title: "Company Name", description: "Include freelancer's own company name if applicable." },
        ],
    },
    {
        group: "Client Info",
        items: [
            { title: "Client & Company", description: "Include client's name and their company name." },
            { title: "Contact Details", description: "Client's email, website, phone number, and logo." },
            { title: "IDs", description: "Add client’s tax or identification IDs if needed." },
        ],
    },
    {
        group: "Invoice Details",
        items: [
            { title: "Auto Invoice Number", description: "Automatically generate invoice numbers or edit manually." },
            { title: "Invoice & Due Date", description: "Auto-calculate due dates (7, 15, or 30 days)." },
            { title: "Multi-Currency Support", description: "Supports 10 currencies including USD, EUR, PKR, GBP, AUD, CAD, INR, PHP, BRL, and UAH." },
        ],
    },
    {
        group: "Line Items",
        items: [
            { title: "Milestone & Fixed Price Projects", description: "Add milestone-based or fixed-price projects." },
            { title: "Hourly Services", description: "Track hourly rate projects with price, description, and payment status." },
        ],
    },
    {
        group: "Totals & Taxes",
        items: [
            { title: "Discount Options", description: "Apply discounts as fixed amounts or percentages." },
            { title: "Extra Charges & Paid Amount", description: "Include extra charges and already paid amounts." },
        ],
    },
    {
        group: "Notes & Attachments",
        items: [
            { title: "Notes & Terms", description: "Add custom notes and payment terms for the invoice." },
            { title: "Signature", description: "Sign invoices directly using a mouse or touch input." },
            { title: "File Upload", description: "Attach relevant files to the invoice for reference." },
        ],
    },
    {
        group: "Export & Future Features",
        items: [
            { title: "Export Options", description: "Export invoices as PDF, Word, or image files." },
            { title: "Upcoming: Send Email", description: "Send invoices via email (coming soon)." },
            { title: "Upcoming: Payment Methods", description: "Future support for PayPal, Stripe, Wise, Payoneer, Venmo, crypto, and more." },
            { title: "Upcoming: History", description: "View complete invoice history in future updates." },
        ],
    },
];

const FeatureSection: FC = () => {
    return (
        <section className="relative py-24 bg-gradient-to-b from-blue-50 via-white to-blue-50 overflow-hidden">
            {/* Decorative Gradient Circles */}
            <div className="absolute top-10 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-10 right-0 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-50" />

            <div className="relative max-w-7xl mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-6">
                    Powerful Features for Freelancers
                </h2>
                <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16">
                    Everything you need to create, manage, and export invoices with ease. Designed to give freelancers full control and a delightful experience.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {featureGroups.map((group) => (
                        <div
                            key={group.group}
                            className="group bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-shadow duration-300 p-6 hover:-translate-y-1"
                        >
                            <h3 className="text-xl font-semibold mb-5 text-blue-600 group-hover:text-blue-700 transition-colors">
                                {group.group}
                            </h3>
                            <ul className="space-y-4">
                                {group.items.map((item) => (
                                    <li key={item.title} className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 mt-1">
                                            <CheckCircle className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">{item.title}</p>
                                            <p className="text-sm text-gray-600 leading-snug">{item.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;