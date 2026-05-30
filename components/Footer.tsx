import React from "react";
import Link from "next/link";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-white/10 overflow-hidden pt-24 pb-12 transition-colors z-10">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-indigo-500/20 dark:bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Infinite CSS Marquee */}
      <div className="relative w-full flex overflow-hidden whitespace-nowrap mb-16 select-none pointer-events-none opacity-10 dark:opacity-20">
        <div className="animate-[marquee_30s_linear_infinite] flex items-center">
          <span className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter px-8 text-slate-900 dark:text-white">
            MUBARIK
          </span>
          <span className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter px-8 text-slate-900 dark:text-white">
            MUBARIK
          </span>
          <span className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter px-8 text-slate-900 dark:text-white">
            MUBARIK
          </span>
          <span className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter px-8 text-slate-900 dark:text-white">
            MUBARIK
          </span>
        </div>
        {/* Absolute duplicate for seamless looping */}
        <div className="absolute top-0 animate-[marquee2_30s_linear_infinite] flex items-center">
           <span className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter px-8 text-slate-900 dark:text-white">
            MUBARIK
          </span>
          <span className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter px-8 text-slate-900 dark:text-white">
            MUBARIK
          </span>
          <span className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter px-8 text-slate-900 dark:text-white">
            MUBARIK
          </span>
          <span className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter px-8 text-slate-900 dark:text-white">
            MUBARIK
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Core Info Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 text-center md:text-left">
          <div>
            <h2 className="text-sm md:text-lg font-bold text-indigo-600 dark:text-indigo-400 tracking-[0.5em] uppercase mb-2">
              Strategist | Innovator | Builder
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              Fusing data intelligence with high-end design to create scalable software that drives real growth.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2">
            <a 
              href="mailto:info@mubarikosman.com" 
              className="text-lg md:text-xl font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              info@mubarikosman.com
            </a>
            <a 
              href="tel:+252633227084" 
              className="text-sm font-bold tracking-widest text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors"
            >
              +252 63 3227084
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-t border-slate-200 dark:border-white/10 pt-8">
          
          <div className="text-center md:text-left">
            <p className="text-slate-500 text-sm font-medium">
              &copy; {currentYear} Mubarik Osman.<br className="md:hidden" /> All rights reserved.
            </p>
          </div>
          
          {/* Social Links (Inline SVGs for zero dependencies) */}
          <div className="flex justify-center gap-6">
            <a href="https://so.linkedin.com/in/mubarik-osman-abdi-5616712a3" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#0A66C2] transition-colors" aria-label="LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://github.com/Siciid09/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="GitHub">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://www.behance.net/mubarakosman3" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#1769FF] transition-colors" aria-label="Behance">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/></svg>
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-slate-500 text-sm">
              Designed <span className="text-red-500 dark:text-red-400">with strategy</span>
            </p>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/252633227084" // I pre-filled your number from your footer!
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:scale-110 hover:shadow-[#25D366]/50 transition-all duration-300 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse Ring Animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 animate-ping"></span>
        
        {/* WhatsApp SVG Icon */}
        <svg 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-8 h-8 md:w-9 md:h-9 relative z-10"
        >
          <path d="M12.031 0C5.383 0 0 5.383 0 12.031c0 2.658.857 5.12 2.361 7.147L.427 24l5.006-1.921A11.968 11.968 0 0012.031 24c6.648 0 12.031-5.383 12.031-12.031S18.679 0 12.031 0zm3.834 17.153c-.161.458-.934.872-1.353.916-.403.042-.924.133-3.149-.789-2.678-1.11-4.385-3.832-4.516-4.008-.131-.176-1.077-1.433-1.077-2.733s.68-1.954.915-2.204c.236-.251.512-.314.68-.314s.336 0 .487.008c.162.008.381-.061.597.458.216.519.743 1.815.808 1.946.066.131.109.284.026.449-.083.165-.126.268-.251.413-.126.145-.264.307-.378.414-.126.118-.259.248-.118.492.142.244.63 1.042 1.356 1.691.942.843 1.724 1.104 1.96 1.222.236.118.375.099.514-.06.14-.158.599-.698.761-.938.161-.24.321-.2.535-.118.214.083 1.352.637 1.583.753.232.116.386.173.442.27.056.097.056.561-.105 1.019z"/>
        </svg>
      </a>
    </footer>
  );
}