"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function ImageGenerator({ className }: { className?: string }) {
	const [prompt, setPrompt] = useState("A serene mountain landscape at sunset");
	const [loading, setLoading] = useState(false);
	const [imageData, setImageData] = useState<string | null>(null);

	const handleImageGeneration = async () => {
		if (!prompt.trim()) return;

		try {
			setLoading(true);
			const response = await fetch("/api/jigsawstack/image-gen", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					prompt: prompt.trim(),
				}),
			});
			const data = await response.json();

			if (data.image_data) {
				setImageData(data.image_data);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleImageGeneration();
	};

	return (
		<div
			className={cn(
				"bg-zinc-100 dark:bg-zinc-900 rounded-xl p-6 flex flex-col gap-4",
				className,
			)}
		>
			<div className="flex flex-col gap-2">
				<h2 className="font-bold text-xl">Image Generation</h2>
				<p className="text-zinc-500 dark:text-zinc-400 text-sm">
					Generate images using AI based on your text prompt.
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-2">
					<label htmlFor="prompt-input" className="text-sm font-medium">
						Describe the image you want to generate
					</label>
					<Input
						id="prompt-input"
						type="text"
						placeholder="A serene mountain landscape at sunset"
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
						className="text-md"
					/>
				</div>

				<Button
					type="submit"
					disabled={loading || !prompt.trim()}
					className="w-full"
				>
					{loading ? "Generating..." : "Generate Image"}
				</Button>
			</form>

			{loading && (
				<div className="flex flex-col items-center py-8">
					<div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
					<p className="mt-4 text-sm text-zinc-500">Generating image...</p>
				</div>
			)}

			{imageData && !loading && (
				<div className="">
					<div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
						<img
							src={`data:image/png;base64,${imageData}`}
							alt="Generated"
							className="w-full h-auto"
						/>
					</div>
				</div>
			)}
		</div>
	);
}
