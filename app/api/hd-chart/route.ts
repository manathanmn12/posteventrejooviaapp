import { NextRequest, NextResponse } from "next/server";

// Phase 2: calls humandesignhub.app POST /v1/bodygraph with HDHUB_API_KEY (server-only),
// normalizes the response, stores it in human_design_profiles (raw_json kept).
export async function POST(req: NextRequest) {
  if (!process.env.HDHUB_API_KEY) {
    return NextResponse.json({ error: "HDHUB_API_KEY not configured" }, { status: 503 });
  }
  return NextResponse.json({ todo: "Phase 2" }, { status: 501 });
}
