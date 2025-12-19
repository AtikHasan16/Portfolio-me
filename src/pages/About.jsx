import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import PageTransition from "../Components/PageTransition";

const About = () => {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">MD Atik Hasan</h1>
          <p className="text-xl text-primary mb-6">
            Junior Front-end Developer
          </p>

          <div className="flex flex-wrap gap-4 text-sm md:text-base">
            <a
              href="tel:+8801409119685"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <FaPhone className="text-primary" />
              +8801409119685
            </a>
            <a
              href="mailto:hasan.atik.sn@gmail.com"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <FaEnvelope className="text-primary" />
              hasan.atik.sn@gmail.com
            </a>

            <a
              href="https://github.com/AtikHasan16"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <FaGithub className="text-primary" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/hasan-md-atik/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <FaLinkedin className="text-primary" />
              LinkedIn
            </a>
          </div>
          <span className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary" />
            Shihata, Melandah, Jamalpur
          </span>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Career Objective */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-primary">#</span>
                Career Objective
              </h2>
              <div className="border border-gray-700 p-6 rounded-lg bg-gray-900/30">
                <p className="text-gray-300 leading-relaxed">
                  Highly motivated and energetic, I possess a strong passion for
                  contemporary and visually striking frontend design, secure
                  backend development, and building scalable web applications.
                  My experience includes the successful completion of four
                  attractive projects, complemented by solid project management
                  skills to ensure timely delivery.
                </p>
              </div>
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-primary">#</span>
                Projects
              </h2>
              <div className="space-y-6">
                {/* LoanLink */}
                <div className="border border-gray-700 p-6 rounded-lg bg-gray-900/30">
                  <div className="flex flex-wrap items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-primary">LoanLink</h3>
                    <span className="text-sm text-gray-400">December 2025</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-3 text-sm">
                    <a
                      href="https://loanlink-app.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Visit Website
                    </a>
                    <span className="text-gray-600">||</span>
                    <a
                      href="https://github.com/AtikHasan16/loanlink.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Client
                    </a>
                    <span className="text-gray-600">|</span>
                    <a
                      href="https://github.com/AtikHasan16/loanlink-server.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Server
                    </a>
                  </div>
                  <p className="text-gray-300 mb-3">
                    LoanLink is a comprehensive web-based platform designed to
                    bridge the gap between microfinance institutions and
                    borrowers. It streamlines the entire loan lifecycle—from
                    application and verification to approval and repayment
                    tracking—replacing chaotic manual processes with a unified,
                    digital solution.
                  </p>
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-400 mb-1">
                      Features:
                    </p>
                    <p className="text-sm text-gray-300">
                      <ul>
                        <li>Responsive Design</li>
                        <li>
                          Theme Toggle - Seamless Dark/Light mode switching
                        </li>
                        <li>Secure Authentication</li>
                        <li>Smooth Animations</li>
                        <li>
                          Error Handling - User-friendly error pages and
                          notifications
                        </li>
                      </ul>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-400 mb-1">
                      Tech Stack & tools:
                    </p>
                    <p className="text-sm text-gray-300">
                      ReactJs,Tailwindcss, Firebase, Firebase Admin, Framer,
                      ExpressJs, MongoDB.
                    </p>
                  </div>
                </div>
                {/* WristLook */}
                <div className="border border-gray-700 p-6 rounded-lg bg-gray-900/30">
                  <div className="flex flex-wrap items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-primary">
                      WristLook
                    </h3>
                    <span className="text-sm text-gray-400">November 2025</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-3 text-sm">
                    <a
                      href="https://wrist-look.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Visit Website
                    </a>
                    <span className="text-gray-600">||</span>
                    <a
                      href="https://github.com/AtikHasan16/Wrist-Look.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Client
                    </a>
                    <span className="text-gray-600">|</span>
                    <a
                      href="https://github.com/AtikHasan16/wristlook-sr.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Server
                    </a>
                  </div>
                  <p className="text-gray-300 mb-3">
                    A watch collection platform where buyers and sellers can buy
                    their desired watch for a very reasonable cost. This site is
                    built with the latest NEXTJS and other modern technology.
                  </p>
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-400 mb-1">
                      Features:
                    </p>
                    <p className="text-sm text-gray-300">
                      Add products, Manage products (Delete), user login &
                      registration, realtime interaction with server.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-400 mb-1">
                      Tech Stack & tools:
                    </p>
                    <p className="text-sm text-gray-300">
                      Google Antigravity, NextJs, NextAuth, ReactJS,
                      Tailwindcss, DaysiUI, ExpressJs, MongoDB.
                    </p>
                  </div>
                </div>

                {/* PawMart */}
                <div className="border border-gray-700 p-6 rounded-lg bg-gray-900/30">
                  <div className="flex flex-wrap items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-primary">PawMart</h3>
                    <span className="text-sm text-gray-400">November 2025</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-3 text-sm">
                    <a
                      href="https://project-pawmart.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Visit Website
                    </a>
                    <span className="text-gray-600">||</span>
                    <a
                      href="https://github.com/AtikHasan16/PawMart.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Client
                    </a>
                    <span className="text-gray-600">|</span>
                    <a
                      href="https://github.com/AtikHasan16/PawMart-Server.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Server
                    </a>
                  </div>
                  <p className="text-gray-300 mb-3">
                    A community-driven platform for pet adoption and pet product
                    sales. Connects pet owners, breeders, and shops in a
                    centralized hub.
                  </p>
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-400 mb-1">
                      Features:
                    </p>
                    <p className="text-sm text-gray-300">
                      Category-wise search & sort, Add products, Manage products
                      (Update & Delete), Theme toggling, user login &
                      registration and Order list PDF download.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-400 mb-1">
                      Tech Stack:
                    </p>
                    <p className="text-sm text-gray-300">
                      ReactJs, Tailwindcss, ExpressJs, MongoDB, Firebase Auth.
                    </p>
                  </div>
                </div>

                {/* GreeNest */}
                <div className="border border-gray-700 p-6 rounded-lg bg-gray-900/30">
                  <div className="flex flex-wrap items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-primary">GreeNest</h3>
                    <span className="text-sm text-gray-400">October 2025</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-3 text-sm">
                    <a
                      href="https://green-nest-planet.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Visit Website
                    </a>
                    <span className="text-gray-600">|</span>
                    <a
                      href="https://github.com/AtikHasan16/Green-Nest.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Repository
                    </a>
                  </div>
                  <p className="text-gray-300 mb-3">
                    A responsive Single Page Application (SPA) designed for
                    plant enthusiasts to explore indoor collections, access care
                    guides, and book expert consultations.
                  </p>
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-400 mb-1">
                      Features:
                    </p>
                    <p className="text-sm text-gray-300">
                      Authentication (Google/Email & Password validation),
                      Protected Private Routes (Details & Profile), Dynamic Data
                      Fetching from JSON, Real-time Profile Management, Book
                      consultant toast.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-400 mb-1">
                      Tech Stack:
                    </p>
                    <p className="text-sm text-gray-300">
                      React.js, React Router, Tailwind CSS, Firebase Auth,
                      Swiper.js.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-primary">#</span>
                Education
              </h2>
              <div className="border border-gray-700 p-6 rounded-lg bg-gray-900/30">
                <h3 className="text-lg font-bold mb-1">
                  Jamalpur Govt. Technical College, Jamalpur — HSC
                </h3>
                <p className="text-sm text-gray-400">Session: 2024 - 2026</p>
              </div>
            </section>

            {/* Extra-curricular */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-primary">#</span>
                Extra-curricular Activities
              </h2>
              <div className="border border-gray-700 p-6 rounded-lg bg-gray-900/30">
                <div className="mb-3">
                  <h3 className="text-lg font-bold mb-1">
                    Committee Member — VBD (volunteer for bangladesh)
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">
                    November 2022 - present
                  </p>
                </div>
                <div className="mb-3">
                  <p className="text-sm font-semibold text-gray-400 mb-1">
                    Skills:
                  </p>
                  <p className="text-sm text-gray-300">
                    Public Speaking, Project Management, Event Organize,
                    Communication.
                  </p>
                </div>
                <p className="text-gray-300 text-sm">
                  Organized 10+ community events for underprivileged childrens
                  in jamalpur district, each one had a minimum of 100
                  participants. Worked with district police and Department of
                  Narcotics Control (DNC) for batter jamalpur.
                </p>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Languages */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-primary">#</span>
                Languages
              </h2>
              <div className="border border-gray-700 p-6 rounded-lg bg-gray-900/30 space-y-3">
                <div className="flex items-center justify-between ">
                  <span className="text-gray-300">English</span>
                  <span className="text-gray-400 text-sm">Professional</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Bangla</span>
                  <span className="text-gray-400 text-sm">Native</span>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-primary">#</span>
                Skills
              </h2>
              <div className="border border-gray-700 p-6 rounded-lg bg-gray-900/30 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-primary mb-2">
                    Language:
                  </h3>
                  <p className="text-sm text-gray-300">HTML, CSS, JavaScript</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-primary mb-2">
                    Framework & Database:
                  </h3>
                  <p className="text-sm text-gray-300">
                    Tailwindcss, ReactJs, NextJs, ExpressJs, MongoDB
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-primary mb-2">
                    Tools:
                  </h3>
                  <p className="text-sm text-gray-300">
                    Git, Github, Firebase, Postman
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-primary mb-2">
                    Soft Skill:
                  </h3>
                  <p className="text-sm text-gray-300">
                    Communication, Project Management, Teamwork
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
