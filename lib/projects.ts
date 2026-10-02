export type Project = {
  slug: string;
  title: string;
  tagline: string;
  purpose: string;
  features: string[];
  tech: string[];
  liveUrl: string;
  repoUrl: string;
  status: "active" | "archived";
  screenshots: { src: string; caption: string }[];
  videoUrl?: string;
  learned?: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "pila",
    title: "PILA",
    tagline: "Virtual queuing system for Filipino government offices.",
    purpose:
      "Helps people get a queue number remotely instead of standing in line at government offices, reducing wait times and crowding.",
    features: [
      "Remote queue ticketing",
      "QR code verification",
      "Staff dashboard for managing queues",
      "Real-time status updates",
    ],
    tech: [
      "@supabase/supabase-js",
      "@supabase/ssr",
      "next-pwa",
      "qrcode.react",
      "recharts",
    ],
    liveUrl: "https://pila-silk.vercel.app/",
    repoUrl: "https://github.com/yobb-bit/pila",
    status: "active",
    screenshots: [],
  },
  {
    slug: "pisoblox",
    title: "Pisoblox",
    tagline: "Roblox items, accounts, and robux marketplace with Filipino-language UI.",
    purpose:
      "A marketplace platform for Roblox-related items and accounts, designed with a Filipino-first experience.",
    features: [
      "Listings for items, accounts, and robux",
      "Filipino-language UI",
      "Supabase-backed data and auth",
      "Responsive marketplace interface",
    ],
    tech: [
      "framer-motion",
      "lucide-react",
      "@radix-ui/react-dropdown-menu",
      "tailwind-merge",
      "clsx",
      "@supabase/supabase-js",
    ],
    liveUrl: "https://pisoblox.vercel.app/",
    repoUrl: "https://github.com/yobb-bit/Pisoblox",
    status: "active",
    screenshots: [],
  },
  {
    slug: "linkd-design",
    title: "linkd.design",
    tagline: "Your link, your vibe.",
    purpose:
      "A customizable link-in-bio platform with animated effects, custom cursors, and background music to match your personal vibe.",
    features: [
      "Animated link cards and effects",
      "Custom cursor and visual effects",
      "Background music support",
      "Personalizable profile pages",
    ],
    tech: ["next.js", "react", "tailwindcss", "framer-motion"],
    liveUrl: "https://linkd-design.vercel.app/",
    repoUrl: "https://github.com/yobb-bit/linkd-design",
    status: "active",
    screenshots: [],
  },
];
