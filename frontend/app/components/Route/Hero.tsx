'use client'
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
import img1 from '../../../public/assests/banner-img-1.png'

type Props = {};

const Hero: FC<Props> = () => {
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search.trim() !== "") {
      router.push(`/courses?title=${search}`); // FIXED TEMPLATE LITERAL
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="relative w-full mt-20 mb-6 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black transition-colors duration-500 overflow-hidden">
          {/* Moving Stars Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="stars"></div>
            <div className="stars2"></div>
            <div className="stars3"></div>
          </div>

          {/* Premium Gradient Glow */}
          <div
            className="absolute top-[100px] left-5 1100px:left-10 1500px:left-20 
            h-[35vh] w-[35vh] 1100px:h-[500px] 1100px:w-[500px] 1500px:h-[650px] 1500px:w-[650px] 
            rounded-full animate-heroPulse bg-gradient-to-r from-[#4ea6a9] to-[#6ccfce] blur-3xl opacity-50"
          ></div>

          {/* Content */}
          <div className="1000px:flex items-center max-w-[1500px] mx-auto px-5 1000px:px-10 relative z-10">
            
            {/* Hero Image */}
            <div className="1000px:w-[42%] flex items-center justify-end me-4 pt-[70px] 1000px:pt-0">
              <Image
                src={data?.layout?.banner?.image?.url || img1}
                width={450}
                height={450}
                alt="Hero Banner"
                className="object-contain w-[90%] max-w-[400px] 1500px:max-w-[380px] h-auto transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Hero Text */}
            <div className="1000px:w-[58%] flex flex-col items-center 1000px:items-start mt-[120px] 1000px:mt-0 text-center 1000px:text-left">
              
              {/* Title */}
              <h1 className="font-Josefin font-bold leading-tight px-3 w-full 1500px:w-[65%] 1100px:w-[78%]
                text-[#000000c7] dark:text-white animate-fadeInUp 
                text-[clamp(2rem,5vw,3.5rem)]">
                {data?.layout?.banner?.title}
              </h1>

              {/* Subtitle */}
              <p className="mt-5 text-[clamp(1rem,2vw,1.25rem)] font-medium font-Josefin leading-relaxed
                1500px:w-[55%] 1100px:w-[78%] text-[#000000a6] dark:text-[#e5fdf8]
                animate-fadeInUp delay-150">
                {data?.layout?.banner?.subTitle}
              </p>

              {/* Search Bar */}
              <div
                className="mt-8 w-[90%] 1100px:w-[78%] 1500px:w-[55%] relative animate-fadeInUp delay-300"
              >
                <input
                  type="search"
                  placeholder="Search Courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent border border-gray-300 dark:border-gray-600 dark:bg-[#444] 
                    dark:placeholder:text-[#ffffffbb] rounded-[10px] p-3 w-full h-[52px] outline-none
                    text-gray-800 dark:text-white text-[17px] font-medium font-Josefin 
                    focus:ring-2 focus:ring-[#4ea6a9] transition"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-0 top-0 h-full w-[52px] flex items-center justify-center 
                    bg-[#4ea6a9] hover:bg-[#3a8d8f] transition-colors rounded-r-[10px]"
                >
                  <BiSearch className="text-white" size={24} />
                </button>
              </div>

              {/* Trusted Users */}
              <div className="mt-10 flex items-center gap-2 1100px:w-[78%] 1500px:w-[55%] animate-fadeInUp delay-500">
                <div className="flex -space-x-4">
                  <Image
                    src={require("../../../public/assests/client-1.jpg")}
                    alt=""
                    className="rounded-full border-2 border-white dark:border-gray-800 w-10 h-10 object-cover shadow-md"
                  />
                  <Image
                    src={require("../../../public/assests/client-2.jpg")}
                    alt=""
                    className="rounded-full border-2 border-white dark:border-gray-800 w-10 h-10 object-cover shadow-md"
                  />
                  <Image
                    src={require("../../../public/assests/client-3.jpg")}
                    alt=""
                    className="rounded-full border-2 border-white dark:border-gray-800 w-10 h-10 object-cover shadow-md"
                  />
                </div>
                <p className="font-Josefin text-[16px] font-medium pl-3 text-[#000000b3] dark:text-[#edfff4]">
                  500K+ people already trust us.{" "}
                  <Link
                    href="/courses"
                    className="text-[#4ea6a9] hover:underline hover:text-[#3a8d8f] transition-colors"
                  >
                    View Courses
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Hero;
