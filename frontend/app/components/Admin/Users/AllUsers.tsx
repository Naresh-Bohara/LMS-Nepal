import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import { toast } from "react-hot-toast";

type Props = {
  isTeam?: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});

  // Handle API responses
  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) toast.error((updateError as any).data.message);
    }
    if (isSuccess) {
      refetch();
      toast.success("User role updated successfully");
      setActive(false);
    }
    if (deleteSuccess) {
      refetch();
      toast.success("User deleted successfully!");
      setOpen(false);
    }
    if (deleteError) {
      if ("data" in deleteError) toast.error((deleteError as any).data.message);
    }
  }, [updateError, isSuccess, deleteSuccess, deleteError, refetch]);

  // Columns (Premium Sizing)
  const columns = [
    { field: "id", headerName: "ID", flex: 0.6 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.7}, 
    { field: "role", headerName: "Role", flex: 0.3 },   
    { field: "courses", headerName: "Purchased", flex: 0.3 }, 
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button
          onClick={() => {
            setOpen(true);
            setUserId(params.row.id);
          }}
        >
          <AiOutlineDelete
            className="dark:text-gray-200 text-gray-800 hover:text-red-500 transition-colors"
            size={20}
          />
        </Button>
      ),
    },
    {
      field: "email_action",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => (
    <a
  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${params.row.email}`}
  target="_blank"
  rel="noopener noreferrer"
>
  <AiOutlineMail
    className="dark:text-gray-200 text-gray-800 hover:text-[#6abfc1] transition-colors"
    size={20}
  />
</a>

      ),
    },
  ];

  // Rows
  const rows: any = [];
  const userData = isTeam
    ? data?.users.filter((u: any) => u.role === "admin")
    : data?.users;

  userData?.forEach((item: any) => {
    rows.push({
      id: item._id,
      name: item.name,
      email: item.email,
      role: item.role,
      courses: item.courses.length,
      created_at: format(item.createdAt),
    });
  });

  const handleSubmit = async () => await updateUserRole({ email, role });
  const handleDelete = async () => await deleteUser(userId);

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          {/* Add Member Button */}
          {isTeam && (
            <div className="w-full flex justify-end text-center mb-4 mt-[-100px]">
              <div
                className={`${styles.button}  !w-[200px] !rounded-[10px] bg-gradient-to-r from-[#6abfc1] to-[#5aa8a9] hover:opacity-90 `}
                onClick={() => setActive(true)}
              >
                Add New Member
              </div>
            </div>
          )}

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

         {/* Add Member Modal */}
{active && (
  <Modal
    open={active}
    onClose={() => setActive(false)}
    aria-labelledby="add-member-title"
  >
    <Box className="
      absolute top-1/2 left-1/2 
      -translate-x-1/2 -translate-y-1/2 
      w-[450px] p-6 
      rounded-2xl shadow-2xl
      border border-gray-200 dark:border-gray-700
      bg-white dark:bg-slate-900 
      transition-all duration-300
    ">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-[#337576] dark:text-gray-100 text-center">
        Add New Member
      </h1>

      <div className="mt-6 space-y-5">
        {/* Email Input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          className="
            w-full px-4 py-3 rounded-lg border
            border-gray-300 dark:border-gray-600
            bg-gray-50 dark:bg-slate-800
            text-gray-800 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500
            transition-all duration-200
          "
        />

        {/* Role Select */}
        <select
          className="
           w-full px-4 py-3 rounded-lg border
    border-gray-300 dark:border-gray-600
    bg-gray-50 dark:bg-slate-800
    text-gray-800 dark:text-gray-100
    focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500
    transition-all duration-200
    appearance-none
          "
          onChange={(e) => setRole(e.target.value)}
        >
          <option className="dark:bg-slate-800" value="admin">
            Admin
          </option>
          <option className="dark:bg-slate-800" value="user">
            User
          </option>
        </select>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="
            w-full py-3 rounded-lg font-medium text-white 
            bg-gradient-to-r from-teal-400 to-teal-500
            hover:from-teal-500 hover:to-teal-600
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400
            transition-all duration-300 shadow-md hover:shadow-lg
          "
        >
          Submit
        </button>
      </div>
    </Box>
  </Modal>
)}

          {/* Delete Confirmation Modal */}
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="delete-user-title"
            >
              <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Are you sure you want to delete this user?
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

export default AllUsers;
