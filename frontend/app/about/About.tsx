import React from "react";
import { styles } from "../styles/style";

const About = () => {
  return (
    <section
      className="max-w-5xl mx-auto px-5 py-16 text-gray-900 dark:text-gray-100"
      aria-labelledby="about-title"
    >
      <h1
        id="about-title"
        className={`${styles.title} text-4xl md:text-5xl font-extrabold mb-8 text-center`}
      >
        About <span className="text-gradient">LMS-Nepal</span>
      </h1>

      <article className="prose prose-lg dark:prose-invert mx-auto max-w-none">
        <p>
          Welcome to <strong>LMS-Nepal</strong>, a modern and intuitive
          Learning Management System designed for students, educators, and
          institutions across Nepal. Our goal is to make learning accessible,
          flexible, and engaging for everyone.
        </p>

        <p>
          LMS-Nepal provides a rich learning environment with:
          <ul className="list-disc list-inside mt-2 mb-4">
            <li>High-quality video lectures and course materials</li>
            <li>Extensive resources for deeper learning</li>
            <li>Q&A sections to ask questions and clarify doubts</li>
            <li>Community-driven discussions and collaboration</li>
            <li>Tools to track your learning progress</li>
          </ul>
        </p>

        <p>
          Whether you are a student wanting to improve your skills, a teacher
          looking to share knowledge, or an institution aiming to digitize
          courses, LMS-Nepal provides the tools and community to support your
          learning journey.
        </p>

        <p>
          Join thousands of learners across Nepal and experience the power of
          accessible education with LMS-Nepal. Together, we are creating a
          smarter, connected, and empowered learning community.
        </p>

        <footer className="mt-12 text-center">
          <p className="font-semibold text-lg">Sincerely,</p>
          <p className="italic text-gray-600 dark:text-gray-400">
            The LMS-Nepal Team
          </p>
        </footer>
      </article>
    </section>
  );
};

export default About;
