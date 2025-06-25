"use client";
import { useEffect, useState } from "react";

export default function FreelancerProfile() {
  const [skills, setSkills] = useState<string[]>([
    "JavaScript",
    "React",
    "Node.js",
    "CSS",
    "HTML",
    "Git",
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSkills((prev) => [...prev, "TypeScript"]);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-100 font-sans min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile Picture"
              className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-6"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
              <p className="text-lg text-gray-600">Senior Web Developer</p>
              <p className="text-gray-500">
                New York, USA | Available for 30+ hours/week
              </p>
              <div className="flex items-center justify-center md:justify-start mt-2">
                {"★★★★★".split("").map((star, index) => (
                  <span key={index} className="text-yellow-400">
                    ★
                  </span>
                ))}
                <span className="ml-2 text-gray-600">
                  (4.9 from 50 reviews)
                </span>
              </div>
              <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700">
                Hire Me
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                About
              </h2>
              <p className="text-gray-700">
                I'm a passionate web developer with over 8 years of experience
                in building scalable web applications. I specialize in
                JavaScript, React, and Node.js, delivering high-quality
                solutions for clients across various industries.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Work History
              </h2>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  E-commerce Website Development
                </h3>
                <p className="text-gray-600">
                  Client: ABC Corp | Completed: June 2025
                </p>
                <p className="text-gray-700 mt-2">
                  Developed a fully responsive e-commerce platform using React
                  and Shopify.
                </p>
                <div className="flex items-center mt-2">
                  {"★★★★★".split("").map((star, index) => (
                    <span key={index} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-gray-600">
                    "Excellent work, delivered on time!"
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Portfolio Website
                </h3>
                <p className="text-gray-600">
                  Client: Jane Smith | Completed: March 2025
                </p>
                <p className="text-gray-700 mt-2">
                  Designed and developed a personal portfolio website using
                  HTML, CSS, and JavaScript.
                </p>
                <div className="flex items-center mt-2">
                  {"★★★★☆".split("").map((star, index) => (
                    <span
                      key={index}
                      className={
                        star === "★" ? "text-yellow-400" : "text-gray-300"
                      }
                    >
                      {star}
                    </span>
                  ))}
                  <span className="ml-2 text-gray-600">
                    "Great communication and quality."
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 px-3 py-1 rounded-full mr-2 mb-2 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Education
              </h2>
              <p className="text-gray-700">B.S. in Computer Science</p>
              <p className="text-gray-600">
                University of California, Berkeley | 2014 - 2018
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Languages
              </h2>
              <p className="text-gray-700">English: Native</p>
              <p className="text-gray-700">Spanish: Conversational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
