import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { toast } from "react-hot-toast";
import { IoCloseOutline } from "react-icons/io5";

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
  const [updateUserRole, { error: updateError, isSuccess }] = useUpdateUserRoleMutation();
  const { isLoading, data, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteUserMutation({});

  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
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
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [updateError, isSuccess, deleteSuccess, deleteError]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.3 },
    { field: "courses", headerName: "Courses", flex: 0.3 },
    { field: "created_at", headerName: "Joined", flex: 0.4 },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => (
        <button
          onClick={() => { setOpen(true); setUserId(params.row.id); }}
          className="text-gray-400 hover:text-red-500 transition p-1"
        >
          <AiOutlineDelete size={18} />
        </button>
      ),
    },
    {
      field: "  ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => (
        <a href={`mailto:${params.row.email}`} className="text-gray-400 hover:text-[#0EA5E9] transition p-1">
          <AiOutlineMail size={18} />
        </a>
      ),
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData = data && data.users.filter((item: any) => item.role === "admin");
    newData && newData.forEach((item: any) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        courses: item.courses.length,
        created_at: format(item.createdAt),
      });
    });
  } else {
    data && data.users.forEach((item: any) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        courses: item.courses.length,
        created_at: format(item.createdAt),
      });
    });
  }

  const handleSubmit = async () => {
    await updateUserRole({ email, role });
  };

  const handleDelete = async () => {
    await deleteUser(userId);
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
                {isTeam ? "Manage Team" : "All Users"}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {rows.length} {isTeam ? "team members" : "users"} total
              </p>
            </div>
            {isTeam && (
              <button
                onClick={() => setActive(true)}
                className="bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-semibold px-4 py-2 rounded-lg text-sm transition"
              >
                + Add Member
              </button>
            )}
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
                "& .MuiCheckbox-root": {
                  color: theme === "dark" ? "#0EA5E9 !important" : "#0EA5E9 !important",
                },
                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
              }}
            >
              <DataGrid
                checkboxSelection
                rows={rows}
                columns={columns}
                autoHeight
              />
            </Box>
          </div>

          {/* Add Member Modal */}
          {active && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-[440px] border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-[18px] font-bold text-gray-900 dark:text-white">
                    Add New Member
                  </h2>
                  <button onClick={() => setActive(false)} className="text-gray-400 hover:text-gray-600">
                    <IoCloseOutline size={22} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                      Email address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@example.com"
                      className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:border-[#0EA5E9]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                      Role
                    </label>
                    <select
                      className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-[#0EA5E9]"
                      onChange={(e: any) => setRole(e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-semibold py-2.5 rounded-lg text-sm transition mt-2"
                  >
                    Add Member
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirm Modal */}
          {open && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-[400px] border border-gray-100 dark:border-gray-700">
                <div className="text-center mb-6">
                  <p className="text-[40px] mb-3">🗑️</p>
                  <h2 className="text-[17px] font-bold text-gray-900 dark:text-white mb-2">
                    Delete this user?
                  </h2>
                  <p className="text-gray-400 text-sm">
                    This action cannot be undone.
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

export default AllUsers;