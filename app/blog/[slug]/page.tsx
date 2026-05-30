"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Twitter, Linkedin, Copy, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BlogView() {
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);

    const fetchPost = async () => {
      if (!slug) return;
      try {
        const res = await fetch(`/api/blogs?slug=${slug}`);
        if (!res.ok) throw new Error("Post not found");
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (!mounted) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#050505] flex flex-col items-center justify-center">
        <Header />
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest">Loading Article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#050505] flex flex-col items-center justify-center">
        <Header />
        <h1 className="text-6xl font-black mb-4 text-slate-900 dark:text-white">404</h1>
        <p className="text-xl text-slate-500 mb-8">Article not found or moved.</p>
        <Link href="/blog" className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700">
          Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white selection:bg-indigo-500 selection:text-white">
      
      <Header />

      {/* Floating Back Button */}
      <div className="fixed top-24 left-4 md:left-8 z-50 animate-fade-in-up">
        <Link 
          href="/blog"
          className="group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-lg hover:bg-indigo-600 hover:border-indigo-600 dark:hover:bg-indigo-600 hover:text-white transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 transform group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-32">
        
        {/* ARTICLE HEADER */}
        <header className="mb-16 md:mb-24 text-center flex flex-col items-center animate-fade-in-up">
          <div className="px-5 py-2.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/20 mb-8">
            {post.category}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] mb-8 text-slate-900 dark:text-white max-w-4xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(post.updatedAt || Date.now()).toLocaleDateString()}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20" />
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readingTime}</span>
          </div>
        </header>

        {/* MASSIVE FRAMED COVER IMAGE */}
        {post.featuredImage && (
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-24 shadow-2xl bg-slate-200 dark:bg-black p-2 md:p-4 border border-slate-200 dark:border-white/10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden">
              <img 
                src={post.featuredImage} 
                alt="Cover Image" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
              />
            </div>
          </div>
        )}

        {/* CONTENT GRID: 3-Col Sidebar / 9-Col Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          
          {/* Sticky Author & Share Sidebar */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="sticky top-32 space-y-12">
              
              {/* Author Block */}
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-6">Written By</span>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 dark:bg-white/10">
                    <img 
                      src="https://igeforpresident.com/wp-content/uploads/2025/12/1766912729947_unnamed-17.png" 
                      alt={post.author || "Mubarik Osman"} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{post.author || "Mubarik Osman"}</h4>
                    <p className="text-xs text-slate-500">Software Engineer</p>
                  </div>
                </div>
              </div>

              {/* Tags Block */}
              {post.tags && post.tags.length > 0 && (
                 <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-4">Tags</span>
                    <div className="flex flex-wrap gap-2">
                       {post.tags.map((tag: string, i: number) => (
                          <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-400">{tag}</span>
                       ))}
                    </div>
                 </div>
              )}

              {/* Share Block */}
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-6">Share Article</span>
                <div className="flex gap-3">
                  {[Twitter, Linkedin, Copy].map((Icon, i) => (
                    <button key={i} className="w-12 h-12 rounded-full flex items-center justify-center bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500 transition-all shadow-sm active:scale-95">
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Prose Content Area */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            <div 
              className="prose prose-lg dark:prose-invert prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-indigo-500 hover:prose-a:text-indigo-600 prose-img:rounded-3xl prose-img:border prose-img:border-slate-200 dark:prose-img:border-white/10 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}