/**
 * VibeTimeline TypeScript Types
 * 
 * Data-driven schema for the VibeTimeline component.
 * Powered entirely by vibe.json configuration.
 */

// Category types for timeline entries
export type VibeCategory = "Project" | "Work" | "Life" | "Learning";

// Icon references from Lucide React
export type VibeIcon = 
  | "rocket"
  | "briefcase"
  | "star"
  | "mic"
  | "palette"
  | "mapPin"
  | "bookOpen"
  | "building"
  | "code"
  | "coffee"
  | "heart"
  | "zap"
  | "server"
  | "terminal"
  | "cpu";

// Status types for availability indicator
export type VibeStatus = "available" | "busy" | "unavailable";

// Individual timeline entry
export interface VibeEntry {
  id: string;
  date: string; // Format: YYYY-MM or YYYY
  title: string;
  description: string;
  category: VibeCategory;
  icon?: VibeIcon;
  highlight?: boolean;
}

// Meta information for the timeline header
export interface VibeMeta {
  name: string;
  title: string;
  status: VibeStatus;
  statusMessage?: string;
}

// Complete vibe.json configuration
export interface VibeConfig {
  meta: VibeMeta;
  entries: VibeEntry[];
}

// Component props
export interface VibeTimelineProps {
  data: VibeConfig;
  className?: string;
}

// Category badge props
export interface CategoryBadgeProps {
  category: VibeCategory;
  className?: string;
}

// Status indicator props
export interface LiveDotProps {
  status: VibeStatus;
  className?: string;
}

// Copy toast props
export interface CopyToastProps {
  show: boolean;
  message?: string;
}
