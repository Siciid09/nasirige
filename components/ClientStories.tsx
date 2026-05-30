"use client";

import React, { useState, useEffect, useCallback } from "react";

const stories = [
  { name: "Ahmed Hassan", title: "CEO, FinTech Somali", quote: "Mubarik isn't just a developer; he's a partner. He took our complex financial data and built a dashboard that saved us hours.", color: "from-blue-400 to-blue-600" },
  { name: "Sarah Jibril", title: "Founder, GuriUp", quote: "The mobile app Mubarik built for our real estate agency is flawless. The UI is modern, and the backend is rock solid.", color: "from-purple-400 to-pink-600" },
  { name: "James Carter", title: "CTO, CloudScale", quote: "Our SaaS platform runs smoother than ever. The architecture refactor was worth every penny.", color: "from-green-400 to-teal-600" },
  { name: "Omar Yasin", title: "Founder, StartupX", quote: "Helped us launch our MVP in record time. Professional, fast, and reliable.", color: "from-indigo-400 to-blue-600" },
];

export default function ClientStories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Dynamically calculate how many cards to show based on screen size
  const updateLayout = useCallback(() => {
    if (window.innerWidth >= 1024) setItemsPerView(3); // Desktop: 3 cards
    else if (window.innerWidth >= 768) setItemsPerView(2); // Tablet: 2 cards
    else setItemsPerView(1); // Mobile: 1 card
  }, []);

  useEffect(() => {
    setMounted(true);
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [updateLayout]);

  // Calculate the maximum index we can slide to without showing empty space
  const maxIndex = Math.max(0, stories.length - itemsPerView);

  // Auto-Play Logic
  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000); // Slides every 5 seconds
    
    return () => clearInterval(timer); // Cleanup on unmount
  }, [maxIndex, mounted, currentIndex]);

  // Manual Navigation Handlers
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#050505] border-y border-slate-200 dark:border-white/5 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Modern Navigation Controls */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              Client <span className="text-indigo-600 dark:text-indigo-500">Stories</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 text-lg">
              Don't just take my word for it. Here is what my partners have to say.
            </p>
          </div>
          
          {/* Custom Navigation Arrows */}
          <div className="flex gap-4">
            <button 
              onClick={prevSlide}
              aria-label="Previous story"
              className="w-12 h-12 rounded-full flex items-center justify-center border border-slate-200 dark:border-white/10 bg-white dark:bg-black text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 shadow-sm active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              aria-label="Next story"
              className="w-12 h-12 rounded-full flex items-center justify-center border border-slate-200 dark:border-white/10 bg-white dark:bg-black text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 shadow-sm active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden relative w-full -mx-4 px-4 sm:mx-0 sm:px-0">
          
          {/* Sliding Track */}
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {stories.map((story, i) => (
              <div 
                key={i} 
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
              >
                {/* Story Card */}
                <div className="h-full bg-white dark:bg-white/5 p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-indigo-500/10 transition-shadow duration-300 flex flex-col justify-between">
                  <div>
                    <svg className="w-8 h-8 text-indigo-500/30 mb-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                    <p className="text-slate-600 dark:text-slate-300 italic mb-8 min-h-[100px] leading-relaxed">
                      "{story.quote}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${story.color} shadow-inner`} />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm tracking-wide">{story.name}</h4>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">{story.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Minimal Progress Dots (Mobile & Tablet friendly) */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentIndex === i 
                  ? "w-8 bg-indigo-600 dark:bg-indigo-500" 
                  : "w-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}