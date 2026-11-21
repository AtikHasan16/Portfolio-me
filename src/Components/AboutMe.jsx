import React from "react";
import { Link } from "react-router";
import { FaGraduationCap, FaHandsHelping, FaLaptopCode, FaMapMarkerAlt } from "react-icons/fa";

const AboutMe = () => {
  return (
    <div className="container mx-auto px-4 mt-28">
      {/* Header */}
      <div className="flex items-center gap-3 text-2xl md:text-3xl font-bold mb-10">
        <span className="text-primary font-mono">#</span>
        <h2 className="text-white">academic-background</h2>
        <div className="h-px bg-primary/40 flex-1 max-w-xs ml-2"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Summary Narrative */}
        <div className="lg:col-span-7 space-y-4 text-gray-300 leading-relaxed text-sm md:text-base">
          <p>
            I am a technical graduate in <strong className="text-primary">Computer Operation and Maintenance</strong> from <span className="text-white font-medium">Jamalpur Govt. Technical School and College</span>, graduating with a 4.80/5.00 GPA and ranked 2nd among over 100 students in the board examination.
          </p>

          <p className="text-gray-400">
            My foundational training bridges low-level hardware diagnostics, server deployment, and structured networking with modern full-stack web software engineering (React, Node.js, Express, and MongoDB/Supabase). I enjoy diagnosing complex systems problems—from setting up 30+ physical workstations in our institutional computer lab to deploying scalable community web applications.
          </p>

          <p className="text-gray-400">
            Beyond the lab, I serve on the District Board of <span className="text-white">Volunteer for Bangladesh (VBD)</span>, leading youth volunteers across 10+ community initiatives aligned with the UN Sustainable Development Goals (SDGs), and founded a free rural English language tutoring club for under-resourced children in Jamalpur.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 font-mono text-sm">
            <Link
              to="/education"
              className="btn btn-sm btn-outline border-primary text-primary hover:bg-primary hover:text-black rounded-none"
            >
              Academic Credentials →
            </Link>
            <Link
              to="/community"
              className="btn btn-sm btn-outline border-gray-700 text-gray-300 hover:border-primary hover:text-primary rounded-none"
            >
              Community Work →
            </Link>
          </div>
        </div>

        {/* Right Side: Key Profile Cards */}
        <div className="lg:col-span-5 space-y-3 font-mono">
          <div className="border border-gray-800 bg-gray-900/40 p-4 flex items-start gap-3">
            <FaGraduationCap className="text-primary text-xl mt-1 shrink-0" />
            <div>
              <div className="text-white font-bold text-sm">Formal Education</div>
              <div className="text-xs text-gray-400">HSC (Comp. Operation) & SSC (IT Support & IoT)</div>
              <div className="text-xs text-primary/80 mt-1">GPA 4.80 (2nd Rank) & GPA 4.79 (3rd Rank)</div>
            </div>
          </div>

          <div className="border border-gray-800 bg-gray-900/40 p-4 flex items-start gap-3">
            <FaLaptopCode className="text-primary text-xl mt-1 shrink-0" />
            <div>
              <div className="text-white font-bold text-sm">Technical Domain Focus</div>
              <div className="text-xs text-gray-400">Network Troubleshooting, Lab Server Setup, Web Platforms</div>
              <div className="text-xs text-primary/80 mt-1">ASSET National Skill Competition Divisional Finalist</div>
            </div>
          </div>

          <div className="border border-gray-800 bg-gray-900/40 p-4 flex items-start gap-3">
            <FaHandsHelping className="text-primary text-xl mt-1 shrink-0" />
            <div>
              <div className="text-white font-bold text-sm">Civic Leadership</div>
              <div className="text-xs text-gray-400">Project Officer, Volunteer for Bangladesh (VBD)</div>
              <div className="text-xs text-primary/80 mt-1">10+ SDG Community Initiatives & Village Tutoring</div>
            </div>
          </div>

          <div className="border border-gray-800 bg-gray-900/40 p-3 flex items-center gap-2 text-xs text-gray-400">
            <FaMapMarkerAlt className="text-primary" />
            <span>Jamalpur, Bangladesh • Available for global university admission</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
