"use client";

import { motion } from "framer-motion";
import { VibeEntry } from "@/types/vibe";
import { CategoryBadge } from "./CategoryBadge";
import {
  Rocket,
  Briefcase,
  Star,
  Mic,
  Palette,
  MapPin,
  BookOpen,
  Building,
  Code,
  Coffee,
  Heart,
  Zap,
} from "lucide-react";

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  rocket: Rocket,
  briefcase: Briefcase,
  star: Star,
  mic: Mic,
  palette: Palette,
  mapPin: MapPin,
  bookOpen: BookOpen,
  building: Building,
  code: Code,
  coffee: Coffee,
  heart: Heart,
  zap: Zap,
};

interface TimelineEntryProps {
  entry: VibeEntry;
  index: number;
  isFirst: boolean;
  isLast: boolean;
}

export function TimelineEntry({ entry, index, isFirst, isLast }: TimelineEntryProps) {
  const IconComponent = entry.icon ? iconMap[entry.icon] : null;

  // Animation variants for staggered entrance
  const entryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={entryVariants}
      className="relative grid grid-cols-[auto_40px_1fr] gap-4 md:gap-0"
    >
      {/* Date Column - Left */}
      <div className="text-right md:pr-8 pt-1">
        <span
          className={`font-mono text-sm ${
            entry.highlight ? "text-pure-black font-semibold" : "text-slate-500"
          }`}
        >
          {entry.date}
        </span>
      </div>

      {/* Center Column - Axis Node */}
      <div className="relative flex flex-col items-center">
        {/* Top line segment */}
        {!isFirst && (
          <div className="absolute top-0 w-px h-6 bg-slate-900" />
        )}
        
        {/* Node dot */}
        <div
          className={`relative z-10 w-3 h-3 rounded-full border-2 ${
            entry.highlight
              ? "bg-pure-black border-pure-black"
              : "bg-pure-white border-slate-900"
          }`}
        >
          {entry.highlight && (
            <div className="absolute inset-0 rounded-full bg-pure-black animate-pulse" />
          )}
        </div>
        
        {/* Bottom line segment */}
        {!isLast && (
          <div className="absolute top-9 w-px h-full bg-slate-900" />
        )}
      </div>

      {/* Content Column - Right */}
      <div
        className={`pb-16 transition-transform duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:translate-x-0.5 ${
          entry.highlight ? "md:translate-x-0" : ""
        }`}
      >
        <div className="group">
          {/* Title row with icon */}
          <div className="flex items-start gap-3 mb-2">
            {IconComponent && (
              <IconComponent className="w-4 h-4 mt-1 text-slate-400 flex-shrink-0" />
            )}
            <h3
              className={`text-lg md:text-xl font-semibold tracking-tight ${
                entry.highlight ? "text-pure-black" : "text-slate-800"
              }`}
            >
              {entry.title}
            </h3>
          </div>
          
          {/* Description */}
          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-3 max-w-2xl">
            {entry.description}
          </p>
          
          {/* Category badge */}
          <CategoryBadge category={entry.category} />
        </div>
      </div>
    </motion.div>
  );
}
