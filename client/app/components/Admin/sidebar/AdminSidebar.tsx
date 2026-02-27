"use client";
import { FC, useEffect, useState } from "react";
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  ExitToAppIcon,
} from "./Icon";
import avatarDefault from "../../../../public/assests/avatar.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
  isCollapsed: boolean;
}

const Item: FC<ItemProps> = ({ title, to, icon, selected, setSelected, isCollapsed }) => {
  const isActive = selected === title;
  return (
    <Link
      href={to}
      onClick={() => setSelected(title)}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg mx-2 mb-1 transition-all duration-150 group ${
        isActive
          ? "bg-[#0EA5E9] text-white"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      <span className={`shrink-0 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white"}`}>
        {icon}
      </span>
      {!isCollapsed && (
        <span className="text-[14px] font-medium whitespace-nowrap">{title}</span>
      )}
    </Link>
  );
};

const SectionLabel: FC<{ label: string; isCollapsed: boolean }> = ({ label, isCollapsed }) => {
  if (isCollapsed) return <div className="my-2 border-t border-gray-100 dark:border-gray-700" />;
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 px-6 mt-5 mb-2">
      {label}
    </p>
  );
};

const AdminSidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

const getSelectedFromPath = (path: string | null) => {
  if (!path) return "Dashboard";
  if (path === "/admin") return "Dashboard";
  if (path.includes("users")) return "Users";
  if (path.includes("invoices")) return "Invoices";
  if (path.includes("create-course")) return "Create Course";
  if (path.includes("courses-analytics")) return "Courses Analytics";
  if (path.includes("orders-analytics")) return "Orders Analytics";
  if (path.includes("users-analytics")) return "Users Analytics";
  if (path.includes("courses")) return "Live Courses";
  if (path.includes("categories")) return "Categories";
  if (path.includes("team")) return "Manage Team";
  return "Dashboard";
};

const [selected, setSelected] = useState(() => getSelectedFromPath(pathname));

useEffect(() => {
  setSelected(getSelectedFromPath(pathname));
}, [pathname]);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      className={`fixed top-0 left-0 h-screen z-[100] bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 shadow-sm flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-[70px]" : "w-[240px]"
      }`}
    >
      {/* Header */}
      {/* Header */}
<div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-gray-800">
  {!isCollapsed && (
    <span
      onClick={() => window.location.href = "/"}
      className="text-[18px] font-bold text-[#0EA5E9] cursor-pointer hover:opacity-80 transition"
    >
      Upskill
    </span>
  )}
  <button
    onClick={() => setIsCollapsed(!isCollapsed)}
    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-700 dark:hover:text-white transition ml-auto"
  >
    {isCollapsed ? (
      <ArrowForwardIosIcon style={{ fontSize: 16 }} />
    ) : (
      <ArrowBackIosIcon style={{ fontSize: 16 }} />
    )}
  </button>
</div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 dark:border-gray-800">
          <Image
            alt="profile"
            width={38}
            height={38}
            src={user?.avatar ? user.avatar.url : avatarDefault}
            className="rounded-full border-2 border-[#0EA5E9] shrink-0"
          />
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-gray-900 dark:text-white truncate">
              {user?.name}
            </p>
            <p className="text-[12px] text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
      )}

      {isCollapsed && (
        <div className="flex justify-center py-3 border-b border-gray-100 dark:border-gray-800">
          <Image
            alt="profile"
            width={34}
            height={34}
            src={user?.avatar ? user.avatar.url : avatarDefault}
            className="rounded-full border-2 border-[#0EA5E9]"
          />
        </div>
      )}

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto py-3 scrollbar-hide">

        <SectionLabel label="Main" isCollapsed={isCollapsed} />
        <Item title="Dashboard" to="/admin" icon={<HomeOutlinedIcon style={{ fontSize: 20 }} />} selected={selected} setSelected={setSelected} isCollapsed={isCollapsed} />

        <SectionLabel label="Data" isCollapsed={isCollapsed} />
        <Item title="Users" to="/admin/users" icon={<GroupsIcon style={{ fontSize: 20 }} />} selected={selected} setSelected={setSelected} isCollapsed={isCollapsed} />
        <Item title="Invoices" to="/admin/invoices" icon={<ReceiptOutlinedIcon style={{ fontSize: 20 }} />} selected={selected} setSelected={setSelected} isCollapsed={isCollapsed} />

        <SectionLabel label="Content" isCollapsed={isCollapsed} />
        <Item title="Create Course" to="/admin/create-course" icon={<VideoCallIcon style={{ fontSize: 20 }} />} selected={selected} setSelected={setSelected} isCollapsed={isCollapsed} />
        <Item title="Live Courses" to="/admin/courses" icon={<OndemandVideoIcon style={{ fontSize: 20 }} />} selected={selected} setSelected={setSelected} isCollapsed={isCollapsed} />

        <SectionLabel label="Customization" isCollapsed={isCollapsed} />
        
        <Item title="Categories" to="/admin/categories" icon={<WysiwygIcon style={{ fontSize: 20 }} />} selected={selected} setSelected={setSelected} isCollapsed={isCollapsed} />

        <SectionLabel label="Controllers" isCollapsed={isCollapsed} />
        <Item title="Manage Team" to="/admin/team" icon={<PeopleOutlinedIcon style={{ fontSize: 20 }} />} selected={selected} setSelected={setSelected} isCollapsed={isCollapsed} />

        <SectionLabel label="Analytics" isCollapsed={isCollapsed} />
        <Item title="Courses Analytics" to="/admin/courses-analytics" icon={<BarChartOutlinedIcon style={{ fontSize: 20 }} />} selected={selected} setSelected={setSelected} isCollapsed={isCollapsed} />
        <Item title="Orders Analytics" to="/admin/orders-analytics" icon={<MapOutlinedIcon style={{ fontSize: 20 }} />} selected={selected} setSelected={setSelected} isCollapsed={isCollapsed} />
        <Item title="Users Analytics" to="/admin/users-analytics" icon={<ManageHistoryIcon style={{ fontSize: 20 }} />} selected={selected} setSelected={setSelected} isCollapsed={isCollapsed} />

      </div>

      {/* Logout */}
      <div className="border-t border-gray-100 dark:border-gray-800 p-3">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition"
        >
          <ExitToAppIcon style={{ fontSize: 20 }} />
          {!isCollapsed && <span className="text-[14px] font-medium">Logout</span>}
        </Link>
      </div>

    </div>
  );
};

export default AdminSidebar;