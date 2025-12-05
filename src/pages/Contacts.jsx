import React from "react";
import { FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import PageTransition from "../Components/PageTransition";

const Contacts = () => {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12 min-h-screen">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">/</span>contacts
          </h1>
          <p className="text-gray-400 max-w-2xl">Who am I?</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Side - Description */}
          <div>
            <p className="text-gray-300 leading-relaxed">
              I'm interested in freelance opportunities. However, if you have
              other request or question, don't hesitate to contact me
            </p>
          </div>

          {/* Right Side - Contact Boxes */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Support Me Box */}
            <div className="border border-gray-600 p-6 flex-1">
              <h3 className="text-white font-semibold mb-4">Support me here</h3>
              <a
                href="https://wa.me/+8801409119685"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                +8801409119685
              </a>
            </div>

            {/* Message Me Box */}
            <div className="border border-gray-600 p-6 flex-1">
              <h3 className="text-white font-semibold mb-4">Message me here</h3>
              <div className="space-y-3">
                <a
                  href="https://discordapp.com/users/758631940642439188"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
                >
                  <FaDiscord className="text-xl" />
                  <span>Atik#3519</span>
                </a>
                <a
                  href="mailto:mhasan16atik@gmail.com"
                  className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
                >
                  <MdEmail className="text-xl" />
                  <span>mhasan16atik@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* All Media Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold mb-8">
            <span className="text-primary">#</span>all-media
          </h2>
          <div className="flex flex-wrap gap-6">
            <a
              href="https://github.com/AtikHasan16"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-lg"
            >
              <FaGithub className="text-2xl" />
              <span>@AtikHasan16</span>
            </a>
            <a
              href="https://www.linkedin.com/in/md-atik-hasan-a4b1b5335/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-lg"
            >
              <FaLinkedin className="text-2xl" />
              <span>MD Atik Hasan</span>
            </a>
            <a
              href="https://wa.me/+8801409119685"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-lg"
            >
              <IoLogoWhatsapp className="text-2xl" />
              <span>+880 1409 119685</span>
            </a>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contacts;
