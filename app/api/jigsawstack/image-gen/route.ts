import { NextResponse } from "next/server";
import { jigsawStackClient } from "@/lib/jigsawstack";

export async function POST(request: Request) {
	try {
		// Parse the request body
		const body = await request.json();
		const { prompt } = body;
		console.log("BODY", body);

		// Validate the prompt
		if (!prompt || typeof prompt !== "string") {
			return NextResponse.json(
				{ error: "Prompt is required and must be a string" },
				{ status: 400 },
			);
		}

		// Make the image generation request to JigsawStack
		const response = await jigsawStackClient.image_generation({
			prompt: prompt,
		});

		// The response contains binary data
		const imageBuffer = await response.buffer();

		// Convert buffer to base64 for JSON transport
		const imageBase64 = imageBuffer.toString("base64");

		// Return the image data as base64
		return NextResponse.json({
			image_data: imageBase64,
			success: true,
		});
	} catch (error) {
		console.error("Image generation error:", error);

		// Log more details about the error
		if (error instanceof Error) {
			console.error("Error message:", error.message);
			console.error("Error stack:", error.stack);
		}

		return NextResponse.json(
			{
				error: "Failed to generate image",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		);
	}
}
