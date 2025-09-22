// scripts/generateFavicon.tsx
import fs from "fs";
import { createCanvas } from "canvas";

// Favicon size: 32x32 px
const size = 32;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext("2d");

// Gradient background (same as navbar logo)
const gradient = ctx.createLinearGradient(0, 0, size, size);
gradient.addColorStop(0, "#3b82f6"); // blue-500
gradient.addColorStop(1, "#6366f1"); // indigo-600
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, size, size);

// Text FI
ctx.fillStyle = "#ffffff";
ctx.font = "bold 20px sans-serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("FI", size / 2, size / 2);

// Save as .ico (you can also save as .png)
const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("public/favicon.png", buffer);

console.log("Favicon generated at public/favicon.png");
