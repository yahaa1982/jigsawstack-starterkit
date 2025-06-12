import { NextResponse } from "next/server";
import { jigsawStackClient } from "@/lib/jigsawstack";

export async function POST(request: Request) {
	try {
		// Parse the request body
		const body = await request.json();
		const { text, accent } = body;
		console.log("BODY", body);

		// Validate the query
		if (!text || typeof text !== "string") {
			return NextResponse.json(
				{ error: "Text is required and must be a string" },
				{ status: 400 },
			);
		}

		// Make the text-to-speech request to JigsawStack
		const response = await jigsawStackClient.audio.text_to_speech({
			text: text,
			accent: accent || "en-US-female-27",
		});

		// The response has methods to get the audio data
		// Use the buffer() method to get the audio as a Buffer
		const audioBuffer = await response.buffer();

		// Convert buffer to base64 for JSON transport
		const audioBase64 = audioBuffer.toString("base64");

		// Return the audio data as base64
		return NextResponse.json({
			audio_data: audioBase64,
			success: true,
		});
	} catch (error) {
		console.error("Text-to-speech error:", error);

		// Log more details about the error
		if (error instanceof Error) {
			console.error("Error message:", error.message);
			console.error("Error stack:", error.stack);
		}

		return NextResponse.json(
			{
				error: "Failed to convert text to speech",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		);
	}
}
