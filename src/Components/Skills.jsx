import React from "react";
import { FaServer, FaCode, FaDatabase, FaMicrochip, FaGlobe } from "react-icons/fa";

const Skills = () => {
  const skillDomains = [
    {
      category: "Systems & Network Infrastructure",
      icon: <FaServer className="text-primary" />,
      skills: [
        "PC & Server Assembly",
        "Network Troubleshooting",
        "OS Deployment & Cloning",
        "Basic Routing & Subnetting",
        "Hardware Diagnostics",
        "Lab Infrastructure Setup"
      ]
    },
    {
      category: "Software & Web Engineering",
      icon: <FaCode className="text-primary" />,
      skills: [
        "React",
        "JavaScript (ES6+)",
        "Node.js & Express.js",
        "Tailwind CSS & daisyUI",
        "REST APIs & TanStack Query",
        "Git & GitHub Version Control"
      ]
    },
    {
      category: "Databases & Cloud Services",
      icon: <FaDatabase className="text-primary" />,
      skills: [
        "MongoDB",
        "Supabase (PostgreSQL, Auth, Storage)",
        "Firebase Authentication",
        "Postman API Testing",
        "Cloud Deployment (Vercel, Netlify)"
      ]
    },
    {
      category: "Formal Technical Curriculum (HSC/SSC)",
      icon: <FaMicrochip className="text-primary" />,
      skills: [
        "Computer Operation & Maintenance",
        "IT Support & IoT Fundamentals",
        "Specialized Electronics",
        "Higher Mathematics",
        "Applied Physics & Chemistry"
      ]
    },
    {
      category: "Leadership & Communication",
      icon: <FaGlobe className="text-primary" />,
      skills: [
        "English (Fluent / Academic)",
        "Bangla (Native)",
        "Inter-Trade Technical Debate",
        "Field Team Coordination (VBD)",
        "Youth Mentoring & Tutoring"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 mt-28">
      {/* Header */}
      <div className="flex items-center gap-3 text-2xl md:text-3xl font-bold mb-10">
        <span className="text-primary font-mono">#</span>
        <h2 className="text-white">technical-competencies</h2>
        <div className="h-px bg-primary/40 flex-1 max-w-xs ml-2"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillDomains.map((domain, index) => (
          <div
            key={index}
            className="border border-gray-800 bg-gray-900/30 p-5 hover:border-primary/40 transition-colors flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4 border-b border-gray-800 pb-3">
              <span className="text-lg">{domain.icon}</span>
              <h3 className="font-mono text-sm font-bold text-gray-200 uppercase tracking-wide">
                {domain.category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {domain.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-xs font-mono bg-gray-800/70 border border-gray-700/60 text-gray-300 px-2.5 py-1 rounded-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
