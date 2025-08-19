import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { AiOutlineMail } from "react-icons/ai";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
  const { theme } = useTheme();
  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});

  const [orderData, setOrderData] = useState<any[]>([]);

  // Primary brand colors - customize if needed
  const primaryLight = "#6abfc1";
  const primaryDark = "#45CBA0";

  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = usersData?.users.find(
          (user: any) => user._id === item.userId
        );
        const course = coursesData?.courses.find(
          (course: any) => course._id === item.courseId
        );
        return {
          ...item,
          userName: user?.name || "Unknown User",
          userEmail: user?.email || "N/A",
          title: course?.name || "Unknown Course",
          price: course ? `Rs.${course.price}` : "-",
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  const columns: any = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
      sortable: false,
      headerClassName: "header",
      cellClassName: "id-column--cell",
      // To make sure the ID text won't wrap
      renderCell: (params: any) => (
        <div
          title={params.value}
          style={{
            fontWeight: 700,
            padding: "6px 12px",
            borderRadius: "8px",
            backgroundColor:
              theme === "dark" ? "rgba(106, 191, 193, 0.2)" : "#d1f0f7",
            color: theme === "dark" ? primaryLight : primaryDark,
            boxShadow:
              theme === "dark"
                ? "0 2px 6px rgba(106, 191, 193, 0.4)"
                : "0 1px 4px rgba(106, 191, 193, 0.7)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            userSelect: "text",
            fontFamily: "'Poppins', sans-serif",
            display: "inline-block",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "userName",
      headerName: "Name",
      flex: isDashboard ? 0.7 : 0.5,
      headerClassName: "header",
      cellClassName: "name-column--cell",
    },
    ...(isDashboard
      ? []
      : [
          {
            field: "userEmail",
            headerName: "Email",
            flex: 1,
            headerClassName: "header",
          },
          {
            field: "title",
            headerName: "Course Title",
            flex: 1,
            headerClassName: "header",
          },
        ]),
    {
      field: "price",
      headerName: "Price",
      flex: 0.4,
      headerClassName: "header",
    },
    ...(isDashboard
      ? [
          {
            field: "created_at",
            headerName: "Created At",
            flex: 0.5,
            headerClassName: "header",
          },
        ]
      : [
          {
            field: "emailIcon",
            headerName: "Email",
            flex: 0.2,
            sortable: false,
            filterable: false,
            renderCell: (params: any) => (
              <a
                href={`mailto:${params.row.userEmail}`}
                title={`Email ${params.row.userName}`}
              >
                <AiOutlineMail
                  className={`${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  } hover:text-[${primaryLight}] transition-colors duration-200`}
                  size={22}
                />
              </a>
            ),
            headerClassName: "header",
          },
        ]),
  ];

  const rows = orderData.map((item: any) => ({
    id: item._id,
    userName: item.userName,
    userEmail: item.userEmail,
    title: item.title,
    price: item.price,
    created_at: format(item.createdAt),
  }));

  return (
    <div className={`${isDashboard ? "mt-0" : "mt-[120px]"}`}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? 0 : "40px"}>
          <Box
            m={isDashboard ? "0" : "40px 0 0 0"}
            height={isDashboard ? "35vh" : "90vh"}
            sx={{
              borderRadius: 2,
              boxShadow:
                theme === "dark"
                  ? "0 8px 24px rgba(0,0,0,0.9)"
                  : "0 4px 12px rgba(0,0,0,0.1)",
              overflow: "hidden",

              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
                fontFamily: "'Poppins', sans-serif",
              },
              "& .header": {
                backgroundColor: theme === "dark" ? "#2e3a72" : primaryLight,
                color: "#fff",
                fontWeight: 700,
                fontSize: "1rem",
              },
              "& .id-column--cell": {
                paddingLeft: "16px !important",
                paddingRight: "16px !important",
              },
              "& .name-column--cell": {
                fontWeight: 600,
                color: theme === "dark" ? primaryLight : primaryDark,
              },
              "& .MuiDataGrid-columnSeparator": {
                display: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#121D39" : "#f9fafb",
              },
              "& .MuiDataGrid-row": {
                cursor: isDashboard ? "default" : "pointer",
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(106, 191, 193, 0.15)"
                      : "rgba(106, 191, 193, 0.1)",
                },
                color: theme === "dark" ? "#d0d9ff" : "#222",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiCheckbox-root": {
                color: theme === "dark" ? `${primaryLight} !important` : "#000 !important",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#2e3a72" : primaryLight,
                color: "#fff",
              },
              "& .MuiTablePagination-root": {
                color: "#fff",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "#fff !important",
                fontWeight: 600,
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : primaryDark,
              },
              "& .MuiSvgIcon-root": {
                fontSize: "1.2rem",
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection={!isDashboard}
              disableSelectionOnClick={isDashboard}
              components={isDashboard ? {} : { Toolbar: GridToolbar }}
              density={isDashboard ? "compact" : "standard"}
              pageSize={isDashboard ? 5 : 10}
              rowsPerPageOptions={isDashboard ? [5] : [10, 25, 50]}
              autoHeight={isDashboard}
              sx={{
                fontFamily: "'Poppins', sans-serif",
              }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
