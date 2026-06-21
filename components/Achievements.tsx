"use client";

import React, { useEffect, useState, useRef } from "react";
import { Award, Trophy, Star, Target, ArrowRight, Sparkles, Zap, Loader2 } from "lucide-react";

// 1. Schema matching the Firebase Database
interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  metric: string;
  desc: string;
  img: string;
  iconName: string; // From database
  gradient: string;
}

// Helper to convert string from DB into a Lucide Icon
const renderIcon = (iconName: string) => {
  const props = { className: "w-5 h-5 text-current" };
  switch (iconName) {
    case 'Target': return <Target {...props} />;
    case 'Trophy': return <Trophy {...props} />;
    case 'Star': return <Star {...props} />;
    case 'Sparkles': return <Sparkles {...props} />;
    case 'Zap': return <Zap {...props} />;
    case 'Award': 
    default: 
      return <Award {...props} />;
  }
};

export default function AchievementsShowcase() {
  const [achievementsData, setAchievementsData] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // FETCH DATA FROM DATABASE
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch('/api/achievements');
        if (!response.ok) throw new Error('Failed to fetch achievements');
        const data = await response.json();
        setAchievementsData(data);
      } catch (error) {
        console.error("Error loading achievements:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  // Auto-scroll loop effect
  useEffect(() => {
    if (isPaused || achievementsData.length === 0) return;

    const interval = setInterval(() => {
      setActiveIdx((prevIdx) => (prevIdx + 1) % achievementsData.length);
    }, 5000); // Transitions slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused, achievementsData.length]);

  // Handle snapping scroll alignment when active index changes
  useEffect(() => {
    if (scrollContainerRef.current && achievementsData.length > 0) {
      const cardElement = scrollContainerRef.current.children[activeIdx] as HTMLElement;
      if (cardElement) {
        scrollContainerRef.current.scrollTo({
          left: cardElement.offsetLeft - scrollContainerRef.current.offsetLeft,
          behavior: "smooth",
        });
      }
    }
  }, [activeIdx, achievementsData.length]);

  // Hide section completely if no data exists yet
  if (!isLoading && achievementsData.length === 0) return null;

  return (
    <section 
      className="py-24 relative z-10 bg-slate-50 dark:bg-[#050505] overflow-hidden border-t border-slate-200 dark:border-white/5 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Decorative Ambient Aura */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 pointer-events-none">
        <div className="w-[600px] h-[350px] bg-indigo-600/10 dark:bg-indigo-500/5 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Core Milestones
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
              Key Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Achievements.</span>
            </h2>
          </div>

          {/* Dynamic Carousel Slide Pagination Toggles */}
          {!isLoading && achievementsData.length > 1 && (
            <div className="flex items-center gap-2">
              {achievementsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    activeIdx === idx 
                      ? "w-8 bg-indigo-600 dark:bg-indigo-500" 
                      : "w-2 bg-slate-200 dark:bg-white/10 hover:bg-slate-400 dark:hover:bg-white/30"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* LOADING STATE */}
        {isLoading ? (
          <div className="w-full h-[400px] flex items-center justify-center bg-white dark:bg-[#0a0a0a] rounded-[2.4rem] border border-slate-200 dark:border-white/10">
             <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
          </div>
        ) : (
          /* HORIZONTAL CAROUSEL VIEWPORT */
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 scroll-smooth"
            style={{ scrollbarWidth: "none" }}
          >
            {achievementsData.map((ach, index) => {
              const isActive = index === activeIdx;
              
              // Extract the base color from the gradient string for the icon
              // e.g., "from-indigo-600 to-purple-600" -> "text-indigo-500"
              const baseColorMatch = ach.gradient.match(/from-([a-z]+)-/);
              const iconColorClass = baseColorMatch ? `text-${baseColorMatch[1]}-500` : "text-indigo-500";

              return (
                <div
                  key={ach.id}
                  className={`w-full lg:w-[calc(100%-2rem)] shrink-0 snap-center transition-all duration-700 ease-out p-1 rounded-[2.5rem] bg-gradient-to-b ${
                    isActive 
                      ? "from-slate-200 to-slate-300 dark:from-white/15 dark:to-white/5 shadow-2xl scale-[0.99]" 
                      : "from-transparent to-transparent opacity-40 scale-[0.96]"
                  }`}
                >
                  {/* Outer Frame Wrapper */}
                  <div className="w-full bg-white dark:bg-[#0a0a0a] rounded-[2.4rem] p-6 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center overflow-hidden relative">
                    
                    {/* Text Strategy Layer */}
                    <div className="flex-1 space-y-6 z-10 w-full text-left">
                      <div className="flex flex-wrap gap-3 items-center">
                        <div className={`p-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 ${iconColorClass}`}>
                          {renderIcon(ach.iconName)}
                        </div>
                        <div>
                          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 block">
                            {ach.title}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            {ach.subtitle}
                          </h3>
                        </div>
                      </div>

                      <div className="py-2">
                        <span className={`text-4xl sm:text-5xl font-black bg-gradient-to-r ${ach.gradient} bg-clip-text text-transparent tracking-tighter`}>
                          {ach.metric}
                        </span>
                      </div>

                      <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
                        {ach.desc}
                      </p>

                      {/* Micro Interaction Link */}
                      <div className="pt-2 flex items-center gap-2 group cursor-pointer w-fit">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-indigo-500 transition-colors">
                          View Architecture Specs
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-indigo-500 transition-all" />
                      </div>
                    </div>

                    {/* High-End Immersive Framed Imagery */}
                    <div className="w-full lg:w-[45%] aspect-video lg:aspect-[4/3] shrink-0 rounded-[2rem] overflow-hidden relative bg-slate-100 dark:bg-black p-2 border border-slate-100 dark:border-white/5 shadow-inner">
                      <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative group">
                        {/* Gradient Ambient overlay matching unique accent */}
                        <div className={`absolute inset-0 bg-gradient-to-tr ${ach.gradient} to-transparent opacity-20 z-10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700`} />
                        <img
                          src={ach.img}
                          alt={ach.subtitle}
                          loading="lazy"
                          className="w-full h-full object-cover filter contrast-[1.05] scale-100 group-hover:scale-105 transition-transform duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1)"
                        />
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}