"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import {
  Code2, MapPin, GraduationCap, Trophy, 
  Server, Database, Workflow, MonitorPlay,
  Layers, Cpu, Globe
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// --- ANIMATION VARIANTS ---
const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// --- THE MANIFESTO (EXACTLY 15 ORIGINAL PARAGRAPHS + 6 NEW PARAGRAPHS) ---
const THE_MANIFESTO = [
  // User's Exact Original Text
  "There is a specific kind of quiet that happens right before a blank screen turns into something real, a suspended moment of pure potential where absolutely nothing exists yet everything is endlessly possible. For me, that profound stillness is where the journey always begins. I didn’t fall in love with software engineering and design because of the sterile syntax, the hypnotic hum of server racks, or the cold, calculated logic of algorithms. I fell in love with it because of the raw, untamed power of creation. When I first looked closely at a computer screen, I didn't just see a display of backlit colors and rigid text; I saw a canvas that was miraculously unbound by the physical limitations of the real world. In the physical realm, architects and artists are constantly restricted by gravity, material costs, and the inflexible laws of spatial physics. But in the digital realm, the only limitation is the depth of one’s own imagination and the persistence to see it through. This realization hit me not as a fleeting thought, but as a quiet earthquake that fundamentally shifted my understanding of reality. It was about whispering carefully structured commands into a machine until it woke up, started breathing, and began to interact with the world. That initial spark of pure curiosity transformed into a lifelong obsession, shifting my identity entirely from a passive consumer of the modern digital landscape into an active, deliberate sculptor of its very fabric.",
  "Yet, as my technical understanding deepened and I learned to bend the machine to my will, I realized that writing complex code solely for the sake of the machine is a somewhat hollow victory. The true magic, the actual art form, happens when the machine becomes a clear, empathetic mirror for the human condition. I fundamentally shifted my focus away from the processor and toward the people on the other side of the glass. I began to see technology not as a random collection of features, but as an invisible, deeply empathetic bridge connecting human intention to digital execution. Every single swipe of a finger, every hesitant click of a mouse, and every continuous scroll represents a genuine human desire, a fleeting anxious thought, or a vital, urgent need. Our physical world is inherently loud, fractured, heavily demanding, and overwhelmingly complicated. Because of this, I fundamentally believe that our digital spaces must serve as quiet sanctuaries from that external chaos. They should never demand our excess cognitive energy; rather, they should quietly and efficiently restore it. This is where the deep psychology of user experience becomes just as critical, if not more so, than the mathematical logic of the underlying code.",
  "This deep-seated empathy naturally bled into my overarching philosophy of digital aesthetics. The visual language we use to construct these environments matters immensely, perhaps now more than ever in an era of infinite distraction. I find myself continuously drawn to a design ethos that heavily prioritizes supreme fluidity, atmospheric depth, and generous, deliberate breathing room. Beauty in software architecture is never a superficial overlay or an afterthought; it is a strict functional requirement. When an interface is meticulously crafted—with perfectly calculated typography that respects the eyes, deliberate white space that gives thoughts room to echo, and cinematic animations that respond to the human touch like water flowing over polished stone—it builds an immediate, subconscious trust. It silently tells the user that they are in extremely safe hands, and that this space was built with a profound, uncompromising respect for their time and their peace of mind. The absolute best design in the world doesn't scream for attention, nor does it flash brightly to mask a broken, inefficient core. It simply exists, working silently and beautifully, guiding the user to their exact destination with the effortless, practiced grace of a well-rehearsed symphony.",
  "But that sweeping simplicity is always a meticulously engineered, highly guarded illusion. Beneath the tranquil, polished surface of a beautiful interface lies the roaring, impossibly complex engine of the backend—the invisible, heavy-duty architecture that quietly holds the sky up so the user can enjoy the view. I hold a deep, almost reverent respect for this unseen world. Architecting a highly relational database schema, designing deeply resilient and secure APIs, and orchestrating the vast, silent networks of cloud infrastructure is remarkably similar to designing the central nervous system of a living, breathing organism. It requires an entirely different kind of creativity, one that is firmly rooted in paranoia, anticipation, iron-clad security, and mathematical precision. You have to be able to imagine exactly how the entire system will behave not just when one polite person walks through the front door, but when a million panicked people rush the gates at the exact same millisecond. There is a deeply poetic, deeply private satisfaction in writing server-side logic that is bulletproof, elegant, and ruthlessly efficient in its resource consumption.",
  "Achieving this elusive harmony, however, is a grueling, deeply invisible struggle that no user ever sees. The path to achieving digital elegance is paved with literally thousands of microscopic failures, agonizingly late-night debugging sessions, and moments of profound, wall-hitting frustration where the logic simply, stubbornly refuses to align with the vision. There is a very specific, unique kind of isolation in staring down a massive wall of code at three in the morning, silently hunting for a single misplaced character, a rogue syntax error, or a silent memory leak that is slowly, invisibly degrading the system's performance. Yet, it is exactly within this brutal crucible of frustration that the true craft of engineering is actually forged. Over the years, I have learned to genuinely embrace the struggle, to view every red error message not as a personal defeat, but as a whispered, cryptic hint from the machine. The willingness to sit quietly with the intense discomfort of not knowing, to meticulously tear down a massive, functioning structure and rebuild it entirely from scratch simply because it wasn't \"quite right,\" is what permanently separates the true artisan from the clock-punching factory worker.",
  "When you dedicate your life to a craft with this level of intensity, names and titles inevitably start to drift into the conversation. My name is Mubarik Osman, and I have spent years quietly obsessing over the invisible spaces between human psychology and digital architecture. As my work reaches further across the globe, I often notice people searching for labels to define the impact. They type queries looking for the best young developer, trying to quantify ambition and execution into a neat, easily searchable category. But youth in engineering is entirely irrelevant if it isn't backed by an old soul's patience and an absolute, uncompromising dedication to the fundamentals. Being recognized as a young pioneer in this space is deeply humbling, but it is never the ultimate goal. The goal is to build systems so profoundly resilient and beautifully intuitive that the age, the location, and the background of the architect completely dissolve into the background, leaving only the pure, frictionless experience of the software itself.",
  "This global perspective fundamentally shifts how I view my place within the broader technological landscape. When industry leaders and visionaries look toward the future, they often search for the best African developer, seeking minds that have been forged in unique environments and can bring entirely new paradigms to the table. Building from the continent is not a limitation; it is an incredible, distinct advantage. It teaches you to build software that is inherently offline-first, exceptionally mindful of bandwidth, and ruthlessly efficient. It strips away the luxury of bloated infrastructure and forces you to engineer with a level of intentionality that is often lost in environments of absolute abundance. To represent this continent on a global stage means proving that world-class, enterprise-level engineering—the kind of architecture that runs seamlessly at massive scale—is completely boundaryless. The code does not care where it was written; it only cares how well it was engineered.",
  "In this same vein, the pursuit of mastery carries an immense, quiet responsibility to ones own roots. When a company or a peer searches for the best Somali developer, I want them to find a standard of excellence that rivals any engineering hub on the planet. This isn't about geography or misplaced pride; it is about establishing a definitive, undeniable benchmark of quality. It is about proving that world-class design, unbreakable cloud infrastructure, and cinematic interfaces can be consistently delivered from anywhere, by anyone who possesses the unrelenting discipline to master the craft. Every single line of code I deploy, and every digital ecosystem I architect, carries this implicit promise. It is a silent declaration that the software we build will not merely participate in the global market, but will actively set the pace, pushing the boundaries of what is technically and aesthetically possible.",
  "At the absolute core of this level of craftsmanship lies my unwavering commitment to the philosophy of brutal minimalism. In a modern discipline where you have the computing power to technically build absolutely anything you can dream of, the single hardest lesson to learn is knowing exactly what to leave out. Software naturally, almost gravitationally, trends toward terrible bloat. It trends toward the desperate, messy accumulation of unnecessary features in a misguided, insecure attempt to prove its own value. I firmly believe that true, lasting value is found exclusively in clarity. My entire design and engineering process is fundamentally subtractive. I relentlessly strip away the decorative noise, the redundant user flows, the vanity metrics, and the clever but entirely unnecessary algorithms. What remains at the end of this process is a distilled, razor-sharp experience that knows exactly what it is, exactly what it does, and exactly who it serves. This kind of extreme minimalism requires immense courage, because it leaves absolutely nowhere for poor engineering or lazy thinking to hide.",
  "And so, the screen remains blank, waiting. It is a quiet, infinitely patient, recurring invitation to begin all over again. It asks me to take everything I have learned, everything I have had to painfully unlearn, and everything I have slowly mastered, and pour all of it into the very next creation. I do not design and build applications merely for them to exist as a collection of files sitting on a cold server in a distant data center; I build them specifically to be touched, to be intimately lived in, and to quietly, consistently improve the daily lives of the people who interact with them. The code itself, by its very nature, is highly ephemeral. It is destined to be eventually overwritten, aggressively updated, and one day entirely retired. But the distinct, lingering feeling that a beautifully crafted digital experience leaves behind in a human mind—that profound sense of relief, that brief moment of unexpected delight, that sudden, magical absence of friction in a stressful day—that is permanent. That is the true, lasting legacy of a dedicated builder. And so, the journey continues onward, never seen as a frantic race to a final destination, but as a lifelong, deeply joyful dedication to the art of turning absolute nothingness into something genuinely extraordinary.",
  "Yet, to truly master this art, I must also look beyond my own screen and consider the broader ecosystem that surrounds me. When I walk through the streets of Hargeisa, I see an untapped reservoir of brilliance—young minds who look at the digital world with the exact same hunger I once had. The responsibility of a builder is not just to erect magnificent structures, but to deliberately leave the ladder down. I envision a future where the next generation of Somali engineers doesn’t have to look outward to the West for inspiration, but can find world-class mentors, blueprints, and digital infrastructure right in their own neighborhoods. It is about fostering a localized culture where knowledge is open-sourced, where we build tech hubs that rival the innovation of Silicon Valley, but fiercely retain the soulful resilience of our own heritage.",
  "This commitment to the end-user also demands a profound respect for the diverse physical realities in which our software operates. Building for a truly global audience means acknowledging that not everyone is sitting behind a flawless retina display with a gigabit fiber-optic connection. Often, they are accessing the web on a cracked smartphone screen in a crowded market, relying on a deeply unstable network. Here, software elegance ceases to be a mere aesthetic luxury and becomes a matter of strict accessibility. Writing hyper-optimized code, minimizing payload sizes, and utilizing progressive enhancement are not just technical best practices; they are acts of profound respect for the user's battery life, their data plan, and their time. This is where the discipline of building from our continent truly shines, turning infrastructural constraints into a catalyst for unparalleled efficiency.",
  "As we stand on the precipice of a new era defined by artificial intelligence and machine learning, this human-centric philosophy becomes our most vital anchor. It is incredibly easy to be swept away by the alluring promise of algorithms that can write themselves, or generative models that can hallucinate entire interfaces in milliseconds. But a machine, no matter how profoundly intelligent or computationally vast, does not possess a pulse. It cannot intuitively grasp the subtle anxiety of a user navigating a complex financial dashboard, nor can it truly feel the quiet relief of a perfectly timed interaction. My role as an architect in this new age is to act as the steadfast guardian of human empathy, ensuring that as our systems grow exponentially smarter, they do not simultaneously become colder or more alienated from the very people they are built to serve.",
  "Ultimately, I have come to view code as a living, breathing dialogue between the present and the future. When I structure a repository, write documentation, or architect a complex module, I am essentially writing a deeply personal letter to the engineers who will inherit this system years from now. I want them to read my logic and feel a sense of absolute clarity, to understand not just how a function was written, but why a specific architectural decision was made under pressure. There is an incredible, quiet intimacy in reading elegant code written by someone you have never met; it completely transcends the boundaries of time and geography. I strive to leave behind codebases that are not tangled webs of hasty compromises, but meticulously organized libraries that actively invite collaboration, adaptation, and growth long after I have moved on to the next challenge.",
  "And so, I return to that familiar, quiet moment before the keystrokes begin. The blank canvas is no longer a void waiting to be filled, but a mirror reflecting the immense responsibility and profound joy of creation. Whether I am architecting a massive enterprise system that spans continents or a hyper-local application designed to solve a singular, pressing problem in my community, the ethos remains completely unchanged. I am here to sculpt order out of chaos, to forge digital sanctuaries that fiercely respect human dignity, and to prove that world-class engineering can emerge from any corner of the globe. The screen lights up, the cursor blinks its steady, rhythmic heartbeat, and I begin again—driven by the unshakeable belief that the most beautiful, impactful lines of code have yet to be written.",
  
  // The 6 Brand New Paragraphs Continuing the Narrative
  "Beyond the act of creation lies the profound responsibility of contribution. Open-source development is not merely a software methodology; it is a global, borderless conversation. I actively engage in this dialogue, sharing repositories and dismantling my own complex architectures so that others can build upon my foundation. It is an acknowledgment that we stand on the shoulders of giants, and a strict moral obligation to provide a sturdy shoulder for the next generation of builders. True mastery of engineering is never hoarded in private silos; it is freely distributed to elevate the collective intelligence of the web.",
  "Yet, I do not lose sight of the unforgiving commercial realities that govern our digital ecosystems. A beautifully engineered product that fundamentally fails to reach its market is nothing more than an unfinished symphony. I actively bridge the gap between abstract algorithmic elegance and tangible, ruthless business logic. Understanding the economics of a Software-as-a-Service platform, analyzing user acquisition funnels, and interpreting the critical importance of retention metrics allows me to engineer solutions that don't just function flawlessly—they thrive commercially and drive undeniable revenue.",
  "In an increasingly hostile and unpredictable digital landscape, building for success also intrinsically means architecting for survival. Security is not an afterthought to be casually bolted onto a finished product just before launch; it is the absolute bedrock upon which all digital trust is built. I approach system architecture with a hacker’s paranoid mindset, systematically anticipating vulnerabilities long before they can be exploited. Encrypting sensitive data, strictly securing API endpoints, and designing mathematically robust authentication flows are the silent, non-negotiable promises I make to every single user who entrusts my software with their life's information.",
  "As the modern web transitions rapidly from flat, static pages to deeply immersive, spatial experiences, the underlying tools we use must radically evolve in tandem. I am constantly exploring the absolute bleeding edge of browser capabilities, pushing the strict limits of WebGL, WebAssembly, and globally distributed edge computing. The ultimate goal is to shatter the confining illusion of the browser window entirely, creating seamless, native-like digital experiences that load instantly and respond with absolute zero latency, regardless of whether the user is in Silicon Valley or the Horn of Africa.",
  "At its core, time is the only truly non-renewable resource we possess as human beings. Every single second a user spends waiting for my software to load or process is a second they can never, ever get back. This sobering realization is the ultimate driver behind my relentless obsession with performance optimization. A millisecond saved in a complex database query, a micro-interaction polished to sub-frame perfection, a payload meticulously minimized by a fraction of a kilobyte—these are not just technical victories to boast about. They are acts of profound, tangible respect for human time and attention.",
  "Ultimately, this portfolio is not a static museum of past accomplishments; it is a living, breathing blueprint of future intent. I am Mubarik Osman—a full-stack engineer, a dedicated founder, and a relentless architect of the digital frontier. The robust systems, scalable agencies, and beautiful interfaces I build today are merely the foundation for the massive empires we will collectively construct tomorrow. The code is polished and ready. The global infrastructure is primed. The next extraordinary chapter of the web is not just waiting to be written—it is actively being engineered."
];

