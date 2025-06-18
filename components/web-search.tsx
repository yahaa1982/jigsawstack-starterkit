"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { LoadingSpinner } from "./loading";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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

// Overview tab content component
const OverviewTabContent = ({ aiOverview }: { aiOverview?: string }) => (
  <TabsContent value="overview" className="">
    {aiOverview ? (
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown>{aiOverview}</ReactMarkdown>
      </div>
    ) : (
      <div className="text-center py-8 text-zinc-500">No AI overview available</div>
    )}
  </TabsContent>
);

// Sources tab content component
const SourcesTabContent = ({ results }: { results: WebSearchResult["results"] }) => (
  <TabsContent value="sources" className="">
    {results.map((result) => (
      <div key={result.url} className="bg-white dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center gap-2 mb-2">
          {result.favicon && (
            <div className="w-4 h-4 relative">
              <img src={result.favicon} alt={result.site_name} width={16} height={16} />
            </div>
          )}
          <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
            {result.title}
          </a>
        </div>
        <p className="text-xs text-zinc-500 mb-2">{result.url}</p>
        <ReactMarkdown>{result.description}</ReactMarkdown>
      </div>
    ))}
  </TabsContent>
);

// Images tab content component
const ImagesTabContent = ({ imageUrls }: { imageUrls: string[] }) => (
  <TabsContent value="images">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {imageUrls.length > 0 ? (
        imageUrls.map((url) => (
          <div key={url} className="aspect-square relative rounded-md overflow-hidden">
            <img src={url} alt="" className="w-full h-full object-cover" />
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-8 text-zinc-500">No images available</div>
      )}
    </div>
  </TabsContent>
);

// Tab triggers component
const SearchTabTriggers = ({ results }: { results: WebSearchResult }) => (
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="overview" className="flex items-center gap-2">
      <span className="hidden sm:inline">Overview</span>
      <span className="sm:hidden">AI</span>
    </TabsTrigger>
    <TabsTrigger value="sources" className="flex items-center gap-2">
      <svg className="inline" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img">
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      </svg>
      <span className="hidden sm:inline">Sources</span>
      {results.results.length > 0 && (
        <span className="ml-1 text-xs bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded-full">{results.results.length}</span>
      )}
    </TabsTrigger>
    <TabsTrigger value="images" className="flex items-center gap-2">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
        <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="hidden sm:inline">Images</span>
      {results.image_urls.length > 0 && (
        <span className="ml-1 text-xs bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded-full">{results.image_urls.length}</span>
      )}
    </TabsTrigger>
  </TabsList>
);

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
    <div className={cn("bg-zinc-100 dark:bg-zinc-900 rounded-xl p-4 sm:p-6 flex flex-col gap-2", className)}>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-2">
        <div className="flex flex-col">
          <h2 className="font-bold">Web Search</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Search the web for information.</p>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:max-w-sm items-center gap-2">
          <Input
            type="text"
            placeholder="What is the capital of France?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="text-md w-full"
          />
          <Button type="submit" onClick={handleSearch} disabled={loading} className="w-full sm:w-auto">
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      {loading && <LoadingSpinner />}

      {results && !loading && (
        <Tabs defaultValue="overview" className="overflow-auto">
          <SearchTabTriggers results={results} />
          <OverviewTabContent aiOverview={results.ai_overview} />
          <SourcesTabContent results={results.results} />
          <ImagesTabContent imageUrls={results.image_urls} />
        </Tabs>
      )}
    </div>
  );
}
