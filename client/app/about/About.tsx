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
          Welcome to <strong>LMS-Nepal</strong> — a modern, intuitive, and
          comprehensive Learning Management System built specifically for
          students, educators, and institutions in Nepal. Our mission is to
          empower learners by providing easy access to quality education
          anytime, anywhere.
        </p>

        <p>
          At LMS-Nepal, we understand the unique challenges faced by learners
          across Nepal, from urban centers to remote villages. That’s why our
          platform offers a diverse range of courses designed to be accessible,
          affordable, and tailored to meet your educational needs.
        </p>

        <p>
          Our features include:
          <ul className="list-disc list-inside mt-2 mb-4">
            <li>Interactive video lectures and course materials</li>
            <li>Real-time quizzes, assignments, and assessments</li>
            <li>Community discussion forums and peer collaboration</li>
            <li>Progress tracking and personalized learning paths</li>
            <li>Certificates of completion to showcase your achievements</li>
          </ul>
        </p>

        <p>
          Beyond technology, LMS-Nepal is a vibrant community that nurtures
          curiosity and growth. Whether you're a student aiming to improve your
          skills, a teacher looking to share knowledge, or an institution
          wanting to digitize your courses, LMS-Nepal is here to support you
          every step of the way.
        </p>

        <p>
          Join thousands of learners who have already discovered the power of
          accessible education through LMS-Nepal. Together, we’re building a
          brighter future for education in Nepal — one course at a time.
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
