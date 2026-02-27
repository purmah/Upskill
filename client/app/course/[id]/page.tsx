"use client";
import CourseDetailsPage from "@/app/components/Course/CourseDetailsPage";
import { use } from "react";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  return (
    <div>
      <CourseDetailsPage id={id} />
    </div>
  );
};

export default Page;