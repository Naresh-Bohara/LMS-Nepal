import { styles } from "@/app/styles/style";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Review = {
  name: string;
  avatar: string;
  profession: string;
  comment: string;
  rating?: number; 
};

// Star SVG in yellow for rating
const Star = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-yellow-200"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.176 0l-3.38 2.454c-.784.57-1.838-.196-1.539-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
  </svg>
);

const RatingStars = ({ rating = 5 }: { rating?: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);
  return (
    <div className="flex space-x-0.5">
      {stars.map((filled, idx) => (
        <Star key={idx} filled={filled} />
      ))}
    </div>
  );
};

const reviews: Review[] = [
  {
    name: "Naresh Bohara",
    avatar: "https://naresh-bohara.com.np/assets/logo3-O_p_glfc.jpg",
    profession: "BSc CSIT Student | Far Western University",
    comment:
      "LMS-Nepal helped me build a strong foundation in web development. The explanations are clear and the projects are really helpful. Highly recommended for beginners!",
    rating: 5,
  },
  {
    name: "Aarav Sharma",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    profession: "Frontend Developer | Freelancer",
    comment:
      "This platform is simple, clean, and straight to the point. The courses are well-structured and easy to follow. Great for anyone who wants to start coding seriously.",
    rating: 4,
  },
  {
    name: "Sneha Koirala",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    profession: "Computer Engineering Student | TU",
    comment:
      "LMS-Nepal provides quality content that’s perfect for self-learners. I loved the project-based approach and the real-world examples.",
    rating: 5,
  },
   {
    name: "Sneha Koirala",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    profession: "Computer Engineering Student | TU",
    comment:
      "LMS-Nepal provides quality content that’s perfect for self-learners. I loved the project-based approach and the real-world examples.",
    rating: 2,
  },
];

const Reviews = () => {
  return (
    <div className="w-[92%] 800px:w-[85%] m-auto py-16">
      {/* Header Section */}
      <div className="w-full 800px:flex items-center mb-16 gap-8">
        <div className="800px:w-[50%] w-full rounded-2xl shadow-xl overflow-hidden">
          <Image
            src={require("../../../public/assests/business-img.png")}
            alt="business"
            width={700}
            height={700}
            className="object-cover"
            priority
          />
        </div>
        <div className="800px:w-[50%] w-full px-4">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are <span className="text-gradient">Our Strength</span>
            <br /> See What They Say About Us
          </h3>
          <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-[16px]">
            LMS-Nepal has transformed the way students learn in Nepal. With
            real-world projects, hands-on guidance, and an amazing support
            system, we focus on practical knowledge, not just theory.
          </p>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-10">
        {reviews.map((item, idx) => (
          <div
            key={idx}
            className="relative bg-white dark:bg-[#1e1e1e]/60 backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-lg rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300"
          >
            {/* Rating stars top right */}
            <div className="absolute top-4 right-4 flex pointer-events-none">
              <RatingStars rating={item.rating} />
            </div>

            <div className="flex items-center gap-4 mb-3">
              <Link href="https://naresh-bohara.com.np" target="_blank" rel="noopener noreferrer">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={56}
                  height={56}
                  className="rounded-full border-[3px] border-cyan-400 object-cover"
                  unoptimized
                />
              </Link>
              <div>
                <Link href="https://naresh-bohara.com.np" target="_blank" rel="noopener noreferrer">
                  <h4 className="font-semibold text-[17px] text-gray-800 dark:text-white hover:underline">
                    {item.name}
                  </h4>
                </Link>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.profession}
                </span>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed">
              {item.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
