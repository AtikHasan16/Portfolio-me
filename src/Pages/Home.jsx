import React from "react";
import Hero from "../Components/Hero";
import Projects from "../Components/Projects";

const Home = () => {
  return (
    <div>
      <section>
        <Hero />
      </section>
      <section>
        <Projects />
      </section>
      <section>{/* Skills */}</section>
      <section>{/* about */}</section>
      <section>{/* contacts */}</section>
    </div>
  );
};

export default Home;
