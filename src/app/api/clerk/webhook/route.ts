import { headers } from "next/headers";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Clerk Dashboard → Webhooks → Signing Secret
const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  // ---- Step 1: Clerk headers read کریں ----
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Missing svix headers", { status: 400 });
  }

  // ---- Step 2: Raw body read کریں ----
  const payload = await req.text();

  // ---- Step 3: Verify webhook signature ----
  const wh = new Webhook(CLERK_WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("❌ Webhook signature verification failed.", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  // ---- Step 4: Handle Clerk events ----
  if (evt.type === "user.created") {
    const userId = evt.data.id;

    const trialDays = 7;
    const start = new Date();
    const end = new Date(start.getTime() + trialDays * 24 * 60 * 60 * 1000);

    // Clerk Client initialize
    const client = await clerkClient();

    // Update user metadata
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        subscriptionStatus: "trialing",
        trialStart: start.toISOString(),
        trialEnd: end.toISOString(),
      },
    });

    console.log(`✅ Trial started for user ${userId} until ${end.toISOString()}`);
  }

  return NextResponse.json({ ok: true });
}
