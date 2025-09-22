// src/lib/db.ts
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;

if (!uri) {
  throw new Error("❌ MONGODB_URI / DATABASE_URL not found in .env");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri as string, { bufferCommands: false })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
