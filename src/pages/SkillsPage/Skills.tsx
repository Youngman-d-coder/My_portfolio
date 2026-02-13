import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaPython,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiJavascript,
  SiMongodb,
  SiExpress,
} from "react-icons/si";

const Skills = () => {
  const frontEndSkills = [
    {
      name: "React",
      icon: <FaReact className="text-blue-500" />,
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="text-teal-500" />,
    },
    {
      name: "HTML5",
      icon: <FaHtml5 className="text-orange-500" />,
    },
    {
      name: "CSS3",
      icon: <FaCss3Alt className="text-blue-600" />,
    },
    {
      name: "JavaScript",
      icon: <SiJavascript className="text-yellow-400" />,
    },
  ];

  const backEndSkills = [
    {
      name: "Node.Js",
      icon: <FaNodeJs className="text-green-500" />,
    },
    {
      name: "Express.Js",
      icon: <SiExpress className="text-gray-500" />,
    },
    {
      name: "MongoDB",
      icon: <SiMongodb className="text-green-700" />,
    },
    {
      name: "Python",
      icon: <FaPython className="text-yellow-500" />,
    },
  ];
  return (
    <section className="bg-blue-800 text-white p-6 mt-[60px] mb-[50px] flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-center ">My Skills</h1>
      {/* Front-End */}
      <div className="w-full max-w-4xl mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Front-End Development</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {frontEndSkills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg"
            >
              <div className="text-4xl mb-4">{skill.icon}</div>
              <p className="text-lg font-semibold text-blue-800">
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Back-End */}
      <div className="w-full max-w-4xl mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Back-End Development</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {backEndSkills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg"
            >
              <div className="text-4xl mb-4">{skill.icon}</div>
              <p className="text-lg font-semibold text-blue-800">
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
