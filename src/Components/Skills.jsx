import React from "react";

const Skills = () => {
  const skillsData = {
    Languages: ["HTML", "CSS", "JavaScript"],
    "Frameworks & Database": [
      "Tailwind CSS",
      "React",
      "Next.js",
      "Express.js",
      "MongoDB",
    ],
    Tools: ["Git", "GitHub", "Firebase", "Postman"],
    "Soft Skills": ["Communication", "Project Management", "Teamwork"],
  };

  return (
    <div className="container mx-auto px-4 mt-32">
      {/* Header */}
      <div className="flex items-center gap-2 text-3xl font-bold mb-16">
        <span className="text-primary">#</span>skills
        <div className="h-px bg-primary w-20 lg:w-96 ml-4"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left Side - Decorative Elements */}
        <div className="lg:w-1/3 relative hidden lg:block">
          {/* Dot Pattern 1 */}
          <div className="absolute top-0 left-0 grid grid-cols-5 gap-2">
            {[...Array(25)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-gray-500 rounded-full"></div>
            ))}
          </div>

          {/* Geometric Shapes */}
          <div className="absolute top-32 left-16">
            <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
              <rect
                x="20"
                y="20"
                width="60"
                height="60"
                stroke="#2ffafa"
                strokeWidth="1"
              />
              <rect
                x="40"
                y="40"
                width="60"
                height="60"
                stroke="#2ffafa"
                strokeWidth="1"
              />
              <rect
                x="60"
                y="60"
                width="60"
                height="60"
                stroke="#2ffafa"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Dot Pattern 2 */}
          <div className="absolute top-64 left-32 grid grid-cols-5 gap-2">
            {[...Array(25)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-gray-500 rounded-full"></div>
            ))}
          </div>

          {/* Square Outline */}
          <div className="absolute bottom-32 right-0">
            <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
              <rect
                x="10"
                y="10"
                width="60"
                height="80"
                stroke="#666"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>

        {/* Right Side - Skills Grid */}
        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category} className="border border-gray-600 p-4">
              <h3 className="text-white font-semibold mb-3">{category}</h3>
              <p className="text-gray-400 text-sm">{skills.join(" ")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
