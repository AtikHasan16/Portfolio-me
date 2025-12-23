import React from "react";
import Hero from "../Components/Hero";
import Projects from "../Components/Projects";
import Skills from "../Components/Skills";
import AboutMe from "../Components/AboutMe";
import PageTransition from "../Components/PageTransition";
import MetaData from "../Components/MetaData";

const Home = () => {
  return (
    <>
      <MetaData
        title="Atik Hasan | Home"
        description="Welcome to my portfolio. Here you'll find a collection of my recent projects showcasing my skills in web development, design, and problem-solving."
        keywords="Atik Hasan, Portfolio, Home, Projects, Web Development, Design, Problem Solving"
        author="Atik Hasan"
      />
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
    </>
  );
};

export default Home;
