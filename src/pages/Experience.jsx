import React, { useEffect, useState } from "react";
import PageTransition from "../Components/PageTransition";
import MetaData from "../Components/MetaData";
import { getStoredExperiences } from "../lib/dataService";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaLaptopCode } from "react-icons/fa";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getStoredExperiences()
      .then((data) => {
        if (mounted) {
          setExperiences(data);
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
        title="MD Atik Hasan | Professional & Academic Experience"
        description="Experience record of MD Atik Hasan: Founder of Spellycraft.com, Foreign Communication Executive at Softvence Agency, and English Language Educator."
        keywords="MD Atik Hasan Experience, Spellycraft, Softvence Agency, Teacher, Kid's Park Montessori, Jamalpur"
      />
      <PageTransition>
        <div className="container mx-auto px-4 mt-28 mb-28 max-w-6xl">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 text-3xl md:text-4xl font-bold mb-3">
              <span className="text-primary font-mono">/</span>
              <h1 className="text-white">professional-experience</h1>
            </div>
            <p className="text-gray-400 font-mono text-base max-w-3xl leading-relaxed">
              Demonstrated leadership spanning software entrepreneurship, international client technical liaison, and community-level academic teaching.
            </p>
          </div>

          {/* Experience List */}
          {loading ? (
            <div className="text-center py-20 font-mono text-gray-500 text-base">
              Loading verified experience records...
            </div>
          ) : (
            <div className="space-y-10">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id || index}
                  className="border border-gray-800 bg-gray-900/40 p-6 md:p-8 hover:border-primary/50 transition-all relative flex flex-col"
                >
                  {/* Top Bar: Title & Period */}
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3 border-b border-gray-800 pb-5 mb-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-xs font-mono bg-primary/10 border border-primary/40 text-primary px-3 py-1 font-bold">
                          {exp.badge || "Professional"}
                        </span>
                        <h2 className="text-2xl font-bold text-white">
                          {exp.title}
                        </h2>
                      </div>
                      <div className="text-base font-mono text-primary font-semibold flex items-center gap-2">
                        <FaBriefcase className="text-sm" />
                        <span>{exp.company}</span>
                        {exp.location && (
                          <span className="text-xs text-gray-400 font-normal flex items-center gap-1 ml-2">
                            <FaMapMarkerAlt className="text-gray-500" />
                            {exp.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="font-mono text-sm text-gray-400 flex items-center gap-2 shrink-0">
                      <FaCalendarAlt className="text-primary text-xs" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-gray-300 text-base leading-relaxed mb-6">
                    {exp.summary}
                  </p>

                  {/* Highlights / Bullets */}
                  {Array.isArray(exp.highlights) && exp.highlights.length > 0 && (
                    <div className="space-y-3 mb-6">
                      <span className="text-xs font-mono text-gray-400 font-bold uppercase tracking-wider block">
                        Key Responsibilities & Deliverables:
                      </span>
                      <ul className="space-y-2.5">
                        {exp.highlights.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-3 text-sm md:text-base text-gray-300">
                            <FaCheckCircle className="text-primary mt-1 shrink-0 text-xs" />
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skills Chips */}
                  {Array.isArray(exp.skills) && exp.skills.length > 0 && (
                    <div className="border-t border-gray-800/80 pt-4 mt-auto">
                      <span className="text-xs font-mono text-gray-500 block mb-2">
                        Competencies Applied:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-xs font-mono bg-gray-800/80 border border-gray-700/80 text-gray-300 px-3 py-1"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </PageTransition>
    </>
  );
};

export default Experience;
