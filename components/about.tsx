"use client";

/**
 * ============================================================================
 * MUBARIK OSMAN ABDI - PERSONAL PORTFOLIO / ABOUT DOSSIER (CLIENT COMPONENT)
 * Description: A deeply personal, exhaustive narrative of Mubarik's journey
 * from a technology enthusiast to a master software builder. 
 * Frameworks: Next.js 14/15, Tailwind CSS, Framer Motion, Lucide React
 * ============================================================================
 */

import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import {
  Terminal, Code2, BrainCircuit, Globe, MapPin, 
  GraduationCap, Award, Trophy, ShieldCheck, 
  Cpu, Layers, Zap, Eye, Server, Database, 
  Workflow, Users, BookOpen, ChevronRight,
  MonitorPlay, Briefcase
} from "lucide-react";

// ============================================================================
// STRICT TYPESCRIPT DEFINITIONS
// Fixing the 'Variants' error by explicitly defining valid easing strings
// ============================================================================

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut" // Fixed: Using standard easing string literal
    } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.2 
    } 
  }
};

const slideInLeftVariant: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8, 
      ease: "circOut"
    } 
  }
};

// ============================================================================
// MASSIVE DATA STRUCTURES: The DNA of Mubarik Osoman
// ============================================================================

const PERSONAL_PHILOSOPHY = [
  {
    id: "01",
    title: "The Awakening: From Observer to Creator",
    content: "There is a profound difference between utilizing technology and understanding its molecular structure. My journey did not begin with formal employment or a corporate desk. It began with pure, unadulterated curiosity. I started as a 'tech liker'—a young mind fascinated by the screen's glow in Hargeisa. But passive observation quickly felt inadequate. I needed to know how the pixels were commanded. I transitioned from marveling at software to reverse-engineering it. I realized that code is the closest thing humanity has to actual magic: you type words, and systems come to life. That realization transformed me from a consumer of the digital world into an architect of it.",
    icon: <Eye className="w-6 h-6 text-indigo-400" />
  },
  {
    id: "02",
    title: "Engineering for the Human Condition",
    content: "A beautifully written algorithm is useless if it does not solve a human problem. As a recent graduate, I chose not to wait for a traditional job to validate my skills. Instead, I looked at my community. I saw NGOs struggling with archaic data systems; I saw local governments bogged down by manual processes. I began engineering solutions. My philosophy is rooted in utilitarian design paired with uncompromising performance. Whether I am architecting a massive database on Firebase or designing a sleek, Apple-esque glassmorphic interface, the goal remains identical: reduce friction. Technology should not be a barrier; it should be an invisible bridge that empowers society.",
    icon: <Users className="w-6 h-6 text-cyan-400" />
  },
  {
    id: "03",
    title: "The Relentless Pursuit of Mastery",
    content: "In the rapidly evolving landscape of software engineering, complacency is equivalent to obsolescence. I treat my mind as a compiler, constantly ingesting new paradigms, frameworks, and architectural patterns. From mastering the nuances of Next.js server-side rendering to orchestrating complex state management in Flutter mobile apps, my education never stops. The university degrees and global certifications I hold are merely baseline milestones. The true metric of my capability is my ability to adapt, learn, and build anything I can conceptualize. I do not just write code; I architect resilient digital ecosystems.",
    icon: <BrainCircuit className="w-6 h-6 text-emerald-400" />
  }
];

const EDUCATION_JOURNEY = [
  {
    institution: "Golis University",
    degree: "Bachelor of Science in Software Engineering",
    location: "Hargeisa, Somalia",
    description: "This was not merely an academic exercise; it was a rigorous immersion into the mathematical and theoretical science of computing. While others viewed university as a path to a piece of paper, I treated it as a laboratory. Here, I moved beyond the syntax of programming languages to understand the deep theoretical foundations of software architecture. I studied how to make systems not just work, but work efficiently under massive load.",
    highlights: [
      "Advanced Data Structures & Algorithmic Analysis",
      "Software Testing, Validation, and Verification Protocols",
      "Cloud Computing Architectures & Distributed Systems",
      "Human-Computer Interaction (HCI) and Advanced UX Psychology",
      "Cryptographic Security and Secure Coding Practices"
    ]
  },
  {
    institution: "Tisqaad College",
    degree: "Diploma in Computer Science",
    location: "Hargeisa, Somalia",
    description: "The crucible where my foundational technical skills were originally forged. This program bridged the critical gap between hardware mechanics and software logic. It gave me a holistic understanding of how machines compute at the lowest levels, allowing me to write higher-level code with an intrinsic understanding of memory allocation and processing efficiency.",
    highlights: [
      "Systems Programming and Operating System Fundamentals",
      "Relational and Non-Relational Database Management Systems",
      "Network Infrastructure and TCP/IP Security Protocols",
      "Foundational Object-Oriented Programming (OOP) Paradigms"
    ]
  }
];

