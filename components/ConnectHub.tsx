import React from "react";

const socials = [
  { 
    name: "LinkedIn", 
    link: "https://so.linkedin.com/in/mubarik-osman-abdi-5616712a3", 
    icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>,
    color: "text-[#0A66C2]"
  },
  { 
    name: "GitHub", 
    link: "https://github.com/Siciid09/", 
    icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>,
    color: "text-slate-800 dark:text-white"
  },
  { 
    name: "Instagram", 
    link: "#", 
    icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>,
    color: "text-[#E1306C]"
  },
  { 
    name: "Facebook", 
    link: "https://www.facebook.com/jamaala.diin/", 
    icon: <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>,
    color: "text-[#1877F2]"
  },
  { 
    name: "Behance", 
    link: "https://www.behance.net/mubarakosman3", 
    icon: <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>,
    color: "text-[#1769FF]"
  },
  { 
    name: "Dribbble", 
    link: "#", 
    icon: <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm9.957 10.151c-2.316-.685-4.887-1.026-7.466-.99-1.282-2.73-2.861-5.311-4.707-7.669 4.793.858 8.653 4.298 10.36 8.784.581-.036 1.181-.082 1.813-.125zm-2.072 6.002c-1.391-1.025-2.951-1.89-4.646-2.569 1.157-3.292 2.034-6.732 2.613-10.264 2.99 1.818 5.093 4.888 5.669 8.441-1.203.882-2.41 1.942-3.636 4.392zm-5.733 6.097c-.931.258-1.921.411-2.946.44-2.86-.062-5.556-1.082-7.728-2.912 2.618-1.463 5.568-2.186 8.549-2.102 1.055 2.503 1.802 5.158 2.125 7.914l-.001-.001zm-3.208-8.835c-2.946-.225-5.912.42-8.629 1.874-.836-2.483-.69-5.234.407-7.616 2.378.895 4.872 1.455 7.424 1.666-.34 2.093-.728 4.184-1.202 6.273v-.001zm-4.743-9.589c2.146-2.775 5.378-4.662 9.071-5.074 1.776 2.298 3.328 4.821 4.597 7.502-3.376.126-6.726.657-9.984 1.583-1.332-1.503-2.612-3.056-3.83-4.654l.146.643z"/>,
    color: "text-[#EA4C89]"
  }
];

export default function ConnectHub() {
  return (
    <section className="pt-16 pb-8 relative z-10 bg-[#050505]">
      
      {/* Background Dark Purple Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full max-w-[800px] max-h-[400px] bg-[#3B1C74] opacity-20 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white">
          Connect <span className="text-[#5B4DF5]">Hub</span>
        </h2>
        
        {/* Socials Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {socials.map((social, i) => (
            <a 
              key={i} 
              href={social.link} 
              target="_blank" 
              rel="noreferrer" 
              // The parent container requires overflow-hidden and relative positioning
              // p-[2px] creates the "border width" where the gradient shines through
              className="group relative p-[2px] rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300"
            >
              {/* 
                This is the animated rotating gradient! 
                It sits behind the card and is scaled to 200% so the edges spin seamlessly.
              */}
              <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_40%,#EC4899_70%,#14B8A6_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2s_linear_infinite] transition-opacity duration-300" />
              
              {/* Inner Solid Card */}
              <div className="relative z-10 flex flex-col items-center justify-center h-[140px] w-full bg-[#0a0a0a] rounded-[14px]">
                <svg className={`w-10 h-10 mb-3 ${social.color}`} fill="currentColor" viewBox="0 0 24 24">
                  {social.icon}
                </svg>
                <span className="font-bold text-white text-sm">{social.name}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}