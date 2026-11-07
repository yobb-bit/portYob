import { ClipboardCheck, MessageCircle, PackageCheck, Store } from "lucide-react";
import Image from "next/image";
import { publicPath } from "@/lib/site-path";

const EXPERIENCE = [
  {
    company: "eBay",
    logo: "/experience/ebay.webp",
    role: "Digital product delivery / order fulfillment",
    duration: "< 4 months",
    summary: "Accurate digital order fulfillment with customer support built into the process.",
    highlights: [
      { icon: ClipboardCheck, label: "Order checks", detail: "Purchases & transaction details" },
      { icon: PackageCheck, label: "Fulfillment", detail: "Digital delivery & order completion" },
      { icon: MessageCircle, label: "Customer care", detail: "Resolve issues, follow workflows" },
    ],
    skills: ["Customer Support", "Order Management", "Attention to Detail", "Problem Solving"],
    tools: ["eBay", "Order management", "Digital delivery"],
  },
  {
    company: "Bloxystore.com",
    logo: "/experience/bloxystore.avif",
    role: "Shopify order fulfillment",
    duration: "< 5 months",
    summary: "Order handling for an online digital and Roblox-related business.",
    highlights: [
      { icon: Store, label: "Store operations", detail: "Shopify orders & transactions" },
      { icon: MessageCircle, label: "Customer inbox", detail: "Customer-facing communication" },
      { icon: ClipboardCheck, label: "Online workflow", detail: "Digital products & order handling" },
    ],
    skills: ["Digital Product Operations", "Online Transactions", "Customer-Facing Work"],
    tools: ["Shopify", "Shopify Inbox", "Gmail", "Discord"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-section px-4 sm:px-6" aria-labelledby="experience-title">
      <div className="container-narrow">
        <p className="section-label mb-4">work experience</p>
        <h2 id="experience-title" className="font-pixel text-3xl sm:text-4xl lowercase text-ink mb-10">
          experience
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXPERIENCE.map((item) => (
            <article key={item.company} className="card p-card flex flex-col">
              <div className="flex items-start gap-3 mb-5">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[12px] border border-gray-200 bg-black p-1" aria-hidden="true">
                  <Image src={publicPath(item.logo)} alt="" fill sizes="44px" className="object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-pixel text-2xl text-ink">{item.company}</h3>
                    <span className="rounded-full border border-gray-300 px-2.5 py-1 text-micro text-gray-500">{item.duration}</span>
                  </div>
                  <p className="text-micro text-gray-500 mt-1">{item.role}</p>
                </div>
              </div>

              <p className="text-small-ui text-gray-500 border-b border-gray-200 pb-4 mb-4">{item.summary}</p>

              <div className="space-y-3 mb-5">
                {item.highlights.map((highlight) => {
                  const Icon = highlight.icon;
                  return (
                    <div key={highlight.label} className="flex items-center gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                        <Icon size={15} strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-small-ui font-medium text-ink">{highlight.label}</p>
                        <p className="text-[12px] leading-snug text-gray-500">{highlight.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto border-t border-gray-200 pt-4">
                <p className="text-micro text-gray-400 mb-2">transferable skills</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.skills.map((skill) => <span key={skill} className="tag">{skill}</span>)}
                </div>
                <p className="text-micro text-gray-400 mb-2">platforms &amp; tools</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tools.map((tool) => <span key={tool} className="tag tag-featured">{tool}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