const GLOBAL_CERTIFICATIONS = [
  {
    issuer: "Google",
    title: "Google Cloud Platform (GCP) & Data Architecture",
    platform: "Coursera",
    date: "Completed",
    details: "An intensive certification focused on enterprise-scale cloud computing. Mastered deploying scalable applications, managing serverless architectures, and configuring secure IAM roles within Google's global infrastructure. This validation ensures my backend systems are military-grade."
  },
  {
    issuer: "Meta",
    title: "Meta Front-End & Back-End Developer Mastery",
    platform: "Coursera",
    date: "Completed",
    details: "Curated directly by Meta engineers, this dual-certification forged my abilities in React.js and advanced API development. I learned to handle complex global state, optimize rendering lifecycles, and build interfaces that mirror the fluidity of native applications."
  },
  {
    issuer: "IBM",
    title: "IBM Full Stack Software Developer Specialization",
    platform: "Coursera",
    date: "Completed",
    details: "A comprehensive deep-dive into cloud-native development. Covered containerization technologies, continuous integration/continuous deployment (CI/CD) pipelines, and writing highly decoupled, microservice-based enterprise logic."
  }
];

const HACKATHON_CONQUESTS = [
  {
    year: "2025",
    event: "Xalkadoon Fikircamp",
    location: "Hargeisa, Somalia",
    role: "Lead IoT Architect",
    outcome: "Winner / Top Finalist",
    description: "A defining moment in my career. Under intense pressure, I conceptualized and built 'Biyo Kaab', a sophisticated IoT-based water management solution. I delivered a complete technical prototype integrating hardware sensor data with a real-time, aesthetically flawless cloud dashboard. This victory proved my ability to synthesize complex hardware-software integrations within a brutal 48-hour window."
  },
  {
    year: "2024",
    event: "Innovate Uganda Tech Hackathon",
    location: "Kampala, Uganda (Hybrid Entry)",
    role: "Full-Stack Engineer",
    outcome: "Excellence in Code Architecture",
    description: "Faced off against the absolute top-tier tech talent in East Africa. I focused on building cross-border digital payment infrastructure, engineering a highly secure, encrypted transaction flow. The challenge pushed my understanding of fintech security protocols and forced me to innovate in rapid Flutter UI development."
  },
  {
    year: "2024",
    event: "Ethiopia DevFest Engineering Challenge",
    location: "Addis Ababa, Ethiopia (Remote Entry)",
    role: "Backend Infrastructure Lead",
    outcome: "Best Scalable Solution",
    description: "Engineered a Google Cloud Platform (GCP) backed serverless application specifically designed to handle sudden, massive traffic spikes. I utilized Firebase real-time databases and advanced indexing to ensure zero-latency data retrieval during the competition's intense algorithmic stress tests."
  },
  {
    year: "2023",
    event: "Kenya Tech Summit Hackathon",
    location: "Nairobi, Kenya",
    role: "Mobile App Developer",
    outcome: "Innovation Award",
    description: "My international competitive debut. I built a cross-platform mobile application addressing complex local logistical challenges. This event solidified my expertise in Flutter and taught me the critical, real-world importance of offline-first app architecture in the African context."
  },
  {
    year: "2023",
    event: "Somalia National Tech Challenge",
    location: "Mogadishu / Hargeisa",
    role: "Solo Developer",
    outcome: "Top Tier Finisher",
    description: "A grueling solo endeavor where I conceptualized, designed, and coded a community resource management platform entirely from scratch. It was a true test of end-to-end full-stack capability, handling everything from the user interface psychology to the relational database schema design."
  }
];

const TECHNICAL_ARSENAL = [
  {
    category: "Frontend & Interface Architecture",
    skills: ["Next.js (App Router)", "React.js", "Flutter", "Tailwind CSS", "Framer Motion", "Glassmorphism UI", "TypeScript"],
    description: "I don't just build interfaces; I engineer visceral digital experiences. I am obsessed with maintaining 60fps cinematic animations, sub-millisecond load times, and pixel-perfect responsive design that feels entirely native on absolutely any screen size. I treat the DOM as a canvas."
  },
  {
    category: "Backend & Cloud Infrastructure",
    skills: ["Node.js", "PHP/Laravel", "Google Cloud Platform (GCP)", "Firebase", "RESTful API Design", "PostgreSQL", "NoSQL"],
    description: "The invisible, indestructible engine. I architect highly secure, infinitely scalable, and highly available server-side logic capable of handling enterprise-level data traffic. I build APIs that are predictable, documented, and resilient against failure."
  },
  {
    category: "Systems & Methodology",
    skills: ["System Design", "CI/CD Deployment", "Agile/Scrum", "Test-Driven Development (TDD)", "Git Version Control", "Linux Systems"],
    description: "Writing code is easy; maintaining a massive codebase over years is an art form. I employ strict architectural patterns (MVC, MVVM) and absolute clean code principles to ensure the software I build outlives its initial deployment and remains maintainable by any engineering team."
  }
];

