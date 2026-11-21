import React, { useEffect, useState } from "react";
import ProjectCard from "../Components/ProjectCard";
import PageTransition from "../Components/PageTransition";
import MetaData from "../Components/MetaData";
import { getStoredProjects } from "../lib/dataService";
import { useLanguage } from "../Contexts/useLanguage";
import { FaLayerGroup, FaServer, FaCode } from "react-icons/fa";

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    let mounted = true;
    getStoredProjects()
      .then((data) => {
        if (mounted) {
          setProjectsData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const filteredProjects = projectsData.filter((p) => {
    if (activeTab === "all") return true;
    return p.category === activeTab;
  });

  return (
    <>
      <MetaData
        title="Atik Hasan | Projects & Systems Portfolio"
        description="Academic, Systems Infrastructure, and Full-Stack Engineering projects by MD Atik Hasan."
        keywords="Network Engineering, Systems Infrastructure, Hardware Setup, Full Stack, React, Node.js"
      />
      <PageTransition>
        <div className="container mx-auto px-4 mt-24 mb-24 max-w-7xl">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 text-3xl md:text-4xl font-bold mb-3">
              <span className="text-primary font-mono">/</span>
              <h1 className="text-white">projects-portfolio</h1>
            </div>
            <p className="text-gray-400 font-mono text-sm max-w-2xl leading-relaxed">
              Demonstrating both physical systems infrastructure (server lab setups, network troubleshooting) and full-stack software development.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-800 pb-4 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 px-4 py-2 border transition-all ${
                activeTab === "all"
                  ? "border-primary bg-primary text-black font-bold"
                  : "border-gray-800 bg-gray-900/40 text-gray-400 hover:border-gray-700 hover:text-white"
              }`}
            >
              <FaLayerGroup />
              <span>{t("projects.tabAll")}</span>
              <span className="opacity-70">({projectsData.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("academic")}
              className={`flex items-center gap-2 px-4 py-2 border transition-all ${
                activeTab === "academic"
                  ? "border-primary bg-primary text-black font-bold"
                  : "border-gray-800 bg-gray-900/40 text-gray-400 hover:border-gray-700 hover:text-white"
              }`}
            >
              <FaServer />
              <span>{t("projects.tabAcademic")}</span>
              <span className="opacity-70">
                ({projectsData.filter((p) => p.category === "academic").length})
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("technical")}
              className={`flex items-center gap-2 px-4 py-2 border transition-all ${
                activeTab === "technical"
                  ? "border-primary bg-primary text-black font-bold"
                  : "border-gray-800 bg-gray-900/40 text-gray-400 hover:border-gray-700 hover:text-white"
              }`}
            >
              <FaCode />
              <span>{t("projects.tabTechnical")}</span>
              <span className="opacity-70">
                ({projectsData.filter((p) => p.category === "technical").length})
              </span>
            </button>
          </div>

          {/* Project Cards Grid */}
          {loading ? (
            <div className="py-20 text-center font-mono text-gray-500">
              Loading portfolio projects...
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center border border-gray-800 bg-gray-900/20 font-mono text-gray-400">
              No projects found in this category.
            </div>
          )}
        </div>
      </PageTransition>
    </>
  );
};

export default Projects;
