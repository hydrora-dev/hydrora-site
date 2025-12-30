import type { StaticImageData } from "next/image";

export type MerchItem = {
  slug: string;
  name: string;
  category: "Hoodies" | "T-shirts" | "Caps" | "Mugs" | "Bottle accessories";
  priceFrom: number; // GBP
  description: string;
  sizes?: string[];
  colours?: string[];
  image: string; // static path
};

export const MERCH: MerchItem[] = [
  {
    slug: "hydrora-hoodie-midnight",
    name: "HYDRORA Hoodie — Midnight",
    category: "Hoodies",
    priceFrom: 54,
    description: "Premium-weight hoodie with tonal HYDRORA mark. Designed for everyday layers.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colours: ["Midnight Navy"],
    image: "/assets/merch/hoodie.svg"
  },
  {
    slug: "hydrora-tee-core",
    name: "HYDRORA Tee — Core",
    category: "T-shirts",
    priceFrom: 28,
    description: "Minimal tee with clean front mark. Soft feel and a structured silhouette.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colours: ["Off-White", "Navy"],
    image: "/assets/merch/tee.svg"
  },
  {
    slug: "hydrora-cap-arc",
    name: "HYDRORA Cap — Arc",
    category: "Caps",
    priceFrom: 24,
    description: "Unstructured cap with embroidered arc logo. Calm, understated.",
    sizes: ["One size"],
    colours: ["Navy", "Black"],
    image: "/assets/merch/cap.svg"
  },
  {
    slug: "hydrora-mug-glow",
    name: "HYDRORA Mug — Glow",
    category: "Mugs",
    priceFrom: 18,
    description: "Gloss mug with subtle gradient mark. Studio desk-ready.",
    sizes: ["330ml"],
    colours: ["White"],
    image: "/assets/merch/mug.svg"
  },
  {
    slug: "hydrora-carry-loop",
    name: "Bottle Carry Loop — Loop",
    category: "Bottle accessories",
    priceFrom: 12,
    description: "Accessory concept for carry comfort. Final materials and fit subject to change.",
    sizes: ["One size"],
    colours: ["Black"],
    image: "/assets/merch/loop.svg"
  }
];

export const CATEGORIES = ["Hoodies", "T-shirts", "Caps", "Mugs", "Bottle accessories"] as const;