// ============================================================================
// MAIN CLIENT COMPONENT
// ============================================================================

export default function AboutMeClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Cinematic Parallax calculations
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 250]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} className="bg-[#030303] text-neutral-200 min-h-screen font-sans selection:bg-cyan-500/30 overflow-hidden relative">
      
      {/* GLOBAL AMBIENT BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-indigo-900/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-emerald-900/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none translate-x-1/3 translate-y-1/3" />

      {/* ==========================================
          HERO SECTION: THE DOSSIER OPENING
          ========================================== */}
      <motion.section 
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 min-h-[100vh] flex flex-col justify-center px-6 pt-20 pb-32"
      >
        <div className="max-w-6xl mx-auto w-full flex flex-col items-start text-left">
          
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-[1px] bg-gradient-to-r from-cyan-500/50 via-indigo-500/50 to-transparent mb-12 max-w-sm"
          />

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="inline-flex items-center space-x-3 mb-8 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neutral-400">
              Personal Dossier // Access Granted
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="text-6xl sm:text-7xl md:text-9xl lg:text-[11rem] font-black tracking-tighter leading-[0.85] text-white mb-10 drop-shadow-2xl"
          >
            MUBARIK<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 via-neutral-600 to-neutral-800">
              OSOMAN.
            </span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="w-full max-w-2xl"
          >
            <p className="text-xl md:text-2xl font-light text-neutral-400 leading-relaxed mb-12">
              From a curious tech enthusiast to a master software builder. I am a recent graduate who didn't wait for permission to engineer the future. I build solutions for NGOs, governments, and the people.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full border-t border-neutral-800/50 pt-8"
          >
            <HeroMeta label="Location" value="Hargeisa, Somalia" icon={<MapPin className="w-4 h-4 text-cyan-500" />} />
            <HeroMeta label="Discipline" value="Full-Stack Engineering" icon={<Code2 className="w-4 h-4 text-indigo-500" />} />
            <HeroMeta label="Academic Status" value="Recent Graduate" icon={<GraduationCap className="w-4 h-4 text-emerald-500" />} />
            <HeroMeta label="Specialty" value="Cloud Architecture" icon={<Server className="w-4 h-4 text-purple-500" />} />
          </motion.div>
        </div>
      </motion.section>

      {/* ==========================================
          CHAPTER 1: THE MIND (PHILOSOPHY & ORIGIN)
          ========================================== */}
      <section className="relative z-10 py-32 md:py-48 px-6 bg-neutral-950/40 border-y border-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader number="01" title="The Architect's Mind" subtitle="From Tech Liker to Tech Builder" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-20">
            {/* Left Column: Narrative */}
            <motion.div 
              variants={slideInLeftVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-5 space-y-8 text-lg md:text-xl font-light leading-relaxed text-neutral-400"
            >
              <p>
                My name is <strong className="text-white font-medium">Mubarik Osman Abdi</strong>. Long before I was deploying complex cloud infrastructure or architecting robust database schemas, I was driven by a singular, burning question: <em>"How does this actually work?"</em>
              </p>
              <p>
                I am not merely a programmer typing syntax into an IDE. I am a translator between human intent and machine execution. I transitioned from a passionate technology enthusiast into a deeply professional software engineer because the world around me—especially my community in Hargeisa—needed builders, not just consumers.
              </p>
              <p>
                As a recent graduate, I realized that true engineering experience doesn't solely come from sitting in a corporate cubicle for ten years. It comes from stepping into the arena. It comes from partnering with Non-Governmental Organizations (NGOs) to digitize their humanitarian efforts. It comes from working alongside local government entities to modernize civic infrastructure and tear down bureaucratic friction using code. 
              </p>
              <p className="text-indigo-300 italic font-serif">
                "I do not build apps. I build highly resilient, deeply scalable digital ecosystems."
              </p>
            </motion.div>
            
            {/* Right Column: Philosophy Cards */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {PERSONAL_PHILOSOPHY.map((item, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeUpVariant}
                    className="p-8 rounded-3xl bg-white/[0.01] border border-white/[0.05] hover:bg-white/[0.03] hover:border-white/[0.1] transition-all duration-500 mb-6 backdrop-blur-md group"
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      <div className="p-4 rounded-2xl bg-black/50 border border-white/10 group-hover:scale-110 transition-transform duration-500 shrink-0 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
                        <p className="text-neutral-400 text-base leading-relaxed font-light">{item.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          CHAPTER 2: THE ARSENAL (TECHNICAL SKILLS)
          ========================================== */}
      <section className="relative z-10 py-32 md:py-48 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader number="02" title="The Technical Arsenal" subtitle="Tools of the Digital Artisan" />
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {TECHNICAL_ARSENAL.map((tech, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUpVariant}
                className="group relative p-10 rounded-[2rem] bg-gradient-to-b from-neutral-900/40 to-black border border-white/5 hover:border-cyan-500/30 overflow-hidden transition-all duration-700"
              >
                {/* Decorative background glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 blur-[50px] rounded-full group-hover:bg-cyan-500/20 transition-colors duration-700" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform duration-500">
                    {idx === 0 && <MonitorPlay className="w-6 h-6 text-cyan-400" />}
                    {idx === 1 && <Database className="w-6 h-6 text-indigo-400" />}
                    {idx === 2 && <Workflow className="w-6 h-6 text-emerald-400" />}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">{tech.category}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-10 font-light min-h-[120px]">
                    {tech.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {tech.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="px-3 py-1.5 text-xs font-mono rounded-lg bg-black/60 border border-white/10 text-neutral-300 hover:text-white hover:border-cyan-500/50 transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          CHAPTER 3: ACADEMIC FOUNDATION & CERTS
          ========================================== */}
      <section className="relative z-10 py-32 md:py-48 px-6 bg-neutral-950/40 border-y border-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader number="03" title="Academic Foundation" subtitle="The Science of Computing" />
          
          {/* Degrees */}
          <div className="mt-20 space-y-16">
            {EDUCATION_JOURNEY.map((edu, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col md:flex-row gap-10 md:gap-16 items-start group"
              >
                <div className="md:w-1/3 shrink-0">
                  <div className="sticky top-32 p-8 rounded-3xl bg-white/[0.01] border border-white/5 group-hover:border-indigo-500/30 transition-colors duration-500">
                    <GraduationCap className="w-10 h-10 text-indigo-500 mb-8" />
                    <h3 className="text-3xl font-bold text-white mb-4 tracking-tight leading-snug">{edu.institution}</h3>
                    <p className="text-cyan-400 font-mono text-sm leading-relaxed mb-6">{edu.degree}</p>
                    <p className="inline-flex items-center text-neutral-500 text-xs uppercase tracking-widest font-semibold">
                      <MapPin className="w-3 h-3 mr-2" /> {edu.location}
                    </p>
                  </div>
                </div>
                
                <div className="md:w-2/3 p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/5">
                  <p className="text-neutral-300 text-lg leading-relaxed font-light mb-12">
                    {edu.description}
                  </p>
                  
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 to-transparent" />
                    <h4 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6 pl-6 font-bold">Curriculum Highlights</h4>
                    <ul className="grid grid-cols-1 gap-4 pl-6">
                      {edu.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start space-x-4 text-base text-neutral-400">
                          <ChevronRight className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5 opacity-50" />
                          <span className="font-light">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Global Certifications Grid */}
          <div className="mt-40">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center text-center mb-16"
            >
              <Award className="w-12 h-12 text-emerald-400 mb-6" />
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Global Certifications</h3>
              <p className="text-neutral-500 font-light max-w-2xl text-lg">Validating my local expertise against the highest international standards of Silicon Valley engineering.</p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {GLOBAL_CERTIFICATIONS.map((cert, idx) => (
                <motion.div 
                  key={idx}
                  variants={fadeUpVariant}
                  className="p-8 rounded-[2rem] bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/10 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity duration-700 group-hover:scale-110">
                    <ShieldCheck className="w-24 h-24 text-emerald-500" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="inline-block px-3 py-1 mb-6 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                      <p className="text-xs font-mono text-emerald-400 tracking-widest uppercase">{cert.issuer}</p>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4 pr-4 leading-tight">{cert.title}</h4>
                    <p className="text-sm text-neutral-400 leading-relaxed font-light mb-8">{cert.details}</p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">{cert.platform}</p>
                      <p className="text-xs text-emerald-500 font-mono">{cert.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==========================================
          CHAPTER 4: THE CRUCIBLE (HACKATHONS)
          ========================================== */}
      <section className="relative z-10 py-32 md:py-48 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader number="04" title="The Crucible" subtitle="Conquering African Hackathons" />
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 text-xl text-neutral-400 font-light mb-24 leading-relaxed max-w-3xl"
          >
            <p>
              A true engineer's skill is not forged in the comfort of an air-conditioned classroom; it is forged in the fires of constraint. I have spent years crossing borders—competing across Hargeisa, Kampala, Addis Ababa, and Nairobi—engaging in high-stakes hackathons. These brutal, sleepless 48-hour development sprints demanded rapid software architecture, flawless algorithmic logic, and unbreakable code. This is the arena where I evolved from a student of theory into a master of execution.
            </p>
          </motion.div>

          {/* Epic Timeline Structure */}
          <div className="relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {HACKATHON_CONQUESTS.map((hackathon, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-12 md:mb-24 last:mb-0"
              >
                {/* Timeline Center Node */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#030303] bg-neutral-900 text-neutral-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-hover:bg-cyan-500 group-hover:text-black transition-colors duration-500 z-10 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]">
                  <Trophy className="w-5 h-5" />
                </div>
                
                {/* Content Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-4rem)] p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 group-hover:border-cyan-500/30 group-hover:bg-white/[0.04] transition-all duration-500 backdrop-blur-sm">
                  <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                    <span className="font-mono text-sm font-bold text-cyan-400 bg-cyan-400/10 px-3 py-1.5 rounded-lg border border-cyan-400/20">
                      {hackathon.year}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold flex items-center">
                      <Globe className="w-3 h-3 mr-2" /> {hackathon.location}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">{hackathon.event}</h3>
                  <h4 className="text-base font-semibold text-emerald-400 mb-6 flex items-center">
                    <Zap className="w-4 h-4 mr-2" /> {hackathon.outcome}
                  </h4>
                  
                  <p className="text-base text-neutral-400 leading-relaxed font-light mb-6">
                    {hackathon.description}
                  </p>
                  
                  <div className="pt-6 border-t border-white/10 flex items-center">
                    <Briefcase className="w-4 h-4 text-neutral-500 mr-3" />
                    <p className="text-sm text-neutral-300 font-mono">Role: <span className="text-white font-semibold">{hackathon.role}</span></p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          FOOTER / EPILOGUE
          ========================================== */}
      <footer className="relative z-10 bg-[#010101] py-40 px-6 border-t border-white/5 overflow-hidden">
        {/* Massive cinematic glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-gradient-to-t from-indigo-900/20 to-transparent blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-10"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-tight">
              The Code is Written.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-700">
                The Journey Continues.
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-neutral-400 font-light max-w-3xl mx-auto leading-relaxed">
              From the classrooms of Golis University to the bleeding edge of modern full-stack development. I am Mubarik Osoman, and I am ready to architect your next digital reality.
            </p>

            <div className="pt-16">
              <button className="group relative inline-flex items-center justify-center px-10 py-5 text-base font-bold text-black bg-white rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-300 via-indigo-300 to-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                <span className="relative flex items-center gap-3">
                  <Terminal className="w-5 h-5" /> Initialize Contact Sequence
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 mt-48 flex flex-col items-center justify-center space-y-6">
          <div className="flex space-x-3">
            <span className="w-2 h-2 rounded-full bg-neutral-800" />
            <span className="w-2 h-2 rounded-full bg-neutral-700" />
            <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
          </div>
          <p className="text-xs md:text-sm text-neutral-500 uppercase tracking-[0.4em] font-mono font-semibold">
            Mubarik Osman Abdi © {new Date().getFullYear()} // Hargeisa, Somalia
          </p>
        </div>
      </footer>
    </div>
  );
}

// ============================================================================
// MICRO-COMPONENTS (Clean Architecture)
// ============================================================================

/**
 * Reusable Section Header Component
 */
function SectionHeader({ number, title, subtitle }: { number: string, title: string, subtitle: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10 border-b border-white/10 pb-10"
    >
      <span className="text-7xl md:text-9xl font-black text-white/5 tracking-tighter leading-none select-none">{number}</span>
      <div>
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-3">{title}</h2>
        <p className="text-xl md:text-2xl text-cyan-500 font-light tracking-wide">{subtitle}</p>
      </div>
    </motion.div>
  );
}

/**
 * Small metadata item for the Hero Section
 */
function HeroMeta({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="flex flex-col space-y-3">
      <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold">{label}</p>
      <div className="flex items-center text-neutral-300 font-light text-sm sm:text-base">
        <span className="mr-3 opacity-70">{icon}</span>
        {value}
      </div>
    </div>
  );
}