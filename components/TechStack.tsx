import {
  Apple, Atom, Braces, Cable, Code, Code2, CodeXml, Coffee, Database, GitBranch,
  Globe, Hexagon, Network, PanelsTopLeft, Palette, Route, Router, Server, Sparkles,
  TableProperties, Wind, Wrench, Zap,
} from "lucide-react";

const STACK_GROUPS = [
  { label: "Languages", icon: Code2, items: [
    { name: "JavaScript", icon: Braces }, { name: "TypeScript", icon: Code2 },
    { name: "Java", icon: Coffee }, { name: "C++", icon: CodeXml, level: "basic" },
    { name: "Python", icon: Code, level: "learning" },
  ] },
  { label: "Backend", icon: Server, items: [
    { name: "Node.js", icon: Hexagon }, { name: "Express.js", icon: Route },
    { name: "REST APIs", icon: Globe }, { name: "FastAPI", icon: Zap, level: "learning" },
  ] },
  { label: "Databases", icon: Database, items: [
    { name: "PostgreSQL", icon: Database }, { name: "MySQL", icon: Database },
    { name: "SQL", icon: TableProperties },
  ] },
  { label: "Frontend", icon: PanelsTopLeft, items: [
    { name: "HTML", icon: CodeXml }, { name: "CSS", icon: Palette },
    { name: "React", icon: Atom }, { name: "Tailwind CSS", icon: Wind },
  ] },
  { label: "Networking & IT", icon: Network, items: [
    { name: "Cisco Packet Tracer", icon: Network }, { name: "CCNA fundamentals", icon: Router },
    { name: "Network troubleshooting", icon: Cable }, { name: "Networking concepts", icon: Globe },
  ] },
  { label: "Tools", icon: Wrench, items: [
    { name: "Git", icon: GitBranch }, { name: "GitHub", icon: Code2 },
    { name: "VS Code", icon: PanelsTopLeft }, { name: "macOS", icon: Apple },
    { name: "AI-assisted development", icon: Sparkles },
  ] },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-section px-4 sm:px-6" aria-labelledby="tech-stack-title">
      <div className="container-narrow">
        <p className="section-label mb-4">tech stack</p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 id="tech-stack-title" className="font-pixel text-3xl sm:text-4xl lowercase text-ink">
              tools i work with
            </h2>
            <p className="text-base-ui text-gray-500 mt-3">A growing toolkit across software and IT.</p>
          </div>
          <div className="flex flex-wrap gap-2 text-micro text-gray-500" aria-label="Skill level key">
            <span className="tag">hands-on</span>
            <span className="tag border-dashed text-gray-400">learning / basics</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {STACK_GROUPS.map((group, index) => {
            const Icon = group.icon;
            return (
              <article key={group.label} className="card p-card transition-transform duration-[350ms] hover:-translate-y-1">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-[8px] border border-gray-200 text-gray-600 dark:text-gray-300">
                      <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <h3 className="font-pixel text-lg text-ink">{group.label}</h3>
                  </div>
                  <span className="text-micro text-gray-400">0{index + 1}</span>
                </div>
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item.name} className="flex items-center justify-between gap-2 rounded-[7px] px-2 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-100">
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[7px] border border-gray-200 bg-bg text-gray-500" aria-hidden="true">
                          <item.icon size={15} strokeWidth={1.7} />
                        </span>
                        <span className="text-small-ui text-gray-600 dark:text-gray-600">{item.name}</span>
                      </span>
                      {item.level && (
                        <span className="shrink-0 rounded-full border border-dashed border-gray-300 px-2 py-0.5 text-[9px] uppercase tracking-[0.7px] text-gray-400">
                          {item.level}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
