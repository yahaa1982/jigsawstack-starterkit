"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TranslateResult {
	translated_text: string;
	source_language: string;
	target_language: string;
}

const languages = [
	{ code: "es", name: "Spanish" },
	{ code: "fr", name: "French" },
	{ code: "de", name: "German" },
	{ code: "it", name: "Italian" },
	{ code: "pt", name: "Portuguese" },
	{ code: "ru", name: "Russian" },
	{ code: "ja", name: "Japanese" },
	{ code: "ko", name: "Korean" },
	{ code: "zh", name: "Chinese" },
	{ code: "ar", name: "Arabic" },
	{ code: "hi", name: "Hindi" },
	{ code: "nl", name: "Dutch" },
	{ code: "sv", name: "Swedish" },
	{ code: "no", name: "Norwegian" },
	{ code: "da", name: "Danish" },
	{ code: "fi", name: "Finnish" },
];

export default function Translate({ className }: { className?: string }) {
	const [query, setQuery] = useState(
		"The UK drinks about 100–160 million cups of tea every day, and 98% of tea drinkers add milk to their tea.",
	);
	const [targetLanguage, setTargetLanguage] = useState("fr");
	const [results, setResults] = useState<TranslateResult | null>(null);
	const [loading, setLoading] = useState(false);

	const handleTranslate = async () => {
		if (!query.trim() || !targetLanguage) return;

		try {
			setLoading(true);
			const response = await fetch("/api/jigsawstack/translate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: query.trim(),
					target_language: targetLanguage,
				}),
			});
			const data = await response.json();
			setResults(data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleTranslate();
	};

	return (
		<div
			className={cn(
				"bg-zinc-100 dark:bg-zinc-900 rounded-xl p-6 flex flex-col gap-4",
				className,
			)}
		>
			<div className="flex flex-col gap-2">
				<h2 className="font-bold text-xl">Translate Text</h2>
				<p className="text-zinc-500 dark:text-zinc-400 text-sm">
					Translate text to different languages using AI.
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-2">
					<label htmlFor="text-input" className="text-sm font-medium">
						Text to translate
					</label>
					<Input
						id="text-input"
						type="text"
						placeholder="Enter text to translate..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="text-md"
					/>
				</div>

				<div className="space-y-2">
					<label htmlFor="language-select" className="text-sm font-medium">
						Target Language
					</label>
					<Select value={targetLanguage} onValueChange={setTargetLanguage}>
						<SelectTrigger id="language-select">
							<SelectValue placeholder="Select target language" />
						</SelectTrigger>
						<SelectContent>
							{languages.map((language) => (
								<SelectItem key={language.code} value={language.code}>
									{language.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<Button
					type="submit"
					disabled={loading || !query.trim() || !targetLanguage}
					className="w-full"
				>
					{loading ? "Translating..." : "Translate"}
				</Button>
			</form>

			{results && !loading && (
				<div className="p-4 bg-white dark:bg-zinc-800 rounded-lg border">
					<p className="text-zinc-900 dark:text-zinc-100 font-medium">
						{results.translated_text}
					</p>
				</div>
			)}
		</div>
	);
}
