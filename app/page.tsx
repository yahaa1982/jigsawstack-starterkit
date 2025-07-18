import AIScrape from "@/components/ai-scrape";
import ImageGenerator from "@/components/image-gen";
import TextToSpeech from "@/components/text-to-speech";
import Translate from "@/components/translate";
import { Button } from "@/components/ui/button";
import WebSearch from "@/components/web-search";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <Image
        src="/jigsawstack_icon.svg"
        alt="JigsawStack"
        width={300}
        height={300}
        className="absolute right-1/6 top-1/4 transform -translate-y-1/2 opacity-50 -z-10"
      />
      <div className="space-y-8 w-full max-w-6xl">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <h1 className="text-5xl font-bold">JigsawStack NextJS Template</h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl">Try our hand-picked small custom models. Available for free.</p>
          <div className="flex gap-4 mt-4">
            <Button>
              <Link href="https://jigsawstack.com">Documentation</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 ">
          <WebSearch className="md:col-span-2 max-h-[400px] transition-all duration-300 ease-in-out" />

          <Translate className="md:col-span-1 transition-height duration-300 ease-in-out max-h-[400px] overflow-auto" />

          <TextToSpeech className="md:col-span-1 transition-height duration-300 ease-in-out max-h-[400px] overflow-auto" />

          <ImageGenerator className="md:col-span-1 transition-height duration-300 ease-in-out max-h-[400px] overflow-auto" />

          <AIScrape className="md:col-span-1 transition-height duration-300 max-h-[400px] ease-in-out overflow-auto" />
        </div>
      </div>
    </div>
  );
}
