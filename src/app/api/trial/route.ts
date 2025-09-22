// src/app/api/trial/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    message: "Trial route placeholder working!",
  });
}
