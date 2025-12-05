import React from "react";
import { Link } from "react-router";

const AboutMe = () => {
  return (
    <div className="container mx-auto px-4 mt-32">
      {/* Header */}
      <div className="flex items-center gap-2 text-3xl font-bold mb-12">
        <span className="text-primary">#</span>about-me
        <div className="h-px bg-primary w-20 lg:w-96 ml-4"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Left Side - Text Content */}
        <div className="lg:w-1/2 space-y-6">
          <p className="text-gray-300">Hello, i'm Atik!</p>

          <p className="text-gray-400 leading-relaxed">
            I'm a self-taught front-end developer based in Dhaka, Bangladesh. I
            can develop responsive websites from scratch and raise them into
            modern user-friendly web experiences.
          </p>

          <p className="text-gray-400 leading-relaxed">
            Transforming my creativity and knowledge into websites has been my
            passion for over a year. I have been helping various clients to
            establish their presence online. I always strive to learn about the
            newest technologies and frameworks.
          </p>

          <Link
            to="/about"
            className="btn btn-outline border-primary text-white hover:bg-primary hover:text-black hover:border-primary rounded-none font-normal px-6 inline-flex items-center gap-2 mt-4"
          >
            Read more <span className="font-mono">→</span>
          </Link>
        </div>

        {/* Right Side - Decorative Elements */}
        <div className="lg:w-1/2 relative min-h-[300px] hidden lg:block">
          {/* Dot Pattern 1 - Top Right */}
          <div className="absolute top-0 right-32 grid grid-cols-5 gap-2">
            {[...Array(25)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-gray-500 rounded-full"></div>
            ))}
          </div>

          {/* Dot Pattern 2 - Middle Right */}
          <div className="absolute top-40 right-0 grid grid-cols-5 gap-2">
            {[...Array(25)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-gray-500 rounded-full"></div>
            ))}
          </div>

          {/* Line decoration at bottom */}
          <div className="absolute bottom-0 right-0 w-64 h-px bg-primary"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
