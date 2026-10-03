import Image from "next/image";

const STATS = [
  { num: "2nd", label: "Year IT Student" },
  { num: "13", label: "GitHub Repositories" },
  { num: "3+", label: "Apps Deployed" },
  { num: "10+", label: "Technologies" },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-section px-4 sm:px-6"
      aria-labelledby="about-title"
    >
      <div className="container-narrow">
        {/* Section label */}
        <p className="section-label mb-4">02 — about</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column: image + text */}
          <div>
            <div className="mb-8 flex justify-center lg:justify-start">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
                <Image
                  src="/portrait.png"
                  alt="John Kent Blancaflor portrait"
                  fill
                  sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
                  className="rounded-full object-cover object-center border-2 border-gray-200 shadow-lg transition-transform duration-500 ease-out-expo hover:scale-[1.02] dark:border-gray-700"
                  priority
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-gray-100/20 pointer-events-none" aria-hidden="true" />
              </div>
            </div>

            <h2
              id="about-title"
              className="font-pixel text-3xl sm:text-4xl lowercase text-ink mb-8 leading-tight"
            >
              A little bit<br />about me.
            </h2>

            <p className="text-base-ui text-gray-500 mb-5">
              I&apos;m a <strong className="text-ink">full-stack developer</strong> based in
              Albay. I enjoy building things for the web — from simple landing
              pages to complex web applications.
            </p>
            <p className="text-base-ui text-gray-500 mb-10">
              When I&apos;m not coding, you&apos;ll find me{" "}
              <strong className="text-ink">exploring new technologies</strong>,
              contributing to open source, or watching movie series.
            </p>

            <a
              href="/John-Kent-CV.pdf"
              download
              className="btn-primary inline-flex"
            >
              Download CV
            </a>
          </div>

          {/* Right column: stat grid */}
          <div className="stat-grid" role="list" aria-label="Statistics">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center" role="listitem">
                <div className="font-pixel text-3xl sm:text-4xl text-ink leading-none mb-2">
                  {stat.num}
                </div>
                <div className="text-micro text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}