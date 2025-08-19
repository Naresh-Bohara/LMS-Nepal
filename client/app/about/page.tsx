"use client";

import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import About from "./About";
import Footer from "../components/Footer";

type Props = {};

const AboutPage = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(2);
  const [authRoute, setAuthRoute] = useState("Login");

  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100">
      <Heading
        title="About Us - LMS-Nepal"
        description="LMS-Nepal is a modern Learning Management System designed for students and educators in Nepal to access courses, manage resources, and enhance learning."
        keywords="learning management system, LMS, Nepal education, online courses, e-learning"
      />
      <Header
        open={isMenuOpen}
        setOpen={setIsMenuOpen}
        activeItem={activeNavItem}
        setRoute={setAuthRoute}
        route={authRoute}
      />
      <main className="flex-grow">
        <About />
      </main>
      <Footer />
    </main>
  );
};

export default AboutPage;
