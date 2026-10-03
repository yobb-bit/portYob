import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Certificates from "@/components/Certificates";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <hr className="divider mx-auto max-w-6xl px-6 md:px-10 lg:px-16" aria-hidden="true" />
      <About />
      <hr className="divider mx-auto max-w-6xl px-6 md:px-10 lg:px-16" aria-hidden="true" />
      <Skills />
      <hr className="divider mx-auto max-w-6xl px-6 md:px-10 lg:px-16" aria-hidden="true" />
      <Projects />
      <hr className="divider mx-auto max-w-6xl px-6 md:px-10 lg:px-16" aria-hidden="true" />
      <Certificates />
      <hr className="divider mx-auto max-w-6xl px-6 md:px-10 lg:px-16" aria-hidden="true" />
      <Contact />
      <Footer />
    </>
  );
}