// src/components/marketing/AboutSection.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AboutSection() {
  const router = useRouter();

  return (
    <section
      id="about"
      className="relative bg-white py-24 px-6 text-center overflow-hidden"
    >
      {/* Decorative blurred shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute -bottom-28 -right-20 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-3xl" />
      </div>

      <motion.div
        className="relative max-w-5xl mx-auto flex flex-col items-center gap-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Empower Your Invoicing
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-3xl">
          Create professional invoices instantly, fully customizable for any business or freelancer.
          Automatically calculate taxes, apply discounts, and export your invoices in PDF, Word, or Image formats—all completely free, no signup required.
          Boost your productivity and streamline your billing process today.
        </p>

        {/* Extra micro content for SEO & trust */}
        <p className="text-sm md:text-base text-gray-500 mb-6 max-w-3xl">
          Trusted by thousands of users worldwide for fast and easy invoice generation. Works on desktop, tablet, and mobile.
        </p>

        {/* CTA Button */}
        <Button
          size="lg"
          className="mb-8 px-8 py-3 text-lg rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-transform"
          onClick={() => router.push("/dashboard")}
        >
          Generate Free Invoice
        </Button>

        {/* Mini Features */}
        <motion.div
          className="flex flex-col md:flex-row flex-wrap justify-center gap-3 text-gray-600 text-sm md:text-base"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          {[
            "✔ Fully Customizable Templates",
            "✔ Multi-Currency & Auto Tax Calculation",
            "✔ Upload Your Logo & Digital Signatures",
            "✔ Export as PDF, Word, or Image",
            "✔ No Account Required",
            "✔ Works on Desktop, Tablet & Mobile",
          ].map((feature) => (
            <motion.span
              key={feature}
              className="flex items-center gap-2 bg-white border rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            >
              {feature}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
