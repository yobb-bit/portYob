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
  screenshots: {
    src: string;
    alt: string;
    caption?: string;
    ratio?: "default" | "compact";
  }[];
  /** Screenshots of the app UI. Phone-shaped, so they get their own grid. */
  uiShots?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  videoUrl?: string;
  learned?: string[];
  /** e.g. "Won 3rd place at Polytechnic Institute of Tobacco Startup Competition" */
  award?: string;
  teamSize?: string;
  timeline?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "pila",
    title: "PILA",
    tagline: "Virtual queuing system for Filipino government offices.",
    purpose:
      "Instead of arriving extremely early and waiting in long lines, people can access PILA, create an account, and get a virtual ticket from their device. When it's their turn (or when they're about to be called), they're notified to go to the office. Failing to show up when called may result in being skipped.",
    features: [
      "Remote queue ticketing",
      "Account creation and authentication",
      "QR code verification",
      "Staff dashboard for managing queues",
      "Turn notifications to reduce crowding",
      "Installable as a PWA",
    ],
    tech: [
      "@supabase/supabase-js",
      "@supabase/ssr",
      "next-pwa",
      "qrcode.react",
      "recharts",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
    liveUrl: "https://pila-silk.vercel.app/",
    repoUrl: "https://github.com/yobb-bit/pila",
    status: "active",
    award: "Won 3rd place at Polytechnic Institute of Tobacco Startup Competition",
    teamSize: "3 people",
    timeline: "Built in 1 week for the competition",
    uiShots: [
      {
        src: "/projects/pila-ui-01.jpg",
        alt: "The PILA login screen",
        caption: "Sign in",
      },
      {
        src: "/projects/pila-ui-02.jpg",
        alt: "The PILA account registration screen",
        caption: "Create an account",
      },
      {
        src: "/projects/pila-ui-03.jpg",
        alt: "Statistics screen showing service time in hours per office",
        caption: "Average service time per office",
      },
      {
        src: "/projects/pila-ui-04.jpg",
        alt: "List of government offices available to queue at",
        caption: "Offices available",
      },
      {
        src: "/projects/pila-ui-05.jpg",
        alt: "Live count of people currently waiting in the queue",
        caption: "Who's currently waiting",
      },
      {
        src: "/projects/pila-ui-06.jpg",
        alt: "A user's own queue ticket after taking one",
        caption: "Your ticket",
      },
    ],
    screenshots: [
      {
        src: "/projects/pila-01.jpg",
        alt: "The team working together on the code during preparation",
        caption: "Preparation — the team coding together",
      },
      {
        src: "/projects/pila-02.jpg",
        alt: "Presenting the PILA app at the startup competition",
        caption: "Presenting PILA at the competition",
      },
      {
        src: "/projects/pila-03.jpg",
        alt: "The team after presenting PILA at the competition",
        caption: "After the presentation",
      },
      {
        src: "/projects/pila-04.jpg",
        alt: "The team on stage receiving the 3rd place award",
        caption: "On stage receiving 3rd place",
      },
      {
        src: "/projects/pila-05.jpg",
        alt: "Certificate of participation from the competition",
        caption: "Certificate of participation",
        ratio: "compact",
      },
    ],
    learned: [
      "Building with Supabase (Auth + RLS) for secure data access",
      "Creating a staff dashboard to manage queues in real-time",
      "Implementing QR code verification for ticket validation",
      "Working as a team under a tight timeline for a competition",
    ],
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
