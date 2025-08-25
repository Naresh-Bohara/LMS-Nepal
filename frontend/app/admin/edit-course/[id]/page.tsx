'use client'
import React from 'react'
import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";
import Heading from '../../../../app/utils/Heading';
import DashboardHeader from '../../../../app/components/Admin/DashboardHeader';
import EditCourse from "../../../components/Admin/Course/EditCourse";

type Props = {}

const page = ({params}:any) => {
    const id = params?.id;

  return (
    <div>
        <Heading
         title="LMS-Nepal - Admin"
         description="LMS-Nepal is a modern Learning Management System designed for students and educators in Nepal to access courses, manage resources, and enhance learning."
         keywords="Prograaming,MERN,Redux,Machine Learning"
        />
        <div className="flex">
            <div className="1500px:w-[16%] w-1/5">
                <AdminSidebar />
            </div>
            <div className="w-[85%]">
               <DashboardHeader />
               <EditCourse id={id} />
            </div>
        </div>
    </div>
  )
}

export default page