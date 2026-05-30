"use client";

import React, { useState, useEffect, useCallback } from "react";

// 1. Define the TypeScript interface for your data
interface Credential {
  id?: string;
  title: string;
  issuer: string;
  provider?: string; // Add this line
  date: string;
  desc: string;
  img: string;
  color: string;
}

export default function Credentials() {
  const [credentialsData, setCredentialsData] = useState<Credential[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleRows, setVisibleRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [mounted, setMounted] = useState(false);

  // 2. Fetch data from the API route
  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const response = await fetch('/api/certificates');
        if (!response.ok) throw new Error('Failed to fetch credentials');
        const data = await response.json();
        setCredentialsData(data);
      } catch (error) {
        console.error("Error loading credentials:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCredentials();
  }, []);

  const updateLayout = useCallback(() => {
    if (window.innerWidth >= 1024) setCols(2); // Desktop
    else setCols(1); // Mobile & Tablet
  }, []);

  useEffect(() => {
    setMounted(true);
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [updateLayout]);

  const visibleCount = visibleRows * cols;
  const currentCredentials = credentialsData.slice(0, visibleCount);
  const hasMore = visibleCount < credentialsData.length;

  const handleLoadMore = () => {
    setVisibleRows((prev) => prev + 2);
  };

  if (!mounted) return null;

  return (
    <section id="certifications" className="pt-0 pb-16 relative z-10 bg-white dark:bg-[#050505] border-t border-slate-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modern Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">
              Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Credentials.</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl leading-relaxed">
              Industry-recognized certifications validating technical mastery across modern cloud and development stacks.
            </p>
          </div>
        </div>

        {/* Loading Skeleton OR Digital Badge Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((skeleton) => (
              <div key={skeleton} className="p-3 md:p-4 rounded-[2.5rem] bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 flex flex-col sm:flex-row gap-6 animate-pulse">
                <div className="w-full sm:w-48 aspect-square sm:aspect-[3/4] rounded-[1.5rem] md:rounded-[2rem] bg-slate-200 dark:bg-white/5 shrink-0" />
                <div className="flex-1 py-6 pr-8 flex flex-col justify-center">
                  <div className="h-3 w-1/3 bg-slate-200 dark:bg-white/5 rounded-full mb-4" />
                  <div className="h-8 w-3/4 bg-slate-200 dark:bg-white/10 rounded-full mb-4" />
                  <div className="h-4 w-full bg-slate-200 dark:bg-white/5 rounded-full mb-2" />
                  <div className="h-4 w-5/6 bg-slate-200 dark:bg-white/5 rounded-full mb-6" />
                  <div className="h-2 w-1/4 bg-slate-200 dark:bg-white/10 rounded-full mt-auto" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {currentCredentials.map((cert, index) => (
              <a 
                href="#"
                key={cert.id || index} 
                className="group relative p-3 md:p-4 rounded-[2.5rem] bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col sm:flex-row gap-6 items-center overflow-hidden"
              >
                {/* Inner Image Slice */}
                <div className="w-full sm:w-48 aspect-square sm:aspect-[3/4] shrink-0 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative bg-slate-200 dark:bg-black">
                  <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} to-transparent opacity-40 z-10 mix-blend-overlay group-hover:opacity-10 transition-opacity duration-700`} />
                  <img 
                    src={cert.img} 
                    alt={cert.title} 
                    loading="lazy"
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transform group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />
                  
                  {/* Verified Tick Floating Badge */}
                  <div className="absolute bottom-4 left-4 z-20 w-8 h-8 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/20">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Data Content Side */}
                <div className="flex-1 py-2 sm:py-6 pr-4 sm:pr-8 flex flex-col justify-center text-center sm:text-left">
                  <div className="mb-3 flex flex-wrap gap-2 justify-center sm:justify-start items-center">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full">
                      {cert.provider || cert.issuer}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full">
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">
                      • {cert.date}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {cert.title}
                  </h3>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    {cert.desc}
                  </p>
                  
                  {/* Micro-interaction: Expanding Line */}
                  <div className="flex items-center justify-center sm:justify-start gap-3 mt-auto">
                    <span className="w-6 h-[2px] rounded-full bg-slate-300 dark:bg-white/10 group-hover:w-12 group-hover:bg-indigo-500 transition-all duration-500 ease-out"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      Verify Credential
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Smart Load More Button */}
        {!isLoading && hasMore && (
          <div className="text-center mt-20">
            <button 
              onClick={handleLoadMore}
              className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-slate-100 dark:bg-[#0a0a0a] text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-white/10 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-95 group"
            >
              Load More Credentials
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