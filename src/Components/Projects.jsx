import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router";
import { getStoredProjects } from "../lib/dataService";
import { useLanguage } from "../Contexts/useLanguage";

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    let mounted = true;
    getStoredProjects()
      .then((data) => {
        if (mounted) {
          setProjectsData(data.slice(0, 3)); // show top 3 on homepage
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div id="projects" className="container mx-auto px-4 mt-28">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3 text-2xl md:text-3xl font-bold">
          <span className="text-primary font-mono">#</span>
          <h2 className="text-white">{t("projects.title")}</h2>
          <div className="h-px bg-primary/40 w-16 md:w-48 ml-2"></div>
        </div>

        <Link
          to="/projects"
          className="text-gray-300 hover:text-primary transition-colors text-sm font-mono flex items-center gap-1.5"
        >
          <span>{t("projects.viewAll")}</span>
          <span>→</span>
        </Link>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-12 text-gray-500 font-mono text-sm">
          Loading curated technical projects...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
