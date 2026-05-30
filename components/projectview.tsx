"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github, Globe, Server, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 1. Define the TypeScript interface for the detailed project
interface ProjectDetails {
  id?: string;
  title: string;
  tagline?: string;
  coverImage?: string;
  img?: string; // Fallback from the summary API
  client?: string;
  role?: string;
  timeline?: string;
  status?: string;
  projectLink?: string; // <-- ADDED THIS LINE
  liveLink?: string;
  githubLink?: string;
  challenge?: string;
  solution?: string;
  techStack?: string[];
  gallery?: string[];
}

export default function ProjectView() {
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  // Use params to get the slug/id from the URL (e.g., /projects/dhiselink)
  const params = useParams();
  const projectSlug = params?.slug as string;

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);

    const fetchProjectDetails = async () => {
      try {
        // Fetch all projects from our dynamic API
        const response = await fetch('/api/projects');
        if (!response.ok) throw new Error('Failed to fetch project');
        const projects: ProjectDetails[] = await response.json();

        // Find the specific project based on URL param. 
        // Note: Converts title to lowercase for matching, assuming URLs are like /projects/dhiselink
        const foundProject = projects.find(
          (p) => p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === projectSlug
        );

        if (foundProject) {
          // Merge with fallback data in case Firebase is missing the detailed fields
          setProject({
            ...foundProject,
            tagline: foundProject.tagline || "Revolutionizing digital infrastructure.",
            coverImage: foundProject.coverImage || foundProject.img,
            client: foundProject.client || "Confidential",
            role: foundProject.role || "Lead Full-Stack Engineer",
            timeline: foundProject.timeline || "Completed",
            status: foundProject.status || "Live in Production",
            liveLink: foundProject.liveLink || "#",
            githubLink: foundProject.githubLink || "#",
            challenge: foundProject.challenge || "Building a highly scalable architecture to solve complex industry fragmentation and data silos.",
            solution: foundProject.solution || "Implemented a robust Next.js and Firebase ecosystem utilizing advanced performance optimization and modern UI methodologies.",
            techStack: foundProject.techStack || ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
            gallery: foundProject.gallery || []
          });
        }
      } catch (error) {
        console.error("Error loading project details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (projectSlug) {
      fetchProjectDetails();
    } else {
      setIsLoading(false); // Failsafe if not routed correctly
    }
  }, [projectSlug]);

  if (!mounted) return null;

  // --- PREMIUM SKELETON LOADER ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#050505] pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-16 md:h-24 w-2/3 bg-slate-200 dark:bg-white/10 rounded-2xl mb-6" />
          <div className="h-8 w-1/3 bg-slate-200 dark:bg-white/5 rounded-full mb-16" />
          <div className="w-full h-[50vh] md:h-[75vh] bg-slate-200 dark:bg-white/5 rounded-[2rem] md:rounded-[3rem] mb-24" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-slate-200 dark:bg-white/5 rounded-3xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- ERROR / NOT FOUND STATE ---
  if (!project && !isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white">
        <h1 className="text-6xl font-black mb-4">404</h1>
        <p className="text-xl text-slate-500 mb-8">Project not found or URL is invalid.</p>
        <Link href="/#portfolio" className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors">
          Return to Portfolio
        </Link>
      </div>
    );
  }

  // --- MAIN DYNAMIC RENDER ---
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white selection:bg-indigo-500 selection:text-white">
      
      {/* Global Header */}
      <Header />

      {/* Floating Back Button (Adjusted slightly lower to clear Header) */}
      <div className="fixed top-24 left-4 md:left-8 z-50 animate-fade-in-up">
        <Link 
          href="/#portfolio"
          className="group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-lg hover:bg-indigo-600 hover:border-indigo-600 dark:hover:bg-indigo-600 hover:text-white transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 transform group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32">
        
        {/* HERO SECTION */}
        <header className="mb-16 md:mb-24 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-8 animate-fade-in-up">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[0.9] mb-6 text-slate-900 dark:text-white">
              {project?.title}
              <span className="text-indigo-600 dark:text-indigo-500">.</span>
            </h1>
            <p className="text-xl md:text-3xl font-light text-slate-500 dark:text-slate-400">
              {project?.tagline}
            </p>
          </div>
          
          <div className="flex gap-4">
            {/* Dynamically reads projectLink or liveLink from Firebase */}
            <a 
              href={project?.projectLink || project?.liveLink || "#"} 
              target={project?.projectLink || project?.liveLink ? "_blank" : "_self"} 
              rel="noreferrer" 
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:scale-105 transition-transform shadow-xl"
            >
              Live Site <Globe className="w-4 h-4" />
            </a>
            <a href={project?.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-indigo-500 transition-all font-bold">
              Code <Github className="w-4 h-4" />
            </a>
          </div>
        </header>

        {/* HERO IMAGE (Ultra Framed) */}
        <div className="relative w-full h-[50vh] md:h-[75vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-24 shadow-2xl bg-slate-200 dark:bg-black p-2 md:p-4 border border-slate-200 dark:border-white/10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="relative w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden mask-image-bottom">
            <img 
              src={project?.coverImage} 
              alt={project?.title} 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
            />
          </div>
        </div>

        {/* METADATA BENTO GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-32 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          {[
            { label: "Client", value: project?.client },
            { label: "Role", value: project?.role },
            { label: "Timeline", value: project?.timeline },
            { label: "Status", value: project?.status },
          ].map((meta, i) => (
            <div key={i} className="p-6 md:p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">{meta.label}</span>
              <span className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">{meta.value}</span>
            </div>
          ))}
        </div>

        {/* CONTENT SECTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
          
          {/* Sticky Sidebar Tech Stack */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 p-8 rounded-[2rem] bg-indigo-50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/20">
              <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-6 flex items-center gap-2">
                <Server className="w-4 h-4" /> Core Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project?.techStack?.map((tech, i) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-white dark:bg-black border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-700 dark:text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="lg:col-span-8 space-y-16 text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-400">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">The Challenge.</h2>
              <p>{project?.challenge}</p>
            </div>
            
            <div className="p-8 md:p-12 rounded-[2rem] bg-slate-900 dark:bg-[#0a0a0a] text-white border border-slate-800 dark:border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Shield className="w-32 h-32" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight relative z-10">The Architecture.</h2>
              <p className="relative z-10 text-slate-300">{project?.solution}</p>
            </div>
          </div>
        </div>

        {/* GALLERY SHOWCASE */}
        {project?.gallery && project.gallery.length > 0 && (
          <div className="space-y-6 md:space-y-8 mb-32">
            {project.gallery.map((img, i) => (
              <div key={i} className="w-full aspect-video md:aspect-[21/9] rounded-[2rem] bg-slate-200 dark:bg-white/5 border border-slate-200 dark:border-white/10 overflow-hidden p-2 md:p-4">
                 <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                   <img src={img} alt={`Showcase ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
                 </div>
              </div>
            ))}
          </div>
        )}

        {/* BOTTOM CTA: Back to Projects */}
        <div className="text-center pt-16 border-t border-slate-200 dark:border-white/10">
          <Link href="/#portfolio" className="group inline-block">
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-teal-400 transition-all duration-300 flex items-center justify-center gap-4 md:gap-8">
              Explore More 
              <ArrowUpRight className="w-10 h-10 md:w-16 md:h-16 text-slate-300 group-hover:text-teal-400 transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300" />
            </h2>
          </Link>
        </div>

      </main>
      
      {/* Global Footer */}
      <Footer />
    </div>
  );
}