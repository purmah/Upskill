import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student at Cambridge University",
    comment:
      "Upskill has completely changed how I learn. The courses are well-structured, the instructors are knowledgeable, and I went from zero to building real projects in just a few weeks.",
  },
  {
    name: "Verna Santos",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "Full Stack Developer at Quarter Ltd.",
    comment:
      "The teaching style here is unlike anything else. Complex topics are broken down so clearly. I landed my first dev job after completing just two courses on Upskill.",
  },
  {
    name: "Jay Gibbs",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "CS Engineering Student, Zimbabwe",
    comment:
      "Practical, detailed, and beginner-friendly. The real-world examples made everything click. I finished a full project on my own after watching just one course.",
  },
  {
    name: "Mina Davidson",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "Junior Web Developer, Indonesia",
    comment:
      "I was completely new to coding and Upskill made it feel approachable. The content is clear, the pace is perfect, and I actually enjoyed learning for the first time.",
  },
  {
    name: "Rosemary Smith",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    profession: "Full Stack Developer, Algeria",
    comment:
      "The videos are thorough and cover everything in detail. Even as a beginner I could follow along and complete a full project. Genuinely one of the best learning platforms out there.",
  },
  {
    name: "Laura Mckenzie",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    profession: "Full Stack Developer, Canada",
    comment:
      "Upskill focuses on building real things, not just theory. I completed a full marketplace project and learned more in one month here than in an entire semester at school.",
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-full bg-white dark:bg-gray-950 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[#0EA5E9] text-sm font-semibold uppercase tracking-widest mb-2">
            Testimonials
          </p>
          <h2 className="text-[28px] 800px:text-[38px] font-bold text-gray-900 dark:text-white leading-tight">
            What our students are{" "}
            <span className="text-[#0EA5E9]">saying</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-[15px] max-w-xl mx-auto">
            Real results from real people. Here's what learners have to say about their experience on Upskill.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((item, index) => (
            <ReviewCard item={item} key={index} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Reviews;