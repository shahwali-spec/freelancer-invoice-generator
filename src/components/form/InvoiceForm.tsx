// src/components/form/InvoiceForm.tsx
"use client";
import React, { useState } from "react";
import FreelancerInfoForm from "./FreelancerInfoForm";
import ClientInfoForm from "./ClientInfoForm";
import InvoiceDetailsForm from "./InvoiceDetailsForm";
import LineItemsForm from "./LineItemsForm";
import TotalsForm from "./TotalsForm";
import ExtraOptionsForm from "./ExtraOptionsForm";
import SignatureForm from "./SignatureForm";
import { useInvoice } from "@/hooks/useInvoiceForm";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function InvoiceForm() {
  const { invoice, setInvoice } = useInvoice();
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const showToast = (type: "success" | "error", text: string, duration = 2000) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), duration);
  };

  const saveToServer = async () => {
    // فی الحال بٹن کو کمنگ سون رکھیں
    showToast("error", "Coming Soon: Save to History feature!");
    return;

    // اگر بعد میں API فعال ہو تو اوپر والی دو لائنز ہٹا دیں اور نیچے والا کوڈ استعمال کریں  
    /*
    if (!invoice) return;
    setSaving(true);
    try {
      const res = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoice),
      });
      const text = await res.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        result = null;
      }
      if (res.ok) {
        showToast("success", result?.message || "Invoice saved to history!");
      } else {
        showToast("error", result?.error || "Failed to save invoice.");
      }
    } catch (err) {
      console.error("Save failed:", err);
      showToast("error", "An error occurred while saving.");
    } finally {
      setSaving(false);
    }
    */
  };

  type InvoiceFormProps = {
    invoice: typeof invoice;
    setInvoice: typeof setInvoice;
  };

  const forms: React.ComponentType<InvoiceFormProps>[] = [
    FreelancerInfoForm,
    ClientInfoForm,
    InvoiceDetailsForm,
    LineItemsForm,
    TotalsForm,
    ExtraOptionsForm,
    SignatureForm,
  ];

  return (
    <div className="space-y-4 bg-white text-black">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Invoice Builder</h2>
        <div
          className="relative"
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
        >
          <Button
            type="button"
            onClick={saveToServer}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Invoice"}
          </Button>
          <AnimatePresence>
            {showTip && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute top-full mt-2 w-max px-2 py-1 text-xs text-white bg-gray-700 rounded shadow-lg"
              >
                Coming Soon
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {forms.map((FormComp, idx) => (
        <FormComp key={idx} invoice={invoice} setInvoice={setInvoice} />
      ))}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`fixed top-5 right-5 rounded-md px-4 py-2 text-sm shadow-md ${
              toast.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
