import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="bg-blue-800 mt-[55px] text-white p-[30px] flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">About Me</h1>
      <p className="text-lg mb-4 text-left">
        Hello! I am Nelson Chimdiadi, a passionate developer with keen interest
        in building web applications. I enjoy turning ideas into reality using
        code and love to learn new technologies.
      </p>
      <h2 className="text-2xl font-semibold mb-2">
        <Link to="/skills" className="hover:text-blue-800 hover:bg-white">
          Skills Summary:
        </Link>
      </h2>
      <ul className="list-disc list-inside mb-4">
        <li>JavaScript / Typescript</li>
        <li>React / Tailwind CSS</li>
        <li>Node.js / Express.js</li>
        <li>Python / C Programming</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Experience:</h2>
      <p className="text-lg text-left">
        I have worked on various projects, from building full-stack applications
        to contributing to open-source projects. My goal is to create intuitive
        and user-friendly applications.
      </p>
    </section>
  );
};

export default About;
