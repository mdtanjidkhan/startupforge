"use client";

import { Avatar } from "@heroui/react";
import { HiUtnsStar } from "react-icons/hi2"; 
export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Tanzid Hasan",
      role: "Full-Stack Developer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      comment: "StartupForge made it incredibly easy to find promising web projects. The direct connection with founders saved me weeks of traditional job hunting!",
      rating: 5
    },
    {
      id: 2,
      name: "Alex Rivera",
      role: "SaaS Founder",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      comment: "Finding the right co-founders and team members is the hardest part of building a startup. This platform solved that problem for us overnight.",
      rating: 5
    },
    {
      id: 3,
      name: "Sarah Jenkins",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      comment: "I love the clean interface and the transparent application process. Highly recommended for any tech professional looking to make an impact.",
      rating: 5
    }
  ];

  return (
    <section className="w-full py-16 max-w-7xl mx-auto px-4 border-t border-gray-100 dark:border-slate-800/40">
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 w-full">
        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          ❤️ What Our Users Say
        </h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
          Hear from the real founders and talented minds who built their squads and products through StartupForge.
        </p>
      </div>
      <div 
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
          width: "100%"
        }}
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="w-full p-6 bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800 rounded-3xl shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-0.5 text-amber-500 text-sm">
                {"★".repeat(review.rating)}
              </div>
              <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed italic">
                {review.comment}
              </p>
            </div>

            <div 
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                paddingTop: "12px",
                borderTop: "1px solid rgba(156, 163, 175, 0.1)"
              }}
            >
              <Avatar src={review.avatar} className="w-10 h-10 rounded-xl" />
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  {review.name}
                </h4>
                <p className="text-[11px] text-gray-400 dark:text-slate-500 font-medium">
                  {review.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}