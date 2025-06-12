import React from "react";
import WebSearch from "@/components/web-search";
import Translate from "@/components/translate";
import TextToSpeech from "@/components/text-to-speech";

const models = [
	{
		name: "AI Web Scraper",
		description: "Scrape websites with AI.",
		link: "https://jigsawstack.com/ai-web-scraper",
	},
	{
		name: "AI Image Generation",
		description: "Generate images with AI.",
		link: "https://jigsawstack.com/ai-image-generation",
	},
	{
		name: "AI Prediction",
		description: "Make predictions with AI.",
		link: "https://jigsawstack.com/ai-prediction",
	},
	{
		name: "AI Search",
		description: "Search content with AI.",
		link: "https://jigsawstack.com/ai-search",
	},
	{
		name: "AI Sentiment",
		description: "Analyze sentiment with AI.",
		link: "https://jigsawstack.com/ai-sentiment",
	},
	{
		name: "AI Summary",
		description: "Summarize content with AI.",
		link: "https://jigsawstack.com/ai-summary",
	},
	{
		name: "Embedding",
		description: "Create text embeddings.",
		link: "https://jigsawstack.com/embedding",
	},
	{
		name: "NSFW Detection",
		description: "Detect NSFW content.",
		link: "https://jigsawstack.com/nsfw-detection",
	},
	{
		name: "Prompt Engine",
		description: "Engine for AI prompts.",
		link: "https://jigsawstack.com/prompt-engine",
	},
	{
		name: "Speech to Text",
		description: "Convert speech to text.",
		link: "https://jigsawstack.com/speech-to-text",
	},
	{
		name: "Text to Speech",
		description: "Convert text to speech.",
		link: "https://jigsawstack.com/text-to-speech",
	},
	{
		name: "Translation",
		description: "Translate text with AI.",
		link: "https://jigsawstack.com/translation",
	},
	{
		name: "VOCR",
		description: "Visual OCR technology.",
		link: "https://jigsawstack.com/vocr",
	},
];

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-8">
			<div className="space-y-8 w-full max-w-6xl">
				<div className="flex flex-col items-center justify-center text-center space-y-4">
					<div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2 rounded-full inline-flex items-center">
						<span className="text-sm">JigsawStack</span>
					</div>
					<h1 className="text-5xl font-bold">JigsawStack NextJS Template</h1>
					<p className="text-zinc-500 dark:text-zinc-400 max-w-2xl">
						Try our hand-picked small custom models. Available for free.
					</p>
					<div className="flex gap-4 mt-4">
						<button
							type="button"
							className="bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 px-5 py-3 rounded-full border border-zinc-200 dark:border-zinc-700"
						>
							Documentation
						</button>
					</div>
				</div>

				<div className="flex flex-wrap justify-center gap-4 text-sm mt-10">
					<button
						type="button"
						className="px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
					>
						Default
					</button>
					<button
						type="button"
						className="px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
					>
						Red
					</button>
					<button
						type="button"
						className="px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
					>
						Rose
					</button>
					<button
						type="button"
						className="px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
					>
						Orange
					</button>
					<button
						type="button"
						className="px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
					>
						Green
					</button>
					<button
						type="button"
						className="px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
					>
						Blue
					</button>
					<button
						type="button"
						className="px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
					>
						Yellow
					</button>
					<button
						type="button"
						className="px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
					>
						Violet
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 ">
					<WebSearch className="md:col-span-2 transition-all duration-300 ease-in-out" />

					<Translate className="md:col-span-1 transition-height duration-300 ease-in-out" />

					<TextToSpeech className="md:col-span-1 transition-height duration-300 ease-in-out" />
				</div>
			</div>
		</div>
	);
}
