"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import Image from "next/image";
import avatar from "../../public/assests/avatar.png";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { useSession } from "next-auth/react";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./Loader/Loader";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined, {});
  const { data } = useSession();
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!userData) {
        if (data) {
          socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: data.user?.image,
          });
          refetch();
        }
      }
      if (data === null) {
        if (isSuccess) {
          toast.success("Login Successfully");
        }
      }
      if (data === null && !isLoading && !userData) {
        setLogout(true);
      }
    }
  }, [data, userData, isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 85);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full relative">
          {/* Main Navbar */}
          <div
            className={`${
              active
                ? "fixed top-0 left-0 w-full z-[80] shadow-md transition duration-300"
                : "w-full z-[80]"
            } bg-[#0EA5E9] h-[70px]`}
          >
            <div className="w-[95%] 800px:w-[92%] m-auto h-full flex items-center justify-between">
              {/* Logo */}
              <Link
                href="/"
                className="text-[24px] font-bold text-white tracking-wide"
              >
                Upskill
              </Link>

              {/* Desktop Nav */}
              <div className="hidden 800px:flex items-center gap-6">
                <NavItems activeItem={activeItem} isMobile={false} />
                <ThemeSwitcher />
                {userData ? (
                  <Link href="/profile">
                    <Image
                      src={
                        userData?.user.avatar
                          ? userData.user.avatar.url
                          : avatar
                      }
                      alt="profile"
                      width={34}
                      height={34}
                      className="rounded-full cursor-pointer border-2 border-white"
                    />
                  </Link>
                ) : (
                  <button
                    onClick={() => setOpen(true)}
                    className="bg-white text-[#0EA5E9] font-semibold px-5 py-2 rounded-full text-sm hover:bg-opacity-90 transition"
                  >
                    Login
                  </button>
                )}
              </div>

              {/* Mobile Menu Icon */}
              <div className="800px:hidden flex items-center gap-3">
                <div className="mt-4"> <ThemeSwitcher /> </div>
                {userData ? (
                  <Link href="/profile">
                    <Image
                      src={
                        userData?.user.avatar
                          ? userData.user.avatar.url
                          : avatar
                      }
                      alt="profile"
                      width={30}
                      height={30}
                      className="rounded-full cursor-pointer border-2 border-white"
                    />
                  </Link>
                ) : (
                  <HiOutlineUserCircle
                    size={26}
                    className="text-white cursor-pointer"
                    onClick={() => setOpen(true)}
                  />
                )}
                <HiOutlineMenuAlt3
                  size={26}
                  className="text-white cursor-pointer"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
            </div>
          </div>

          {/* Mobile Sidebar */}
          {openSidebar && (
            <div
              className="fixed w-full h-screen top-0 left-0 z-[99999] bg-[#00000040]"
              onClick={handleClose}
              id="screen"
            >
              <div className="w-[70%] fixed z-[999999999] h-screen bg-white top-0 right-0 shadow-xl flex flex-col p-6">
                {/* Sidebar Logo */}
                <div className="mb-8">
                  <Link
                    href="/"
                    className="text-[22px] font-bold text-[#0EA5E9]"
                    onClick={() => setOpenSidebar(false)}
                  >
                    Upskill
                  </Link>
                </div>

                <NavItems activeItem={activeItem} isMobile={true} />

                {!userData && (
                  <button
                    onClick={() => {
                      setOpen(true);
                      setOpenSidebar(false);
                    }}
                    className="mt-6 bg-[#0EA5E9] text-white font-semibold px-5 py-2 rounded-full text-sm w-full"
                  >
                    Login
                  </button>
                )}

                <p className="text-[13px] text-gray-400 mt-auto">
                  © 2026 Upskill. All rights reserved.
                </p>
              </div>
            </div>
          )}

          {/* Auth Modals */}
          {route === "Login" && open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
              refetch={refetch}
            />
          )}
          {route === "Sign-Up" && open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
          {route === "Verification" && open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Header;