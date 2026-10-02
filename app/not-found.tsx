import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-section px-6 md:px-10 lg:px-16" aria-labelledby="not-found-title">
      <div className="max-w-6xl mx-auto text-center">
        <p className="section-label mb-4">404</p>
        <h1
          id="not-found-title"
          className="font-pixel text-3xl sm:text-4xl lowercase text-ink mb-4"
        >
          Page not found
        </h1>
        <p className="text-base-ui text-gray-500 max-w-2xl mx-auto mb-10">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
