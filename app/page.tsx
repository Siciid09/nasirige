'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { trackVisit, saveFormData } from '../lib/firebase';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentAdvisor, setCurrentAdvisor] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('idle');

  // --- DATA ---
  const advisors = [
    { name: "Dr. A. Yusuf", role: "Chief Economic Advisor", quote: "His understanding of the challenges faced by farmers is what we need.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974" },
    { name: "Fatima H. Ali", role: "Social Policy Director", quote: "A true independent voice who prioritizes women.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976" },
    { name: "Gen. M. Farole", role: "Security Strategist", quote: "Strength through unity. His plan is the only path.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070" }
  ];

  const testimonials = [
    { name: "Fatima Ali", role: "Teacher", text: "Waxbarashadu waa mustaqbalka. Guul Nasir!", img: "https://i.pravatar.cc/150?img=1" },
    { name: "Mohamed Abdi", role: "Fisherman", text: "Dhaqaalaha dalka wuu kobcinayaa.", img: "https://i.pravatar.cc/150?img=2" },
    { name: "Ayan Hassan", role: "Entrepreneur", text: "Nabad iyo nolol baan rabnaa.", img: "https://i.pravatar.cc/150?img=3" },
  ];

  useEffect(() => {
    AOS.init({ once: true, offset: 100, duration: 800 });
    trackVisit();

    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    const moveCursor = (e: MouseEvent) => {
        if(cursorDot && cursorOutline) {
            cursorDot.style.left = `${e.clientX}px`; cursorDot.style.top = `${e.clientY}px`;
            cursorOutline.style.left = `${e.clientX}px`; cursorOutline.style.top = `${e.clientY}px`;
        }
    };
    window.addEventListener('mousemove', moveCursor);
    const interval = setInterval(() => setCurrentAdvisor((p) => (p + 1) % advisors.length), 5000);
    return () => { window.removeEventListener('mousemove', moveCursor); clearInterval(interval); };
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!email) return;
    setFormStatus('loading');
    const res = await saveFormData('subscribers', { email });
    setFormStatus(res.success ? 'success' : 'error');
    if(res.success) setEmail('');
  };

  return (
    <div className="font-sans text-slate-800 bg-white overflow-x-hidden">
      
      {/* --- ORIGINAL CSS INJECTION --- */}
      <style jsx global>{`
        body { cursor: none; }
        a, button, input, .cursor-pointer { cursor: none; }
        .cursor-dot { width: 8px; height: 8px; background-color: #4189DD; border-radius: 50%; position: fixed; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%); transition: width 0.2s, height 0.2s; }
        .cursor-outline { width: 40px; height: 40px; border: 1px solid rgba(65, 137, 221, 0.5); border-radius: 50%; position: fixed; pointer-events: none; z-index: 9998; transform: translate(-50%, -50%); transition: left 0.1s, top 0.1s; }
        .timeline-wavy { position: absolute; left: 50%; transform: translateX(-50%); top: 0; bottom: 0; width: 20px; background-image: url("data:image/svg+xml,%3Csvg width='20' height='100' viewBox='0 0 20 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0 Q 20 25 10 50 Q 0 75 10 100' stroke='%23e2e8f0' stroke-width='2' fill='none'/%3E%3C/svg%3E"); background-repeat: repeat-y; }
        .glass-card { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); }
        .glass-card-dark { background: linear-gradient(135deg, #0c2448 0%, #0f346b 100%); position: relative; overflow: hidden; }
        .glass-card-dark::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(65, 137, 221, 0.1) 0%, transparent 70%); pointer-events: none; }
        .shape1 {position:absolute; top:0; right:0; width:55%; height:50%; background:rgba(0,0,0,0.25); filter:blur(18px); border-bottom-left-radius:300px;}
        .shape2 {position:absolute; top:28%; right:-4%; width:60%; height:55%; background:rgba(0,0,0,0.28); filter:blur(18px); border-top-left-radius:300px;}
        /* Restore Georgia Font specifically where needed */
        .font-header { font-family: 'Georgia', serif; }
      `}</style>

      {/* --- UI ELEMENTS --- */}
      <div className="cursor-dot hidden md:block" id="cursor-dot"></div>
      <div className="cursor-outline hidden md:block" id="cursor-outline"></div>
      <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-brand-somalia text-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand-dark hover:scale-110 transition cursor-pointer"><i className="fa-solid fa-arrow-up"></i></button>
{/* --- HEADER --- */}
      <div className="custom-header-style">
        <header className="fixed w-full top-0 left-0 z-50 bg-[#0c2448] py-7 shadow-xl transition-all">
          
          {/* UPDATED: w-[96%] pushes elements to the far edges */}
          <div className="w-[96%] mx-auto flex justify-between items-center text-white">
            
            {/* Logo */}
            <div className="text-[28px] font-bold tracking-[1px] cursor-pointer font-header" onClick={() => window.scrollTo(0,0)}>
                Nasir Ige.
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex gap-[35px] list-none">
                {['About', 'Advisors', 'Issues', 'Journey', 'News'].map((item) => (
                    <li key={item}>
                        <Link href={`#${item.toLowerCase()}`} className="text-[18px] font-medium hover:text-[#4189DD] transition font-header no-underline text-white">
                            {item}
                        </Link>
                    </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Icon */}
            <div className="md:hidden cursor-pointer flex flex-col gap-1.5" onClick={() => setIsMenuOpen(!isMenuOpen)}>
               <div className="w-[30px] h-[3px] bg-white rounded-[2px]"></div>
               <div className="w-[30px] h-[3px] bg-white rounded-[2px]"></div>
               <div className="w-[30px] h-[3px] bg-white rounded-[2px]"></div>
            </div>
          </div>

          {/* Mobile Dropdown */}
          {isMenuOpen && (
             <div className="bg-[#0c2448] absolute top-full left-0 w-full p-6 flex flex-col gap-4 text-white md:hidden shadow-2xl border-t border-white/10">
                {['About', 'Advisors', 'Issues', 'Journey', 'News'].map(item => (
                    <Link key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-xl font-header block py-2">
                        {item}
                    </Link>
                ))}
             </div>
          )}
        </header>
      </div>

      {/* --- HERO SECTION --- */}
      {/* --- HERO SECTION --- */}
   <div className="bg-[#0c2448] text-white min-h-screen pt-[140px] pb-[0px] relative overflow-hidden flex items-end font-header">
    
    {/* BACKGROUND FLAG */}
    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Somalia.svg')] opacity-20 mix-blend-overlay bg-no-repeat bg-center z-0 scale-[1.8] -translate-y-10 pointer-events-none"></div>
    
    <div className="shape1"></div><div className="shape2"></div>

    {/* HERO CONTAINER */}
    <section className="w-[98%] max-w-[1800px] mx-auto flex flex-col lg:flex-row items-end justify-between relative z-10 h-full">
        
        {/* LEFT COL: TEXT */}
        <div className="flex-1 flex flex-col justify-center text-center lg:text-left mb-20 lg:mb-32 pl-4 lg:pl-10" data-aos="fade-right">
            <div className="text-[13px] font-bold tracking-[3px] opacity-70 mb-4 text-blue-200 uppercase font-sans">
                • Independent • United • Strong
            </div>
            
            <div className="relative inline-block">
                <h1 className="text-[50px] lg:text-[60px] leading-[0.95] font-bold font-header text-white drop-shadow-xl relative z-10">
                    Together 
                    We 
                    Can Make <br /> 
                    <span className="text-[#4189DD] italic">Somalia</span> <br /> 
                    Great Again
                </h1>

                {/* --- MODERN SNAKE SVG --- */}
                {/* This SVG sits behind the text and draws a line under/around 'Great Again' */}
                <svg className="absolute -bottom-10 -left-4 w-[120%] h-[150px] -z-0 pointer-events-none" viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                        d="M10,80 C100,150 200,50 380,100" 
                        stroke="#4189DD" 
                        strokeWidth="8" 
                        strokeLinecap="round" 
                        className="snake-line"
                    />
                </svg>
            </div>
        </div>

        {/* CENTER COL: CANDIDATE IMAGE */}
        <div className="flex-1 flex justify-center items-end relative z-20" data-aos="zoom-in">
            <img 
                src="https://firebasestorage.googleapis.com/v0/b/guriapp123.firebasestorage.app/o/Gg%2F20251120_134403.png?alt=media&token=0258e491-8eae-48b2-b427-8d76c6197581?w=800" 
                className="w-auto h-[60vh] lg:h-[75vh] object-contain object-bottom scale-120 origin-bottom relative -translate-y-5 translate-x-0 lg:translate-x-10"
                alt="Nasir Ige"
                style={{
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)'
                }}
            />
        </div>

        {/* RIGHT COL: CTA */}
        <div className="flex-1 flex flex-col justify-center text-center lg:text-left mb-20 lg:mb-48 pr-4 lg:pr-10 pl-0 lg:pl-12" data-aos="fade-left">
            <p className="text-[18px] lg:text-[20px] leading-[1.6] opacity-90 font-header max-w-[450px] mx-auto lg:mx-0 text-gray-200">
                We are dedicated to revitalizing Somalia, uniting clans, and building a prosperous future for every citizen.
            </p>
            
            <a href="#manifesto" className="mt-[35px] inline-flex items-center justify-center gap-[10px] px-[35px] py-[18px] bg-[#2563eb] text-white text-[15px] font-bold tracking-wider rounded-[4px] shadow-2xl hover:bg-[#1d4ed8] hover:-translate-y-1 transition-all duration-300 font-sans w-fit mx-auto lg:mx-0 uppercase">
                Read The Vision <i className="fa-solid fa-arrow-right"></i>
            </a>
        </div>

    </section>
</div>
      {/* --- COUNTDOWN --- */}
      <section className="py-16 relative overflow-hidden bg-brand-somalia" style={{ background: 'linear-gradient(135deg, #4189DD 0%, #0a1f44 100%)' }}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
             <div className="text-center lg:text-left" data-aos="fade-right">
                <h3 className="text-white/80 font-serif text-lg uppercase tracking-[0.2em] mb-2">The Path to Sovereignty</h3>
                <h2 className="text-4xl md:text-5xl font-bold text-white font-serif">Election Day 2026</h2>
            </div>
            <div className="flex gap-4 md:gap-8" data-aos="zoom-in">
                 <div className="glass-card p-6 rounded-xl text-center w-24 md:w-32 hover:-translate-y-2 transition duration-300"><span className="block text-4xl md:text-5xl font-bold text-white mb-1">342</span><span className="text-xs text-blue-200 uppercase font-bold tracking-wider">Days</span></div>
                 <div className="glass-card p-6 rounded-xl text-center w-24 md:w-32 hover:-translate-y-2 transition duration-300"><span className="block text-4xl md:text-5xl font-bold text-white mb-1">14</span><span className="text-xs text-blue-200 uppercase font-bold tracking-wider">Hrs</span></div>
                 <div className="glass-card p-6 rounded-xl text-center w-24 md:w-32 hover:-translate-y-2 transition duration-300"><span className="block text-4xl md:text-5xl font-bold text-white mb-1">09</span><span className="text-xs text-blue-200 uppercase font-bold tracking-wider">Mins</span></div>
            </div>
            <div data-aos="fade-left">
                <Link href="#volunteer" className="bg-white text-brand-somalia px-8 py-4 rounded-full font-bold hover:bg-brand-dark hover:text-white transition shadow-lg flex items-center gap-2">
                    JOIN THE NETWORK <i className="fa-solid fa-arrow-right"></i>
                </Link>
            </div>
        </div>
      </section>

      {/* --- ACTION CARDS --- */}
      <section className="relative z-20 md:-mt-12 mb-20 pt-12 md:pt-0">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-8 shadow-xl rounded-sm border-t-4 border-brand-blue hover:-translate-y-2 transition duration-300"><i className="fa-solid fa-check-to-slot text-3xl text-brand-blue mb-4"></i><h3 className="font-serif font-bold text-lg mb-2">Register to Vote</h3><p className="text-slate-500 text-xs">Make your voice heard.</p></div>
                <div className="bg-white p-8 shadow-xl rounded-sm border-t-4 border-blue-400 hover:-translate-y-2 transition duration-300"><i className="fa-regular fa-calendar-check text-3xl text-blue-400 mb-4"></i><h3 className="font-serif font-bold text-lg mb-2">Attend Events</h3><p className="text-slate-500 text-xs">Meet Nasir Ige.</p></div>
                <div className="bg-brand-blue p-8 shadow-xl rounded-sm text-white hover:-translate-y-2 transition duration-300"><i className="fa-solid fa-bullhorn text-3xl mb-4 text-white"></i><h3 className="font-serif font-bold text-lg mb-2 text-white">Get Involved</h3><p className="text-blue-100 text-xs">Make a real impact.</p></div>
                <div className="bg-white p-8 shadow-xl rounded-sm border-t-4 border-brand-blue hover:-translate-y-2 transition duration-300"><i className="fa-solid fa-handshake text-3xl text-brand-blue mb-4"></i><h3 className="font-serif font-bold text-lg mb-2">Support Vision</h3><p className="text-slate-500 text-xs">Help us build the future.</p></div>
            </div>
        </div>
      </section>

      {/* --- PRIORITIES GRID (EXACT HTML MATCH) --- */}
      <section className="py-24 bg-white" id="priority">
         <div className="container mx-auto px-6 text-center mb-16">
            <p className="text-brand-somalia uppercase text-xs font-bold tracking-widest mb-2">Our Priority</p>
            <h2 className="text-4xl font-serif font-bold text-brand-dark mb-4">What Somalia <span className="text-brand-somalia italic">Needs</span></h2>
        </div>
        <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-slate-100">
             {/* Item 1 */}
             <div className="bg-white p-10 hover:scale-105 transition duration-300 border-r border-b border-slate-100 group" data-aos="fade-up">
                <div className="text-brand-somalia text-3xl mb-4"><i className="fa-solid fa-chart-line"></i></div><h3 className="font-serif font-bold text-lg mb-2">Economic</h3><p className="text-xs text-slate-500">Sustainable growth.</p>
             </div>
             {/* Item 2 */}
             <div className="bg-brand-somaliaLight p-10 hover:scale-105 transition duration-300 border-r border-b lg:border-r border-slate-100 group" data-aos="fade-up" data-aos-delay="100">
                <div className="text-brand-somalia text-3xl mb-4"><i className="fa-solid fa-heart-pulse"></i></div><h3 className="font-serif font-bold text-lg mb-2">Medical</h3><p className="text-xs text-slate-500">Accessible healthcare.</p>
             </div>
             {/* Item 3 */}
             <div className="bg-brand-somaliaLight lg:bg-white p-10 hover:scale-105 transition duration-300 border-r border-b border-slate-100 group" data-aos="fade-up" data-aos-delay="200">
                <div className="text-brand-somalia text-3xl mb-4"><i className="fa-solid fa-users"></i></div><h3 className="font-serif font-bold text-lg mb-2">Social</h3><p className="text-xs text-slate-500">Equality for all.</p>
             </div>
             {/* Item 4 */}
             <div className="bg-white lg:bg-brand-somaliaLight p-10 hover:scale-105 transition duration-300 border-b border-slate-100 group" data-aos="fade-up" data-aos-delay="300">
                <div className="text-brand-somalia text-3xl mb-4"><i className="fa-solid fa-shield-halved"></i></div><h3 className="font-serif font-bold text-lg mb-2">Security</h3><p className="text-xs text-slate-500">National safety.</p>
             </div>
             {/* Item 5 */}
             <div className="bg-white lg:bg-brand-somaliaLight p-10 hover:scale-105 transition duration-300 border-b lg:border-b-0 border-r border-slate-100 group" data-aos="fade-up" data-aos-delay="400">
                <div className="text-brand-somalia text-3xl mb-4"><i className="fa-solid fa-graduation-cap"></i></div><h3 className="font-serif font-bold text-lg mb-2">Education</h3><p className="text-xs text-slate-500">Universal literacy.</p>
             </div>
             {/* Item 6 */}
             <div className="bg-brand-somaliaLight lg:bg-white p-10 hover:scale-105 transition duration-300 border-b lg:border-b-0 border-r border-slate-100 group" data-aos="fade-up" data-aos-delay="500">
                <div className="text-brand-somalia text-3xl mb-4"><i className="fa-solid fa-droplet"></i></div><h3 className="font-serif font-bold text-lg mb-2">Water</h3><p className="text-xs text-slate-500">Clean access.</p>
             </div>
             {/* Item 7 */}
             <div className="bg-brand-somaliaLight lg:bg-brand-somaliaLight p-10 hover:scale-105 transition duration-300 border-r border-slate-100 group" data-aos="fade-up" data-aos-delay="600">
                <div className="text-brand-somalia text-3xl mb-4"><i className="fa-solid fa-solar-panel"></i></div><h3 className="font-serif font-bold text-lg mb-2">Energy</h3><p className="text-xs text-slate-500">Renewable power.</p>
             </div>
             {/* Item 8 */}
             <div className="bg-white p-10 hover:scale-105 transition duration-300 group" data-aos="fade-up" data-aos-delay="700">
                <div className="text-brand-somalia text-3xl mb-4"><i className="fa-solid fa-fish-fins"></i></div><h3 className="font-serif font-bold text-lg mb-2">Fisheries</h3><p className="text-xs text-slate-500">Resource protection.</p>
             </div>
        </div>
      </section>

      {/* --- ABOUT --- */}
      <section className="py-20" id="about">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
                <div className="bg-gray-200 p-4 pb-16 rounded-sm relative overflow-hidden">
                    <img src="https://firebasestorage.googleapis.com/v0/b/guriapp123.firebasestorage.app/o/Gg%2F20251120_093535.png?alt=media&token=d9cd4cb1-6ce8-4b2d-85d4-5f59d7ce3485" className="w-full object-cover h-96 grayscale hover:grayscale-0 transition duration-500" />
                    <div className="absolute bottom-8 left-8 right-8 bg-white p-6 shadow-lg border-l-4 border-blue-600">
                        <p className="text-xs text-slate-600 italic mb-4">"An independent voice for a dependent nation."</p>
                        <p className="text-xs font-bold text-blue-800 uppercase">Nasir Ige</p>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-blue-600 uppercase text-xs font-bold tracking-widest mb-2">About Nasir Ige</p>
                <h2 className="text-4xl font-serif font-bold text-brand-dark mb-6">Get to Know The <br/> <span className="italic text-blue-600">Independent Leader</span></h2>
                <p className="text-slate-600 mb-6 leading-relaxed">Nasir Ige is running without the constraints of party politics. His only allegiance is to the Somali people.</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-xs font-bold tracking-wide transition">MEET THE CANDIDATE <i className="fa-solid fa-arrow-right ml-2"></i></button>
            </div>
        </div>
      </section>

      {/* --- TIMELINE --- */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 text-center mb-16" data-aos="fade-down">
             <p className="text-blue-600 uppercase text-xs font-bold tracking-widest mb-2">The Journey</p>
             <h2 className="text-4xl font-serif font-bold text-brand-dark">Legacy of <span className="italic text-blue-600">Leadership</span></h2>
        </div>
        <div className="relative max-w-4xl mx-auto">
             <div className="timeline-wavy"></div>
             {/* Item 1 */}
             <div className="relative grid grid-cols-2 gap-4 md:gap-8 mb-12 items-center group">
                <div className="text-right order-1" data-aos="fade-right"><h3 className="text-lg md:text-xl font-bold text-brand-dark">2012: Mogadishu</h3><p className="text-slate-600 text-xs md:text-sm mt-2">Restored electricity.</p></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-brand-somalia rounded-full border-4 border-white shadow-lg z-10"></div>
                <div className="order-2 pl-4 md:pl-0" data-aos="fade-left"><span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-[10px] md:text-xs font-bold rounded">Infrastructure</span></div>
             </div>
             {/* Item 2 */}
             <div className="relative grid grid-cols-2 gap-4 md:gap-8 mb-12 items-center group">
                <div className="text-right order-1" data-aos="fade-right"><span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-[10px] md:text-xs font-bold rounded">Diplomacy</span></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-brand-dark rounded-full border-4 border-white shadow-lg z-10"></div>
                <div className="order-2 pl-4 md:pl-0" data-aos="fade-left"><h3 className="text-lg md:text-xl font-bold text-brand-dark">2015: Peace</h3><p className="text-slate-600 text-xs md:text-sm mt-2">Galmudug Dialogue.</p></div>
             </div>
             {/* Item 3 */}
             <div className="relative grid grid-cols-2 gap-4 md:gap-8 mb-12 items-center group">
                <div className="text-right order-1" data-aos="fade-right"><h3 className="text-lg md:text-xl font-bold text-brand-dark">2018: Schools</h3><p className="text-slate-600 text-xs md:text-sm mt-2">Built 20 schools.</p></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-brand-somalia rounded-full border-4 border-white shadow-lg z-10"></div>
                <div className="order-2 pl-4 md:pl-0" data-aos="fade-left"><span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-[10px] md:text-xs font-bold rounded">Education</span></div>
             </div>
              {/* Item 4 */}
             <div className="relative grid grid-cols-2 gap-4 md:gap-8 mb-12 items-center group">
                <div className="text-right order-1" data-aos="fade-right"><span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-[10px] md:text-xs font-bold rounded">Health</span></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-brand-dark rounded-full border-4 border-white shadow-lg z-10"></div>
                <div className="order-2 pl-4 md:pl-0" data-aos="fade-left"><h3 className="text-lg md:text-xl font-bold text-brand-dark">2021: Covid</h3><p className="text-slate-600 text-xs md:text-sm mt-2">National Task Force.</p></div>
             </div>
             {/* Item 5 */}
             <div className="relative grid grid-cols-2 gap-4 md:gap-8 items-center group">
                <div className="text-right order-1" data-aos="fade-right"><h3 className="text-lg md:text-xl font-bold text-brand-dark">2024: Independent</h3><p className="text-slate-600 text-xs md:text-sm mt-2">Launched Campaign.</p></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-brand-somalia rounded-full border-4 border-white shadow-lg z-10"></div>
                <div className="order-2 pl-4 md:pl-0" data-aos="fade-left"><span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-[10px] md:text-xs font-bold rounded">Leadership</span></div>
             </div>
        </div>
      </section>

      {/* --- ISSUES --- */}
      <section className="relative bg-brand-dark py-24 overflow-hidden" id="issues">
        <div className="absolute inset-0 opacity-30"><img src="https://images.unsplash.com/photo-1520960858461-ac67df5a049f?q=80&w=2076" className="w-full h-full object-cover" /></div>
        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12">
            <div className="text-white pt-10">
                <p className="uppercase tracking-widest text-xs mb-4 opacity-80">The Issues</p>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">Our <span className="text-blue-400 italic">Responsibility</span><br/>and Government <br/> Accountability</h2>
                <button className="bg-white text-brand-dark px-8 py-3 rounded text-xs font-bold hover:bg-blue-50 transition">SEE ALL ISSUES</button>
            </div>
            <div className="flex flex-col justify-center space-y-6 border-l border-white/20 pl-8 md:pl-16">
                {[
                    {i: 'fa-hand-holding-dollar', t: 'Spending and Debt'},
                    {i: 'fa-earth-americas', t: 'Foreign Policy'},
                    {i: 'fa-scale-balanced', t: 'Social Issues'},
                    {i: 'fa-leaf', t: 'Climate Resilience'},
                    {i: 'fa-wifi', t: 'Digital Economy'},
                    {i: 'fa-rocket', t: 'Youth Empowerment'}
                ].map((iss, i) => (
                    <a key={i} href="#" className="flex items-center text-white hover:text-blue-400 transition group">
                        <div className="w-10 h-10 rounded bg-blue-900/50 flex items-center justify-center mr-4 group-hover:bg-blue-400 group-hover:text-brand-dark transition"><i className={`fa-solid ${iss.i}`}></i></div>
                        <span className="text-lg font-medium">{iss.t}</span>
                    </a>
                ))}
            </div>
        </div>
      </section>

      {/* --- GALLERY --- */}
      <section className="py-24 bg-brand-dark text-white" id="gallery">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div data-aos="fade-right">
                    <p className="text-blue-400 uppercase text-xs font-bold tracking-widest mb-2">Our Journey</p>
                    <h2 className="text-4xl font-serif font-bold">Moments of <span className="italic text-blue-400">Unity</span></h2>
                </div>
                <a href="#" className="text-xs font-bold tracking-widest border-b border-blue-400 pb-1 hover:text-blue-400 transition mt-6 md:mt-0" data-aos="fade-left">FOLLOW ON INSTAGRAM</a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 h-auto">
                 <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-sm h-80"><img src="https://nasaige.com/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-27-at-4.53.10-PM-1.jpeg?q=80&w=2089" className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-60" /></div>
                 <div className="col-span-1 relative group overflow-hidden rounded-sm h-40"><img src="https://nasaige.com/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-27-at-5.17.54-PM.jpeg?q=80&w=2076" className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-60" /></div>
                 <div className="col-span-1 relative group overflow-hidden rounded-sm h-40"><img src="https://nasaige.com/wp-content/uploads/2023/10/IMG-20231023-WA0058.jpg?q=80&w=2070" className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-60" /></div>
                 <div className="col-span-1 relative group overflow-hidden rounded-sm h-40"><img src="https://nasaige.com/wp-content/uploads/2023/10/IMG-20231023-WA0048.jpg?q=80&w=2070" className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-60" /></div>
                 <div className="col-span-1 relative group overflow-hidden rounded-sm h-40"><img src="https://nasaige.com/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-27-at-4.53.10-PM-2.jpeg?q=80&w=2026" className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-60" /></div>
                 <div className="col-span-2 relative group overflow-hidden rounded-sm h-40"><img src="https://nasaige.com/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-27-at-4.53.12-PM.jpeg?q=80&w=1964" className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-60" /></div>
                 <div className="col-span-1 relative group overflow-hidden rounded-sm h-40"><img src="https://nasaige.com/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-27-at-4.53.07-PM.jpeg?q=80&w=2072" className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-60" /></div>
                 <div className="col-span-1 relative group overflow-hidden rounded-sm h-40"><img src="https://nasaige.com/wp-content/uploads/2022/11/nasa-with-president-somalia-2.jpg?q=80&w=2072" className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-60" /></div>
                 <div className="col-span-2 relative group overflow-hidden rounded-sm h-40"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Somalia.svg" className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-60" /></div>
                 <div className="col-span-1 relative group overflow-hidden rounded-sm h-40"><img src="https://nasaige.com/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-27-at-5.18.30-PM.jpeg?q=80&w=2072" className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-60" /></div>
            </div>
        </div>
      </section>

      {/* --- QUOTE --- */}
      <section className="py-32 relative flex items-center justify-center bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2072')" }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white" data-aos="zoom-in">
            <i className="fa-solid fa-quote-left text-4xl text-blue-400 mb-6 opacity-80"></i>
            <h2 className="text-3xl md:text-5xl font-serif italic leading-normal mb-8">"Somalia is not just a land on a map; it is the heartbeat of the Horn. We will restore its dignity, one promise at a time."</h2>
            <p className="uppercase tracking-[0.2em] font-bold text-sm opacity-80">— Nasir Ige</p>
        </div>
      </section>

      {/* --- ADVISORS --- */}
      <section className="py-24 bg-white" id="advisors">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <p className="text-blue-600 uppercase text-xs font-bold tracking-widest mb-2">Strategic Advisory Council</p>
                    <h2 className="text-4xl font-serif font-bold text-brand-dark mb-6">Meet The <br/> <span className="italic text-blue-600">Visionary Team</span></h2>
                    <p className="text-slate-600 text-sm leading-relaxed mb-8">As an independent candidate, Nasir Ige is advised by a coalition of Somali intellectuals, elders, and technocrats.</p>
                    <div className="flex gap-2">
                        {advisors.map((_, i) => (
                            <button key={i} onClick={() => setCurrentAdvisor(i)} className={`w-3 h-3 rounded-full transition-all duration-300 ${currentAdvisor===i ? 'bg-blue-600' : 'bg-gray-300 hover:bg-blue-400'}`}></button>
                        ))}
                    </div>
                </div>
                <div className="relative h-[400px] rounded-sm overflow-hidden bg-gray-200">
                    <img src={advisors[currentAdvisor].img} className="w-full h-full object-cover transition-opacity duration-500" />
                    <div className="absolute bottom-8 left-8 right-8 bg-white p-6 shadow-lg border-l-4 border-blue-600">
                        <p className="text-xs text-slate-600 italic mb-4">"{advisors[currentAdvisor].quote}"</p>
                        <p className="text-xs font-bold text-blue-800 uppercase">{advisors[currentAdvisor].name}</p>
                        <p className="text-[10px] text-slate-400">{advisors[currentAdvisor].role}</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- CAMPAIGN TRAIL --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                    <p className="text-blue-600 uppercase text-xs font-bold tracking-widest mb-2">Join Us</p>
                    <h2 className="text-4xl font-serif font-bold text-brand-dark">On The <span className="italic text-blue-600">Campaign Trail</span></h2>
                </div>
                <a href="#" className="mt-4 md:mt-0 text-sm font-bold text-brand-dark hover:text-blue-600 transition">VIEW ALL EVENTS <i className="fa-solid fa-arrow-right ml-1"></i></a>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { d: 'NOV 24, 2025', t: 'Mogadishu Stadium Rally', loc: 'Benadir' },
                    { d: 'DEC 02, 2025', t: 'Istanbul Diaspora Gala', loc: 'Turkey' },
                    { d: 'DEC 15, 2025', t: 'Garowe Youth Summit', loc: 'Puntland' }
                ].map((ev, i) => (
                    <div key={i} className="bg-white border border-slate-200 p-8 hover:shadow-xl transition duration-300 group" data-aos="fade-up" data-aos-delay={i*100}>
                        <div className="text-slate-400 text-sm font-bold mb-4">{ev.d}</div>
                        <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2 group-hover:text-blue-600 transition">{ev.t}</h3>
                        <p className="text-slate-500 text-sm mb-6">Join 50,000 citizens for the launch.</p>
                        <div className="flex justify-between items-center"><span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-slate-600"><i className="fa-solid fa-location-dot mr-1"></i> {ev.loc}</span><button className="text-blue-600 font-bold text-sm">RSVP</button></div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6 text-center mb-12" data-aos="fade-up">
            <p className="text-brand-somalia uppercase text-xs font-bold tracking-widest mb-2">Testimonials</p>
            <h2 className="text-4xl font-serif font-bold text-brand-dark">Codka <span className="italic text-brand-somalia">Shacabka</span></h2>
        </div>
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
                <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:scale-105 transition duration-300">
                    <div className="flex items-center gap-4 mb-4">
                        <img src={t.img} className="w-12 h-12 rounded-full object-cover" />
                        <div><h4 className="font-bold text-brand-dark">{t.name}</h4><p className="text-xs text-slate-500">{t.role}</p></div>
                    </div>
                    <p className="text-sm text-slate-600 italic">"{t.text}"</p>
                </div>
            ))}
        </div>
      </section>

      {/* --- MANIFESTO --- */}
      <section className="py-20 bg-white border-y border-slate-100" id="manifesto">
        <div className="container mx-auto px-6">
            <div className="glass-card-dark p-12 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden" data-aos="fade-up">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-somalia rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                <div className="flex-1 relative z-10">
                    <h3 className="text-3xl font-serif font-bold text-white mb-3">Read The Full Manifesto</h3>
                    <p className="text-blue-100 text-sm leading-relaxed max-w-lg">Transparency is our core value. Download our detailed 2026-2030 strategic plans for economic recovery, education, and healthcare.</p>
                </div>
                <div className="flex gap-4 relative z-10">
                    <button className="flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white hover:text-brand-dark text-white transition group shadow-lg">
                        <i className="fa-solid fa-file-pdf text-2xl group-hover:scale-110 transition"></i>
                        <div className="text-left"><span className="block text-[10px] font-bold uppercase opacity-70">Download</span><span className="block text-sm font-bold">Economic Plan</span></div>
                    </button>
                    <button className="flex items-center gap-3 px-6 py-4 bg-brand-somalia border border-brand-somalia rounded-lg hover:bg-brand-blue transition group shadow-lg text-white">
                        <i className="fa-solid fa-shield-halved text-2xl group-hover:scale-110 transition"></i>
                        <div className="text-left"><span className="block text-[10px] font-bold uppercase opacity-70">Download</span><span className="block text-sm font-bold">Security Brief</span></div>
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* --- VOLUNTEER --- */}
      <section className="py-24 bg-white" id="volunteer">
        <div className="container mx-auto px-6 text-center mb-12" data-aos="fade-down">
            <h2 className="text-3xl font-serif font-bold text-brand-dark">We Need <span className="italic text-brand-somalia">You</span></h2>
            <p className="text-slate-500 text-sm mt-4 max-w-2xl mx-auto">Choose a role that fits your skills.</p>
        </div>
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-6">
            <div className="group border border-slate-200 p-8 rounded-xl hover:border-brand-somalia hover:shadow-lg transition duration-300 text-center" data-aos="fade-up"><div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-somalia transition duration-300"><i className="fa-solid fa-phone text-2xl text-brand-somalia group-hover:text-white transition"></i></div><h3 className="font-bold text-lg mb-2">Digital Canvasser</h3><a href="#" className="text-brand-somalia text-xs font-bold uppercase tracking-widest hover:underline">Sign Up</a></div>
            <div className="group bg-brand-somalia p-8 rounded-xl shadow-2xl transform md:-translate-y-4 text-center text-white" data-aos="fade-up" data-aos-delay="100"><div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"><i className="fa-solid fa-envelope-open-text text-2xl text-white"></i></div><h3 className="font-bold text-lg mb-2">Event Host</h3><p className="text-blue-100 text-xs mb-4">Organize your community.</p><a href="#" className="text-white text-xs font-bold uppercase tracking-widest border-b border-white pb-1">Sign Up</a></div>
            <div className="group border border-slate-200 p-8 rounded-xl hover:border-brand-somalia hover:shadow-lg transition duration-300 text-center" data-aos="fade-up" data-aos-delay="200"><div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-somalia transition duration-300"><i className="fa-solid fa-pen-nib text-2xl text-brand-somalia group-hover:text-white transition"></i></div><h3 className="font-bold text-lg mb-2">Content Creator</h3><a href="#" className="text-brand-somalia text-xs font-bold uppercase tracking-widest hover:underline">Sign Up</a></div>
        </div>
      </section>

      {/* --- BLOG --- */}
      <section className="py-24 bg-slate-50" id="blog">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <p className="text-blue-600 uppercase text-xs font-bold tracking-widest mb-2">Blog & News</p>
                <h2 className="text-4xl font-serif font-bold text-brand-dark">Campaign Update & <span className="text-blue-600 italic">News</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-auto md:h-[500px] mb-12">
                <div className="relative h-[400px] md:h-full w-full overflow-hidden rounded-xl shadow-2xl cursor-pointer group">
                    <img src="https://images.unsplash.com/photo-1540910419868-47494c5be3c0?q=80&w=2068" className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80 group-hover:opacity-90 transition"></div>
                    <div className="absolute bottom-0 left-0 p-8 transition duration-500 group-hover:-translate-y-4">
                        <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 uppercase mb-3 inline-block rounded-sm">Featured Story</span>
                        <h3 className="text-3xl font-serif font-bold text-white leading-tight">The Roadmap to Economic Recovery</h3>
                    </div>
                </div>
                <div className="flex flex-col gap-4 h-full">
                    {[
                        { t: "Healthcare Reform Rally", img: "https://images.unsplash.com/photo-1575320181282-9afab399332c?q=80&w=2070" },
                        { t: "New Education Bill", img: "https://images.unsplash.com/photo-1529101091760-61493900799c?q=80&w=2070" }
                    ].map((item, i) => (
                        <div key={i} className="relative h-[200px] md:flex-1 overflow-hidden rounded-xl shadow-lg cursor-pointer group">
                            <img src={item.img} className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-brand-dark/90 transition duration-500"></div>
                            <div className="absolute bottom-0 left-0 p-6 w-full group-hover:hidden"><h4 className="text-xl font-serif font-bold text-white">{item.t}</h4></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center">
                <button className="bg-brand-dark text-white px-10 py-4 rounded-full font-bold hover:bg-brand-somalia transition shadow-lg flex items-center gap-2 mx-auto">
                    VIEW ALL PRESS RELEASES <i className="fa-solid fa-newspaper"></i>
                </button>
            </div>
        </div>
      </section>

      {/* --- MARQUEE --- */}
      <section className="py-16 bg-white border-y border-slate-100 overflow-hidden">
        <div className="container mx-auto px-6 text-center mb-8"><p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Trusted By Media</p></div>
        <div className="relative w-full flex overflow-hidden">
            <div className="flex gap-12 animate-scroll whitespace-nowrap items-center opacity-50 hover:opacity-100 transition duration-500 pr-12">
                <h3 className="text-2xl font-black font-serif text-slate-800">BBC <span className="font-light">SOMALIA</span></h3>
                <h3 className="text-2xl font-black text-slate-800 tracking-tighter">AL JAZEERA</h3>
                <h3 className="text-2xl font-bold text-slate-800">Hiiraan<span className="text-blue-600">Online</span></h3>
                <h3 className="text-2xl font-serif font-bold italic text-slate-800">The EastAfrican</h3>
                <h3 className="text-2xl font-black text-slate-800">Universal<span className="text-yellow-500">TV</span></h3>
                <h3 className="text-2xl font-bold text-slate-800">Goobjoog<span className="text-red-500">News</span></h3>
                <h3 className="text-2xl font-serif font-bold text-slate-800">Garowe Online</h3>
                <h3 className="text-2xl font-black text-slate-800">SNTV</h3>
                <h3 className="text-2xl font-black font-serif text-slate-800">VOA <span className="font-light">Somali</span></h3>
                <h3 className="text-2xl font-bold text-slate-800">Puntland<span className="text-blue-400">Post</span></h3>
                <h3 className="text-2xl font-black font-serif text-slate-800">BBC <span className="font-light">SOMALIA</span></h3>
                <h3 className="text-2xl font-black text-slate-800 tracking-tighter">AL JAZEERA</h3>
                <h3 className="text-2xl font-bold text-slate-800">Hiiraan<span className="text-blue-600">Online</span></h3>
            </div>
        </div>
      </section>

      {/* --- VIDEO INTRO --- */}
      <section className="bg-brand-dark text-white py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group cursor-pointer">
                <img src="https://nasaige.com/wp-content/uploads/2022/11/312714729_10159030527975677_2865741996709315591_n.jpg" className="w-full object-cover h-80 opacity-80 group-hover:opacity-100 transition duration-300 border border-white/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-brand-somalia rounded-full animate-pulse-slow opacity-50 scale-150"></div>
                        <div className="absolute inset-0 bg-brand-somalia rounded-full animate-ping opacity-30 scale-110"></div>
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition duration-300 relative z-10 shadow-[0_0_30px_rgba(255,255,255,0.5)]"><i className="fa-solid fa-play text-brand-somalia text-2xl"></i></div>
                    </div>
                </div>
            </div>
            <div>
                <p className="uppercase tracking-widest text-xs mb-4 opacity-70 flex items-center gap-2"><span className="w-2 h-2 bg-blue-400 rounded-full"></span> Introduction Video</p>
                <h2 className="text-4xl font-serif font-bold mb-6">Meet Nasir Ige, the Next <br/> <span className="italic text-blue-400">President</span></h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-8">A leader who listens. A visionary who acts. Watch the story of how Nasir Ige plans to restore dignity to every Somali citizen.</p>
                <div className="font-serif text-3xl text-blue-400 italic opacity-80">Nasir Ige</div>
                <p className="text-xs mt-2 uppercase tracking-wider opacity-60">Independent Candidate</p>
            </div>
        </div>
      </section>

      {/* --- SHOP --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center mb-16">
             <p className="text-blue-600 uppercase text-xs font-bold tracking-widest mb-2">Wear The Change</p>
             <h2 className="text-4xl font-serif font-bold text-brand-dark">Campaign <span className="italic text-blue-600">Store</span></h2>
        </div>
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
            {[
                { n: 'The "Unity" Tee', p: '$25.00', i: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964', sub: '100% Cotton, Somalia Blue', b: 'NEW' },
                { n: 'Campaign Cap', p: '$15.00', i: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1936', sub: 'Embroidered Logo' },
                { n: 'Supporter Pin Set', p: '$10.00', i: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=2072', sub: 'Gold & Blue Enamel' }
            ].map((prod, i) => (
                <div key={i} className="group cursor-pointer" data-aos="fade-up" data-aos-delay={i*100}>
                    <div className="bg-gray-100 h-64 flex items-center justify-center rounded-lg mb-4 overflow-hidden relative">
                        <img src={prod.i} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                        {prod.b && <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">{prod.b}</div>}
                    </div>
                    <h3 className="font-bold text-lg">{prod.n}</h3><p className="text-sm text-slate-500 mb-2">{prod.sub}</p><p className="font-bold text-brand-dark">{prod.p}</p>
                </div>
            ))}
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
                <p className="text-blue-600 uppercase text-xs font-bold tracking-widest mb-2">Answers</p>
                <h2 className="text-4xl font-serif font-bold text-brand-dark">Frequently Asked <br/> <span className="italic text-blue-600">Questions</span></h2>
            </div>
            <div className="space-y-4">
                {[
                    { q: "How can I get involved?", a: "We encourage active participation! Join local chapters or volunteer." },
                    { q: "What are the main policy priorities?", a: "Economic growth, healthcare reform, and national security." },
                    { q: "Where is my polling station?", a: "Check the voter registration tab for your district details." },
                    { q: "How do I support the campaign?", a: "Click the 'Join Network' button. We accept Zaad, EVC, and Cards." },
                    { q: "What is the plan for education?", a: "Universal free primary education and subsidized university grants." },
                    { q: "Can diaspora vote?", a: "Yes, registration opens online starting June 2025." },
                    { q: "What about security?", a: "Strengthening the SNA and community policing initiatives." },
                    { q: "How to contact Nasir Ige?", a: "Use the contact form below or attend a town hall event." }
                ].map((faq, i) => (
                    <div key={i} className="border border-slate-200 rounded overflow-hidden">
                        <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full bg-white text-brand-dark px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition">
                            <span className="font-medium text-sm">{faq.q}</span>
                            <i className={`fa-solid ${activeFaq === i ? 'fa-minus' : 'fa-plus'} text-blue-600`}></i>
                        </button>
                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeFaq === i ? 'max-h-40 p-6 pt-0' : 'max-h-0'}`}>
                             <div className="p-6 pt-0"><p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- SUBSCRIBE FORM --- */}
      <section className="bg-blue-600 py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">Don't Miss a Moment of History</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">Join the movement. Get exclusive campaign updates directly to your inbox.</p>
            <form onSubmit={handleSubscribe} className="max-w-lg mx-auto flex flex-col md:flex-row gap-4">
                <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-400" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <button type="submit" className="px-8 py-4 bg-brand-dark text-white font-bold rounded hover:bg-gray-900 transition shadow-lg">{formStatus === 'loading' ? 'Sending...' : 'SUBSCRIBE'}</button>
            </form>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-brand-dark text-slate-300 py-16 border-t border-white/10">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
            <div>
                <div className="flex items-center gap-2 mb-6 text-white"><div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">N</div><span className="text-xl font-serif font-bold">Nasir Ige.</span></div>
                <p className="text-xs leading-relaxed mb-6 opacity-70">The official campaign for a united, prosperous, and sovereign Somalia.</p>
                <div className="flex gap-4 mt-8">
                    <a href="#" className="w-8 h-8 rounded bg-blue-900/50 flex items-center justify-center hover:bg-blue-600 transition text-white"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#" className="w-8 h-8 rounded bg-blue-900/50 flex items-center justify-center hover:bg-blue-600 transition text-white"><i className="fa-brands fa-twitter"></i></a>
                    <a href="#" className="w-8 h-8 rounded bg-blue-900/50 flex items-center justify-center hover:bg-blue-600 transition text-white"><i className="fa-brands fa-instagram"></i></a>
                    <a href="#" className="w-8 h-8 rounded bg-blue-900/50 flex items-center justify-center hover:bg-blue-600 transition text-white"><i className="fa-brands fa-youtube"></i></a>
                </div>
            </div>
            {[
                { h: "Quick Links", l: ["The Platform", "Volunteer", "Join Network", "Press & Media", "Shop Merch"] },
                { h: "Get Involved", l: ["Find Events", "Host a Party", "Register to Vote", "Become a Member"] },
                { h: "Contact Us", l: ["+252 61 555 0124", "info@nasirige2026.so", "Km4 Junction, Mogadishu"] }
            ].map((col, i) => (
                <div key={i}>
                    <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">{col.h}</h4>
                    <ul className="space-y-4 text-xs">
                        {col.l.map((link, j) => (
                            <li key={j} className="flex items-start gap-3 hover:text-blue-400 transition cursor-pointer">
                                {col.h === "Contact Us" ? (
                                    <>
                                        {j===0 && <i className="fa-solid fa-phone text-blue-600 mt-1"></i>}
                                        {j===1 && <i className="fa-solid fa-envelope text-blue-600 mt-1"></i>}
                                        {j===2 && <i className="fa-solid fa-location-dot text-blue-600 mt-1"></i>}
                                        <span>{link}</span>
                                    </>
                                ) : link}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
        <div className="container mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest opacity-50">
           <div>&copy; 2026 Nasir Ige. All Right Reserved. <span className="hidden md:inline mx-1">|</span> Developed by HiigsiTech</div>
           <div className="mt-2 md:mt-0 space-x-4"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Cookies</a></div>
        </div>
      </footer>
    </div>
  );
}