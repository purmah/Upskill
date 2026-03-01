"use client";
export const dynamic = "force-dynamic";

import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import CourseCard from "../components/Course/CourseCard";
import Footer from "../components/Footer";

type Props = {};

const CoursesContent = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setcourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category === "All") {
      setcourses(data?.courses || []);
    }
    if (category !== "All") {
      setcourses(
        data?.courses?.filter((item: any) => item.categories === category) || []
      );
    }
    if (search) {
      setcourses(
        data?.courses?.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        ) || []
      );
    }
  }, [data, category, search]);

  const categories = categoriesData?.layout?.categories || [];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />

          <Heading
            title="All Courses — Upskill"
            description="Browse all courses on Upskill and find the right one for you."
            keywords="programming, coding, web development, data science, design"
          />

          {/* Page Header */}
          <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-10 px-4">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-[28px] font-bold text-gray-900 dark:text-white mb-1">
                {search ? `Results for "${search}"` : "All Courses"}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {courses?.length || 0} course{courses?.length !== 1 ? "s" : ""} available
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-10">
            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap mb-8">
              <button
                onClick={() => setCategory("All")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
                  category === "All"
                    ? "bg-[#0EA5E9] text-white border-[#0EA5E9]"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-[#0EA5E9] hover:text-[#0EA5E9]"
                }`}
              >
                All
              </button>
              {categories.map((item: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCategory(item.title)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
                    category === item.title
                      ? "bg-[#0EA5E9] text-white border-[#0EA5E9]"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-[#0EA5E9] hover:text-[#0EA5E9]"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* Course Grid */}
            {courses && courses.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 1500px:grid-cols-4">
                {courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
                <p className="text-[40px] mb-4">🔍</p>
                <p className="text-gray-700 dark:text-gray-300 text-[18px] font-medium">
                  {search ? `No results for "${search}"` : "No courses in this category yet."}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {search ? "Try a different keyword." : "Check back soon — new courses are added every week!"}
                </p>
                <button
                  onClick={() => setCategory("All")}
                  className="mt-6 bg-[#0EA5E9] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#0284c7] transition"
                >
                  View all courses
                </button>
              </div>
            )}
          </div>

          <Footer />
        </>
      )}
    </div>
  );
};

const Page = (props: Props) => {
  return (
    <Suspense fallback={<Loader />}>
      <CoursesContent />
    </Suspense>
  );
};

export default Page;