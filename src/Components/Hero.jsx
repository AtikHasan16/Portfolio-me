import React from "react";
import { FaQuoteLeft, FaDownload, FaAward, FaNetworkWired, FaHandsHelping, FaUserGraduate } from "react-icons/fa";
import { Link } from "react-router";
import { useLanguage } from "../Contexts/useLanguage";
import resume from "../assets/Junior resume.pdf";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 mt-28 lg:mt-36 relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Subtitle tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-xs font-mono uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span>{t("hero.title")}</span>
        </div>

        {/* Name and headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
          {t("hero.name")}
        </h1>

        <p className="text-lg md:text-xl text-gray-300 font-mono max-w-3xl mx-auto mb-6 leading-relaxed">
          {t("hero.subheading")}
        </p>

        <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t("hero.objective")}
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link
            to="/projects"
            className="btn btn-md bg-primary text-black hover:bg-primary/90 border-0 rounded-none font-mono text-sm px-6"
          >
            {t("hero.viewProjects")} →
          </Link>

          <Link
            to="/community"
            className="btn btn-md btn-outline border-primary text-white hover:bg-primary hover:text-black rounded-none font-mono text-sm px-6"
          >
            {t("hero.viewCommunity")}
          </Link>

          <a
            href={resume}
            download="MD_Atik_Hasan_Academic_CV.pdf"
            className="btn btn-md btn-outline border-gray-700 text-gray-300 hover:border-primary hover:text-primary rounded-none font-mono text-sm px-5 flex items-center gap-2"
          >
            <FaDownload className="text-xs" />
            <span>{t("hero.downloadCv")}</span>
          </a>
        </div>

        {/* Academic & Merit At-A-Glance Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left font-mono">
          <div className="border border-gray-800 bg-gray-900/40 p-4 border-l-2 border-l-primary">
            <FaUserGraduate className="text-primary text-lg mb-2" />
            <div className="text-xl font-bold text-white">Top 2%</div>
            <div className="text-xs text-gray-400 mt-1">{t("stats.hscRank")}</div>
          </div>

          <div className="border border-gray-800 bg-gray-900/40 p-4 border-l-2 border-l-primary">
            <FaAward className="text-primary text-lg mb-2" />
            <div className="text-xl font-bold text-white">Divisional</div>
            <div className="text-xs text-gray-400 mt-1">{t("stats.assetAward")}</div>
          </div>

          <div className="border border-gray-800 bg-gray-900/40 p-4 border-l-2 border-l-primary">
            <FaHandsHelping className="text-primary text-lg mb-2" />
            <div className="text-xl font-bold text-white">1,000+</div>
            <div className="text-xs text-gray-400 mt-1">{t("stats.communityReach")}</div>
          </div>

          <div className="border border-gray-800 bg-gray-900/40 p-4 border-l-2 border-l-primary">
            <FaNetworkWired className="text-primary text-lg mb-2" />
            <div className="text-xl font-bold text-white">30+ Systems</div>
            <div className="text-xs text-gray-400 mt-1">Servers & PC Lab Deployed</div>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="mt-16 max-w-2xl mx-auto border border-gray-700 bg-gray-950/40 p-6 relative font-mono text-center">
        <FaQuoteLeft className="absolute -top-3 left-4 bg-gray-950 px-2 text-primary text-lg" />
        <p className="text-gray-300 text-sm md:text-base italic leading-relaxed">
          "Technical innovation begins with systematic inquiry — turning theoretical knowledge into reliable infrastructure that serves people."
        </p>
        <div className="text-xs text-primary font-mono mt-3">
          — MD Atik Hasan
        </div>
      </div>
    </div>
  );
};

export default Hero;
