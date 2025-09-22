// src/components/form/SignatureForm.tsx
"use client";
import React, { useRef, useState, useEffect } from "react";
import { useInvoice } from "@/hooks/useInvoiceForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, XCircle, PenTool, RefreshCcw } from "lucide-react";

export default function SignatureForm() {
  const { invoice, setInvoice } = useInvoice();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [preview, setPreview] = useState<string>("");

  const [drawing, setDrawing] = useState(false);

  // Sync preview with invoice signature
  useEffect(() => {
    setPreview(invoice.signature || "");
  }, [invoice.signature]);

  // File Upload Handler
  const handleUpload = async (file: File) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const dataUrl = await toDataUrl(file);
      setInvoice({ signature: dataUrl });
      setPreview(dataUrl);
    } catch {
      setErrorMsg("❌ Failed to upload signature. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ========== Drawing Handlers ==========
  const getCoords = (e: any) => {
    if (e.touches && e.touches[0]) {
      const rect = canvasRef.current!.getBoundingClientRect();
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
  };

  const startDrawing = (e: any) => {
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 2;
    const { x, y } = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setDrawing(true);
  };

  const draw = (e: any) => {
    if (!drawing) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e?: any) => {
    if (!drawing) return;
    e?.preventDefault();
    setDrawing(false);
  };

  const saveDrawing = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL("image/png");
    setInvoice({ signature: dataUrl });
    setPreview(dataUrl);
  };

  const clearDrawing = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const handleRemove = () => {
    setInvoice({ signature: "" });
    setPreview("");
    clearDrawing();
  };

  return (
    <Card className="rounded-xl shadow-md border p-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <PenTool className="h-5 w-5 text-muted-foreground" />
          Signature
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Upload Option */}
        <div className="flex gap-3 items-center">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileRef.current?.click()}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            {loading ? "Uploading..." : "Upload Signature"}
          </Button>
        </div>

        {/* Draw Option */}
        <div>
          <p className="text-sm font-medium mb-2 flex items-center gap-2">
            <PenTool className="h-4 w-4" /> Draw Signature
          </p>
          <canvas
            ref={canvasRef}
            width={320}
            height={140}
            className="border rounded-md cursor-crosshair bg-white shadow-inner touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="secondary" onClick={saveDrawing}>
              Save Drawing
            </Button>
            <Button size="sm" variant="outline" onClick={clearDrawing}>
              <RefreshCcw className="h-4 w-4 mr-1" /> Clear
            </Button>
          </div>
        </div>

        {/* Preview */}
        {preview && (
          <div className="space-y-2">
            <img
              src={preview}
              alt="Signature Preview"
              className="max-h-24 object-contain border rounded-md p-1 shadow-sm bg-white"
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              className="flex items-center gap-1"
            >
              <XCircle className="h-4 w-4" /> Remove
            </Button>
          </div>
        )}

        {/* Error */}
        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
      </CardContent>
    </Card>
  );
}

function toDataUrl(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(String(reader.result));
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}
