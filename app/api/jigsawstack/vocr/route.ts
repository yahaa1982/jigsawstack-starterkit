import { jigsawStackClient } from "@/lib/jigsawstack";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { prompt, url } = body;

    // Validate the required parameters
    if (!prompt || !Array.isArray(prompt)) {
      return NextResponse.json({ error: "Prompt is required and must be an array" }, { status: 400 });
    }

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required and must be a string" }, { status: 400 });
    }

    // Make the VOCR request to JigsawStack
    const response = await jigsawStackClient.vision.vocr({
      prompt,
      url,
    });

    // Return the VOCR results
    return NextResponse.json(response);
  } catch (error) {
    console.error("VOCR error:", error);
    return NextResponse.json({ error: "Failed to perform visual OCR" }, { status: 500 });
  }
}
