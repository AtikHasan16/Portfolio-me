import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
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
    </div>
  );
};

export default RootLayout;
