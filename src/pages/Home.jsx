import React from "react";
import Hero from "../Components/Hero";
import Projects from "../Components/Projects";
import Skills from "../Components/Skills";
import AboutMe from "../Components/AboutMe";
import Contact from "../Components/Contact";
import PageTransition from "../Components/PageTransition";

const Home = () => {
  return (
    <PageTransition>
      <div>
        <section>
          <Hero />
        </section>
        <section>
          <Projects />
        </section>
        <section>
          <Skills />
        </section>
        <section>
          <AboutMe />
        </section>
        <section>
          <Contact />
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;
