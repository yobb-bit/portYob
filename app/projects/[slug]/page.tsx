import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS, type Project } from "@/lib/projects";

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
