import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import { toast } from "react-hot-toast";
import Link from "next/link";

const AllCourses: FC = () => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});

  // Handle API responses
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Course deleted successfully!");
      setOpen(false);
    }
    if (error && "data" in error) {
      toast.error((error as any).data.message);
    }
  }, [isSuccess, error, refetch]);

  // Columns (mirroring AllUsers style)
  const columns = [
    { field: "id", headerName: "ID", flex: 0.6 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.4 },
    { field: "purchased", headerName: "Purchased", flex: 0.4 },
    { field: "created_at", headerName: "Created At", flex: 0.6 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => (
        <Link href={`/admin/edit-course/${params.row.id}`}>
          <FiEdit2
            className="dark:text-gray-200 text-gray-800 hover:text-[#6abfc1] transition-colors"
            size={20}
          />
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button
          onClick={() => {
            setOpen(true);
            setCourseId(params.row.id);
          }}
        >
          <AiOutlineDelete
            className="dark:text-gray-200 text-gray-800 hover:text-red-500 transition-colors"
            size={20}
          />
        </Button>
      ),
    },
  ];

  // Rows
  const rows: any = [];
  data?.courses.forEach((item: any) => {
    rows.push({
      id: item._id,
      title: item.name,
      ratings: item.ratings,
      purchased: item.purchased,
      created_at: format(item.createdAt),
    });
  });

  const handleDelete = async () => await deleteCourse(courseId);

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          {/* DataGrid */}
          <Box
            m="20px 0 0 0"
            height="80vh"
            className="rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                fontFamily: "Poppins, sans-serif",
              },
              "& .MuiDataGrid-columnHeaders": {
                background: "linear-gradient(90deg,#6abfc1,#5aa8a9)",
                color: "#fff",
                fontSize: "16px",
                fontWeight: 600,
              },
              "& .MuiDataGrid-row": {
                backgroundColor: theme === "dark" ? "#1e293b" : "#fff",
                color: theme === "dark" ? "#fff" : "#000",
                transition: "background 0.3s",
                "&:hover": {
                  backgroundColor:
                    theme === "dark" ? "rgba(106,191,193,0.1)" : "#f1fdfd",
                },
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1e293b" : "#f9fafb",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme === "dark" ? "#334155" : "#f1f5f9",
                borderTop: "none",
                color: theme === "dark" ? "#e2e8f0" : "#374151",
              },
              "& .MuiCheckbox-root": {
                color: `#6abfc1 !important`,
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>

          {/* Delete Confirmation Modal */}
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="delete-course-title"
            >
              <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Are you sure you want to delete this course?
                </h1>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 rounded-md bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 text-white transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
