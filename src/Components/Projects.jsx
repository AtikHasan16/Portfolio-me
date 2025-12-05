import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router";

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => setProjectsData(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div id="works" className="container mx-auto px-4 mt-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-2 text-3xl font-bold">
          <span className="text-primary">#</span>projects
          <div className="h-px bg-primary w-20 lg:w-96 ml-4"></div>
        </div>
        <Link
          to={"/works"}
          className="text-white hover:text-primary transition-colors flex items-center gap-2"
        >
          View all <span className="font-mono">&gt;</span>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
