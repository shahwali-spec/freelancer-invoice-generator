"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useInvoice } from "@/hooks/useInvoiceForm";
import type { Client } from "@/types/invoice";
import { X } from "lucide-react";

export default function ClientInfoForm() {
    const { invoice, setInvoice } = useInvoice();
    const [preview, setPreview] = useState<string | null>(
        invoice.client?.logoUrl ?? null
    );
    const [isDragging, setIsDragging] = useState(false);

    const handleChange =
        (key: keyof Client) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setInvoice({
                    client: { ...(invoice.client ?? {}), [key]: e.target.value },
                });
            };

    const handleLogoChange = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            setPreview(base64);
            setInvoice({
                client: { ...(invoice.client ?? {}), logoUrl: base64 },
            });
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveLogo = () => {
        setPreview(null);
        setInvoice({
            client: { ...(invoice.client ?? {}), logoUrl: null },
        });
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleLogoChange(e.dataTransfer.files[0]);
        }
    };

    return (
        <Card className="rounded-2xl border shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    Client / Company Info
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label>Client / Company Name</Label>
                    <Input
                        placeholder="Client or Company Name"
                        value={invoice.client?.name ?? ""}
                        onChange={handleChange("name")}
                    />
                </div>
                <div>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        placeholder="client@company.com"
                        value={invoice.client?.email ?? ""}
                        onChange={handleChange("email")}
                    />
                </div>
                <div>
                    <Label>Phone</Label>
                    <Input
                        placeholder="+Country Code PhoneNumber"
                        value={invoice.client?.phone ?? ""}
                        onChange={handleChange("phone")}
                    />
                </div>
                <div>
                    <Label>Website</Label>
                    <Input
                        placeholder="Company website"
                        value={invoice.client?.website ?? ""}
                        onChange={handleChange("website")}
                    />
                </div>
                <div>
                    <Label>Tax ID / NTN</Label>
                    <Input
                        placeholder="Tax ID (optional)"
                        value={invoice.client?.taxId ?? ""}
                        onChange={handleChange("taxId")}
                    />
                </div>
                <div className="md:col-span-2">
                    <Label>Address</Label>
                    <Textarea
                        placeholder="Business or residential address"
                        value={invoice.client?.address ?? ""}
                        onChange={handleChange("address")}
                        rows={4}
                    />
                </div><div className="md:col-span-2">
                    <Label>Logo</Label>
                    <div
                        className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 text-center ${isDragging
                                ? "border-blue-500 bg-blue-50 shadow-inner"
                                : "border-gray-300 bg-white hover:border-blue-500 hover:bg-blue-50"
                            }`}
                        onDrop={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                handleLogoChange(e.dataTransfer.files[0]);
                            }
                        }}
                        onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onClick={() =>
                            document.getElementById("clientLogoInput")?.click()
                        }
                    >
                        <p className="text-gray-500 text-sm">
                            Drag & Drop your logo here or click to upload
                        </p>
                        <Input
                            id="clientLogoInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                                e.target.files && handleLogoChange(e.target.files[0])
                            }
                        />
                    </div>

                    {preview ? (
                        <div className="mt-3 relative w-fit">
                            <img
                                src={preview}
                                alt="Client Logo Preview"
                                className="h-28 rounded-lg border shadow-md object-contain"
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={handleRemoveLogo}
                                className="absolute top-1 right-1 rounded-full p-1 opacity-80 hover:opacity-100"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <p className="mt-2 text-gray-400 text-sm">No logo uploaded yet</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}