// src/components/billing/PaddleButton.tsx
"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface PaddleButtonProps {
    productId: string; // pro_ ID
    priceId?: string;  // pri_ ID (optional)
    label: string;
    className?: string;
}

export default function PaddleButton({ productId, priceId, label, className = "" }: PaddleButtonProps) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const vendorId = Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID);
        if (!vendorId || isNaN(vendorId)) {
            console.error("Paddle Vendor ID is missing or invalid! Please check .env file.");
            return;
        }
        // @ts-ignore
        Paddle.Setup({ vendor: vendorId });
    }, []);

    const handleCheckout = () => {
        setLoading(true);

        // productId کو نمبر میں تبدیل کرنا ضروری ہے کیونکہ Paddle Checkout expects numeric ID
        const productIdNumber = Number(productId.replace(/\D/g, "")); // کسی non-digit کو ہٹا کر نمبر بنایا
        if (!productIdNumber || isNaN(productIdNumber)) {
            console.error("Invalid Product ID for Paddle Checkout!");
            setLoading(false);
            return;
        }

        // اگر تم بعد میں priceId استعمال کرنا چاہو تو اسے custom data میں پاس کر سکتے ہو
        // یا اپنے backend پر اس سے کوئی خاص logic لگا سکتے ہو
        // @ts-ignore
        Paddle.Checkout.open({
            product: productIdNumber,
            customData: {
                priceId: priceId || "", // optional
            },
            successCallback: () => {
                console.log("Payment successful!");
                alert("🎉 Payment completed successfully!");
                setLoading(false);
            },
            closeCallback: () => {
                console.log("Checkout closed.");
                setLoading(false);
            },
        });
    };

    return (
        <button
            onClick={handleCheckout}
            disabled={loading}
            className={`relative group overflow-hidden px-8 py-3 rounded-3xl font-bold text-white shadow-lg
        bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
        transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-400
        active:scale-95 active:shadow-inner disabled:opacity-70 ${className}`}
        >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 opacity-30 animate-gradient-slow pointer-events-none"></span>
            {loading ? (
                <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin w-5 h-5 text-white" />
                    Processing...
                </span>
            ) : (
                <>
                    {label}
                    <span className="ml-2 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300">
                        →
                    </span>
                </>
            )}
            <style jsx>{`
        @keyframes gradientSlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-slow {
          background-size: 200% 200%;
          animation: gradientSlow 5s ease infinite;
        }
      `}</style>
        </button>
    );
}