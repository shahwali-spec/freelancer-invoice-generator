import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return new Response(
    JSON.stringify({ message: "Paddle route working!" }),
    { headers: { "Content-Type": "application/json" } }
  );
}

// یا اگر فی الحال کوئی ریسپانس نہیں چاہیے تو یہ بھی چل جائے گا:
// export {};
