import React from "react";
import Hero from "../Components/Hero";
import Projects from "../Components/Projects";
import Skills from "../Components/Skills";
import AboutMe from "../Components/AboutMe";
import Contacts from "../Components/Contacts";

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
