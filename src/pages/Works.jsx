import React, { useEffect, useState } from "react";
import ProjectCard from "../Components/ProjectCard";
import PageTransition from "../Components/PageTransition";

const Works = () => {
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => setProjectsData(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 mt-20 mb-20">
        {/* Header */}
        <div className="flex items-center gap-2 text-3xl font-bold mb-10">
          <span className="text-primary">#</span>Production Grade
          <div className="h-px bg-primary w-20 lg:w-96 ml-4"></div>
        </div>

        {/* Description */}
        <p className="text-gray-400 mb-12 max-w-2xl">
          A collection of my recent projects showcasing my skills in web
          development, design, and problem-solving.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="flex items-center gap-2 my-22 text-3xl font-bold mb-10">
          <span className="text-primary">#</span>Small Projects
          <div className="h-px bg-primary w-20 lg:w-96 ml-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Works;
