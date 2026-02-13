import React from "react";

const projects: any[] = [
  {
    title: "E-commerce Website",
    description:
      "A full-stack e-commerce platform with shopping cart, payment integration, and user authentication built using React and Tailwind CSS.",
    link: "https://github.com/Youngman-d-coder",
  },
  {
    title: "Portfolio Website",
    description:
      "Personal portfolio website showcasing projects and skills with responsive design using React and modern web technologies.",
    link: "https://github.com/Youngman-d-coder",
  },
  {
    title: "Task Management App",
    description:
      "A productivity application for managing tasks and projects with real-time updates, built with Node.js and MongoDB.",
    link: "https://github.com/Youngman-d-coder",
  },
  {
    title: "Weather Dashboard",
    description:
      "Interactive weather application displaying real-time weather data and forecasts using external APIs and React.",
    link: "https://github.com/Youngman-d-coder",
  },
];

const Projects = () => {
  return (
    <section className="bg-blue-800 mt-[60px] text-white p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white text-blue-800 shadow-md rounded-lg p-4"
          >
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="mb-4">{project.description}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
