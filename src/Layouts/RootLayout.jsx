import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const RootLayout = () => {
  return (
    <div className="w-11/12 md:w-11/12 lg:w-10/12 xl:w-9/12 mx-auto">
      <header>
        <Navbar />
      </header>
      <main className="min-h-screen">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer />
      </footer>
      {/* Decorative Side Elements (Left Line) */}
      <div className="fixed top-24 left- lg:left-10 w-px h-[calc(100vh-6rem)] bg-primary hidden xl:flex flex-col justify-between items-center">
        <div className="w-2 h-6 bg-primary rounded-full"></div>
      </div>
    </div>
  );
};

export default RootLayout;
