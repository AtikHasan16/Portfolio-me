import React from "react";
import PageTransition from "../Components/PageTransition";
import MetaData from "../Components/MetaData";
import { facultyReferences } from "../data/referencesData";
import { useLanguage } from "../Contexts/useLanguage";
import { FaQuoteLeft, FaEnvelope, FaShieldAlt, FaUserTie } from "react-icons/fa";

const References = () => {
  const { t } = useLanguage();

  return (
    <>
      <MetaData
        title="Atik Hasan | Academic References & Faculty Endorsements"
        description="Verified institutional references and instructor endorsements from Jamalpur Govt. Technical School and College."
        keywords="Academic References, Faculty Recommendations, Jamalpur Govt Technical School and College"
      />
      <PageTransition>
        <div className="container mx-auto px-4 mt-24 mb-24 max-w-5xl">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 text-3xl md:text-4xl font-bold mb-3">
              <span className="text-primary font-mono">/</span>
              <h1 className="text-white">academic-references</h1>
            </div>
            <p className="text-gray-400 font-mono text-sm max-w-2xl leading-relaxed">
              Official faculty references and endorsements from instructors who have supervised my laboratory experiments, academic coursework, and extracurricular debate activities.
            </p>
          </div>

          {/* Privacy & Verification Banner */}
          <div className="border border-gray-800 bg-gray-900/40 p-4 mb-10 flex items-center gap-3 font-mono text-xs text-gray-400">
            <FaShieldAlt className="text-primary text-base shrink-0" />
            <span>
              {t("references.confidentialNotice") ||
                "Teacher phone numbers are protected for privacy; institutional emails are provided below for official academic correspondence."}
            </span>
          </div>

          {/* Reference Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facultyReferences.map((ref) => (
              <div
                key={ref.id}
                className="border border-gray-800 bg-gray-900/30 p-6 md:p-8 flex flex-col justify-between hover:border-primary/50 transition-colors relative"
              >
                <div>
                  <div className="flex items-start gap-4 mb-5 border-b border-gray-800 pb-5">
                    <div className="w-12 h-12 bg-gray-800 border border-gray-700 flex items-center justify-center shrink-0">
                      <FaUserTie className="text-primary text-xl" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white mb-1">
                        {ref.name}
                      </h2>
                      <div className="text-xs font-mono text-primary font-medium">
                        {ref.title}
                      </div>
                      <div className="text-xs font-mono text-gray-400 mt-0.5">
                        {ref.institution}
                      </div>
                    </div>
                  </div>

                  {/* Instructor Quote */}
                  <div className="relative pl-6 py-2 mb-6 font-mono text-xs md:text-sm text-gray-300 leading-relaxed italic">
                    <FaQuoteLeft className="absolute left-0 top-0 text-primary/40 text-sm" />
                    "{ref.quote}"
                  </div>
                </div>

                {/* Contact Info (Institutional Email Only) */}
                <div className="border-t border-gray-800/80 pt-4 font-mono text-xs space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaEnvelope className="text-primary" />
                    <a
                      href={`mailto:${ref.email}`}
                      className="hover:text-primary transition-colors hover:underline"
                    >
                      {ref.email}
                    </a>
                  </div>

                  <div className="text-[11px] text-gray-500">
                    {ref.phoneNotice}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default References;
