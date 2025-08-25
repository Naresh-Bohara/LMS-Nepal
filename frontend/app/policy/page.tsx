"use client";

import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Policy from "./Policy";

type Props = {};

const Page = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(3);
  const [authRoute, setAuthRoute] = useState("Login");

  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100">
      <Heading
        title="Policy - LMS-Nepal"
        description="LMS-Nepal is a trusted learning management system dedicated to empowering programmers with quality courses and resources."
        keywords="learning management system, LMS, programming, education, Nepal"
      />

      <Header
        open={isMenuOpen}
        setOpen={setIsMenuOpen}
        activeItem={activeNavItem}
        setRoute={setAuthRoute}
        route={authRoute}
      />

      <section className="flex-grow container mx-auto px-5 py-10 max-w-6xl">
        <Policy />
      </section>

      <Footer />
    </main>
  );
};

export default Page;
