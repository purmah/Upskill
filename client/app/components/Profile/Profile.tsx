"use client";
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Link from "next/link";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState([]);
  const { data } = useGetUsersAllCoursesQuery(undefined, {});
  const [active, setActive] = useState(1);

  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 85);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) =>
          data.courses.find((course: any) => course._id === userCourse._id)
        )
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data]);

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex gap-6">

          {/* Sidebar */}
          <div
            className={`w-[70px] 800px:w-[260px] shrink-0 sticky ${
              scroll ? "top-[90px]" : "top-[20px]"
            } h-fit`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
              <SideBarProfile
                user={user}
                active={active}
                avatar={avatar}
                setActive={setActive}
                logOutHandler={logOutHandler}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">

            {/* Profile Info */}
            {active === 1 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
                <h2 className="text-[18px] font-bold text-gray-900 dark:text-white mb-6">
                  My Profile
                </h2>
                <ProfileInfo avatar={avatar} user={user} />
              </div>
            )}

            {/* Change Password */}
            {active === 2 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
                <h2 className="text-[18px] font-bold text-gray-900 dark:text-white mb-6">
                  Change Password
                </h2>
                <ChangePassword />
              </div>
            )}

            {/* My Courses */}
            {active === 3 && (
              <div>
                <h2 className="text-[18px] font-bold text-gray-900 dark:text-white mb-6">
                  My Courses
                </h2>
                {courses.length > 0 ? (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((item: any, index: number) => (
                      <CourseCard item={item} key={index} isProfile={true} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-12 text-center">
                    <p className="text-[40px] mb-4">📚</p>
                    <h3 className="text-gray-700 dark:text-gray-300 font-semibold text-[17px] mb-2">
                      No courses yet
                    </h3>
                    <p className="text-gray-400 text-sm mb-6">
                      You haven't enrolled in any courses. Start learning today!
                    </p>
                    <Link
                      href="/courses"
                      className="inline-block bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-semibold px-6 py-2 rounded-full text-sm transition"
                    >
                      Browse Courses
                    </Link>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;