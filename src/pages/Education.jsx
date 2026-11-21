import React, { useState } from "react";
import PageTransition from "../Components/PageTransition";
import MetaData from "../Components/MetaData";
import { formalEducation, academicAchievements } from "../data/educationData";
import { useLanguage } from "../Contexts/useLanguage";
import { FaGraduationCap, FaTrophy, FaAward, FaBookOpen, FaUserGraduate } from "react-icons/fa";

const Education = () => {
  const [activeTab, setActiveTab] = useState("formal");
  const { t } = useLanguage();

  return (
    <>
      <MetaData
        title="Atik Hasan | Academic Profile & Achievements"
        description="Formal technical education (HSC/SSC), board ranks, and academic competition honors of MD Atik Hasan."
        keywords="Jamalpur Govt Technical School and College, HSC Technical, SSC IT Support, ASSET National Skill Competition"
      />
      <PageTransition>
        <div className="container mx-auto px-4 mt-24 mb-24 max-w-7xl">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 text-3xl md:text-4xl font-bold mb-3">
              <span className="text-primary font-mono">/</span>
              <h1 className="text-white">academic-credentials</h1>
            </div>
            <p className="text-gray-400 font-mono text-sm max-w-2xl leading-relaxed">
              Academic records, institutional examination standings, curriculum coursework, and national-level competition honors.
            </p>
          </div>

          {/* Interactive Tabs */}
          <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-800 pb-4 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("formal")}
              className={`flex items-center gap-2 px-5 py-2.5 border transition-all ${
                activeTab === "formal"
                  ? "border-primary bg-primary text-black font-bold"
                  : "border-gray-800 bg-gray-900/40 text-gray-400 hover:border-gray-700 hover:text-white"
              }`}
            >
              <FaGraduationCap className="text-sm" />
              <span>{t("education.tabFormal")}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("achievements")}
              className={`flex items-center gap-2 px-5 py-2.5 border transition-all ${
                activeTab === "achievements"
                  ? "border-primary bg-primary text-black font-bold"
                  : "border-gray-800 bg-gray-900/40 text-gray-400 hover:border-gray-700 hover:text-white"
              }`}
            >
              <FaTrophy className="text-sm" />
              <span>{t("education.tabAchievements")}</span>
            </button>
          </div>

          {/* TAB 1: FORMAL TECHNICAL EDUCATION */}
          {activeTab === "formal" && (
            <div className="space-y-8">
              {formalEducation.map((edu) => (
                <div
                  key={edu.id}
                  className="border border-gray-800 bg-gray-900/30 p-6 md:p-8 hover:border-primary/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-4 border-b border-gray-800 pb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">
                        {edu.degree}
                      </h2>
                      <div className="text-sm font-mono text-primary font-medium">
                        Trade: {edu.trade}
                      </div>
                    </div>
                    <div className="font-mono text-xs text-gray-400 shrink-0">
                      {edu.period}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 font-mono text-xs">
                    <div className="border border-gray-800 bg-gray-950/60 p-3">
                      <span className="text-gray-500 block">Institution</span>
                      <span className="text-white font-medium">{edu.institution}</span>
                    </div>

                    <div className="border border-gray-800 bg-gray-950/60 p-3">
                      <span className="text-gray-500 block">Academic Result</span>
                      <span className="text-primary font-bold text-sm">GPA {edu.gpa}</span>
                    </div>

                    <div className="border border-gray-800 bg-gray-950/60 p-3">
                      <span className="text-gray-500 block">Institutional Standing</span>
                      <span className="text-white font-medium">{edu.rank}</span>
                    </div>
                  </div>

                  {/* Core Subjects */}
                  <div className="mb-4">
                    <span className="text-xs font-mono text-gray-400 font-bold block mb-2 uppercase tracking-wider flex items-center gap-1.5">
                      <FaBookOpen className="text-primary text-xs" />
                      <span>{t("education.subjects")}:</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {edu.subjects.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-xs font-mono bg-gray-800/80 border border-gray-700/80 text-gray-300 px-3 py-1"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 font-mono mt-4 leading-relaxed">
                    <span className="text-gray-500">Instructor Assessment: </span>
                    {edu.highlights}
                  </p>
                </div>
              ))}

              {/* Undergraduate Admission Alignment Note */}
              <div className="border border-primary/30 bg-primary/5 p-6 font-mono text-xs text-gray-300">
                <span className="text-primary font-bold block mb-1 uppercase tracking-wider">
                  Academic Focus & Undergraduate Intent:
                </span>
                <p className="leading-relaxed text-gray-300">
                  With 4 consecutive years of specialized vocational & technical high school education in Computer Operations, Micro-electronics, and IoT, I am prepared for demanding undergraduate programs in <strong className="text-white">Computer Engineering, Network Systems, Information Security, or Telecommunications</strong>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: HONORS & ACHIEVEMENTS */}
          {activeTab === "achievements" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {academicAchievements.map((ach) => (
                <div
                  key={ach.id}
                  className="border border-gray-800 bg-gray-900/30 p-6 flex flex-col hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <FaAward className="text-primary text-2xl mt-1 shrink-0" />
                    <div>
                      <span className="text-xs font-mono text-gray-500 block mb-1">
                        {ach.year} • {ach.domain}
                      </span>
                      <h3 className="text-lg font-bold text-white leading-snug">
                        {ach.title}
                      </h3>
                    </div>
                  </div>

                  <div className="font-mono text-xs text-primary/90 mb-3">
                    {ach.competition} ({ach.authority})
                  </div>

                  <p className="text-sm text-gray-400 leading-relaxed mt-auto">
                    {ach.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </PageTransition>
    </>
  );
};

export default Education;
