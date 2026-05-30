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

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#050505] selection:bg-indigo-500 selection:text-white transition-colors duration-300 scroll-smooth">
      
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full mix-blend-screen blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-500/20 rounded-full mix-blend-screen blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" style={{ animationDelay: "2s" }} />
      </div>

      <Header />

      <main className="relative z-10 w-full overflow-x-hidden">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-12 lg:pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 lg:gap-8 w-full">
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
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link href="#portfolio" className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full hover:scale-105 active:scale-95 transition-transform shadow-xl hover:shadow-indigo-500/20">
                  View Work
                </Link>
                <Link href="#contact" className="px-8 py-4 bg-white/50 dark:bg-white/5 backdrop-blur-md text-slate-900 dark:text-white font-bold rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors border border-slate-200 dark:border-white/20">
                  Book Call
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative flex justify-center items-center mt-8 lg:mt-0">
              <div className="relative w-full max-w-[320px] aspect-[4/5] animate-[float_6s_ease-in-out_infinite]">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-teal-400 rounded-3xl opacity-30 blur-[60px]" />
                <div className="relative z-10 w-full h-full bg-white/20 dark:bg-white/5 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/40 dark:border-white/10 shadow-2xl group transform rotate-3 hover:rotate-0 transition-all duration-500">
                  <Image 
                    src="https://media.licdn.com/dms/image/v2/D4E03AQEQUVTQ3C73Ag/profile-displayphoto-shrink_400_400/B4EZnMVVKYHEAg-/0/1760069768422?e=1766620800&v=beta&t=ChNU3ccxs3dw8r1XCsKSaIPWoOLX4HFc14NJwqQ5y9s" 
                    alt="Profile Picture" 
                    fill
                    priority
                    className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-bold text-xl mb-1">Mubarik Osman</p>
                    <p className="text-indigo-400 text-xs font-mono uppercase tracking-wider">Founder, Hiigsi Tech</p>
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