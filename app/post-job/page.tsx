"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Clock,
  Compass,
  DollarSign,
  Briefcase,
  Award,
  Users,
  Tag,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import Particles from "@/components/ui/Particles/Particles";
import ShinyText from "@/components/ui/ShinyText/ShinyText";
import axios from "axios";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Fixed Price",
    budgetMin: "",
    budgetMax: "",
    description: "",
    skills: [],
    category: "",
    experienceLevel: "Intermediate",
    projectLength: "1-3 months",
  });

  const [skill, setSkill] = useState("");
  const [animate, setAnimate] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillAdd = () => {
    if (skill.trim() && !formData.skills.includes(skill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill.trim()],
      }));
      setSkill("");
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleSubmit = async() => {
    console.log("Submitted form data:", formData);
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert("You must be logged in to post a job");
      return;
    }
    
    const jobData = {
      ...formData,
      clientId: userId
    };

    const {data} = await axios.post("/api/job/post-job", jobData);
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-black relative">
      <Navigation />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-tr from-purple-900/10 to-blue-900/10 blur-3xl rounded-full pointer-events-none" />

      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div
            className="lg:col-span-2 min-h-screen overflow-y-auto"
            ref={formRef}
          >
            <div className="absolute inset-0 z-30 pointer-events-none">
              <Particles
                particleColors={["#ffffff", "#ffffff"]}
                particleCount={150}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
              />
            </div>
            <div className="py-16 px-8">
              <h1
                className={`text-4xl font-bold mb-16 mt-8 text-center ${
                  animate
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                } transition-all duration-700 ease-out bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500`}
              >
                <ShinyText
                  text="Post a New Job"
                  disabled={false}
                  speed={3}
                  className="custom-class"
                />
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className={`bg-zinc-900/50 p-6 rounded-xl shadow-md border border-zinc-800 ${
                    animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  } transition-all duration-500 ease-out delay-100`}
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-300">
                    <Briefcase className="mr-2" size={20} />
                    Basic Information
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Job Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-200 placeholder-gray-500"
                        placeholder="e.g. E-commerce Website Redesign"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-200 placeholder-gray-500"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={`bg-zinc-900/50 p-6 rounded-xl shadow-md border border-zinc-800 ${
                    animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  } transition-all duration-500 ease-out delay-200`}
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-300">
                    <Compass className="mr-2" size={20} />
                    Location & Type
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-200 placeholder-gray-500"
                        placeholder="e.g. Remote, New York, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Job Type
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-200"
                      >
                        <option value="Fixed Price">Fixed Price</option>
                        <option value="Hourly">Hourly</option>
                        <option value="Monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div
                  className={`bg-zinc-900/50 p-6 rounded-xl shadow-md border border-zinc-800 ${
                    animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  } transition-all duration-500 ease-out delay-300`}
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-300">
                    <DollarSign className="mr-2" size={20} />
                    Budget
                  </h2>

                  <div className="space-y-4">
                    {formData.type === "Fixed Price" ? (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">
                            Min Budget ($)
                          </label>
                          <input
                            type="number"
                            name="budgetMin"
                            value={formData.budgetMin}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-200 placeholder-gray-500"
                            placeholder="e.g. 3000"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">
                            Max Budget ($)
                          </label>
                          <input
                            type="number"
                            name="budgetMax"
                            value={formData.budgetMax}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-200 placeholder-gray-500"
                            placeholder="e.g. 5000"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Rate per hour ($)
                        </label>
                        <input
                          type="number"
                          name="budgetMin"
                          value={formData.budgetMin}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-200 placeholder-gray-500"
                          placeholder="e.g. 50"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`bg-zinc-900/50 p-6 rounded-xl shadow-md border border-zinc-800 ${
                    animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  } transition-all duration-500 ease-out delay-400`}
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-300">
                    <Briefcase className="mr-2" size={20} />
                    Job Category
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-200"
                    >
                      <option value="">Select a category</option>
                      <option value="Web Design">Web Design</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile Development">
                        Mobile Development
                      </option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Content Writing">Content Writing</option>
                      <option value="Marketing">Marketing</option>
                      <option value="SEO">SEO</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div
                  className={`bg-zinc-900/50 p-6 rounded-xl shadow-md border border-zinc-800 ${
                    animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  } transition-all duration-500 ease-out delay-500 md:col-span-2`}
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-300">
                    <Award className="mr-2" size={20} />
                    Experience & Duration
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Experience Level
                      </label>
                      <select
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-200"
                      >
                        <option value="Entry Level">Entry Level</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Project Length
                      </label>
                      <select
                        name="projectLength"
                        value={formData.projectLength}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-200"
                      >
                        <option value="Less than 1 month">
                          Less than 1 month
                        </option>
                        <option value="1-3 months">1-3 months</option>
                        <option value="3-6 months">3-6 months</option>
                        <option value="6+ months">6+ months</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div
                  className={`bg-zinc-900/50 p-6 rounded-xl shadow-md border border-zinc-800 ${
                    animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  } transition-all duration-500 ease-out delay-600 md:col-span-2`}
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-300">
                    <Tag className="mr-2" size={20} />
                    Required Skills
                  </h2>

                  <div className="space-y-4">
                    <div className="flex">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                        className="flex-1 px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-l-lg focus:ring-purple-500 focus:border-purple-500 text-gray-200 placeholder-gray-500"
                        placeholder="Add a skill..."
                      />
                      <button
                        type="button"
                        onClick={handleSkillAdd}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-r-lg hover:from-purple-700 hover:to-blue-700 transition duration-200"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.skills.map((skill, index) => (
                        <div
                          key={index}
                          className="bg-zinc-800 text-gray-200 text-sm px-3 py-1 rounded-full flex items-center"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleSkillRemove(skill)}
                            className="ml-2 text-gray-400 hover:text-gray-100"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className={`bg-zinc-900/50 p-6 rounded-xl shadow-md border border-zinc-800 md:col-span-2 ${
                    animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  } transition-all duration-500 ease-out delay-700`}
                >
                  <h2 className="text-xl font-semibold mb-4 text-gray-300">
                    Job Description
                  </h2>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-200 placeholder-gray-500"
                    placeholder="Describe the job requirements, responsibilities, and desired outcomes in detail..."
                  ></textarea>
                </div>
              </div>

              <div
                className={`mt-8 flex justify-center ${
                  animate
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                } transition-all duration-700 ease-out delay-800`}
              >
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition duration-300 transform hover:scale-105"
                >
                  Post Job
                </button>
              </div>
            </div>

            <div className="lg:col-span-1 hidden lg:block">
              <div className="fixed top-0 right-0 w-1/3 h-screen">
                <img
                  src="sky.webp"
                  alt="Website Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
