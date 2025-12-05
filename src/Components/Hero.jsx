import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import resume from "../assets/Junior resume.pdf";

const Hero = () => {
  return (
    <div className="container mx-auto px-4 mt-40 relative">
      <div className="flex flex-col lg:flex-row items-center justify-between ">
        {/* Left Side - Text */}
        <div className="text-center lg:w-10/12 mx-auto ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Just as your average{" "}
              <span className="text-primary">Front-end developer</span>, turning
              pixels into dreams{" "}
              <span className="text-2xl">(sometimes nightmares)</span>
            </h1>
            <p className="text-gray-400 mb-8 ">
              My superpower? Finding bugs right after I push to production.
              You're welcome.
            </p>
            <a
              href={resume}
              download="Junior resume.pdf"
              className="btn btn-outline border-primary text-white hover:bg-primary hover:text-black hover:border-primary px-6 rounded-none font-normal"
            >
              Download Resume
            </a>
          </motion.div>
        </div>
      </div>

      {/* Quote Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-14 lg:mt-22 max-w-2xl mx-auto border border-gray-600 p-6 relative"
      >
        <FaQuoteLeft className="absolute -top-3 left-4 bg-[#301f2a] px-1 text-2xl text-gray-400" />
        <h3 className="text-xl lg:text-2xl font-medium text-center font-[JetBrains Mono]">
          Sorry! My Instincts won't allow me to stop asking questions.
        </h3>
        <div className="absolute -bottom-4 right-4 bg-[#301f2a] px-2 border border-gray-600">
          - Dr. Atik Hasan
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
