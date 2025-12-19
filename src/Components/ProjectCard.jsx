import React from "react";
// Importing the single image for now

const ProjectCard = ({ project }) => {
  return (
    <div className="border border-gray-600 bg-transparent flex flex-col">
      {/* Image */}
      <div className="h-62  overflow-hidden border-b border-gray-600">
        <img
          src={project.image} // Using the imported image
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Tech Stack */}
      <div className="p-2 border-b border-gray-600 text-gray-400 text-sm flex flex-wrap gap-2">
        {project.techStack.map((tech, index) => (
          <span key={index}>{tech.split(" ").join(",")}</span>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-1">
          {project.description}
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-auto">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline border-primary text-white hover:bg-primary hover:text-black hover:border-primary rounded-none font-normal px-4"
          >
            Live <span className="font-mono">&lt;~&gt;</span>
          </a>
          <a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline border-primary text-white hover:bg-primary hover:text-black hover:border-primary rounded-none font-normal px-4"
          >
            View Repo <span className="font-mono">~&gt;</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
