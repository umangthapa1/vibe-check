"use client";

import { useState } from "react";
import { VibeMeta } from "@/types/vibe";
import { LiveDot } from "./LiveDot";
import { CopyToast } from "./CopyToast";
import { Copy, Check } from "lucide-react";

interface TimelineHeaderProps {
  meta: VibeMeta;
  jsonData: string;
}

export function TimelineHeader({ meta, jsonData }: TimelineHeaderProps) {
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonData);
      setCopied(true);
      setShowToast(true);
      
      // Reset after 2.5 seconds
      setTimeout(() => {
        setCopied(false);
        setShowToast(false);
      }, 2500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      <header className="mb-24">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-pure-black mb-2">
              {meta.name}
            </h1>
            <p className="text-lg text-slate-600 font-normal">
              {meta.title}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <LiveDot status={meta.status} />
              <span>
                {meta.status === "available" 
                  ? meta.statusMessage || "Available" 
                  : meta.status === "busy" 
                    ? "Busy" 
                    : "Unavailable"}
              </span>
            </div>
            
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-pure-black border border-slate-900 hover:bg-pure-black hover:text-pure-white transition-all duration-200"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy my vibe.json</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>
      
      <CopyToast show={showToast} message="vibe.json copied to clipboard ✓" />
    </>
  );
}
