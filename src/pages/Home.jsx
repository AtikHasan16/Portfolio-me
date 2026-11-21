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
        title="MD Atik Hasan | Computer Systems & Network Infrastructure Aspirant"
        description="Academic portfolio, systems engineering projects, and leadership roadmap of MD Atik Hasan for undergraduate admissions and scholarships."
        keywords="MD Atik Hasan, Computer Engineering, Network Infrastructure, Undergraduate Scholarship, Jamalpur Technical School"
        author="MD Atik Hasan"
      />
      <PageTransition>
        <div className="space-y-16">
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
        </div>
      </PageTransition>
    </>
  );
};

export default Home;
