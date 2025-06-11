import { NextResponse } from "next/server";
import { jigsawStackClient } from "@/lib/jigsawstack";

export async function POST(request: Request) {
	try {
		// Parse the request body
		const body = await request.json();
		const { query } = body;

		// Validate the query
		if (!query || typeof query !== "string") {
			return NextResponse.json(
				{ error: "Query is required and must be a string" },
				{ status: 400 },
			);
		}

		// Make the search request to JigsawStack
		const response = await jigsawStackClient.web.search({
			query: query,
			safe_search: "moderate",
			auto_scrape: true,
		});

		// Return the search results
		return NextResponse.json(response);
	} catch (error) {
		console.error("Search error:", error);
		return NextResponse.json(
			{ error: "Failed to perform search" },
			{ status: 500 },
		);
	}
}
