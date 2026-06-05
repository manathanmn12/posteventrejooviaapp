import { NextResponse } from "next/server";

// Phase 5: assembles server-side context (profile + last 14 check-ins + opted-in journal themes
// + conversation summary) and streams Claude responses. System prompt: blueprint §8.
export async function POST() {
  return NextResponse.json({ todo: "Phase 5" }, { status: 501 });
}
