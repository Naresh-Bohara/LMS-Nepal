"use client";
import React, { FC, useEffect, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer";

interface Props { }

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <>
      <Heading
        title="LMS-Nepal"
        description="LMS-Nepal is a modern Learning Management System designed for students and educators in Nepal to access courses, manage resources, and enhance learning."
        keywords="LMS-Nepal, LMS-Nepal Nepal, Online Courses Nepal, MERN LMS, Redux LMS, Education Platform Nepal"
      />
      <div>
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Hero />
        <Courses />
        <Reviews />
        <FAQ />
        <Footer />
      </div>
    </>
  );
};

export default Page;
