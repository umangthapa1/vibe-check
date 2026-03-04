"use client";

import { CategoryBadgeProps } from "@/types/vibe";

export function CategoryBadge({ category, className = "" }: CategoryBadgeProps) {
  // Category to color styling mapping
  const categoryStyles = {
    Project: "border-slate-900 text-slate-900",
    Work: "border-slate-600 text-slate-600",
    Life: "border-slate-400 text-slate-500",
    Learning: "border-slate-700 text-slate-700",
  };

  const style = categoryStyles[category] || categoryStyles.Project;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium border ${style} ${className}`}
    >
      [{category}]
    </span>
  );
}
