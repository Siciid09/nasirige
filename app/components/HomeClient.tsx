'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { saveFormData } from '../../lib/firebase';
import { client } from '@/sanity/lib/client'; 
import imageUrlBuilder from '@sanity/image-url';

// --- IMAGE HELPER ---
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  if (!source) return null;
  if (typeof source === 'string') return source;
  if (source.url && typeof source.url === 'string') return source.url;
  try {
      if (source.upload) return builder.image(source.upload).url();
      if (source.asset) return builder.image(source).url();
      return builder.image(source).url();
  } catch (e) {
      return null;
  }
}

// 🟢 NEW: HELPER TO FORMAT TITLE DYNAMICALLY
const formatHeroTitle = (title: string) => {
  if (!title) return { main: "Maskax Cusub", highlight: "Mustaqbal Ifaya" };
  const words = title.split(" ");
  // Logic: If 3 or more words, first 2 are black. If 2 words, only first 1 is black.
  const splitIndex = words.length >= 3 ? 2 : 1;
  const mainPart = words.slice(0, splitIndex).join(" ");
  const highlightPart = words.slice(splitIndex).join(" ");
  return { main: mainPart, highlight: highlightPart };
};

export default function HomeClient({ data }: { data: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentAdvisor, setCurrentAdvisor] = useState(0);
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('idle');

  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ months: 0, days: 0, hours: 0 });

  useEffect(() => {
    if (!data?.electionDate) return;
    const calculateTimeLeft = () => {
      const targetDate = new Date(data.electionDate); 
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference > 0) {
        let years = targetDate.getFullYear() - now.getFullYear();
        let months = targetDate.getMonth() - now.getMonth();
        let days = targetDate.getDate() - now.getDate();
        let hours = targetDate.getHours() - now.getHours();
        if (hours < 0) { hours += 24; days--; }
        if (days < 0) {
          const previousMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
          days += previousMonth.getDate();
          months--;
        }
        if (months < 0) { months += 12; years--; }
        const totalMonths = (years * 12) + months;
        setTimeLeft({ months: totalMonths, days: days, hours: hours });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    AOS.init({ once: true, offset: 50, duration: 600 });

    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    const moveCursor = (e: MouseEvent) => {
        if(cursorDot && cursorOutline) {
            cursorDot.style.left = `${e.clientX}px`; 
            cursorDot.style.top = `${e.clientY}px`;
            cursorOutline.style.left = `${e.clientX}px`; 
            cursorOutline.style.top = `${e.clientY}px`;
        }
    };
    window.addEventListener('mousemove', moveCursor);
    
    let interval: NodeJS.Timeout;
    if(data?.advisors?.length > 0) {
        interval = setInterval(() => {
            setCurrentAdvisor((prev) => (prev + 1) % data.advisors.length);
        }, 5000);
    }
    return () => { 
        window.removeEventListener('mousemove', moveCursor); 
        clearInterval(timer); 
        clearInterval(interval); 
    };
  }, [data]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!email) return;
    setFormStatus('loading');
    try {
        const res = await saveFormData('subscribers', { email });
        setFormStatus(res.success ? 'success' : 'error');
        if(res.success) setEmail('');
    } catch (err) {
        setFormStatus('error');
    }
  };

  const addToCart = (product: any) => setCart([...cart, product]);

  // 🟢 APPLY TITLE LOGIC
  const { main, highlight } = formatHeroTitle(data?.heroTitle);

  if (!data) return null;

  return (
    <div className="font-sans text-slate-800 bg-white overflow-x-hidden">
      
      <style jsx global>{`
        body { cursor: none; }
        a, button, input, .cursor-pointer { cursor: none; }
        .cursor-dot { width: 8px; height: 8px; background-color: #4189DD; border-radius: 50%; position: fixed; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%); transition: width 0.2s, height 0.2s; }
        .cursor-outline { width: 40px; height: 40px; border: 1px solid rgba(65, 137, 221, 0.5); border-radius: 50%; position: fixed; pointer-events: none; z-index: 9998; transform: translate(-50%, -50%); transition: left 0.1s, top 0.1s; }
        .timeline-wavy-horizontal { position: absolute; top: 50%; transform: translateY(-50%); left: 0; right: 0; height: 20px; background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 0 50 10 Q 75 20 100 10' stroke='%23e2e8f0' stroke-width='2' fill='none'/%3E%3C/svg%3E"); background-repeat: repeat-x; }
        .glass-card { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); }
        .glass-card-dark { background: linear-gradient(135deg, #0c2448 0%, #0f346b 100%); position: relative; overflow: hidden; }
        .shape1 {position:absolute; top:0; right:0; width:55%; height:50%; background:rgba(0,0,0,0.25); filter:blur(18px); border-bottom-left-radius:300px;}
        .shape2 {position:absolute; top:28%; right:-4%; width:60%; height:55%; background:rgba(0,0,0,0.28); filter:blur(18px); border-top-left-radius:300px;}
        .font-header { font-family: 'Georgia', serif; }
        .animated-gradient-bg { background: linear-gradient(270deg, #0a1f44, #4189DD, #0c2448, #0a1f44); background-size: 800% 800%; animation: moveGradient 10s ease infinite; }
        @keyframes moveGradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { animation: scroll 20s linear infinite; }
      `}</style>

      <style dangerouslySetInnerHTML={{__html: `
        .snake-line-animated { stroke-dasharray: 350; stroke-dashoffset: 350; animation: drawSnake 3s ease-in-out infinite alternate; }
        @keyframes drawSnake { from { stroke-dashoffset: 350; } to { stroke-dashoffset: 0; } }
        .particle { position: absolute; background: rgba(65, 137, 221, 0.3); border-radius: 50%; filter: blur(2px); animation: floatUp linear infinite; bottom: -50px; z-index: 1; pointer-events: none; }
        @keyframes floatUp { 0% { transform: translateY(0) scale(1); opacity: 0; } 20% { opacity: 0.6; } 80% { opacity: 0.6; } 100% { transform: translateY(-120vh) scale(1.5); opacity: 0; } }
      `}} />

      <div className="cursor-dot hidden md:block" id="cursor-dot"></div>
      <div className="cursor-outline hidden md:block" id="cursor-outline"></div>
      <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-brand-somalia text-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand-dark hover:scale-110 transition cursor-pointer"><i className="fa-solid fa-arrow-up"></i></button>

      {/* --- HEADER --- */}
      <div className="custom-header-style">
        <header className="fixed w-full top-0 left-0 z-50 bg-[#0c2448] py-7 shadow-xl transition-all">
          <div className="w-[96%] mx-auto flex justify-between items-center text-white">
            <div className="text-[28px] font-bold tracking-[1px] cursor-pointer font-header" onClick={() => window.scrollTo(0,0)}>
                Nasir Ige.
            </div>
            
            <nav className="hidden md:flex items-center gap-[35px]">
              <ul className="flex gap-[35px] list-none m-0">
                {data.navLinks && data.navLinks.length > 0 ? (
                    data.navLinks.map((item: any, idx: number) => (
                        <li key={idx}><Link href={item.url || '#'} className="text-[18px] font-medium hover:text-[#4189DD] transition font-header no-underline text-white">{item.label}</Link></li>
                    ))
                ) : (
                    ['About', 'Advisors', 'Issues', 'Journey', 'News'].map(i => <li key={i}><Link href={`#${i.toLowerCase()}`} className="text-[18px] text-white hover:text-[#4189DD] transition font-header">{i}</Link></li>)
                )}
              </ul>
              <div className="relative group cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
                <i className="fa-solid fa-cart-shopping text-xl hover:text-[#4189DD] transition"></i>
                {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">{cart.length}</span>}
                {isCartOpen && <div className="absolute top-full right-0 mt-4 w-64 bg-white text-slate-800 shadow-2xl rounded-lg p-4 z-[100] border border-slate-100"><h4 className="font-bold border-b pb-2 mb-2 text-sm">Cart</h4><div className="text-xs">{cart.length} items</div><Link href="/shop" className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded block text-center mt-2">View</Link></div>}
              </div>
            </nav>

            <div className="md:hidden flex items-center gap-6">
                <div className="cursor-pointer flex flex-col gap-1.5" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                   <div className="w-[30px] h-[3px] bg-white rounded-[2px]"></div><div className="w-[30px] h-[3px] bg-white rounded-[2px]"></div><div className="w-[30px] h-[3px] bg-white rounded-[2px]"></div>
                </div>
            </div>
          </div>
          {isMenuOpen && (
             <div className="bg-[#0c2448] absolute top-full left-0 w-full p-6 flex flex-col gap-4 text-white md:hidden shadow-2xl border-t border-white/10">
                {data.navLinks?.map((item: any, idx: number) => (
                    <Link key={idx} href={item.url || '#'} onClick={() => setIsMenuOpen(false)} className="text-xl font-header block py-2">{item.label}</Link>
                ))}
             </div>
          )}
        </header>
      </div>

      {/* --- HERO --- */}
      <div className="bg-[#0c2448] text-white min-h-screen pt-[120px] pb-[0px] relative overflow-hidden flex items-end font-header">
          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Somalia.svg')] opacity-20 mix-blend-overlay bg-no-repeat bg-center z-0 scale-[1.8] -translate-y-10 pointer-events-none"></div>
          
          <div className="particle w-2 h-2 left-[5%]" style={{ animationDuration: '15s' }}></div>
          <div className="particle w-4 h-4 left-[12%]" style={{ animationDuration: '25s' }}></div>
          <div className="particle w-2 h-2 left-[55%]" style={{ animationDuration: '27s' }}></div>
          
          <div className="shape1"></div><div className="shape2"></div>
          <section className="w-[98%] max-w-[1800px] mx-auto flex flex-col lg:flex-row items-end justify-between relative z-10 h-full">
              <div className="flex-1 flex flex-col justify-center text-center lg:text-left mb-10 lg:mb-0 lg:self-center lg:pb-32 pl-4 lg:pl-10 relative z-50" data-aos="fade-right">
                  <div className="text-[13px] font-bold tracking-[4px] opacity-80 mb-2 text-blue-300 uppercase font-sans">{data.heroTag}</div>
                  <div className="relative inline-block">
                      {/* 🟢 DYNAMIC TITLE SPLIT LOGIC */}
                      <h1 className="text-[50px] lg:text-[80px] leading-[0.9] font-black font-header text-white drop-shadow-2xl relative z-10 tracking-tight">
                          {main} <br /><span className="text-[#4189DD] italic">{highlight}</span>
                      </h1>
                      <svg className="absolute -bottom-8 -left-2 w-[110%] h-[140px] -z-0 pointer-events-none opacity-70" viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10,80 C100,150 180,50 320,90" stroke="#4189DD" strokeWidth="10" strokeLinecap="round" className="snake-line-animated" />
                      </svg>
                  </div>
              </div>
              <div className="flex-1 flex justify-center items-end relative z-20" data-aos="zoom-in">
                  {/* 🟢 ADDED object-top TO FIX HEAD CROPPING */}
                  {urlFor(data.heroImage) && <img src={urlFor(data.heroImage)!} className="w-auto h-[50vh] lg:h-[85vh] object-contain object-top scale-110 origin-bottom relative translate-y-[7%]" alt="Candidate" style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)' }} />}
              </div>
              <div className="flex-1 flex flex-col justify-center text-center lg:text-left mb-20 lg:mb-0 lg:self-center lg:pb-2 pr-4 lg:pr-10 pl-0 lg:pl-12 relative z-50" data-aos="fade-left">
                  <div className="max-w-[500px] mx-auto lg:mx-0">
                    <div className="relative lg:pl-6 space-y-5">
                      <div className="hidden lg:block absolute left-0 top-0 w-[4px] h-full bg-[linear-gradient(to_bottom,#3b82f6_75%,transparent_100%)]"></div>
                      <p className="text-[20px] lg:text-[24px] leading-tight font-bold text-white">{data.heroQuoteSomali}</p>
                      <div className="text-[15px] lg:text-[16px] text-blue-200 font-sans leading-relaxed opacity-90">{data.heroQuoteEnglish}</div>
                    </div>
                  </div>
              </div>
          </section>
      </div>

      {/* --- COUNTDOWN --- */}
      <section className="py-12 md:py-16 relative overflow-hidden animated-gradient-bg">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left" data-aos="fade-right">
                <h3 className="text-white/80 font-serif text-lg uppercase tracking-[0.2em] mb-2">The Path to Sovereignty</h3>
                <h2 className="text-4xl md:text-5xl font-bold text-white font-serif">Election Day 2026</h2>
                <p className="text-blue-200 text-xs mt-2">Target: {data.electionDate ? new Date(data.electionDate).toDateString() : 'May 15, 2026'}</p>
            </div>
            <div className="flex gap-3 md:gap-5" data-aos="zoom-in">
                {['Months', 'Days', 'Hours'].map((label, i) => (
                    <div key={label} className="glass-card p-6 rounded-xl flex flex-col items-center justify-center w-28 md:w-32 hover:-translate-y-2 transition duration-300">
                        <span className="block text-4xl md:text-5xl font-bold text-white mb-1 leading-none">{i === 0 ? timeLeft.months : i === 1 ? timeLeft.days : timeLeft.hours}</span>
                        <span className="text-xs uppercase text-blue-200">{label}</span>
                    </div>
                ))}
            </div>
            <div data-aos="fade-left">
                <a href={data.countdownLink || '#'} target="_blank" rel="noopener noreferrer" className="bg-white text-[#0c2448] px-8 py-4 rounded-full font-bold hover:bg-brand-dark hover:text-white transition shadow-lg flex items-center gap-2">
                    JOIN THE NETWORK <i className="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        </div>
      </section>

      {/* --- ACTION CARDS --- */}
      <section className="relative z-20 md:-mt-12 mb-12 md:mb-20 pt-12 md:pt-0">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {data.actionCards?.map((card: any, i: number) => (
                    <div key={i} className={`${card.color === 'blue' ? 'bg-brand-blue text-white' : 'bg-white border-t-4 border-brand-blue'} p-8 shadow-xl rounded-sm hover:-translate-y-2 transition duration-300`}>
                        <i className={`${card.icon} text-3xl mb-4 ${card.color === 'blue' ? 'text-white' : 'text-brand-blue'}`}></i>
                        <h3 className={`font-serif font-bold text-lg mb-2`}>{card.title}</h3>
                        <p className={`text-xs ${card.color === 'blue' ? 'text-blue-100' : 'text-slate-500'}`}>{card.subtitle}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- PRIORITIES (CHECKERBOARD FIXED) --- */}
      <section className="py-12 md:py-16 bg-white" id="priority">
         <div className="container mx-auto px-6 text-center mb-10 md:mb-16">
            <p className="text-brand-somalia uppercase text-xs font-bold tracking-widest mb-2">Our Priority</p>
            <h2 className="text-4xl font-serif font-bold text-brand-dark">{data.prioritiesTitle}</h2>
        </div>
        <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-slate-100">
             {data.priorities?.map((item: any, i: number) => (
                 <div key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-[#e6f0ff]'} p-10 hover:scale-105 transition duration-300 group border-b border-r border-slate-100`} data-aos="fade-up">
                    <div className="text-brand-somalia text-3xl mb-4"><i className={item.icon}></i></div>
                    <h3 className="font-serif font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                 </div>
             ))}
        </div>
      </section>

      {/* --- ABOUT (SIGNATURE & QUOTE FIXED) --- */}
      <section className="py-12 md:py-16" id="about">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
                <div className="bg-gray-200 p-4 pb-24 rounded-sm relative overflow-hidden">
                    {/* 🟢 ADDED object-top */}
                    {urlFor(data.aboutImage) && <img src={urlFor(data.aboutImage)!} className="w-full object-cover object-top h-[500px] grayscale hover:grayscale-0 transition duration-500" alt="About" />}
                   
                        <div className="absolute bottom-8 left-8 right-8 bg-white p-6 shadow-xl border-l-4 border-blue-600 rounded-r-lg z-10">
                            <div className="flex items-center gap-2">
                                <div className="h-0.5 w-8 bg-blue-600"></div>
                                <p className="text-xs font-bold text-blue-800 uppercase tracking-widest">{data.aboutQuote}</p>
                            </div>
                        </div>
 {/* ... inside the About Section ... */}
{data.aboutQuote && (
    <div className="absolute bottom-8 left-8 right-8 bg-white p-6 shadow-xl border-l-4 border-blue-600 rounded-r-lg z-10">
        
        {/* 1. THE QUOTE (Italic & Gray) */}
        <p className="text-sm text-slate-600 italic mb-3">
            "{data.aboutQuote}"
        </p>

        {/* 2. THE SIGNATURE (Blue & Uppercase) */}
        <div className="flex items-center gap-2">
             <div className="h-0.5 w-8 bg-blue-600"></div>
             <p className="text-xs font-bold text-blue-800 uppercase tracking-widest">
                 Nasir Ige {/* You can change this name here if you want */}
             </p>
        </div>

    </div>
)}                   
                </div>
            </div>
            <div>
                <p className="text-blue-600 uppercase text-xs font-bold tracking-widest mb-2">Our Vision</p>
                <h2 className="text-4xl font-serif font-bold text-brand-dark mb-6">{data.visionTitle}</h2>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8 shadow-sm">
                    <i className="fa-solid fa-quote-left text-blue-200 text-3xl mb-2 block"></i>
                    <p className="text-slate-700 leading-relaxed text-lg font-serif italic">{data.visionText}</p>
                </div>
                {/* 🟢 RESTORED SIGNATURE */}
                <p className="text-black inline-block border-b-2 border-blue-600 pb-1 text-xs font-bold tracking-wide uppercase">
                    {data.aboutSignature}
                </p>
            </div>
        </div>
      </section>

      {/* --- TIMELINE --- */}
      <section className="py-12 md:py-16 bg-white relative" id="timeline">
        <div className="container mx-auto px-6 text-center mb-10 md:mb-16" data-aos="fade-down">
             <p className="text-blue-600 uppercase text-xs font-bold tracking-widest mb-2">The Journey</p>
             <h2 className="text-4xl font-serif font-bold text-brand-dark">{data.timelineTitle}</h2>
        </div>
        <div className="relative max-w-6xl mx-auto">
             
             {/* MOBILE */}
             <div className="lg:hidden relative py-4">
                 <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2"></div>
                 <div className="flex flex-col relative z-10 w-full">
                    {data.timeline?.map((item: any, i: number) => (
                        <div key={i} className="flex w-full justify-between items-center mb-8 relative">
                             {i % 2 === 0 ? (
                                <>
                                    <div className="w-[45%] text-right pr-6" data-aos="fade-right">
                                        <h3 className="text-lg font-bold text-brand-dark">{item.year}</h3>
                                        <p className="text-slate-600 text-xs mt-1">{item.desc}</p>
                                        <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded">{item.tag}</span>
                                    </div>
                                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-somalia rounded-full border-4 border-white shadow-lg z-20"></div>
                                    <div className="w-[45%] pl-6"></div>
                                </>
                             ) : (
                                <>
                                    <div className="w-[45%] pr-6"></div>
                                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-dark rounded-full border-4 border-white shadow-lg z-20"></div>
                                    <div className="w-[45%] text-left pl-6" data-aos="fade-left">
                                        <h3 className="text-lg font-bold text-brand-dark">{item.year}</h3>
                                        <p className="text-slate-600 text-xs mt-1">{item.desc}</p>
                                        <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded">{item.tag}</span>
                                    </div>
                                </>
                             )}
                        </div>
                    ))}
                 </div>
             </div>
             
             {/* DESKTOP */}
             <div className="hidden lg:block relative w-full">
                 <div className="timeline-wavy-horizontal"></div>
                 <div className="flex justify-between items-center relative z-10 w-full">
                    {data.timeline?.map((item: any, i: number) => (
                        <div key={i} className="flex flex-col items-center group">
                           {i % 2 === 0 ? (
                               <>
                                <div className="h-24 flex flex-col justify-end items-center mb-4" data-aos="fade-down">
                                    <h3 className="text-lg font-bold text-brand-dark">{item.year}</h3>
                                    <p className="text-slate-600 text-xs mt-1">{item.desc}</p>
                                </div>
                                <div className="w-4 h-4 bg-brand-somalia rounded-full border-4 border-white shadow-lg z-10"></div>
                                <div className="h-24 flex flex-col justify-start items-center mt-4" data-aos="fade-up">
                                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded">{item.tag}</span>
                                </div>
                               </>
                           ) : (
                               <>
                                <div className="h-24 flex flex-col justify-end items-center mb-4" data-aos="fade-down">
                                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded">{item.tag}</span>
                                </div>
                                <div className="w-4 h-4 bg-brand-dark rounded-full border-4 border-white shadow-lg z-10"></div>
                                <div className="h-24 flex flex-col justify-start items-center mt-4" data-aos="fade-up">
                                    <h3 className="text-lg font-bold text-brand-dark">{item.year}</h3>
                                    <p className="text-slate-600 text-xs mt-1">{item.desc}</p>
                                </div>
                               </>
                           )}
                        </div>
                    ))}
                 </div>
             </div>
        </div>
      </section>

      {/* --- GALLERY --- */}
      <section className="py-12 md:py-16 bg-brand-dark text-white" id="gallery">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
                <div data-aos="fade-right">
                    <p className="text-blue-400 uppercase text-xs font-bold tracking-widest mb-2">Our Journey</p>
                    <h2 className="text-4xl font-serif font-bold">Moments of Unity</h2>
                </div>
                {data.galleryLink && <a href={data.galleryLink} target="_blank" className="text-xs font-bold tracking-widest border-b border-blue-400 pb-1 hover:text-blue-400 transition mt-6 md:mt-0 text-left md:text-right" data-aos="fade-left">FOLLOW ON INSTAGRAM</a>}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 h-auto">
                 {data.galleryImages?.map((img: any, i: number) => {
                     const isLarge = i === 0;
                     const isMedium = i === 5 || i === 8;
                     const colSpan = isLarge || isMedium ? 'col-span-2' : 'col-span-1';
                     const rowSpan = isLarge ? 'row-span-2' : '';
                     const height = isLarge ? 'h-80' : 'h-40';
                     return (
                        <div key={i} className={`${colSpan} ${rowSpan} relative group overflow-hidden rounded-sm ${height}`}>
                            {urlFor(img) && <img src={urlFor(img)!} className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-60" />}
                        </div>
                     );
                 })}
            </div>
            {data.galleryQuote && <div className="text-center mt-8 px-4" data-aos="fade-up"><p className="text-lg italic font-serif opacity-80">"{data.galleryQuote}"</p></div>}
        </div>
      </section>

      {/* --- PARALLAX QUOTE (FIXED) --- */}
      {data.parallaxQuote && (
          <section className="py-20 relative flex items-center justify-center bg-fixed bg-cover bg-center" style={{ backgroundImage: `url('${urlFor(data.parallaxQuote.image)}')` }}>
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="container mx-auto px-6 relative z-10 text-center text-white" data-aos="zoom-in">
                <i className="fa-solid fa-quote-left text-4xl text-blue-400 mb-6 opacity-80"></i>
                <h2 className="text-3xl md:text-5xl font-serif italic leading-normal mb-8">"{data.parallaxQuote.text}"</h2>
                <p className="uppercase tracking-[0.2em] font-bold text-sm opacity-80">— {data.parallaxQuote.author}</p>
            </div>
          </section>
      )}

      {/* --- ADVISORS --- */}
      <section className="py-12 md:py-16 bg-white" id="advisors">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <p className="text-blue-600 uppercase text-xs font-bold tracking-widest mb-2">Strategic Advisory Council</p>
                    <h2 className="text-4xl font-serif font-bold text-brand-dark mb-6">{data.advisorsTitle}</h2>
                    <p className="text-slate-600 text-sm leading-relaxed mb-8">As an independent candidate, Nasir Ige is advised by a coalition of Somali intellectuals, elders, and technocrats.</p>
                    <div className="flex gap-2">
                        {data.advisors?.map((_: any, i: number) => (
                            <button key={i} onClick={() => setCurrentAdvisor(i)} className={`w-3 h-3 rounded-full transition-all duration-300 ${currentAdvisor===i ? 'bg-blue-600' : 'bg-gray-300 hover:bg-blue-400'}`}></button>
                        ))}
                    </div>
                </div>
                {data.advisors?.length > 0 && (
                    <div className="relative h-[400px] rounded-sm overflow-hidden bg-gray-200">
                        {/* 🟢 ADDED object-top */}
                        {urlFor(data.advisors[currentAdvisor].image) && <img src={urlFor(data.advisors[currentAdvisor].image)!} className="w-full h-full object-cover object-top transition-opacity duration-500" />}
                        <div className="absolute bottom-8 left-8 right-8 bg-white p-6 shadow-lg border-l-4 border-blue-600">
                            <p className="text-xs text-slate-600 italic mb-4">"{data.advisors[currentAdvisor].quote}"</p>
                            <p className="text-xs font-bold text-blue-800 uppercase">{data.advisors[currentAdvisor].name}</p>
                            <p className="text-[10px] text-slate-400">{data.advisors[currentAdvisor].role}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </section>

      {/* --- CAMPAIGN TRAIL --- */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                    <p className="text-blue-600 uppercase text-xs font-bold tracking-widest mb-2">Campaign Highlights</p>
                    <h2 className="text-4xl font-serif font-bold text-brand-dark">On The <span className="italic text-blue-600">Campaign Trail</span></h2>
                </div>
                <a href="#" className="mt-4 md:mt-0 text-sm font-bold text-brand-dark hover:text-blue-600 transition flex items-center gap-2">
                    VIEW ALL UPDATES <i className="fa-solid fa-arrow-right"></i>
                </a>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {data.trail?.map((ev: any, i: number) => (
                    <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group border border-slate-100">
                        <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400"></div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-xs font-bold tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">{ev.category}</span>
                                <span className="text-slate-400 text-xs font-semibold flex items-center gap-1"><i className="fa-regular fa-calendar"></i> {ev.date}</span>
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition leading-tight">{ev.title}</h3>
                            <p className="text-slate-500 text-sm mb-8 leading-relaxed line-clamp-3">{ev.desc}</p>
                            <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                                <span className="text-xs font-bold text-slate-500 flex items-center gap-2"><i className="fa-solid fa-location-dot text-blue-500"></i> {ev.location}</span>
                                {ev.videoUrl && <a href={ev.videoUrl} target="_blank" rel="noopener noreferrer" className="text-white bg-blue-600 hover:bg-blue-700 text-xs font-bold px-4 py-2 rounded-lg transition flex items-center gap-2 shadow-lg shadow-blue-200"><i className="fa-solid fa-play"></i> WATCH VIDEO</a>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-12 md:py-16 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6 text-center mb-12" data-aos="fade-up">
            <p className="text-brand-somalia uppercase text-xs font-bold tracking-widest mb-2">Testimonials</p>
            <h2 className="text-4xl font-serif font-bold text-brand-dark">Codka <span className="italic text-brand-somalia">Shacabka</span></h2>
        </div>
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-6">
            {data.testimonials?.map((t: any, i: number) => (
                <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:scale-105 transition duration-300">
                    <div className="flex items-center gap-4 mb-4">
                        {/* 🟢 ADDED object-top */}
                        {urlFor(t.image) && <img src={urlFor(t.image)!} className="w-12 h-12 rounded-full object-cover object-top" />}
                        <div><h4 className="font-bold text-brand-dark">{t.name}</h4><p className="text-xs text-slate-500">{t.role}</p></div>
                    </div>
                    <p className="text-sm text-slate-600 italic">"{t.text}"</p>
                </div>
            ))}
        </div>
      </section>

      {/* --- MANIFESTO --- */}
      <section className="py-12 md:py-16 bg-white border-y border-slate-100" id="manifesto">
        <div className="container mx-auto px-6">
            <div className="glass-card-dark animated-gradient-bg p-12 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden" data-aos="fade-up">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-somalia rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                <div className="flex-1 relative z-10">
                    <h3 className="text-3xl font-serif font-bold text-white mb-3">Read The Full Manifesto</h3>
                    <p className="text-blue-100 text-sm leading-relaxed max-w-lg">Transparency is our core value. Download our detailed strategic plans.</p>
                </div>
                <div className="flex gap-4 relative z-10">
                    {data.manifestoDownloads?.map((file: any, i: number) => (
                        <a key={i} href={file.fileUrl || file.externalLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white hover:text-brand-dark text-white transition group shadow-lg">
                            <i className={`${file.icon} text-2xl group-hover:scale-110 transition`}></i>
                            <div className="text-left"><span className="block text-[10px] font-bold uppercase opacity-70">Download</span><span className="block text-sm font-bold">{file.title}</span></div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* --- NEWS --- */}
      {data.newsSection && data.newsSection.length > 0 && (
          <section className="py-12 md:py-16 bg-slate-50" id="news">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-blue-600 uppercase text-xs font-bold tracking-widest mb-2">Media & Press</p>
                    <h2 className="text-4xl font-serif font-bold text-brand-dark inline-block border-b-2 border-blue-200 pb-2">Campaign Updates</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-auto md:h-[500px] mb-12">
                    {data.newsSection[0] && (
                        <Link href={`/news/${data.newsSection[0].slug?.current}`} className="relative h-[400px] md:h-full w-full overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer block">
                            {urlFor(data.newsSection[0].mainImage) && (
                                <img src={urlFor(data.newsSection[0].mainImage)!} alt={data.newsSection[0].title} className="absolute inset-0 w-full h-full object-cover object-top transition duration-700 group-hover:scale-105" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-95 transition"></div>
                            <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
                                <div className="flex items-center gap-3 mb-4">
                                     <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 uppercase rounded-sm tracking-wide">Featured</span>
                                     <span className="text-slate-300 text-xs font-semibold"><i className="fa-regular fa-calendar mr-1"></i> {new Date(data.newsSection[0].publishedAt).toLocaleDateString()}</span>
                                </div>
                                <h3 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight mb-3 group-hover:text-blue-400 transition">{data.newsSection[0].title}</h3>
                            </div>
                        </Link>
                    )}
                    <div className="flex flex-col gap-6 h-full">
                        {data.newsSection.slice(1, 3).map((news: any, i: number) => (
                            <Link key={i} href={`/news/${news.slug?.current}`} className="relative flex-1 overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white border border-slate-100 flex flex-row">
                                  <div className="w-1/3 relative overflow-hidden">
                                     {urlFor(news.mainImage) && <img src={urlFor(news.mainImage)!} className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" />}
                                     <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition"></div>
                                  </div>
                                  <div className="w-2/3 p-6 flex flex-col justify-center bg-white relative">
                                     <span className="text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-2">Latest</span>
                                     <h4 className="text-xl font-serif font-bold text-slate-800 mb-2 leading-snug group-hover:text-blue-700 transition line-clamp-2">{news.title}</h4>
                                     <span className="text-slate-400 text-[10px] mt-3 font-semibold">{new Date(news.publishedAt).toLocaleDateString()}</span>
                                  </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="text-center">
                    <a href="/news" className="inline-flex bg-brand-dark text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition shadow-lg items-center gap-3 text-sm tracking-wide">
                        READ ALL NEWS <i className="fa-solid fa-arrow-right-long"></i>
                    </a>
                </div>
            </div>
          </section>
      )}

      {/* --- MARQUEE --- */}
      {data.partners && data.partners.length > 0 && (
          <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
            <div className="container mx-auto px-6 text-center mb-8"><p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Trusted By Media</p></div>
            <div className="relative w-full flex overflow-hidden">
                <div className="flex gap-12 animate-scroll whitespace-nowrap items-center opacity-50 hover:opacity-100 transition duration-500 pr-12">
                    {[...data.partners, ...data.partners].map((p: any, i: number) => (
                        <div key={i} className="flex items-center justify-center min-w-[150px]">
                            {urlFor(p.logo) ? (
                                <img src={urlFor(p.logo)!} alt={p.name} className="h-12 object-contain grayscale hover:grayscale-0 transition" />
                            ) : (
                                <span className="text-xl font-black text-slate-800">{p.name}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
          </section>
      )}

      {/* --- SHOP --- */}
      {data.shopSection && data.shopSection.length > 0 && (
          <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-6 text-center mb-16">
                <p className="text-blue-600 uppercase text-xs font-bold tracking-widest mb-2">Wear The Change</p>
                <h2 className="text-4xl font-serif font-bold text-brand-dark">Campaign <span className="italic text-blue-600">Store</span></h2>
            </div>
            <div className="container mx-auto px-6 flex flex-wrap justify-center gap-8">
                {data.shopSection.map((prod: any, i: number) => (
                    <div key={i} className="group cursor-pointer w-full md:w-80 relative" data-aos="fade-up" data-aos-delay={i*50}>
                        <div className="bg-gray-100 h-64 flex items-center justify-center rounded-lg mb-4 overflow-hidden relative p-6">
                            {urlFor(prod.image) && <img src={urlFor(prod.image)!} className="w-full h-full object-contain group-hover:scale-110 transition duration-500" />}
                            {prod.badge && <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">{prod.badge}</div>}
                            <div className="absolute bottom-4 left-0 right-0 text-center">
                                <button onClick={() => addToCart(prod)} className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition">ADD TO CART <i className="fa-solid fa-plus ml-1"></i></button>
                            </div>
                        </div>
                        <h3 className="font-bold text-lg">{prod.name}</h3><p className="font-bold text-brand-dark">{prod.price}</p>
                    </div>
                ))}
            </div>
          </section>
      )}

      {/* --- SUBSCRIBE --- */}
      <section className="bg-blue-600 py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">Don't Miss a Moment</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">Get exclusive campaign updates directly to your inbox.</p>
            <form onSubmit={handleSubscribe} className="max-w-lg mx-auto flex flex-col md:flex-row gap-4">
                <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-400" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <button type="submit" className="px-8 py-4 bg-brand-dark text-white font-bold rounded hover:bg-gray-900 transition shadow-lg">{formStatus === 'loading' ? '...' : 'SUBSCRIBE'}</button>
            </form>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-brand-dark text-slate-300 py-12 border-t border-white/10">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
            <div>
                <div className="flex items-center gap-2 mb-6 text-white"><div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">N</div><span className="text-xl font-serif font-bold">Nasir Ige.</span></div>
                <p className="text-xs leading-relaxed mb-6 opacity-70">The official campaign for a united, prosperous, and sovereign Somalia.</p>
                <div className="flex gap-4 mt-8">
                    {data.footer?.facebook && <a href={data.footer.facebook} className="w-8 h-8 rounded bg-blue-900/50 flex items-center justify-center hover:bg-blue-600 transition text-white"><i className="fa-brands fa-facebook-f"></i></a>}
                    {data.footer?.twitter && <a href={data.footer.twitter} className="w-8 h-8 rounded bg-blue-900/50 flex items-center justify-center hover:bg-blue-600 transition text-white"><i className="fa-brands fa-twitter"></i></a>}
                    {data.footer?.instagram && <a href={data.footer.instagram} className="w-8 h-8 rounded bg-blue-900/50 flex items-center justify-center hover:bg-blue-600 transition text-white"><i className="fa-brands fa-instagram"></i></a>}
                    {data.footer?.youtube && <a href={data.footer.youtube} className="w-8 h-8 rounded bg-blue-900/50 flex items-center justify-center hover:bg-blue-600 transition text-white"><i className="fa-brands fa-youtube"></i></a>}
                </div>
            </div>
            <div>
                <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Quick Links</h4>
                <ul className="space-y-4 text-xs">
                    {data.footer?.quickLinks?.map((link: any, i: number) => <li key={i}><Link href={link.url || '#'} className="hover:text-blue-400">{link.text}</Link></li>)}
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Get Involved</h4>
                <ul className="space-y-4 text-xs">
                    {data.footer?.getInvolved?.map((link: any, i: number) => <li key={i}><Link href={link.url || '#'} className="hover:text-blue-400">{link.text}</Link></li>)}
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Contact Us</h4>
                <ul className="space-y-4 text-xs">
                    <li className="flex items-start gap-3"><i className="fa-solid fa-phone text-blue-600 mt-1"></i> <span>{data.footer?.phone}</span></li>
                    <li className="flex items-start gap-3"><i className="fa-solid fa-envelope text-blue-600 mt-1"></i> <span>{data.footer?.email}</span></li>
                    <li className="flex items-start gap-3"><i className="fa-solid fa-location-dot text-blue-600 mt-1"></i> <span>{data.footer?.address}</span></li>
                </ul>
            </div>
        </div>
      </footer>
    </div>
  );
}