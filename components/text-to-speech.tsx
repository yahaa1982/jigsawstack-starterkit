"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Custom Audio Player Component
function AudioPlayer({ audioUrl }: { audioUrl: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border p-4">
      <audio ref={audioRef} src={audioUrl} preload="metadata">
        <track kind="captions" src="#" label="captions" />
      </audio>

      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <Button onClick={togglePlayPause} size="sm" variant="ghost" className="h-10 w-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white">
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
        </Button>

        {/* Time Display */}
        <span className="text-sm font-mono text-zinc-600 dark:text-zinc-400 min-w-[80px]">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        <Progress value={progressPercentage} className="flex-1 cursor-pointer bg-zinc-200 dark:bg-zinc-700" onClick={handleSeek} />

        {/* Volume Icon */}
        <Volume2 className="h-4 w-4 text-zinc-500" />
      </div>
    </div>
  );
}

const voices = [
  // English Voices
  {
    code: "en-US-female-27",
    name: "American English, Female 27 (Default)",
    language: "English",
  },
  {
    code: "en-US-male-24",
    name: "American English, Male 24",
    language: "English",
  },
  {
    code: "en-GB-female-2",
    name: "British English, Female 2",
    language: "English",
  },
  {
    code: "en-GB-male-2",
    name: "British English, Male 2",
    language: "English",
  },
  {
    code: "en-AU-female-2",
    name: "Australian English, Female 2",
    language: "English",
  },
  {
    code: "en-IN-female-3",
    name: "Indian English, Female 3",
    language: "English",
  },

  // Other Languages
  { code: "fr-FR-female-12", name: "French, Female 12", language: "French" },
  { code: "de-DE-female-1", name: "German, Female 1", language: "German" },
  {
    code: "es-ES-female-9",
    name: "Spanish (Spain), Female 9",
    language: "Spanish",
  },
  {
    code: "es-MX-female-12",
    name: "Spanish (Mexico), Female 12",
    language: "Spanish",
  },
  {
    code: "ja-JP-female-14",
    name: "Japanese, Female 14",
    language: "Japanese",
  },
  {
    code: "zh-CN-female-15",
    name: "Chinese (Mandarin), Female 15",
    language: "Chinese",
  },
];

export default function TextToSpeech({ className }: { className?: string }) {
  const [text, setText] = useState("Hello, world!");
  const [selectedVoice, setSelectedVoice] = useState("en-US-female-27");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleTextToSpeech = async () => {
    if (!text.trim() || !selectedVoice) return;

    try {
      setLoading(true);
      const response = await fetch("/api/jigsawstack/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text.trim(),
          accent: selectedVoice,
        }),
      });
      const data = await response.json();

      // Handle audio data - create blob URL for playback
      if (data.audio_data) {
        // Convert base64 to binary and create blob
        const binaryString = atob(data.audio_data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const audioBlob = new Blob([bytes], { type: "audio/mpeg" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      } else if (data.audio_url) {
        // If audio URL is provided directly
        setAudioUrl(data.audio_url);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTextToSpeech();
  };

  // Group voices by language for better UX
  const groupedVoices = voices.reduce(
    (acc, voice) => {
      if (!acc[voice.language]) {
        acc[voice.language] = [];
      }
      acc[voice.language].push(voice);
      return acc;
    },
    {} as Record<string, typeof voices>
  );

  return (
    <div className={cn("bg-zinc-100 dark:bg-zinc-900 rounded-xl p-6 flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-xl">Text to Speech</h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">Convert text to speech using AI with various voice options.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="text-input" className="text-sm font-medium">
            Text to convert to speech
          </label>
          <Input
            id="text-input"
            type="text"
            placeholder="Enter text to convert to speech..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="text-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="voice-select" className="text-sm font-medium">
            Voice Selection
          </label>
          <Select value={selectedVoice} onValueChange={setSelectedVoice}>
            <SelectTrigger id="voice-select">
              <SelectValue placeholder="Select voice" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(groupedVoices).map(([language, voiceList]) => (
                <div key={language}>
                  <div className="px-2 py-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400">{language}</div>
                  {voiceList.map((voice) => (
                    <SelectItem key={voice.code} value={voice.code}>
                      {voice.name}
                    </SelectItem>
                  ))}
                </div>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={loading || !text.trim() || !selectedVoice} className="w-full">
          {loading ? "Converting..." : "Convert to Speech"}
        </Button>
      </form>

      {audioUrl && !loading && (
        <div className="">
          <AudioPlayer audioUrl={audioUrl} />
        </div>
      )}
    </div>
  );
}
