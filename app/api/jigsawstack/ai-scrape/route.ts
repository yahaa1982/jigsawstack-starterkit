import { jigsawStackClient } from "@/lib/jigsawstack";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { url, element_prompts } = body;

    // Validate the required parameters
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required and must be a string" }, { status: 400 });
    }

    // Make the scrape request to JigsawStack
    const response = await jigsawStackClient.web.ai_scrape({
      url,
      element_prompts,
    });

    // Return the scrape results
    return NextResponse.json(response);
  } catch (error) {
    console.error("Scrape error:", error);
    return NextResponse.json({ error: "Failed to perform web scraping" }, { status: 500 });
  }
}
