import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { toast } from "react-hot-toast";
import Link from "next/link";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => (
        <Link href={`/admin/edit-course/${params.row.id}`}>
          <FiEdit2
            className="text-gray-400 hover:text-[#0EA5E9] transition"
            size={18}
          />
        </Link>
      ),
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => (
        <button
          onClick={() => { setOpen(true); setCourseId(params.row.id); }}
          className="text-gray-400 hover:text-red-500 transition p-1"
        >
          <AiOutlineDelete size={18} />
        </button>
      ),
    },
  ];

  const rows: any = [];
  data && data.courses.forEach((item: any) => {
    rows.push({
      id: item._id,
      title: item.name,
      ratings: item.ratings,
      purchased: item.purchased,
      created_at: format(item.createdAt),
    });
  });

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Course deleted successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error, refetch]);

  const handleDelete = async () => {
    await deleteCourse(courseId);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-[22px] font-bold text-gray-900 dark:text-white">
                Live Courses
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {rows.length} courses total
              </p>
            </div>
            <Link
              href="/admin/create-course"
              className="bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-semibold px-4 py-2 rounded-lg text-sm transition"
            >
              + Create Course
            </Link>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <Box
              sx={{
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
                "& .MuiCheckbox-root": { color: "#0EA5E9 !important" },
                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
              }}
              height="80vh"
            >
              <DataGrid checkboxSelection rows={rows} columns={columns} />
            </Box>
          </div>

          {/* Delete Modal */}
          {open && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-[400px] border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[17px] font-bold text-gray-900 dark:text-white">
                    Delete Course
                  </h2>
                  <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <IoCloseOutline size={22} />
                  </button>
                </div>
                <div className="text-center mb-6">
                  <p className="text-[40px] mb-3">🗑️</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Are you sure you want to delete this course? This action cannot be undone.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setOpen(false)}
                    className="flex-1 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-2.5 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllCourses;