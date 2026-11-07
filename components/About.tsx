import Image from "next/image";
import { publicPath } from "@/lib/site-path";

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

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-16 items-center">
          {/* Left column: image + text */}
          <div>
            <div className="mb-8 flex justify-center lg:justify-start">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
                <Image
                  src={publicPath("/portrait.png")}
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
              className="font-pixel text-3xl sm:text-[2.6rem] lowercase text-ink mb-6 leading-tight"
            >
              it student.<br />
              support mindset.
            </h2>

            <p className="text-base-ui text-gray-500 mb-4">
              3rd-year IT student in the Philippines with hands-on experience in customer support, e-commerce, and digital order fulfillment.
            </p>
            <p className="text-base-ui text-gray-500">
              Growing toward IT support, networking, troubleshooting, and backend/API development through practical work and continuous learning.
            </p>

            <a
              href={publicPath("/John-Kent-CV.pdf")}
              download
              className="btn-primary inline-flex mt-8"
            >
              Download CV
            </a>
          </div>

          <div className="card p-card sm:p-8">
            <div className="flex items-center justify-between gap-4 mb-6">
              <p className="text-micro text-gray-400">career direction</p>
              <span className="tag">learning by doing</span>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[12px] border border-gray-200 bg-gray-200">
              {[
                ["01", "IT support"],
                ["02", "Networking"],
                ["03", "Backend & APIs"],
                ["04", "Databases"],
              ].map(([number, focus]) => (
                <div key={number} className="bg-bg p-4 sm:p-5">
                  <p className="text-micro text-gray-400 mb-2">{number}</p>
                  <p className="font-pixel text-lg sm:text-xl text-ink">{focus}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
