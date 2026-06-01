"use client";

import React, { useState } from "react";
import { 
  Briefcase, Clock, Mic, Lightbulb, Users, Handshake, 
  PenTool, Search, Fingerprint, Video, BookOpen, TrendingUp, SplitSquareHorizontal, Image as ImageIcon, Monitor, Layout,
  Shield, BarChart, Server, Cloud, Flame, Network, Database, Terminal, Box, TerminalSquare, Coffee, Cog, Binary, Code2, FolderGit2,
  Wind, FileCode2, Globe, Smartphone, Atom, Gamepad, Code
} from "lucide-react";

// The Categories
const categories = ["All", "Management", "Design & Strategy", "Backend", "Frontend"];

// The Complete Arsenal Data mapped with Colorful Lucide Icons
const skillsData = [
  // Management
  { name: "Project Management", cat: "Management", icon: <Briefcase className="w-4 h-4 text-blue-500" /> },
  { name: "Time Management", cat: "Management", icon: <Clock className="w-4 h-4 text-teal-500" /> },
  { name: "Public Speaking", cat: "Management", icon: <Mic className="w-4 h-4 text-red-500" /> },
  { name: "Problem Solving", cat: "Management", icon: <Lightbulb className="w-4 h-4 text-amber-400" /> },
  { name: "Leadership", cat: "Management", icon: <Users className="w-4 h-4 text-yellow-600" /> },
  { name: "Negotiation", cat: "Management", icon: <Handshake className="w-4 h-4 text-orange-500" /> },
  { name: "CRM Tools", cat: "Management", icon: <Database className="w-4 h-4 text-blue-400" /> },

  // Design & Strategy
  { name: "Creative Direction", cat: "Design & Strategy", icon: <PenTool className="w-4 h-4 text-indigo-500" /> },
  { name: "Market Research", cat: "Design & Strategy", icon: <Search className="w-4 h-4 text-green-500" /> },
  { name: "Brand Identity", cat: "Design & Strategy", icon: <Fingerprint className="w-4 h-4 text-teal-400" /> },
  { name: "Motion Design", cat: "Design & Strategy", icon: <Video className="w-4 h-4 text-purple-500" /> },
  { name: "Storytelling", cat: "Design & Strategy", icon: <BookOpen className="w-4 h-4 text-slate-500 dark:text-slate-300" /> },
  { name: "SEO Strategy", cat: "Design & Strategy", icon: <TrendingUp className="w-4 h-4 text-blue-500" /> },
  { name: "A/B Testing", cat: "Design & Strategy", icon: <SplitSquareHorizontal className="w-4 h-4 text-yellow-500" /> },
  { name: "Illustrator", cat: "Design & Strategy", icon: <ImageIcon className="w-4 h-4 text-orange-500" /> },
  { name: "Photoshop", cat: "Design & Strategy", icon: <Monitor className="w-4 h-4 text-blue-400" /> },
  { name: "Figma", cat: "Design & Strategy", icon: <Layout className="w-4 h-4 text-pink-500" /> },

  // Backend & Infrastructure
  { name: "Cybersecurity", cat: "Backend", icon: <Shield className="w-4 h-4 text-green-600" /> },
  { name: "Data Analysis", cat: "Backend", icon: <BarChart className="w-4 h-4 text-purple-500" /> },
  { name: "Kubernetes", cat: "Backend", icon: <Server className="w-4 h-4 text-blue-500" /> },
  { name: "AWS Cloud", cat: "Backend", icon: <Cloud className="w-4 h-4 text-orange-500" /> },
  { name: "Firebase", cat: "Backend", icon: <Flame className="w-4 h-4 text-amber-500" /> },
  { name: "GraphQL", cat: "Backend", icon: <Network className="w-4 h-4 text-pink-500" /> },
  { name: "MongoDB", cat: "Backend", icon: <Database className="w-4 h-4 text-green-500" /> },
  { name: "Node.js", cat: "Backend", icon: <Terminal className="w-4 h-4 text-green-600" /> },
  { name: "Python", cat: "Backend", icon: <Code2 className="w-4 h-4 text-blue-500" /> },
  { name: "Docker", cat: "Backend", icon: <Box className="w-4 h-4 text-blue-600" /> },
  { name: "Linux", cat: "Backend", icon: <TerminalSquare className="w-4 h-4 text-yellow-500" /> },
  { name: "Java", cat: "Backend", icon: <Coffee className="w-4 h-4 text-red-500" /> },
  { name: "Rust", cat: "Backend", icon: <Cog className="w-4 h-4 text-orange-700" /> },
  { name: "SQL", cat: "Backend", icon: <Binary className="w-4 h-4 text-purple-500" /> },
  { name: "C++", cat: "Backend", icon: <Code2 className="w-4 h-4 text-blue-800" /> },
  { name: "Git", cat: "Backend", icon: <FolderGit2 className="w-4 h-4 text-red-500" /> },

  // Frontend
  { name: "Tailwind CSS", cat: "Frontend", icon: <Wind className="w-4 h-4 text-cyan-400" /> },
  { name: "TypeScript", cat: "Frontend", icon: <FileCode2 className="w-4 h-4 text-blue-600" /> },
  { name: "JavaScript", cat: "Frontend", icon: <FileCode2 className="w-4 h-4 text-yellow-400" /> },
  { name: "Next.js", cat: "Frontend", icon: <Globe className="w-4 h-4 text-slate-900 dark:text-white" /> },
  { name: "Flutter", cat: "Frontend", icon: <Smartphone className="w-4 h-4 text-cyan-500" /> },
  { name: "React", cat: "Frontend", icon: <Atom className="w-4 h-4 text-cyan-400" /> },
  { name: "Unity", cat: "Frontend", icon: <Gamepad className="w-4 h-4 text-slate-800 dark:text-slate-200" /> },
  { name: "Dart", cat: "Frontend", icon: <Code className="w-4 h-4 text-blue-400" /> },
];

export default function SkillsCloud() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = skillsData.filter((skill) => 
    activeCategory === "All" ? true : skill.cat === activeCategory
  );

  return (
    <section id="skills" className="py-24 relative z-10 bg-slate-50 dark:bg-[#050505] overflow-hidden isolate">
      <div className="max-w-6xl mx-auto px-4 text-center">
        
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">
          The <span className="text-indigo-600 dark:text-indigo-500">Arsenal</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg mb-10">
          A comprehensive toolkit allowing for total control over the development lifecycle.
        </p>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${
                activeCategory === category
                  ? "bg-indigo-600 text-white border-transparent scale-105"
                  : "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 min-h-[300px] content-start">
          {filteredSkills.map((skill, index) => (
            <div 
              key={`${skill.name}-${index}`} 
              className="group flex items-center gap-2.5 px-5 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-sm font-bold text-slate-700 dark:text-slate-200 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transition-colors duration-300 cursor-default transform-gpu will-change-transform animate-fade-in-up"
            >
              <span className="transition-transform duration-300 group-hover:scale-125">
                {skill.icon}
              </span>
              {skill.name}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}