"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Calendar, Loader2 } from "lucide-react";

export default function Blog() {
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        
        // Only grab the 3 most recent posts for the home page grid
        setRecentPosts(data.slice(0, 3));
      } catch (error) {
        console.error("Error loading home page blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentBlogs();
  }, []);

  return (
    <section id="blog" className="pt-0 pb-16 bg-slate-50 dark:bg-[#050505] relative z-10 border-t border-slate-200 dark:border-white/5">
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
          <Link href="/blog" className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-indigo-500 transition-all font-bold text-slate-900 dark:text-white shrink-0 shadow-sm">
            View All Notes
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Loading Latest Articles...</p>
          </div>
        )}

        {/* Asymmetric Blog Grid */}
        {!isLoading && recentPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentPosts.map((post, index) => {
              // Make the very first post span 2 columns and be featured, just like your design!
              const isFeatured = index === 0;

              return (
                <Link 
                  href={`/blog/${post.slug}`}
                  key={post.id || index} 
                  className={`group relative p-3 md:p-4 rounded-[2.5rem] bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col ${isFeatured ? 'md:col-span-2 md:flex-row gap-8' : ''}`}
                >
                  {/* Image Container */}
                  <div className={`relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-slate-200 dark:bg-black mask-image-bottom ${isFeatured ? 'w-full md:w-1/2 aspect-video md:aspect-[4/3]' : 'w-full aspect-[4/3]'}`}>
                    <div className="absolute inset-0 bg-black/10 z-10 group-hover:opacity-0 transition-opacity duration-500" />
                    <img 
                      src={post.featuredImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                    />
                    <div className="absolute top-5 left-5 z-20 px-4 py-2 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white border border-black/5 dark:border-white/10">
                      {isFeatured ? `Latest • ${post.category}` : post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex flex-col justify-center py-6 px-4 md:px-6 ${isFeatured ? 'w-full md:w-1/2' : 'flex-grow'}`}>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(post.updatedAt || post.createdAt || Date.now()).toLocaleDateString()}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20" />
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readingTime}</span>
                    </div>
                    
                    <h3 className={`${isFeatured ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'} font-black text-slate-900 dark:text-white tracking-tight mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 leading-[1.1]`}>
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-8">
                      {post.excerpt}
                    </p>

                    {/* Expanding Read Article Footer */}
                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        Read Article
                      </span>
                      <span className="w-8 h-[2px] rounded-full bg-slate-300 dark:bg-white/20 group-hover:w-16 group-hover:bg-indigo-500 transition-all duration-500 ease-out"></span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}