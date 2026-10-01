import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="lg:pl-[14rem]">
        <Hero />
        <hr className="divider mx-auto max-w-[42rem] px-4 sm:px-6" aria-hidden="true" />
        <About />
        <hr className="divider mx-auto max-w-[42rem] px-4 sm:px-6" aria-hidden="true" />
        <Skills />
        <hr className="divider mx-auto max-w-[42rem] px-4 sm:px-6" aria-hidden="true" />
        <Projects />
        <hr className="divider mx-auto max-w-[42rem] px-4 sm:px-6" aria-hidden="true" />
        <Contact />
        <Footer />
      </main>
    </>
  );
}