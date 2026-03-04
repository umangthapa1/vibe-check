"use client";

import { VibeTimelineProps } from "@/types/vibe";
import { TimelineHeader } from "./TimelineHeader";
import { TimelineEntry } from "./TimelineEntry";

export function VibeTimeline({ data, className = "" }: VibeTimelineProps) {
  const { meta, entries } = data;
  
  // Convert data to JSON string for copy functionality
  const jsonData = JSON.stringify(data, null, 2);

  return (
    <div className={`min-h-screen bg-pure-white ${className}`}>
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Header with name, title, live status, and copy button */}
        <TimelineHeader meta={meta} jsonData={jsonData} />
        
        {/* Timeline Entries - Git-log inspired vertical structure */}
        <ol className="relative">
          {entries.map((entry, index) => (
            <TimelineEntry
              key={entry.id}
              entry={entry}
              index={index}
              isFirst={index === 0}
              isLast={index === entries.length - 1}
            />
          ))}
        </ol>
        
        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 text-center font-mono">
            ← git log --all --decorate --oneline →
          </p>
        </footer>
      </div>
    </div>
  );
}
