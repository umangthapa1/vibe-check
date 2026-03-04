"use client";

import { LiveDotProps } from "@/types/vibe";

export function LiveDot({ status, className = "" }: LiveDotProps) {
  // Status to color mapping
  const statusColors = {
    available: "bg-green-500",
    busy: "bg-amber-500",
    unavailable: "bg-slate-400",
  };

  // Status to animation mapping
  const statusAnimations = {
    available: "animate-pulse-green",
    busy: "",
    unavailable: "",
  };

  const color = statusColors[status] || statusColors.unavailable;
  const animation = statusAnimations[status] || "";

  return (
    <div className={`relative flex items-center gap-2 ${className}`}>
      <span
        className={`relative inline-flex h-2 w-2 ${color} ${animation}`}
        style={
          status === "available"
            ? {
                animation: "pulse-green 2s ease-in-out infinite",
              }
            : undefined
        }
      >
        {status === "available" && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full ${color} opacity-75`}
            style={{
              animation: "pulse-green 2s ease-in-out infinite",
            }}
          />
        )}
      </span>
    </div>
  );
}
