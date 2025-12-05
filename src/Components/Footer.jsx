import React from "react";
import { FaDiscord, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { RiCodeSSlashLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-transparent text-white py-10 mt-10 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left Side */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <RiCodeSSlashLine className="text-primary text-2xl" />
              <span className="font-bold text-xl">Atik Hasan</span>
              <span className="text-gray-400 text-sm ml-4">
                hasan.atik.sn@gmail.com
              </span>
            </div>
            <p className="text-gray-300">Front-end Developer</p>
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Media</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/AtikHasan16"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-2xl transition-colors"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/hasan-md-atik/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-2xl transition-colors"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.facebook.com/MDAtikhasannaeem"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-2xl transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="https://discord.gg/k3f2k2vM"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-2xl transition-colors"
              >
                <FaDiscord />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center text-gray-500 mt-10 text-sm">
          <p>© Copyright 2025. Made by Atik Hasan</p>
          <p className="mt-2">Design inspired by Elias from Figma</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
