export type Pod = {
  id: string;
  name: string;
  family: "citrus" | "berry" | "mint" | "tropical" | "classic";
  glow: string; // CSS rgba
  mood: "energise" | "calm" | "focus" | "refresh";
  profile: string;
};

export const PODS: Pod[] = [
  { id: "orange-citrus", name: "Orange Citrus", family: "citrus", glow: "rgba(255, 148, 64, 0.65)", mood: "energise", profile: "Bright citrus lift with a clean finish." },
  { id: "berry-burst", name: "Berry Burst", family: "berry", glow: "rgba(189, 92, 255, 0.65)", mood: "focus", profile: "Deep berry notes, smooth and modern." },
  { id: "lime-zest", name: "Lime Zest", family: "citrus", glow: "rgba(124, 255, 0, 0.60)", mood: "refresh", profile: "Sharp lime edge with crisp clarity." },
  { id: "mango-gold", name: "Mango", family: "tropical", glow: "rgba(255, 202, 74, 0.62)", mood: "energise", profile: "Soft tropical warmth, lightly juicy." },
  { id: "mint-teal", name: "Mint", family: "mint", glow: "rgba(0, 229, 255, 0.55)", mood: "calm", profile: "Cool mint profile with a low sweetness perception." },
  { id: "cherry-red", name: "Cherry", family: "berry", glow: "rgba(255, 78, 120, 0.62)", mood: "focus", profile: "Cherry depth with a refined tart line." }
];

export const FAMILIES: { key: Pod["family"] | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "citrus", label: "Citrus" },
  { key: "berry", label: "Berry" },
  { key: "mint", label: "Mint" },
  { key: "tropical", label: "Tropical" },
  { key: "classic", label: "Classic" }
];
