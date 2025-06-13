"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ScrapeResponse {
  page_position?: number;
  page_position_length?: number;
  context?: Record<string, string[]>;
  error?: string;
}

export default function AIScrape({ className }: { className?: string }) {
  const [url, setUrl] = useState("https://news.ycombinator.com/news");
  const [elementPrompts, setElementPrompts] = useState("titles\npoints");
  const [results, setResults] = useState<ScrapeResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleScrape = async () => {
    if (!url.trim()) return;

    try {
      setLoading(true);

      // Convert the textarea input to an array of prompts
      const prompts = elementPrompts
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      const response = await fetch("/api/jigsawstack/ai-scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url.trim(),
          element_prompts: prompts,
        }),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
      setResults({ error: "Failed to scrape website" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleScrape();
  };

  // Function to render the context data with proper formatting
  const renderContextData = () => {
    if (!results?.context) return null;

    return Object.entries(results.context).map(([key, value]) => (
      <div key={key} className="mb-4">
        <h3 className="font-medium text-md mb-2">{key}:</h3>
        {Array.isArray(value) ? (
          <ul className="list-disc pl-5 space-y-1">
            {value.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>{JSON.stringify(value)}</p>
        )}
      </div>
    ));
  };

  return (
    <div className={cn("bg-zinc-100 dark:bg-zinc-900 rounded-xl p-6 flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-xl">AI Web Scraper</h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">Extract specific information from websites using AI.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="url-input" className="text-sm font-medium">
            Website URL
          </label>
          <Input
            id="url-input"
            type="url"
            placeholder="https://news.ycombinator.com/news"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="text-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="prompts-input" className="text-sm font-medium">
            Element Prompts (one per line)
          </label>
          <textarea
            id="prompts-input"
            placeholder="titles&#10;points"
            value={elementPrompts}
            onChange={(e) => setElementPrompts(e.target.value)}
            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <p className="text-xs text-zinc-500">Enter each prompt on a new line (e.g. &quot;titles&quot;, &quot;points&quot;)</p>
        </div>

        <Button type="submit" disabled={loading || !url.trim() || !elementPrompts.trim()} className="w-full">
          {loading ? "Scraping..." : "Scrape Website"}
        </Button>
      </form>

      {results && !loading && (
        <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg border overflow-auto max-h-[400px]">
          {results.error ? (
            <p className="text-red-500">{results.error}</p>
          ) : (
            <div className="text-zinc-900 dark:text-zinc-100">{renderContextData()}</div>
          )}
        </div>
      )}
    </div>
  );
}
