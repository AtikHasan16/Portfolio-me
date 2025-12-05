import React from "react";
import Hero from "../Components/Hero";
import Projects from "../Components/Projects";
import Skills from "../Components/Skills";
import AboutMe from "../Components/AboutMe";
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
          {/* About and contact section */}
          <AboutMe />
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;
