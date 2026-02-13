import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Import icons

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-blue-800 text-white shadow-md py-4 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="md:flex space-x-4">
            <div className="flex justify-center space-x-4">
              <a
                href="https://github.com/youngman-d-coder"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center"
              >
                <FaGithub className="mr-1" /> {/* GitHub icon */}
              </a>
              <a
                href="https://linkedin.com/in/NelsonLinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center"
              >
                <FaLinkedin className="mr-1" /> {/* LinkedIn icon */}
              </a>
              <p className="mt-2">
                Email:{" "}
                <a
                  href="mailto:sayhitonelson@gmail.com"
                  className="hover:underline"
                >
                  sayhitonelson@gmail.com
                </a>{" "}
              </p>
            </div>
          </div>
          {/* Copyright Section */}
          <div>© 2026 Nelson Chimdiadi. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
