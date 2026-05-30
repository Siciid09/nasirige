"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

// 1. Define the TypeScript interface for your data
interface Project {
  id?: string;
  title: string;
  type: string;
  img: string;
  desc: string;
  projectLink?: string;
}

export default function Projects() {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleRows, setVisibleRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [mounted, setMounted] = useState(false);

  // 2. Fetch data from the API route
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjectsData(data);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const updateLayout = useCallback(() => {
    if (window.innerWidth >= 768) setCols(2); // Tablet & Desktop
    else setCols(1); // Mobile
  }, []);

  useEffect(() => {
    setMounted(true);
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [updateLayout]);

  const visibleCount = visibleRows * cols;
  const currentProjects = projectsData.slice(0, visibleCount);
  const hasMore = visibleCount < projectsData.length;

  const handleLoadMore = () => {
    setVisibleRows((prev) => prev + 2);
  };

  if (!mounted) return null;

  return (
    <section id="portfolio" className="py-16 bg-slate-50 dark:bg-[#050505] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modern Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-400">Works.</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl leading-relaxed">
              A collection of scalable architectures, native applications, and digital platforms built for the modern web.
            </p>
          </div>
        </div>

        {/* Loading Skeleton OR Ultra-Premium Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {[1, 2, 3, 4].map((skeleton) => (
              <div key={skeleton} className="p-3 md:p-4 rounded-[2.5rem] bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 flex flex-col animate-pulse">
                <div className="w-full aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem] bg-slate-200 dark:bg-white/5" />
                <div className="px-4 py-8 md:px-8 md:py-10 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="h-8 w-1/2 bg-slate-200 dark:bg-white/10 rounded-full mb-4" />
                    <div className="h-4 w-full bg-slate-200 dark:bg-white/5 rounded-full mb-2" />
                    <div className="h-4 w-5/6 bg-slate-200 dark:bg-white/5 rounded-full" />
                  </div>
                  <div className="mt-8 border-t border-slate-100 dark:border-white/5 pt-6">
                    <div className="h-3 w-1/3 bg-slate-200 dark:bg-white/10 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {currentProjects.map((project, index) => {
              // Auto-generate the URL slug from the title if projectLink is missing in DB
              const projectUrl = project.projectLink || `/projects/${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
              
              return (
              <Link 
                href={projectUrl}
                key={project.id || index} 
                className="group relative p-3 md:p-4 rounded-[2.5rem] bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col"
              >
                {/* Image Container (Framed Design) */}
                <div className="relative w-full aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-black mask-image-bottom">
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    loading="lazy"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-5 left-5 md:top-6 md:left-6 px-4 py-2 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white border border-black/5 dark:border-white/10 shadow-sm">
                    {project.type}
                  </div>

                  {/* Floating Action Arrow (Appears on Hover) */}
                  <div className="absolute top-5 right-5 md:top-6 md:right-6 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform -translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                    <svg className="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-500 delay-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                  </div>
                </div>

                {/* Text Content */}
                <div className="px-4 py-8 md:px-8 md:py-10 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-3xl font-black mb-4 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                  
                  {/* Expanding Line Footer */}
                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      Explore Case Study
                    </span>
                    <span className="w-8 h-[2px] rounded-full bg-slate-300 dark:bg-white/20 group-hover:w-16 group-hover:bg-indigo-500 transition-all duration-500 ease-out"></span>
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        )}

        {/* Smart Load More Button */}
        {!isLoading && hasMore && (
          <div className="text-center mt-20">
            <button 
              onClick={handleLoadMore}
              className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-white/10 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-95 group"
            >
              Load More Projects
              <svg className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 group-hover:animate-bounce transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}