import React from "react";

// Bento Grid Data Structure
// colSpan and rowSpan allow us to create the asymmetrical grid look
const expertiseData = [
  {
    name: "Next.js & React Ecosystem",
    category: "Frontend Architecture",
    description: "Building server-side rendered, highly optimized web applications with fluid state management.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    gradient: "from-blue-500/10 to-indigo-500/10",
    icon: (
      <svg className="w-10 h-10 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z" />
      </svg>
    )
  },
  {
    name: "Flutter & Dart",
    category: "Cross-Platform",
    description: "Compiling native performance mobile applications from a single codebase.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    gradient: "from-cyan-500/10 to-blue-500/10",
    icon: (
      <svg className="w-8 h-8 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    )
  },
  {
    name: "Cloud & Firebase",
    category: "Backend Infrastructure",
    description: "Designing real-time databases, authentication flows, and serverless functions.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-2",
    gradient: "from-orange-500/10 to-red-500/10",
    icon: (
      <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      </svg>
    )
  },
  {
    name: "UI/UX & Figma",
    category: "Design Strategy",
    description: "Prototyping responsive, aesthetic, and user-centric interfaces.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    gradient: "from-pink-500/10 to-purple-500/10",
    icon: (
      <svg className="w-8 h-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.965 1.178c0 1.657 1.343 3 3 3a3 3 0 002.965-3.535l1.455-1.455c1.178.614 2.656.402 3.585-.528l4.47-4.47a3.001 3.001 0 00-4.243-4.243l-4.47 4.47c-.93.93-1.142 2.407-.528 3.585l-1.455 1.455z" />
      </svg>
    )
  }
];

export default function Expertise() {
  return (
    <section id="skills" className="py-24 relative z-10 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white tracking-tight">
            The <span className="text-indigo-600 dark:text-indigo-500">Arsenal</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            A comprehensive, modern toolkit allowing for total control over the software development lifecycle.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {expertiseData.map((item, index) => (
            <div 
              key={index}
              className={`
                group relative bg-slate-50 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-white/10 
                overflow-hidden p-8 flex flex-col justify-between transition-all duration-300 hover:border-indigo-500/50 
                hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10
                ${item.colSpan} ${item.rowSpan}
              `}
            >
              {/* Dynamic Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex justify-between items-start">
                <div className="p-3 rounded-2xl bg-white dark:bg-black/20 shadow-sm border border-slate-100 dark:border-white/5">
                  {item.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  {item.category}
                </span>
              </div>

              <div className="relative z-10 mt-auto pt-6">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {item.name}
                </h3>
                {/* Only show descriptions on larger spans for cleaner UI on small blocks */}
                {item.rowSpan.includes("2") && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-[90%]">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}