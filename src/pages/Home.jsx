import React from "react";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import AboutMe from "../components/AboutMe";
import Contacts from "../components/Contacts";

const Home = () => {
  return (
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
        <Contacts />
      </section>
    </div>
  );
};

export default Home;
