"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
// import Image from "next/image";

interface WebSearchResult {
	success: boolean;
	query: string;
	ai_overview?: string;
	spell_fixed: boolean;
	is_safe: boolean;
	results: {
		title: string;
		url: string;
		description: string;
		content: string;
		is_safe: boolean;
		site_name: string;
		site_long_name: string;
		age: string;
		language: string;
		favicon: string;
		snippets: string[];
	}[];
	image_urls: string[];
	links: string[];
}

export default function WebSearch({ className }: { className?: string }) {
	const [query, setQuery] = useState("What is the capital of France?");
	const [results, setResults] = useState<WebSearchResult | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSearch = async () => {
		try {
			setLoading(true);
			const response = await fetch("/api/jigsawstack/web-search", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ query }),
			});
			const data = await response.json();
			setResults(data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className={cn(
				"bg-zinc-100 dark:bg-zinc-900 rounded-xl p-6 flex flex-col",
				className,
			)}
		>
			<h2 className="font-medium mb-2">Web Search</h2>
			<p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
				Search the web for information.
			</p>
			<div className="flex w-full max-w-sm items-center gap-2 mb-4">
				<Input
					type="text"
					placeholder="What is the capital of France?"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && handleSearch()}
				/>
				<Button
					type="submit"
					variant="outline"
					onClick={handleSearch}
					disabled={loading}
				>
					{loading ? "Searching..." : "Search"}
				</Button>
			</div>

			{loading && (
				<div className="flex flex-col items-center py-8">
					<div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
					<p className="mt-4 text-sm text-zinc-500">Searching the web...</p>
				</div>
			)}

			{results && !loading && (
				<div className="mt-4 space-y-6">
					<div className="space-y-4">
						<h3 className="font-medium">Sources</h3>
						{results.results.map((result) => (
							<div
								key={result.url}
								className="bg-white dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700"
							>
								<div className="flex items-center gap-2 mb-2">
									{result.favicon && (
										<div className="w-4 h-4 relative">
											<img
												src={result.favicon}
												alt={result.site_name}
												width={16}
												height={16}
											/>
										</div>
									)}
									<a
										href={result.url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 hover:underline font-medium"
									>
										{result.title}
									</a>
								</div>
								<p className="text-xs text-zinc-500 mb-2">{result.url}</p>
								<p className="text-sm mb-2">{result.description}</p>
								{result.snippets && result.snippets.length > 0 && (
									<div className="bg-zinc-50 dark:bg-zinc-900 p-2 rounded text-sm">
										{result.snippets[0]}
									</div>
								)}
							</div>
						))}
					</div>

					{results.image_urls.length > 0 && (
						<div className="space-y-2">
							<h3 className="font-medium">Images</h3>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
								{results.image_urls.slice(0, 6).map((url) => (
									<div
										key={url}
										className="aspect-square relative rounded-md overflow-hidden"
									>
										<img src={url} alt="" className="object-cover" />
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
