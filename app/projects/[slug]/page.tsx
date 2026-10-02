import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ImageGallery from "@/components/ImageGallery";
import { PROJECTS } from "@/lib/projects";

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — ${project.tagline}`,
    description: project.purpose,
  };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label mb-4">{children}</p>;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="py-section px-6 md:px-10 lg:px-16" aria-labelledby="project-title">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>project</SectionLabel>
        <h1
          id="project-title"
          className="font-pixel text-3xl sm:text-4xl lowercase text-ink mb-4"
        >
          {project.title}
        </h1>
        <p className="text-base-ui text-gray-500 max-w-2xl mb-8">
          {project.tagline}
        </p>

        {project.award && (
          <div className="card mb-8 max-w-3xl">
            <div className="p-5">
              <p className="section-label mb-2">achievement</p>
              <p className="text-base-ui text-ink mb-3">{project.award}</p>
              <div className="flex flex-wrap gap-2">
                {project.teamSize && <span className="tag">{project.teamSize}</span>}
                {project.timeline && <span className="tag">{project.timeline}</span>}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4 mb-10">
          <a href={project.liveUrl} className="btn-primary" target="_blank" rel="noopener noreferrer">
            View Live
          </a>
          <a href={project.repoUrl} className="btn-link" target="_blank" rel="noopener noreferrer">
            View Source
          </a>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="font-pixel text-xl sm:text-2xl lowercase text-ink mb-4">
              What is this for?
            </h2>
            <p className="text-base-ui text-gray-500 max-w-3xl">
              {project.purpose}
            </p>
          </section>

          {project.features.length > 0 && (
            <section>
              <h2 className="font-pixel text-xl sm:text-2xl lowercase text-ink mb-4">
                Features
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-base-ui text-gray-500 max-w-3xl">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>
          )}

          {project.tech.length > 0 && (
            <section>
              <h2 className="font-pixel text-xl sm:text-2xl lowercase text-ink mb-4">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2 max-w-3xl">
                {project.tech.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {project.learned && project.learned.length > 0 && (
            <section>
              <h2 className="font-pixel text-xl sm:text-2xl lowercase text-ink mb-4">
                What I Learned
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-base-ui text-gray-500 max-w-3xl">
                {project.learned.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {project.uiShots && project.uiShots.length > 0 && (
            <section>
              <h2 className="font-pixel text-xl sm:text-2xl lowercase text-ink mb-4">
                The app
              </h2>
              {/* These are phone screenshots (portrait), so the grid stays
                  narrow and centers — stretching them wide would look odd. */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5 max-w-5xl">
                {project.uiShots.map((shot) => (
                  <figure
                    key={shot.src}
                    className="group overflow-hidden rounded-[12px] border border-gray-200 bg-gray-50 transition-all duration-[350ms] ease-out-expo hover:-translate-y-[2px] hover:border-gray-300 hover:shadow-card-hover"
                  >
                    <div className="aspect-[9/16] overflow-hidden">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        width={1080}
                        height={1920}
                        className="h-full w-full object-cover object-top transition-transform duration-[500ms] ease-out-expo group-hover:scale-[1.05]"
                      />
                    </div>
                    {shot.caption && (
                      <figcaption className="px-3 py-2 text-micro text-gray-500">
                        {shot.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </section>
          )}

          {project.screenshots.length > 0 && (
            <section>
              <h2 className="font-pixel text-xl sm:text-2xl lowercase text-ink mb-4">
                Behind the build
              </h2>
              <ImageGallery
                images={project.screenshots}
                label={`${project.title} screenshots`}
                columns={project.screenshots.some((s) => s.ratio === "wide") ? 2 : 3}
              />
            </section>
          )}

          <section>
            <Link href="/#projects" className="btn-link">
              ← Back to Projects
            </Link>
          </section>
        </div>
      </div>
    </section>
  );
}
