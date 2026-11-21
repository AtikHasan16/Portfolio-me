import React, { useEffect, useState } from "react";
import PageTransition from "../Components/PageTransition";
import MetaData from "../Components/MetaData";
import { getStoredCommunityProjects } from "../lib/dataService";
import { FaHandsHelping, FaUsers, FaCalendarAlt, FaCheckCircle, FaImage } from "react-icons/fa";

const Community = () => {
  const [communityProjects, setCommunityProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getStoredCommunityProjects()
      .then((data) => {
        if (mounted) {
          setCommunityProjects(data);
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

  return (
    <>
      <MetaData
        title="Atik Hasan | Community Engagement & Leadership Roadmap"
        description="Documented timeline of youth leadership, SDG initiatives, and community impact (December 2023 – January 2026)."
        keywords="Volunteer for Bangladesh, VBD, Community Leadership, SDGs, Youth Work, Jamalpur"
      />
      <PageTransition>
        <div className="container mx-auto px-4 mt-24 mb-24 max-w-7xl">
          {/* Header */}
          <div className="mb-14">
            <div className="flex items-center gap-3 text-3xl md:text-4xl font-bold mb-3">
              <span className="text-primary font-mono">/</span>
              <h1 className="text-white">community-engagement</h1>
            </div>
            <p className="text-gray-400 font-mono text-sm max-w-3xl leading-relaxed">
              A documented timeline of civic responsibility, field team coordination, and grassroots education (December 2023 – January 2026) demonstrating commitment to societal progress alongside technical development.
            </p>

            {/* Overview Summary Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 font-mono text-xs">
              <div className="border border-gray-800 bg-gray-900/40 p-3">
                <span className="text-gray-500 block">Total Horizon</span>
                <span className="text-white font-bold text-sm">Dec 2023 – Jan 2026</span>
              </div>
              <div className="border border-gray-800 bg-gray-900/40 p-3">
                <span className="text-gray-500 block">Civic Organization</span>
                <span className="text-primary font-bold text-sm">Volunteer for Bangladesh</span>
              </div>
              <div className="border border-gray-800 bg-gray-900/40 p-3">
                <span className="text-gray-500 block">Total Reach</span>
                <span className="text-white font-bold text-sm">1,500+ Beneficiaries</span>
              </div>
              <div className="border border-gray-800 bg-gray-900/40 p-3">
                <span className="text-gray-500 block">UN Framework</span>
                <span className="text-primary font-bold text-sm">SDGs 1, 3, 4, 10, 11, 13</span>
              </div>
            </div>
          </div>

          {/* Sticky Roadmap Showcase Section */}
          {loading ? (
            <div className="text-center py-20 font-mono text-gray-500">
              Loading community timeline...
            </div>
          ) : (
            <div className="space-y-16">
              {communityProjects.map((project, index) => (
                <div
                  key={project.id || index}
                  className="border border-gray-800 bg-gray-900/30 p-6 lg:p-8 rounded-none relative transition-all hover:border-primary/50"
                >
                  {/* Step Index Watermark */}
                  <div className="absolute top-4 right-6 text-5xl md:text-6xl font-mono font-black text-gray-800/40 pointer-events-none select-none">
                    0{index + 1}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Sticky Project Details */}
                    <div className="lg:col-span-7 space-y-5 lg:sticky lg:top-28">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-xs font-mono">
                          <FaCalendarAlt className="text-[10px]" />
                          <span>{project.period}</span>
                        </span>

                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-800 border border-gray-700 text-gray-300 text-xs font-mono">
                          <FaUsers className="text-[10px] text-primary" />
                          <span>{project.beneficiaries}</span>
                        </span>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                        {project.title}
                      </h2>

                      <p className="text-xs font-mono text-primary/90">
                        <span className="text-gray-500">Role: </span>
                        {project.role}
                        {project.organization && (
                          <span className="text-gray-400"> • {project.organization}</span>
                        )}
                      </p>

                      <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                        {project.summary}
                      </p>

                      {/* UN SDG Tags */}
                      {Array.isArray(project.sdgs) && project.sdgs.length > 0 && (
                        <div>
                          <span className="text-xs font-mono text-gray-500 block mb-2">
                            UN Sustainable Development Goals (SDGs):
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {project.sdgs.map((sdg, sIdx) => (
                              <span
                                key={sIdx}
                                className="text-xs font-mono bg-gray-800/90 border border-gray-700 text-primary/90 px-2.5 py-1"
                              >
                                {sdg}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Outcomes List */}
                      {Array.isArray(project.outcomes) && project.outcomes.length > 0 && (
                        <div className="border-t border-gray-800/80 pt-4">
                          <span className="text-xs font-mono text-gray-400 font-bold block mb-2 uppercase tracking-wider">
                            Key Verified Outcomes:
                          </span>
                          <ul className="space-y-2 text-xs md:text-sm text-gray-300">
                            {project.outcomes.map((outcome, oIdx) => (
                              <li key={oIdx} className="flex items-start gap-2">
                                <FaCheckCircle className="text-primary mt-1 shrink-0 text-xs" />
                                <span>{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Overlapping Work Images / Field Photo Gallery */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="text-xs font-mono text-gray-500 flex items-center gap-2 mb-2">
                        <FaImage className="text-primary text-xs" />
                        <span>Field Documentation & Work Photos</span>
                      </div>

                      {Array.isArray(project.images) && project.images.length > 0 ? (
                        <div className="space-y-4">
                          {project.images.map((imgUrl, iIdx) => (
                            <div
                              key={iIdx}
                              className="border border-gray-700 bg-gray-950 overflow-hidden relative group hover:border-primary transition-all"
                            >
                              <img
                                src={imgUrl}
                                alt={`${project.title} documentation ${iIdx + 1}`}
                                onError={(e) => {
                                  // Fallback to stylized technical card if raw photo isn't on disk yet
                                  e.currentTarget.style.display = "none";
                                  const fallback = e.currentTarget.nextElementSibling;
                                  if (fallback) fallback.style.display = "flex";
                                }}
                                className="w-full h-52 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                              {/* Graceful Fallback Container */}
                              <div
                                style={{ display: "none" }}
                                className="h-52 w-full flex flex-col items-center justify-center p-6 text-center bg-gray-950 border border-dashed border-gray-800"
                              >
                                <FaHandsHelping className="text-3xl text-primary/60 mb-2" />
                                <span className="text-xs font-mono text-gray-300 font-bold">
                                  {project.title}
                                </span>
                                <span className="text-[11px] font-mono text-gray-500 mt-1">
                                  Field Archive #{iIdx + 1} • {project.period}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-52 border border-dashed border-gray-800 bg-gray-950 flex flex-col items-center justify-center text-center p-6 text-gray-500 font-mono text-xs">
                          <FaHandsHelping className="text-3xl text-primary/40 mb-2" />
                          <span>Field operations verified via Jamalpur District Board</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PageTransition>
    </>
  );
};

export default Community;
