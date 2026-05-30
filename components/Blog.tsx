"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";

const blogPosts = [
  {
    title: "Architecting a Scalable SaaS: Lessons from HantiKaab",
    excerpt: "Exploring the backend decisions, Firebase indexing, and Next.js caching strategies used to build a robust financial platform for the Somali market.",
    category: "Engineering",
    date: "May 24, 2026",
    readTime: "8 min read",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=1600&q=80",
    featured: true,
  },
  {
    title: "Mastering Flutter Native Performance",
    excerpt: "How to eliminate jank and optimize memory rendering in cross-platform mobile applications.",
    category: "Mobile",
    date: "May 10, 2026",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?fit=crop&w=800&q=80",
    featured: false,
  },
  {
    title: "The Power of Tailwind Glassmorphism",
    excerpt: "Building ultra-modern, hardware-accelerated UI components without sacrificing web accessibility.",
    category: "Design",
    date: "April 28, 2026",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?fit=crop&w=800&q=80",
    featured: false,
  }
];

export default function Blog() {
  return (
    <section id="blog" className="pt-0 pb-16 bg-white dark:bg-[#050505] relative z-10 border-t border-slate-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modern Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Thoughts.</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl leading-relaxed">
              Deep dives into system architecture, product design, and the business of software engineering.
            </p>
          </div>
          <Link href="/blog" className="group flex items-center gap-3 px-8 py-4 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-indigo-500 transition-all font-bold text-slate-900 dark:text-white shrink-0">
            View All Notes
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <Link 
              href={`/blog/${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              key={index} 
              className={`group relative p-3 md:p-4 rounded-[2.5rem] bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col ${post.featured ? 'md:col-span-2 md:flex-row gap-8' : ''}`}
            >
              {/* Image Container */}
              <div className={`relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-slate-200 dark:bg-black ${post.featured ? 'w-full md:w-1/2 aspect-video md:aspect-[4/3]' : 'w-full aspect-[4/3]'}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-60" />
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
                <div className="absolute top-5 left-5 z-20 px-4 py-2 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white border border-black/5 dark:border-white/10">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className={`flex flex-col justify-center py-6 px-4 md:px-6 ${post.featured ? 'w-full md:w-1/2' : 'flex-grow'}`}>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20" />
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                </div>
                
                <h3 className={`${post.featured ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'} font-black text-slate-900 dark:text-white tracking-tight mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 leading-[1.1]`}>
                  {post.title}
                </h3>
                
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-8">
                  {post.excerpt}
                </p>

                {/* Expanding Read Article Footer */}
                <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    Read Article
                  </span>
                  <span className="w-8 h-[2px] rounded-full bg-slate-300 dark:bg-white/20 group-hover:w-16 group-hover:bg-indigo-500 transition-all duration-500 ease-out"></span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}