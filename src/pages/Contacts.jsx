import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import PageTransition from "../Components/PageTransition";
import MetaData from "../Components/MetaData";

const Contacts = () => {

  return (
    <>
      <MetaData
        title="Atik Hasan | Academic Inquiries & Contact"
        description="Get in touch with MD Atik Hasan for undergraduate admissions, scholarship interviews, or technical collaborations."
        keywords="Contact Atik Hasan, Email, LinkedIn, Scholarship Inquiries, Jamalpur Bangladesh"
      />
      <PageTransition>
        <div className="container mx-auto px-4 mt-24 mb-24 max-w-5xl">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 text-3xl md:text-4xl font-bold mb-3">
              <span className="text-primary font-mono">/</span>
              <h1 className="text-white">academic-inquiries</h1>
            </div>
            <p className="text-gray-400 font-mono text-sm max-w-2xl leading-relaxed">
              Available for formal correspondence regarding undergraduate admissions, scholarship evaluations, university interviews, and collaborative engineering projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Message Statement */}
            <div className="md:col-span-6 space-y-5 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                Whether you are an admissions officer reviewing my candidacy, a university professor evaluating research alignment, or a fellow student seeking collaboration on open-source systems, I welcome your message.
              </p>

              <div className="border-l-2 border-primary pl-4 font-mono text-xs text-gray-400 space-y-1">
                <div><strong>Primary Email:</strong> hasan.atik.sn@gmail.com</div>
                <div><strong>Current Location:</strong> Jamalpur, Bangladesh</div>
                <div><strong>Time Zone:</strong> UTC+06:00 (Bangladesh Standard Time)</div>
              </div>
            </div>

            {/* Right: Contact Channels */}
            <div className="md:col-span-6 space-y-4 font-mono text-sm">
              {/* Email Card */}
              <a
                href="mailto:hasan.atik.sn@gmail.com"
                className="border border-gray-800 bg-gray-900/40 p-5 flex items-center justify-between hover:border-primary transition-all group block"
              >
                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-primary text-xl" />
                  <div>
                    <span className="text-xs text-gray-500 block uppercase">Official Email</span>
                    <span className="text-white group-hover:text-primary transition-colors text-xs md:text-sm font-bold">
                      hasan.atik.sn@gmail.com
                    </span>
                  </div>
                </div>
                <span className="text-primary text-xs">Send ↗</span>
              </a>

              {/* LinkedIn Card */}
              <a
                href="https://www.linkedin.com/in/hasan-md-atik/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-800 bg-gray-900/40 p-5 flex items-center justify-between hover:border-primary transition-all group block"
              >
                <div className="flex items-center gap-4">
                  <FaLinkedin className="text-primary text-xl" />
                  <div>
                    <span className="text-xs text-gray-500 block uppercase">Professional Network</span>
                    <span className="text-white group-hover:text-primary transition-colors text-xs md:text-sm font-bold">
                      linkedin.com/in/hasan-md-atik
                    </span>
                  </div>
                </div>
                <span className="text-primary text-xs">Connect ↗</span>
              </a>

              {/* WhatsApp / Messaging Card */}
              <a
                href="https://wa.me/8801409119685"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-800 bg-gray-900/40 p-5 flex items-center justify-between hover:border-primary transition-all group block"
              >
                <div className="flex items-center gap-4">
                  <FaWhatsapp className="text-primary text-xl" />
                  <div>
                    <span className="text-xs text-gray-500 block uppercase">Direct Messaging</span>
                    <span className="text-white group-hover:text-primary transition-colors text-xs md:text-sm font-bold">
                      +880 1409-119685
                    </span>
                  </div>
                </div>
                <span className="text-primary text-xs">Chat ↗</span>
              </a>

              {/* GitHub Card */}
              <a
                href="https://github.com/AtikHasan16"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-800 bg-gray-900/40 p-5 flex items-center justify-between hover:border-primary transition-all group block"
              >
                <div className="flex items-center gap-4">
                  <FaGithub className="text-primary text-xl" />
                  <div>
                    <span className="text-xs text-gray-500 block uppercase">Code Repositories</span>
                    <span className="text-white group-hover:text-primary transition-colors text-xs md:text-sm font-bold">
                      github.com/AtikHasan16
                    </span>
                  </div>
                </div>
                <span className="text-primary text-xs">Visit ↗</span>
              </a>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default Contacts;
