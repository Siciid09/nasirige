"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react"; // Make sure you have lucide-react installed

export default function HeroCTA() {
  const [cvLink, setCvLink] = useState("#");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const res = await fetch("/api/cv");
        const data = await res.json();
        setCvLink(data.link);
      } catch (error) {
        console.error("Failed to fetch CV link", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCV();
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
      <Link href="#portfolio" className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full hover:scale-105 active:scale-95 transition-transform shadow-xl hover:shadow-indigo-500/20">
        View Work
      </Link>
      
      <Link href="#contact" className="px-8 py-4 bg-white/50 dark:bg-white/5 backdrop-blur-md text-slate-900 dark:text-white font-bold rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors border border-slate-200 dark:border-white/20">
        Book Call
      </Link>
      
      {/* Dynamic Firebase CV Button */}
      <a 
        href={cvLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`group flex items-center gap-2 px-4 py-4 text-slate-600 dark:text-slate-300 font-bold transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:text-indigo-600 dark:hover:text-indigo-400'}`}
      >
        {isLoading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Loading...</>
        ) : (
          <>
            Download CV
            <svg className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </>
        )}
      </a>
    </div>
  );
}