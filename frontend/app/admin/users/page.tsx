'use client'

import DashboardHero from '@/app/components/Admin/DashboardHero'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import AllUsers from "../../components/Admin/Users/AllUsers";
import { useTheme } from 'next-themes';

type Props = {}

const Page = (props: Props) => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <AdminProtected>
        <Heading
          title="LMS-Nepal - Admin"
          description="LMS-Nepal is a modern Learning Management System designed for students and educators in Nepal to access courses, manage resources, and enhance learning."
          keywords="Programming,MERN,Redux,Machine Learning"
        />

        {/* Layout */}
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside
            className={`hidden 1500px:flex flex-col w-[16%] min-w-[220px] p-4 border-r transition-colors duration-300
            ${theme === 'dark' ? 'border-gray-700 bg-gray-800/60 backdrop-blur-lg' : 'border-gray-200 bg-white/80 backdrop-blur-md'}`}
          >
            <div className="text-2xl font-bold text-[#6abfc1] mb-6 text-center">
              Admin
            </div>
            <AdminSidebar />
          </aside>

          {/* Content */}
          <main className="flex flex-col flex-1 w-full overflow-y-auto">
            {/* Top Bar */}
            <div
              className={`sticky top-0 z-10 px-6 py-4 shadow-md border-b transition-colors duration-300
              ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <DashboardHero />
            </div>

            {/* Page Content */}
            <div className="flex-1 px-6 py-6 overflow-y-auto">
              <AllUsers />
            </div>
          </main>
        </div>
      </AdminProtected>
    </div>
  )
}

export default Page;
