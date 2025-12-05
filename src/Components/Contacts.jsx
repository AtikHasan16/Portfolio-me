import React from "react";
import { FaDiscord } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";

const Contacts = () => {
  return (
    <div className="container mx-auto px-4 my-32">
      {/* Header */}
      <div className="flex items-center gap-2 text-3xl font-bold mb-12">
        <span className="text-primary">#</span>contacts
        <div className="h-px bg-primary w-20 lg:w-96 ml-4"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Left Side - Text Content */}
        <div className="lg:w-1/2">
          <p className="text-gray-400 leading-relaxed">
            I'm interested in front-end development opportunities. However, if
            you have other request or question, don't hesitate to contact me
          </p>
        </div>

        {/* Right Side - Contact Box */}
        <div className="lg:w-1/2 lg:ml-auto">
          <div className="border border-gray-600 p-6 max-w-sm">
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
                href="https://wa.me/+8801409119685"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
              >
                <IoLogoWhatsapp className="text-xl" />
                <span>+880 1409 119685</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
