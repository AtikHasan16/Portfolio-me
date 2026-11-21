import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaLock } from "react-icons/fa";
import { RiCodeSSlashLine } from "react-icons/ri";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-transparent text-white py-12 mt-28 border-t border-gray-800 font-mono text-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left Side */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <RiCodeSSlashLine className="text-primary text-2xl" />
              <span className="font-bold text-lg text-white">MD Atik Hasan</span>
              <a
                href="mailto:hasan.atik.sn@gmail.com"
                className="text-gray-400 text-xs hover:text-primary transition-colors ml-2"
              >
                hasan.atik.sn@gmail.com
              </a>
            </div>
            <p className="text-gray-400 text-xs">
              Computer Systems & Network Infrastructure Aspirant • Jamalpur, Bangladesh
            </p>
          </div>

          {/* Right Side: Social Media Links with Accessible Labels */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Verified Profiles
            </span>
            <div className="flex items-center gap-5">
              <a
                href="https://github.com/AtikHasan16"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="text-gray-400 hover:text-primary text-xl transition-colors"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/hasan-md-atik/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="text-gray-400 hover:text-primary text-xl transition-colors"
              >
                <FaLinkedin />
              </a>

              <a
                href="mailto:hasan.atik.sn@gmail.com"
                aria-label="Send Email"
                className="text-gray-400 hover:text-primary text-xl transition-colors"
              >
                <FaEnvelope />
              </a>

              <Link
                to="/admin"
                aria-label="Admin Portal"
                title="Curator Access"
                className="text-gray-600 hover:text-gray-400 text-sm transition-colors ml-2"
              >
                <FaLock />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 mt-12 pt-6 border-t border-gray-900 gap-2">
          <p>© {new Date().getFullYear()} MD Atik Hasan. All academic rights reserved.</p>
          <p className="text-gray-600">Built for Undergraduate Scholarship & Admissions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
