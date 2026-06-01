import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Workflow from "@/components/Workflow";
import SkillsCloud from "@/components/SkillsCloud";
import Projects from "@/components/Projects";
import ClientStories from "@/components/ClientStories";
import Credentials from "@/components/Credentials";
import ConnectHub from "@/components/ConnectHub";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HeroCTA from "@/components/HeroCTA";

// --- 1. PREMIUM NEXT.JS SEO METADATA ---
export const metadata: Metadata = {
  title: "Mubarik Osman | Full-Stack Engineer & Hiigsi Tech Founder",
  description: "Portfolio of Mubarik Osman, a Full-Stack Engineer fusing Data Intelligence with High-End Design to build scalable software and enterprise solutions.",
  openGraph: {
    title: "Mubarik Osman | Full-Stack Engineer",
    description: "Building Digital Empires. View my portfolio of scalable architectures and cross-platform applications.",
    url: "https://yourdomain.com", // Remember to change this to your actual domain
    siteName: "Mubarik Osman Portfolio",
    images: [
      {
        url: "https://igeforpresident.com/wp-content/uploads/2025/12/1766912729947_unnamed-17.png",
        width: 1200,
        height: 630,
        alt: "Mubarik Osman - Full Stack Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mubarik Osman | Software Engineer",
    description: "Fusing Data Intelligence with High-End Design.",
    images: ["https://igeforpresident.com/wp-content/uploads/2025/12/1766912729947_unnamed-17.png"],
  },
};

export default function Home() {
  
  // --- 2. GOOGLE RICH RESULTS (JSON-LD STRUCTURED DATA) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mubarik Osman",
    "jobTitle": "Full-Stack Software Engineer",
    "url": "https://yourdomain.com", 
    "image": "https://igeforpresident.com/wp-content/uploads/2025/12/1766912729947_unnamed-17.png",
    "worksFor": {
      "@type": "Organization",
      "name": "Hiigsi Tech"
    },
    "alumniOf": [
      {
        "@type": "CollegeOrUniversity",
        "name": "Golis University"
      },
      {
        "@type": "CollegeOrUniversity",
        "name": "Tisqaad College"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hargeisa"
    },
    "sameAs": [
      "https://github.com/Siciid09",
      "https://linkedin.com/in/yourlinkedin" // Update with your actual LinkedIn
    ]
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#050505] selection:bg-indigo-500 selection:text-white transition-colors duration-300 scroll-smooth">
      
      {/* Injecting Structured Data into the DOM invisibly for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="relative z-10 w-full overflow-x-hidden">
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-12 lg:pt-32 overflow-hidden">
          
          {/* ANIMATED BACKGROUND - MOVED HERE & CHANGED TO ABSOLUTE */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            
            {/* FIX 1: Removed mix-blend-screen and added transform-gpu to prevent mobile GPU crashes */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite] transform-gpu" />
            <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite] transform-gpu" style={{ animationDelay: "2s" }} />
            
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 dark:opacity-20 animate-[pulse_10s_ease-in-out_infinite]" />

            {/* Scaled down icons for mobile to prevent overcrowding */}
            <div className="absolute top-[20%] left-[10%] text-indigo-500/30 dark:text-indigo-400/20 animate-[float_5s_ease-in-out_infinite] transform-gpu">
              <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>
            
            <div className="absolute top-[60%] right-[15%] text-teal-500/30 dark:text-teal-400/20 animate-[float_7s_ease-in-out_infinite] transform-gpu" style={{ animationDelay: "1s" }}>
              <svg className="w-6 h-6 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            </div>
            
            <div className="absolute bottom-[20%] left-[25%] text-purple-500/30 dark:text-purple-400/20 animate-[float_6s_ease-in-out_infinite] transform-gpu" style={{ animationDelay: "2.5s" }}>
               <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" strokeDasharray="4 4" /></svg>
            </div>

            <div className="absolute top-[30%] right-[30%] text-indigo-500/30 dark:text-indigo-400/20 animate-[float_8s_ease-in-out_infinite] transform-gpu" style={{ animationDelay: "1.5s" }}>
               <svg className="w-4 h-4 md:w-6 md:h-6 animate-spin" style={{ animationDuration: "12s" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </div>
          </div>
          
          {/* Main Content Container */}
          {/* FIX 2: Added "isolate" class to create a strict stacking context */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 lg:gap-8 w-full isolate">
            <div className="w-full lg:w-1/2 text-center lg:text-left pt-12 lg:pt-0">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-8 border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span className="tracking-wide">AVAILABLE FOR NEW PROJECTS</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                Building Digital <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400">
                  Empires.
                </span>
              </h1>
              <div className="h-10 mb-6 flex justify-center lg:justify-start items-center">
                <span className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-light">
                  I am a <span className="text-indigo-600 dark:text-indigo-400 font-bold font-mono border-b-2 border-indigo-500/30 pb-1">Software Engineer</span>
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto lg:mx-0 mb-10 text-lg leading-relaxed">
                I don't just write code; I solve complex business problems. By fusing <strong className="text-slate-900 dark:text-slate-200">Data Intelligence</strong> with <strong className="text-slate-900 dark:text-slate-200">High-End Design</strong>, I create scalable software that drives real growth.
              </p>
              
              {/* --- 3. DYNAMIC HERO CTA INJECTED HERE --- */}
              <HeroCTA />

            </div>
            <div className="w-full lg:w-1/2 relative flex justify-center items-center mt-8 lg:mt-0">
              <div className="relative w-full max-w-[320px] aspect-[4/5] animate-[float_6s_ease-in-out_infinite]">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-teal-400 rounded-3xl opacity-30 blur-[60px]" />
                <div className="relative z-10 w-full h-full bg-white/20 dark:bg-white/5 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/40 dark:border-white/10 shadow-2xl group transform rotate-3 hover:rotate-0 transition-all duration-500">
                  <Image 
                    src="https://igeforpresident.com/wp-content/uploads/2025/12/1766912729947_unnamed-17.png" 
                    alt="Mubarik Osman - Founder of Hiigsi Tech" 
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-bold text-xl mb-1">Mubarik Osman</p>
                    <p className="text-indigo-400 text-xs font-mono uppercase tracking-wider">Founder,  Hiigsi Tech</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Updated Super Modern Page Flow */}
        <Stats />
        
        <Services />       {/* 1. Strategic Solutions */}
        <SkillsCloud />    {/* 2. The Arsenal */}
            {/* 3. Engineering Workflow */}
        <Projects />       {/* 4. Projects */}
        <Credentials />
         <Workflow />      {/* 5. Verified Credentials */}
        <ClientStories />  {/* 6. Client Stories */}
        <ConnectHub />     {/* 7. Connect Hub */}
        
        <Contact />        {/* 8. Contact Form */}
        
      </main>

      <Footer />
    </div>
  );
}