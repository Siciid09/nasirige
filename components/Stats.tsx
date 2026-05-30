export default function Stats() {
  const stats = [
    { number: "100+", label: "Certifications" },
    { number: "40+", label: "Technical Skills" },
    { number: "5+", label: "Years Experience" },
    { number: "100%", label: "Project Success" },
  ];

  return (
    <section className="py-16 relative z-10 border-y border-slate-200 dark:border-white/10 bg-white dark:bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-slate-200 dark:divide-white/10">
          {stats.map((stat, index) => (
            <div key={index} className="text-center px-4">
              <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-400 mb-2">
                {stat.number}
              </h3>
              <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}