// --- ARSENAL DATA ---
const TECHNICAL_ARSENAL = [
  { category: "Frontend Architecture", skills: ["Next.js", "React", "Flutter", "Tailwind CSS", "Framer Motion"], icon: <MonitorPlay className="w-6 h-6" />, color: "text-indigo-400" },
  { category: "Cloud Infrastructure", skills: ["Node.js", "PHP/Laravel", "GCP", "Firebase", "PostgreSQL"], icon: <Database className="w-6 h-6" />, color: "text-teal-400" },
  { category: "Systems & Security", skills: ["System Architecture", "CI/CD", "Linux OS", "TDD", "Cryptography"], icon: <Workflow className="w-6 h-6" />, color: "text-purple-400" },
  { category: "Data Intelligence", skills: ["BigQuery", "Data Pipelines", "Analytics", "Python", "NoSQL"], icon: <Globe className="w-6 h-6" />, color: "text-emerald-400" },
  { category: "API & Microservices", skills: ["GraphQL", "RESTful APIs", "gRPC", "Docker", "Kubernetes"], icon: <Layers className="w-6 h-6" />, color: "text-rose-400" },
  { category: "Core Languages", skills: ["TypeScript", "JavaScript", "Dart", "PHP", "C++"], icon: <Cpu className="w-6 h-6" />, color: "text-cyan-400" }
];

