"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ArrowUpRight, Search } from "lucide-react";

// Extended Blog Data for the Dedicated Page
const allPosts = [
  {
    title: "Architecting a Scalable SaaS: Lessons from HantiKaab",
    slug: "architecting-a-scalable-saas-lessons-from-hantikaab",
    excerpt: "Exploring the backend decisions, Firebase indexing, and Next.js caching strategies used to build a robust financial platform for the Somali market.",
    category: "Engineering",
    date: "May 24, 2026",
    readTime: "8 min read",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=1600&q=80",
  },
  {
    title: "Mastering Flutter Native Performance",
    slug: "mastering-flutter-native-performance",
    excerpt: "How to eliminate jank and optimize memory rendering in cross-platform mobile applications to achieve a flawless 60fps experience.",
    category: "Mobile",
    date: "May 10, 2026",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?fit=crop&w=800&q=80",
  },
  {
    title: "The Power of Tailwind Glassmorphism",
    slug: "the-power-of-tailwind-glassmorphism",
    excerpt: "Building ultra-modern, hardware-accelerated UI components without sacrificing web accessibility or rendering performance.",
    category: "Design",
    date: "April 28, 2026",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?fit=crop&w=800&q=80",
  },
  {
    title: "Securing MongoDB Atlas Clusters",
    slug: "securing-mongodb-atlas-clusters",
    excerpt: "A deep dive into network access permissions, VPC peering, and encryption at rest for enterprise-grade database security.",
    category: "Security",
    date: "April 15, 2026",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?fit=crop&w=800&q=80",
  },
  {
    title: "State Management in Next.js 15",
    slug: "state-management-in-nextjs-15",
    excerpt: "Evaluating Zustand, Redux, and native React Context in the era of Server Components and App Router architectures.",
    category: "Engineering",
    date: "March 30, 2026",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?fit=crop&w=800&q=80",
  }
];

const categories = ["All", "Engineering", "Design", "Mobile", "Security"];

export default function BlogList() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  if (!mounted) return null;

  // Filter logic
  const filteredPosts = allPosts.filter(post => 
    activeCategory === "All" ? true : post.category === activeCategory
  );

  // Separate the newest post to feature it (only if viewing 'All' or if it matches)
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const standardPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white selection:bg-indigo-500 selection:text-white pb-32">
      
      {/* Floating Back Button */}
      <div className="fixed top-8 left-4 md:left-8 z-50 animate-fade-in-up">
        <Link 
          href="/"
          className="group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-lg hover:bg-indigo-600 hover:border-indigo-600 dark:hover:bg-indigo-600 hover:text-white transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 transform group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32">
        
        {/* PAGE HEADER */}
        <header className="mb-16 md:mb-24 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-8 animate-fade-in-up">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[1] mb-6 text-slate-900 dark:text-white">
              Engineering <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-400">Journal.</span>
            </h1>
            <p className="text-lg md:text-2xl font-light text-slate-500 dark:text-slate-400">
              My thoughts on software architecture, product design, and scaling digital empires.
            </p>
          </div>
        </header>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-white/5 rounded-full mr-2">
            <Search className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Filter</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${
                activeCategory === category
                  ? "bg-indigo-600 text-white border-transparent scale-105"
                  : "bg-white dark:bg-[#0a0a0a] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FEATURED POST (Takes full width, image left, text right) */}
        {featuredPost && (
          <Link 
            href={`/blog/${featuredPost.slug}`}
            className="group relative flex flex-col lg:flex-row p-3 md:p-4 rounded-[2.5rem] bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 mb-8 animate-fade-in-up" 
            style={{ animationDelay: "0.2s" }}
          >
            {/* Framed Image */}
            <div className="relative w-full lg:w-[60%] aspect-video lg:aspect-auto lg:min-h-[450px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-slate-200 dark:bg-black">
              <div className="absolute inset-0 bg-indigo-500/10 z-10 group-hover:opacity-0 transition-opacity duration-500" />
              <img 
                src={featuredPost.img} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
              />
              <div className="absolute top-5 left-5 z-20 px-4 py-2 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white border border-black/5 dark:border-white/10">
                Latest • {featuredPost.category}
              </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col justify-center lg:w-[40%] p-6 md:p-12">
              <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {featuredPost.date}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20" />
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {featuredPost.readTime}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 leading-[1.1]">
                {featuredPost.title}
              </h2>
              
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-10">
                {featuredPost.excerpt}
              </p>

              <div className="mt-auto flex items-center gap-4">
                <span className="w-12 h-[2px] rounded-full bg-indigo-500 transition-all duration-500 ease-out group-hover:w-24"></span>
                <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                  Read Article <ArrowUpRight className="w-4 h-4 text-indigo-500 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* STANDARD POSTS GRID (2 Columns) */}
        {standardPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            {standardPosts.map((post, index) => (
              <Link 
                href={`/blog/${post.slug}`}
                key={index} 
                className="group relative p-3 md:p-4 rounded-[2.5rem] bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col"
              >
                {/* Framed Image */}
                <div className="relative w-full aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-slate-200 dark:bg-black mask-image-bottom">
                  <div className="absolute inset-0 bg-black/20 z-10 group-hover:opacity-0 transition-opacity duration-500" />
                  <img 
                    src={post.img} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />
                  <div className="absolute top-5 left-5 z-20 px-4 py-2 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white border border-black/5 dark:border-white/10">
                    {post.category}
                  </div>
                </div>

                {/* Text Content */}
                <div className="px-4 py-8 md:px-8 md:py-10 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20" />
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-black mb-4 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 tracking-tight leading-[1.2]">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  {/* Expanding Line Footer */}
                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      Read Article
                    </span>
                    <span className="w-8 h-[2px] rounded-full bg-slate-300 dark:bg-white/20 group-hover:w-16 group-hover:indigo-500 transition-all duration-500 ease-out"></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State if category has no posts */}
        {filteredPosts.length === 0 && (
          <div className="pt-0 pb-16 text-center animate-fade-in-up">
            <h3 className="text-2xl md:text-4xl font-black text-slate-300 dark:text-white/20 tracking-tight mb-4">
              No entries found.
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              I haven't published any articles in the <span className="font-bold text-indigo-500">{activeCategory}</span> category yet.
            </p>
          </div>
        )}

      </main>
    </div>
  );
}