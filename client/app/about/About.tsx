import React from "react";
import Link from "next/link";
const About = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#e0f2fe] text-[#0EA5E9] text-sm font-semibold px-4 py-1 rounded-full mb-4">
            Our Story
          </div>
          <h1 className="text-[36px] 800px:text-[52px] font-bold text-gray-900 dark:text-white leading-tight mb-4">
            Built for learners,{" "}
            <span className="text-[#0EA5E9]">by learners</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-[17px] max-w-2xl mx-auto leading-relaxed">
            Upskill was created with one simple belief — quality education should be accessible to everyone, everywhere.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-[#f0f9ff] dark:bg-gray-800 border border-[#bae6fd] dark:border-gray-700 rounded-xl p-8 mb-12">
          <h2 className="text-[22px] font-bold text-gray-900 dark:text-white mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-[16px] leading-relaxed">
            We started Upskill because we saw a problem — too many talented people were being held back by expensive courses, confusing content, and a lack of real support. We set out to fix that by building a platform where anyone can learn practical, job-ready skills without spending a fortune.
          </p>
        </div>

        {/* Story */}
        <div className="mb-12">
          <h2 className="text-[22px] font-bold text-gray-900 dark:text-white mb-4">
            How it started
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-[16px] leading-relaxed mb-4">
            Upskill began as a small project with a big goal — to make learning software development feel less overwhelming and more human. We were tired of courses that threw information at you without context, and communities that felt cold and transactional.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-[16px] leading-relaxed mb-4">
            So we built something different. A platform where courses are built around real outcomes, instructors actually care about your progress, and the community shows up for each other. Every course on Upskill is designed to teach you something you can actually use — not just theory, but skills you can apply on day one.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-[16px] leading-relaxed">
            Today Upskill is home to thousands of learners from all over the world, at every stage of their journey. Whether you're writing your first line of code or preparing for a senior engineering interview, there's a place for you here.
          </p>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-[22px] font-bold text-gray-900 dark:text-white mb-6">
            What we stand for
          </h2>
          <div className="grid grid-cols-1 800px:grid-cols-3 gap-6">
            {[
              {
                title: "Results first",
                desc: "Every course is built around a real outcome. We don't teach fluff — we teach skills that get you hired.",
              },
              {
                title: "Affordable by design",
                desc: "We keep our prices low on purpose. Your bank account shouldn't determine whether you get to grow.",
              },
              {
                title: "Community over everything",
                desc: "Learning is better together. Our community is here to answer questions, share wins, and keep you going.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-sm"
              >
                <h3 className="font-bold text-gray-900 dark:text-white text-[16px] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-[#0EA5E9] rounded-xl p-10">
          <h2 className="text-[24px] font-bold text-white mb-3">
            Ready to start learning?
          </h2>
          <p className="text-white text-opacity-90 text-[15px] mb-6">
            Join thousands of learners already building their future on Upskill.
          </p>
          <Link
  href="/courses"
  className="inline-block bg-white text-[#0EA5E9] font-bold px-8 py-3 rounded-full text-[15px] hover:bg-opacity-90 transition"
>
  Browse Courses →
</Link>
        </div>

      </div>
    </div>
  );
};

export default About;