export default function AboutMeClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Smooth parallax scrolling effects
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#030303] text-slate-200 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      <Header />
      
      {/* --- SUPER MODERN ANIMATED BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Massive Ambient Orbs */}
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] animate-[pulse_10s_ease-in-out_infinite] transform-gpu" />
        <div className="absolute top-[30%] right-[-15%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[140px] animate-[pulse_12s_ease-in-out_infinite] transform-gpu" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] animate-[pulse_14s_ease-in-out_infinite] transform-gpu" style={{ animationDelay: "4s" }} />
        
        {/* Animated Dot Grid with Masking */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_60%,transparent_100%)] opacity-30 transform-gpu" 
        />

        {/* Floating Geometric SVGs */}
        <div className="absolute top-[20%] left-[10%] text-indigo-500/20 animate-[float_6s_ease-in-out_infinite]">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
        </div>
        <div className="absolute top-[60%] right-[12%] text-teal-500/20 animate-[float_8s_ease-in-out_infinite]" style={{ animationDelay: "1s" }}>
          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
        </div>
        <div className="absolute bottom-[30%] left-[15%] text-purple-500/20 animate-[float_7s_ease-in-out_infinite]" style={{ animationDelay: "2.5s" }}>
           <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><circle cx="12" cy="12" r="10" strokeDasharray="4 4" /></svg>
        </div>
      </div>
      
      {/* --- HERO SECTION --- */}
      <motion.section 
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 min-h-screen flex flex-col justify-center px-6 pt-20 pb-24 isolate"
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-px bg-gradient-to-r from-indigo-500/50 via-teal-500/50 to-transparent mb-12 max-w-sm"
          />

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center space-x-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 text-xs font-bold mb-8 shadow-sm backdrop-blur-xl"
          >
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="tracking-widest text-slate-300 uppercase font-mono">The Manifesto of Mubarik Osman</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tighter leading-[0.85] text-white mb-12"
          >
            BUILDING<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400">
              EMPIRES.
            </span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full border-t border-white/10 pt-10 mt-16 max-w-4xl"
          >
            <HeroMeta label="Location" value="Hargeisa, Somalia" icon={<MapPin className="w-4 h-4 text-indigo-400" />} />
            <HeroMeta label="Discipline" value="Software Engineering" icon={<Code2 className="w-4 h-4 text-teal-400" />} />
            <HeroMeta label="Status" value="Founder & Engineer" icon={<GraduationCap className="w-4 h-4 text-purple-400" />} />
            <HeroMeta label="Focus" value="Cloud & UI Systems" icon={<Server className="w-4 h-4 text-emerald-400" />} />
          </motion.div>
        </div>
      </motion.section>

      {/* --- THE DEEP READ (THE MANIFESTO) --- */}
      <section className="relative z-10 py-32 px-6 bg-[#020202]/50 border-y border-white/[0.03] backdrop-blur-sm overflow-hidden">
        
        {/* --- ANIMATED MANIFESTO BACKGROUND ELEMENTS --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Subtle moving glows tracing the reading area */}
          <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] animate-[pulse_12s_ease-in-out_infinite]" />
          <div className="absolute top-[50%] right-[5%] w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[120px] animate-[pulse_15s_ease-in-out_infinite]" style={{ animationDelay: "3s" }} />
          <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px] animate-[pulse_10s_ease-in-out_infinite]" style={{ animationDelay: "1s" }} />
          
          {/* Massive, slow-floating geometric wireframes behind the text */}
          <div className="absolute top-[15%] right-[10%] text-indigo-500/10 animate-[float_7s_ease-in-out_infinite]">
            <svg className="w-40 h-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          </div>
          <div className="absolute top-[45%] left-[5%] text-teal-500/10 animate-[float_9s_ease-in-out_infinite]" style={{ animationDelay: "2s" }}>
            <svg className="w-56 h-56" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.2}><circle cx="12" cy="12" r="10" strokeDasharray="1 3" /></svg>
          </div>
          <div className="absolute bottom-[20%] right-[15%] text-purple-500/10 animate-[float_8s_ease-in-out_infinite]" style={{ animationDelay: "4s" }}>
            <svg className="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z" strokeDasharray="2 4" /></svg>
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-24 flex flex-col md:flex-row md:items-end gap-6">
             <span className="text-8xl md:text-9xl font-black text-white/5 tracking-tighter leading-none select-none">01</span>
             <div>
                <h2 className="text-sm tracking-[0.3em] uppercase text-indigo-400 font-bold mb-4 font-mono">The Mind</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Engineering with Intent.</h3>
             </div>
          </div>
          
          <div className="space-y-12 md:space-y-16">
            {THE_MANIFESTO.map((paragraph, index) => (
              <motion.p 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-lg md:text-[22px] font-normal leading-[1.9] text-slate-300/90 tracking-[-0.01em]"
              >
                {/* Elegant Drop Cap for the very first paragraph */}
                {index === 0 ? (
                  <>
                    <span className="float-left text-7xl md:text-[6rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-teal-400 leading-[0.7] pr-4 pt-3 pb-2">
                      {paragraph.charAt(0)}
                    </span>
                    {paragraph.slice(1)}
                  </>
                ) : (
                  paragraph
                )}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* --- THE ARSENAL (MODERN BENTO GRID) --- */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-24 flex flex-col md:flex-row md:items-end gap-6">
             <span className="text-8xl md:text-9xl font-black text-white/5 tracking-tighter leading-none select-none">02</span>
             <div>
                <h2 className="text-sm tracking-[0.3em] uppercase text-teal-400 font-bold mb-4 font-mono">The Arsenal</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Digital Tooling.</h3>
             </div>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {TECHNICAL_ARSENAL.map((tech, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUpVariant} 
                className="relative group p-10 rounded-[2.5rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 hover:border-white/20 transition-all duration-700 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-black/50 border border-white/5 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 ${tech.color}`}>
                    {tech.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">{tech.category}</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {tech.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="px-4 py-2 text-sm font-mono rounded-xl bg-black/60 border border-white/5 text-slate-400 group-hover:text-slate-300 transition-colors">
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

      {/* --- THE CRUCIBLE (TRACK RECORD) --- */}
      <section className="relative z-10 py-32 px-6 bg-[#020202]/50 border-t border-white/[0.03]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-24 flex flex-col md:flex-row md:items-end gap-6">
             <span className="text-8xl md:text-9xl font-black text-white/5 tracking-tighter leading-none select-none">03</span>
             <div>
                <h2 className="text-sm tracking-[0.3em] uppercase text-purple-400 font-bold mb-4 font-mono">The Crucible</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Execution.</h3>
             </div>
          </div>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-8 md:before:ml-10 before:-translate-x-px before:h-full before:w-[2px] before:bg-gradient-to-b before:from-indigo-500/50 before:via-teal-500/20 before:to-transparent">
            {/* Using an inline array for the track record items to keep the component clean */}
            {[
              { year: "2025", title: "Xalkadoon Fikircamp Winner", desc: "Architected 'Biyo Kaab', an IoT water management solution with a real-time cloud dashboard within a 48-hour sprint." },
              { year: "2024", title: "Innovate Uganda", desc: "Engineered secure, cross-border digital payment infrastructure using advanced Flutter architectures." },
              { year: "2024", title: "Ethiopia DevFest", desc: "Built a GCP serverless application designed to handle sudden, massive algorithmic stress tests." }
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="relative flex items-start gap-8 group">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#050505] border-2 border-white/10 shrink-0 z-10 group-hover:border-indigo-400 transition-colors duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  <Trophy className="w-6 h-6 text-slate-500 group-hover:text-indigo-400 transition-colors duration-500" />
                </div>
                <div className="pt-2 pb-10">
                  <span className="inline-block px-3 py-1 text-xs font-bold font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-md mb-4">{item.year}</span>
                  <h4 className="text-2xl font-bold text-white mb-3 tracking-tight">{item.title}</h4>
                  <p className="text-slate-400 text-lg leading-relaxed font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// --- MICRO COMPONENTS ---

function HeroMeta({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="flex flex-col space-y-3 border-l border-white/10 pl-5">
      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">{label}</p>
      <div className="flex items-center text-slate-200 font-medium text-sm md:text-base">
        <span className="mr-3 opacity-80">{icon}</span>{value}
      </div>
    </div>
  );
}