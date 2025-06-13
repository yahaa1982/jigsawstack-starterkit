import { jigsawStackClient } from "@/lib/jigsawstack";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { query, target_language } = body;

    // Validate the query
    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required and must be a string" }, { status: 400 });
    }

    // Make the search request to JigsawStack
    const response = await jigsawStackClient.translate.text({
      text: query,
      target_language: target_language,
    });

    // Return the search results
    return NextResponse.json(response);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Failed to perform search" }, { status: 500 });
  }
}
