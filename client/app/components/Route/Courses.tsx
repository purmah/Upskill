import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";
import Link from "next/link";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.courses || []);
  }, [data]);

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[#0EA5E9] text-sm font-semibold uppercase tracking-widest mb-2">
            What we offer
          </p>
          <h2 className="text-[28px] 800px:text-[38px] font-bold text-gray-900 dark:text-white leading-tight">
            Courses built for{" "}
            <span className="text-[#0EA5E9]">real results</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-[15px] max-w-xl mx-auto">
            Handpicked courses taught by industry experts. Whether you're just starting out or leveling up, there's something here for you.
          </p>
        </div>

        {/* Course Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-[#0EA5E9] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 1500px:grid-cols-4">
            {courses.map((item: any, index: number) => (
              <CourseCard item={item} key={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400 dark:text-gray-600">
            <p className="text-[18px]">No courses available yet.</p>
            <p className="text-sm mt-1">Check back soon — new courses are added every week!</p>
          </div>
        )}

        {/* View All Button */}
        {courses && courses.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="inline-block bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-semibold px-8 py-3 rounded-full transition text-[15px]"
            >
              View All Courses →
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default Courses;