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
  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = usersData?.users.find((user: any) => user._id === item.userId);
        const course = coursesData?.courses.find((course: any) => course._id === item.courseId);
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "$" + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard ? [] : [
      { field: "userEmail", headerName: "Email", flex: 1 },
      { field: "title", headerName: "Course Title", flex: 1 },
    ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
      : [{
          field: " ",
          headerName: "Email",
          flex: 0.2,
          renderCell: (params: any) => (
            <a href={`mailto:${params.row.userEmail}`} className="text-gray-400 hover:text-[#0EA5E9] transition p-1">
              <AiOutlineMail size={18} />
            </a>
          ),
        }]
    ),
  ];

  const rows: any = [];
  orderData && orderData.forEach((item: any) => {
    rows.push({
      id: item._id,
      userName: item.userName,
      userEmail: item.userEmail,
      title: item.title,
      price: item.price,
      created_at: format(item.createdAt),
    });
  });

  const tableStyles = {
    "& .MuiDataGrid-root": { border: "none", outline: "none" },
    "& .MuiDataGrid-sortIcon": { color: theme === "dark" ? "#fff" : "#000" },
    "& .MuiDataGrid-row": {
      color: theme === "dark" ? "#fff" : "#374151",
      borderBottom: theme === "dark" ? "1px solid #374151 !important" : "1px solid #F3F4F6 !important",
    },
    "& .MuiTablePagination-root": { color: theme === "dark" ? "#fff" : "#374151" },
    "& .MuiDataGrid-cell": { borderBottom: "none !important" },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: theme === "dark" ? "#1F2937" : "#F9FAFB",
      borderBottom: theme === "dark" ? "1px solid #374151" : "1px solid #E5E7EB",
      color: theme === "dark" ? "#9CA3AF" : "#6B7280",
    },
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: theme === "dark" ? "#1F2937" : "#fff",
    },
    "& .MuiDataGrid-footerContainer": {
      backgroundColor: theme === "dark" ? "#1F2937" : "#F9FAFB",
      borderTop: theme === "dark" ? "1px solid #374151" : "1px solid #E5E7EB",
      color: theme === "dark" ? "#9CA3AF" : "#6B7280",
    },
    "& .MuiCheckbox-root": {
      color: "#0EA5E9 !important",
    },
    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
      color: theme === "dark" ? "#fff !important" : "#374151 !important",
    },
    "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
      color: theme === "dark" ? "#fff" : "#000",
    },
  };

  return (
    <div className={!isDashboard ? "p-6 bg-gray-50 dark:bg-gray-950 min-h-screen" : ""}>
      {isLoading ? (
        <Loader />
      ) : isDashboard ? (
        // Dashboard view — compact, no header
        <Box sx={tableStyles} height="35vh" overflow="hidden">
          <DataGrid
            checkboxSelection={false}
            rows={rows}
            columns={columns}
          />
        </Box>
      ) : (
        // Full page view
        <div>
          <div className="mb-6">
            <h1 className="text-[22px] font-bold text-gray-900 dark:text-white">
              All Invoices
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {rows.length} orders total
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <Box sx={tableStyles} height="80vh">
              <DataGrid
                checkboxSelection
                rows={rows}
                columns={columns}
                slots={{ toolbar: GridToolbar }}
              />
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllInvoices;