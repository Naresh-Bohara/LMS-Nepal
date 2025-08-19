"use client";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import EditCategories from "../../components/Admin/Customization/EditCategories";

const Page = () => {
  return (
    <div
      className="min-h-screen
        bg-gradient-to-b from-[#f8ffff] to-[#e8f7f7]
        dark:from-[#0f1f1f] dark:to-[#000]
        transition-colors duration-700"
    >
      <AdminProtected>
        <Heading
          title="LMS-Nepal - Admin Categories"
          description="Manage and customize course categories for LMS-Nepal. Add, edit or remove categories with a premium interface."
          keywords="LMS-Nepal, LMS-Nepal Nepal, Online Courses Nepal, MERN LMS, Redux LMS, Education Platform Nepal"
        />

        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside
            className="hidden md:flex flex-col
              w-[20%] max-w-[280px]
              bg-gradient-to-b from-[#6abfc1] to-[#5aa8a9]
              dark:from-[#5aa8a9] dark:to-[#4c9192]
              text-white shadow-2xl
              sticky top-0"
          >
            <div className="flex-grow p-6 overflow-y-auto">
              <AdminSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main
            className="flex-1 flex flex-col bg-transparent
              overflow-y-auto p-8 md:p-12"
          >
        
              <DashboardHero />
         

            {/* Content Container */}
            <section
              className="flex-grow
                bg-white dark:bg-gray-900
                rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700
                p-8 md:p-12
                transition-all duration-300"
            >
              <EditCategories />
            </section>
          </main>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
