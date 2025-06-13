import { jigsawStackClient } from "@/lib/jigsawstack";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { url } = body;

    // Validate the required parameters
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required and must be a string" }, { status: 400 });
    }

    // Make the speech-to-text request to JigsawStack
    const response = await jigsawStackClient.audio.speech_to_text({
      url,
    });

    // Return the speech-to-text results
    return NextResponse.json(response);
  } catch (error) {
    console.error("Speech-to-text error:", error);
    return NextResponse.json({ error: "Failed to perform speech-to-text conversion" }, { status: 500 });
  }
}
