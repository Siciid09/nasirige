export default function Workflow() {
  const steps = [
    { num: "01", title: "Discovery & Strategy", desc: "Defining the scope, user personas, and core technical requirements." },
    { num: "02", title: "Design & Architecture", desc: "High-fidelity UI prototyping and robust database schema design." },
    { num: "03", title: "Agile Development", desc: "Clean code sprints with continuous integration and regular testing." },
    { num: "04", title: "Launch & Scale", desc: "Cloud deployment via AWS/Vercel and infrastructure scaling." },
  ];

  return (
    <section className="py-24 relative z-10 bg-white dark:bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Timeline */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-slate-900 dark:text-white">
              My Engineering <br /><span className="text-indigo-600 dark:text-indigo-500">Workflow.</span>
            </h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-white/10 before:to-transparent">
              {steps.map((step, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white dark:border-[#050505] bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {step.num}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 group-hover:border-indigo-500/50 transition-colors">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{step.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Terminal Visual */}
          <div className="w-full lg:w-1/2 relative group perspective-1000">
            <div className="absolute inset-0 bg-indigo-500/20 blur-[80px] rounded-full" />
            <div className="relative z-10 bg-[#0A0A0A] rounded-3xl border border-white/10 shadow-2xl overflow-hidden transform-gpu transition-transform duration-700 hover:rotate-y-6 hover:rotate-x-6">
              {/* Terminal Header */}
              <div className="flex items-center px-4 py-3 border-b border-white/5 bg-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto text-xs font-mono text-slate-500">terminal@mubarik:~/workflow</div>
              </div>
              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm md:text-base space-y-4">
                <div className="flex gap-3"><span className="text-green-500">➜</span><span className="text-slate-300">git init project-alpha</span></div>
                <div className="flex gap-3"><span className="text-green-500">➜</span><span className="text-slate-300">npm install scalability</span></div>
                <div className="flex gap-3"><span className="text-green-500">➜</span><span className="text-slate-300">running tests... <span className="text-green-400">PASS</span></span></div>
                <div className="flex gap-3"><span className="text-green-500">➜</span><span className="text-slate-300">deploying to production...</span></div>
                <div className="mt-6 p-4 bg-green-500/10 border-l-2 border-green-500 rounded-r">
                  <p className="text-green-400">Success! Project is live 🚀</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}