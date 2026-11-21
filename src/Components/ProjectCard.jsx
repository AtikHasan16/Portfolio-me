import React, { useState } from "react";
import { FaExternalLinkAlt, FaGithub, FaServer, FaCode } from "react-icons/fa";

const ProjectCard = ({ project }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="border border-gray-700 bg-gray-900/40 hover:border-primary/60 transition-all flex flex-col group">
      {/* Visual Header / Image Container */}
      <div className="h-48 overflow-hidden border-b border-gray-700 bg-gray-950 flex items-center justify-center relative">
        {project.image && !imageError ? (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500">
            {project.category === "academic" ? (
              <FaServer className="text-4xl text-primary/70 mb-2" />
            ) : (
              <FaCode className="text-4xl text-primary/70 mb-2" />
            )}
            <span className="text-xs uppercase tracking-wider text-gray-400 font-mono">
              {project.category === "academic" ? "Systems & Lab Infrastructure" : "Full-Stack Application"}
            </span>
          </div>
        )}

        {/* Category Pill Tag */}
        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm border border-gray-700 text-xs px-2.5 py-1 text-primary font-mono uppercase">
          {project.category || "Project"}
        </div>
      </div>

      {/* Tech Stack Strip */}
      <div className="p-3 border-b border-gray-700 bg-gray-900/80 flex flex-wrap gap-1.5 text-xs text-gray-300 font-mono">
        {Array.isArray(project.techStack) &&
          project.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="bg-gray-800/80 border border-gray-700/80 px-2 py-0.5 rounded-sm text-gray-300"
            >
              {tech}
            </span>
          ))}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-baseline justify-between gap-2 mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          {project.date && (
            <span className="text-xs text-gray-500 font-mono shrink-0">{project.date}</span>
          )}
        </div>

        {project.role && (
          <p className="text-xs text-primary/90 font-mono mb-3">
            <span className="text-gray-500">Role: </span>
            {project.role}
          </p>
        )}

        <p className="text-gray-400 text-sm mb-6 flex-1 leading-relaxed">
          {project.description}
        </p>

        {/* Buttons / Actions */}
        <div className="flex flex-wrap gap-3 mt-auto pt-3 border-t border-gray-800/80">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-xs btn-outline border-primary text-primary hover:bg-primary hover:text-black rounded-none font-mono flex items-center gap-1.5 px-3"
            >
              <span>Live</span>
              <FaExternalLinkAlt className="text-[10px]" />
            </a>
          )}

          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-xs btn-outline border-gray-600 text-gray-300 hover:border-primary hover:text-primary rounded-none font-mono flex items-center gap-1.5 px-3"
            >
              <FaGithub className="text-xs" />
              <span>Repository</span>
            </a>
          )}

          {!project.liveLink && !project.repoLink && (
            <span className="text-xs text-gray-500 font-mono py-1">
              [ Institutional Systems Deployment ]
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
