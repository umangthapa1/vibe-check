import { VibeTimeline, VibeConfig } from "@/components/vibe-timeline";
import vibeData from "../../public/vibe.json";

// Type assertion for the imported JSON
const vibeConfig: VibeConfig = vibeData as VibeConfig;

export default function Home() {
  return (
    <main>
      <VibeTimeline data={vibeConfig} />
    </main>
  );
}
