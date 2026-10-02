export default function Contact() {
  return (
    <section
      id="contact"
      className="py-section px-4 sm:px-6"
      aria-labelledby="contact-title"
    >
      <div className="container-narrow text-center">
        <p className="section-label mb-4">05 — contact</p>

        <h2
          id="contact-title"
          className="font-pixel text-3xl sm:text-4xl lowercase text-ink mb-4"
        >
          Let&apos;s work<br />together.
        </h2>
        <p className="text-base-ui text-gray-500 max-w-2xl mx-auto mb-10">
          Have a project in mind or just want to chat? My inbox is always open.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="mailto:johnkenttblancaflor@gmail.com"
            className="btn-primary"
          >
            Email Me
          </a>
          <a
            href="https://www.facebook.com/itsyaboikent"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-link"
          >
            Facebook
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <a
            href="https://github.com/yobb-bit"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-link"
          >
            GitHub
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}