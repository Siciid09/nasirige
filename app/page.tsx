'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { trackVisit, saveFormData } from '../lib/firebase';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentAdvisor, setCurrentAdvisor] = useState(0);
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('idle');

  // --- SHOPPING CART STATE ---
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- COUNTDOWN LOGIC ---
  const [timeLeft, setTimeLeft] = useState({ months: 0, days: 0, hours: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2026-05-15T00:00:00'); 
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
    return () => clearInterval(timer);
  }, []);

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

  const products = [
    { id: 1, n: 'The "Unity" Tee', p: '$10.00', i: '/img3.png', sub: '100% Cotton, Somalia Blue', b: 'NEW' },
    { id: 2, n: 'Campaign Cap', p: '$5.00', i: '/img4.png', sub: 'Embroidered Logo' },
    { id: 3, n: 'Voter Hoodie', p: '$25.00', i: '/img3.png', sub: 'Heavyweight Fleece', b: 'HOT' },
    { id: 4, n: 'Support Mug', p: '$8.00', i: '/img4.png', sub: 'Ceramic, 12oz' },
    { id: 5, n: 'Rally Flag', p: '$12.00', i: '/img3.png', sub: 'Polyester, 3x5ft' },
    { id: 6, n: 'Wristband Set', p: '$3.00', i: '/img4.png', sub: 'Pack of 3' },
    { id: 7, n: 'Campaign Notebook', p: '$7.00', i: '/img3.png', sub: 'Recycled Paper' },
    { id: 8, n: 'Tote Bag', p: '$15.00', i: '/img4.png', sub: 'Canvas Material', b: 'SALE' },
  ];

  useEffect(() => {
    AOS.init({ once: true, offset: 50, duration: 600 });
    // trackVisit();

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

  const addToCart = (product: any) => {
    setCart([...cart, product]);
  };

  return (
    <div className="font-sans text-slate-800 bg-white overflow-x-hidden">
      
      {/* --- GLOBAL CSS --- */}
      <style jsx global>{`
        body { cursor: none; }
        a, button, input, .cursor-pointer { cursor: none; }
        .cursor-dot { width: 8px; height: 8px; background-color: #4189DD; border-radius: 50%; position: fixed; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%); transition: width 0.2s, height 0.2s; }
        .cursor-outline { width: 40px; height: 40px; border: 1px solid rgba(65, 137, 221, 0.5); border-radius: 50%; position: fixed; pointer-events: none; z-index: 9998; transform: translate(-50%, -50%); transition: left 0.1s, top 0.1s; }
        
        /* Desktop Horizontal Wavy Line - Centered Vertically */
        .timeline-wavy-horizontal { position: absolute; top: 50%; transform: translateY(-50%); left: 0; right: 0; height: 20px; background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 0 50 10 Q 75 20 100 10' stroke='%23e2e8f0' stroke-width='2' fill='none'/%3E%3C/svg%3E"); background-repeat: repeat-x; }

        .glass-card { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); }
        .glass-card-dark { background: linear-gradient(135deg, #0c2448 0%, #0f346b 100%); position: relative; overflow: hidden; }
        .glass-card-dark::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(65, 137, 221, 0.1) 0%, transparent 70%); pointer-events: none; }
        .shape1 {position:absolute; top:0; right:0; width:55%; height:50%; background:rgba(0,0,0,0.25); filter:blur(18px); border-bottom-left-radius:300px;}
        .shape2 {position:absolute; top:28%; right:-4%; width:60%; height:55%; background:rgba(0,0,0,0.28); filter:blur(18px); border-top-left-radius:300px;}
        .font-header { font-family: 'Georgia', serif; }
        
        .animated-gradient-bg {
          background: linear-gradient(270deg, #0a1f44, #4189DD, #0c2448, #0a1f44);
          background-size: 800% 800%;
          animation: moveGradient 10s ease infinite;
        }
        @keyframes moveGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* --- UI ELEMENTS --- */}
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
            
            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-[35px]">
              <ul className="flex gap-[35px] list-none m-0">
                {['About', 'Advisors', 'Issues', 'Journey', 'News'].map((item) => (
                    <li key={item}>
                        <Link href={`#${item.toLowerCase()}`} className="text-[18px] font-medium hover:text-[#4189DD] transition font-header no-underline text-white">
                            {item}
                        </Link>
                    </li>
                ))}
              </ul>
              {/* CART ICON DESKTOP */}
              <div className="relative group cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
                <i className="fa-solid fa-cart-shopping text-xl hover:text-[#4189DD] transition"></i>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
                {/* MINI CART DROPDOWN */}
                {isCartOpen && (
                  <div className="absolute top-full right-0 mt-4 w-64 bg-white text-slate-800 shadow-2xl rounded-lg p-4 z-[100] border border-slate-100">
                    <h4 className="font-bold border-b pb-2 mb-2 text-sm">Your Cart</h4>
                    {cart.length === 0 ? (
                      <p className="text-xs text-slate-500">Cart is empty.</p>
                    ) : (
                      <ul className="max-h-48 overflow-y-auto">
                        {cart.map((item, idx) => (
                          <li key={idx} className="flex justify-between text-xs py-1 border-b border-slate-50 last:border-0">
                            <span>{item.n}</span>
                            <span className="font-bold">{item.p}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-3 pt-2 border-t flex justify-between items-center">
                        <span className="text-xs font-bold">Total Items: {cart.length}</span>
                        <Link href="/shop" className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded">View</Link>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* MOBILE NAV CONTROLS */}
            <div className="md:hidden flex items-center gap-6">
                {/* Mobile Cart Icon */}
                <div className="relative cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
                    <i className="fa-solid fa-cart-shopping text-xl hover:text-[#4189DD] transition"></i>
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {cart.length}
                        </span>
                    )}
                    {/* MINI CART MOBILE */}
                    {isCartOpen && (
                        <div className="absolute top-full right-[-50px] mt-4 w-64 bg-white text-slate-800 shadow-2xl rounded-lg p-4 z-[100] border border-slate-100">
                             <h4 className="font-bold border-b pb-2 mb-2 text-sm">Your Cart</h4>
                             <p className="text-xs mb-2">Items: {cart.length}</p>
                             <Link href="/shop" className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded block text-center">Go to Cart</Link>
                        </div>
                    )}
                </div>

                {/* Hamburger */}
                <div className="cursor-pointer flex flex-col gap-1.5" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                   <div className="w-[30px] h-[3px] bg-white rounded-[2px]"></div>
                   <div className="w-[30px] h-[3px] bg-white rounded-[2px]"></div>
                   <div className="w-[30px] h-[3px] bg-white rounded-[2px]"></div>
                </div>
            </div>
          </div>
          {isMenuOpen && (
             <div className="bg-[#0c2448] absolute top-full left-0 w-full p-6 flex flex-col gap-4 text-white md:hidden shadow-2xl border-t border-white/10">
                {['About', 'Advisors', 'Issues', 'Journey', 'News'].map(item => (
                    <Link key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-xl font-header block py-2">
                        {item}
                    </Link>
                ))}
                <Link href="/shop" className="text-xl font-header block py-2">
                   Shop Campaign Merch
                </Link>
             </div>
          )}
        </header>
      </div>

      {/* --- HERO SECTION --- */}
      <style dangerouslySetInnerHTML={{__html: `
        .snake-line-animated { stroke-dasharray: 350; stroke-dashoffset: 350; animation: drawSnake 3s ease-in-out infinite alternate; }
        @keyframes drawSnake { from { stroke-dashoffset: 350; } to { stroke-dashoffset: 0; } }
        .particle { position: absolute; background: rgba(65, 137, 221, 0.3); border-radius: 50%; filter: blur(2px); animation: floatUp linear infinite; bottom: -50px; z-index: 1; pointer-events: none; }
        @keyframes floatUp { 0% { transform: translateY(0) scale(1); opacity: 0; } 20% { opacity: 0.6; } 80% { opacity: 0.6; } 100% { transform: translateY(-120vh) scale(1.5); opacity: 0; } }
      `}} />

      <div className="bg-[#0c2448] text-white min-h-screen pt-[120px] pb-[0px] relative overflow-hidden flex items-end font-header">
          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Somalia.svg')] opacity-20 mix-blend-overlay bg-no-repeat bg-center z-0 scale-[1.8] -translate-y-10 pointer-events-none"></div>
          <div className="particle w-2 h-2 left-[5%]" style={{ animationDuration: '15s' }}></div>
          <div className="particle w-4 h-4 left-[12%]" style={{ animationDuration: '25s' }}></div>
          <div className="particle w-2 h-2 left-[55%]" style={{ animationDuration: '27s' }}></div>
          <div className="shape1"></div><div className="shape2"></div>
          <section className="w-[98%] max-w-[1800px] mx-auto flex flex-col lg:flex-row items-end justify-between relative z-10 h-full">
              <div className="flex-1 flex flex-col justify-center text-center lg:text-left mb-10 lg:mb-0 lg:self-center lg:pb-32 pl-4 lg:pl-10 relative z-50" data-aos="fade-right">
                  <div className="text-[13px] font-bold tracking-[4px] opacity-80 mb-2 text-blue-300 uppercase font-sans">
                      SOOMAALIYA WAA HAL QARAN
                  </div>
                  <div className="relative inline-block">
                      <h1 className="text-[50px] lg:text-[80px] leading-[0.9] font-black font-header text-white drop-shadow-2xl relative z-10 tracking-tight">
                          Maskax Cusub,<br /> 
                          <span className="text-[#4189DD] italic">Mustaqbal Ifaya</span>
                      </h1>
                      <svg className="absolute -bottom-8 -left-2 w-[110%] h-[140px] -z-0 pointer-events-none opacity-70" viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10,80 C100,150 180,50 320,90" stroke="#4189DD" strokeWidth="10" strokeLinecap="round" className="snake-line-animated" />
                      </svg>
                  </div>
              </div>
              <div className="flex-1 flex justify-center items-end relative z-20" data-aos="zoom-in">
                  <img src="/img.png" className="w-auto h-[50vh] lg:h-[85vh] object-contain object-bottom scale-110 origin-bottom relative translate-y-[7%]" alt="Candidate" style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)' }} />
              </div>
              <div className="flex-1 flex flex-col justify-center text-center lg:text-left mb-20 lg:mb-0 lg:self-center lg:pb-2 pr-4 lg:pr-10 pl-0 lg:pl-12 relative z-50" data-aos="fade-left">
                  <div className="max-w-[500px] mx-auto lg:mx-0">
                      <div className="relative lg:pl-6 space-y-5">
                          <div className="hidden lg:block absolute left-0 top-0 w-[4px] h-full bg-[linear-gradient(to_bottom,#3b82f6_75%,transparent_100%)]"></div>
                          <p className="text-[20px] lg:text-[24px] leading-tight font-bold text-white">
                             Dhalinyaradu Waa Awoodda Qaranka Iyo Laf-dhabarta Isbedelka Dhabta Ah.
                          </p>
                          <div className="text-[15px] lg:text-[16px] text-blue-200 font-sans leading-relaxed opacity-90">
                              <span className="block text-white font-bold uppercase tracking-widest mb-3 border-b border-blue-500/30 w-fit pb-1">
                                New Mindset, Bright Future.
                              </span>
                              <div className="hidden lg:block">
                                  Youth are the strength of the nation. It is time to unite our voices, drive innovation, and build a lasting legacy of peace, shared prosperity, and limitless opportunity for everyone on the global stage. By embracing modern solutions and working hand in hand, we will transform our potential into tangible progress for generations to come.
                              </div>
                              <div className="block lg:hidden">
                                  Youth are the strength of the nation. It is time to unite, drive innovation, and build a legacy of peace and prosperity. By embracing modern solutions, we transform potential into progress.
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </div>

      {/* --- COUNTDOWN SECTION --- */}
      <style dangerouslySetInnerHTML={{__html: `
        .separator-line { height: 1px; width: 80%; margin: 10px auto 5px auto; background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%); }
      `}} />
      <section className="py-12 md:py-16 relative overflow-hidden animated-gradient-bg">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left" data-aos="fade-right">
                <h3 className="text-white/80 font-serif text-lg uppercase tracking-[0.2em] mb-2">The Path to Sovereignty</h3>
                <h2 className="text-4xl md:text-5xl font-bold text-white font-serif">Election Day 2026</h2>
                <p className="text-blue-200 text-xs mt-2">Target: May 15, 2026</p>
            </div>
            
            {/* Cards */}
            <div className="flex gap-3 md:gap-5" data-aos="zoom-in">
                <div className="glass-card p-6 rounded-xl flex flex-col items-center justify-center w-28 md:w-32 hover:-translate-y-2 transition duration-300">
                    <span className="block text-4xl md:text-5xl font-bold text-white mb-1 leading-none">May</span>
                </div>
                <div className="glass-card p-6 rounded-xl flex flex-col items-center justify-center w-28 md:w-32 hover:-translate-y-2 transition duration-300">
                    <span className="block text-4xl md:text-5xl font-bold text-white mb-1 leading-none">15</span>
                </div>
                <div className="glass-card p-6 rounded-xl flex flex-col items-center justify-center w-28 md:w-32 hover:-translate-y-2 transition duration-300">
                    <span className="block text-4xl md:text-5xl font-bold text-white mb-1 leading-none">2026</span>
                </div>
            </div>
            
            <div data-aos="fade-left">
                <a href="https://somaliyouthparty.com" target="_blank" rel="noopener noreferrer" className="bg-white text-[#0c2448] px-8 py-4 rounded-full font-bold hover:bg-brand-dark hover:text-white transition shadow-lg flex items-center gap-2">
                    JOIN THE NETWORK <i className="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        </div>
      </section>

      {/* --- ACTION CARDS --- */}
      <section className="relative z-20 md:-mt-12 mb-12 md:mb-20 pt-12 md:pt-0">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-8 shadow-xl rounded-sm border-t-4 border-brand-blue hover:-translate-y-2 transition duration-300"><i className="fa-solid fa-check-to-slot text-3xl text-brand-blue mb-4"></i><h3 className="font-serif font-bold text-lg mb-2">Register to Vote</h3><p className="text-slate-500 text-xs">Make your voice heard.</p></div>
                <div className="bg-white p-8 shadow-xl rounded-sm border-t-4 border-blue-400 hover:-translate-y-2 transition duration-300"><i className="fa-regular fa-calendar-check text-3xl text-blue-400 mb-4"></i><h3 className="font-serif font-bold text-lg mb-2">Attend Events</h3><p className="text-slate-500 text-xs">Meet Nasir Ige.</p></div>
                <div className="bg-brand-blue p-8 shadow-xl rounded-sm text-white hover:-translate-y-2 transition duration-300"><i className="fa-solid fa-bullhorn text-3xl mb-4 text-white"></i><h3 className="font-serif font-bold text-lg mb-2 text-white">Get Involved</h3><p className="text-blue-100 text-xs">Make a real impact.</p></div>
                <div className="bg-white p-8 shadow-xl rounded-sm border-t-4 border-brand-blue hover:-translate-y-2 transition duration-300"><i className="fa-solid fa-handshake text-3xl text-brand-blue mb-4"></i><h3 className="font-serif font-bold text-lg mb-2">Support Vision</h3><p className="text-slate-500 text-xs">Help us build the future.</p></div>
            </div>
        </div>
      </section>

      {/* --- PRIORITIES GRID --- */}
      <section className="py-12 md:py-16 bg-white" id="priority">
         <div className="container mx-auto px-6 text-center mb-10 md:mb-16">
            <p className="text-brand-somalia uppercase text-xs font-bold tracking-widest mb-2">Our Priority</p>
            <h2 className="text-4xl font-serif font-bold text-brand-dark mb-4">What Somalia <span className="text-brand-somalia italic">Needs</span></h2>
        </div>
        <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-slate-100">
             <div className="bg-white p-10 hover:scale-105 transition duration-300 border-r border-b border-slate-100 group" data-aos="fade-up">
                <div className="text-brand-somalia text-3xl mb-4"><i className="fa-solid fa-chart-line"></i></div><h3 className="font-serif font-bold text-lg mb-2">Economic</h3><p className="text-xs text-slate-500">Sustainable growth.</p>
             </div>
             <div className="bg-brand-somaliaLight p-10 hover:scale-105 transition duration-300 border-r border-b lg:border-r border-slate-100 group" data-aos="fade-up" data-aos-delay="100">
                <div className="text-brand-somalia text-3xl mb-4"><i className="fa-solid fa-heart-pulse"></i></div><h3 className="font-serif font-bold text-lg mb-2">Medical</h3><p className="text-xs text-slate-500">Accessible healthcare.</p>
             </div>
             <div className="bg-brand-somaliaLight lg:bg-white p-10 hover:scale-105 transition duration-300 border-r border-b border-slate-100 group" data-aos="fade-up" data-aos-delay="200">
                <div className="text-brand-somalia text-3xl mb-4"><i className="fa-solid fa-users"></i></div><h3 className="font-serif font-bold text-lg mb-2">Social</h3><p className="text-xs text-slate-500">Equality for all.</p>
             </div>
             <div className="bg-white lg:bg-brand-somaliaLight p-10 hover:scale-105 transition duration-300 border-b border-slate-100 group" data-aos="fade-up" data-aos-delay="300">
                <div className="text-brand-somalia text-3xl mb-4"><i className="fa-solid fa-shield-halved"></i></div><h3 className="font-serif font-bold text-lg mb-2">Security</h3><p className="text-xs text-slate-500">National safety.</p>
             </div>
             <div className="bg-white lg:bg-brand-somaliaLight p-10 hover:scale-105 transition duration-300 border-b lg:border-b-0 border-r border-slate-100 group" data-aos="fade-up" data-aos-delay="400">
                <div className="text-brand-somalia text-3xl mb-4"><i className="fa-solid fa-graduation-cap"></i></div><h3 className="font-serif font-bold text-lg mb-2">Education</h3><p className="text-xs text-slate-500">Universal literacy.</p>
             </div>
             <div className="bg-brand-somaliaLight lg:bg-white p-10 hover:scale-105 transition duration-300 border-b lg:border-b-0 border-r border-slate-100 group" data-aos="fade-up" data-aos-delay="500">
                <div className="text-brand-somalia text-3xl mb-4"><i className="fa-solid fa-droplet"></i></div><h3 className="font-serif font-bold text-lg mb-2">Water</h3><p className="text-xs text-slate-500">Clean access.</p>
             </div>
             <div className="bg-brand-somaliaLight lg:bg-brand-somaliaLight p-10 hover:scale-105 transition duration-300 border-r border-slate-100 group" data-aos="fade-up" data-aos-delay="600">
                <div className="text-brand-somalia text-3xl mb-4"><i className="fa-solid fa-solar-panel"></i></div><h3 className="font-serif font-bold text-lg mb-2">Energy</h3><p className="text-xs text-slate-500">Renewable power.</p>
             </div>
             <div className="bg-white p-10 hover:scale-105 transition duration-300 group" data-aos="fade-up" data-aos-delay="700">
                <div className="text-brand-somalia text-3xl mb-4"><i className="fa-solid fa-fish-fins"></i></div><h3 className="font-serif font-bold text-lg mb-2">Fisheries</h3><p className="text-xs text-slate-500">Resource protection.</p>
             </div>
        </div>
      </section>

      {/* --- ABOUT --- */}
      <section className="py-12 md:py-16" id="about">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
                <div className="bg-gray-200 p-4 pb-24 rounded-sm relative overflow-hidden">
                    <img src="/img.png" className="w-full object-cover object-top h-[500px] grayscale hover:grayscale-0 transition duration-500" alt="Nasir Ige" />
                    <div className="absolute bottom-8 left-8 right-8 bg-white p-6 shadow-xl border-l-4 border-blue-600 rounded-r-lg z-10">
                        <p className="text-sm text-slate-700 italic font-medium mb-3">"True leadership is not just about power, it is about empowering the people."</p>
                        <div className="flex items-center gap-2">
                             <div className="h-0.5 w-8 bg-blue-600"></div>
                             <p className="text-xs font-bold text-blue-800 uppercase tracking-widest">Nasir Ige</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <p className="text-blue-600 uppercase text-xs font-bold tracking-widest mb-2">Our Vision</p>
                <h2 className="text-4xl font-serif font-bold text-brand-dark mb-6">Women are the <span className="text-blue-600">Vital Backbone</span> <br/> of our <span className="italic text-blue-600">Thriving Society.</span></h2>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8 shadow-sm">
                    <i className="fa-solid fa-quote-left text-blue-200 text-3xl mb-2 block"></i>
                    <p className="text-slate-700 leading-relaxed text-lg font-serif italic">
                        If entrusted with the presidency, I make a solemn pledge to shatter historical barriers by appointing a highly qualified, visionary woman to serve as our nation's next Prime Minister. This is a necessary step to prove that our country’s strength lies in the wisdom and leadership of our entire society.
                    </p>
                </div>
                <p className="text-black inline-block border-b-2 border-blue-600 pb-1 text-xs font-bold tracking-wide uppercase">
                    Presidential Candidate Nasir Ige
                </p>
            </div>
        </div>
      </section>

      {/* --- TIMELINE (SPLIT: MOBILE ZIG-ZAG vs DESKTOP HORIZONTAL) --- */}
      <section className="py-12 md:py-16 bg-white relative">
        <div className="container mx-auto px-6 text-center mb-10 md:mb-16" data-aos="fade-down">
             <p className="text-blue-600 uppercase text-xs font-bold tracking-widest mb-2">The Journey</p>
             <h2 className="text-4xl font-serif font-bold text-brand-dark">Legacy of <span className="italic text-blue-600">Leadership</span></h2>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
             
             {/* =======================
                 MOBILE TIMELINE (Zig-Zag Vertical)
                 ======================= */}
             <div className="lg:hidden relative py-4">
                 {/* Central Line */}
                 <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2"></div>
                 
                 <div className="flex flex-col relative z-10 w-full">
                    
                    {/* Item 1: LEFT */}
                    <div className="flex w-full justify-between items-center mb-8 relative">
                         {/* Content Left */}
                         <div className="w-[45%] text-right pr-6" data-aos="fade-right">
                             <h3 className="text-lg font-bold text-brand-dark">2012</h3>
                             <p className="text-slate-600 text-xs mt-1">Restored electricity.</p>
                             <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded">Infrastructure</span>
                         </div>
                         {/* Dot Center */}
                         <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-somalia rounded-full border-4 border-white shadow-lg z-20"></div>
                         {/* Empty Right */}
                         <div className="w-[45%] pl-6"></div>
                    </div>

                    {/* Item 2: RIGHT */}
                    <div className="flex w-full justify-between items-center mb-8 relative">
                         {/* Empty Left */}
                         <div className="w-[45%] pr-6"></div>
                         {/* Dot Center */}
                         <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-dark rounded-full border-4 border-white shadow-lg z-20"></div>
                         {/* Content Right */}
                         <div className="w-[45%] text-left pl-6" data-aos="fade-left">
                             <h3 className="text-lg font-bold text-brand-dark">2015</h3>
                             <p className="text-slate-600 text-xs mt-1">Galmudug Dialogue.</p>
                             <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded">Diplomacy</span>
                         </div>
                    </div>

                    {/* Item 3: LEFT */}
                    <div className="flex w-full justify-between items-center mb-8 relative">
                         <div className="w-[45%] text-right pr-6" data-aos="fade-right">
                             <h3 className="text-lg font-bold text-brand-dark">2018</h3>
                             <p className="text-slate-600 text-xs mt-1">Built 20 schools.</p>
                             <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded">Education</span>
                         </div>
                         <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-somalia rounded-full border-4 border-white shadow-lg z-20"></div>
                         <div className="w-[45%] pl-6"></div>
                    </div>

                    {/* Item 4: RIGHT */}
                    <div className="flex w-full justify-between items-center mb-8 relative">
                         <div className="w-[45%] pr-6"></div>
                         <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-dark rounded-full border-4 border-white shadow-lg z-20"></div>
                         <div className="w-[45%] text-left pl-6" data-aos="fade-left">
                             <h3 className="text-lg font-bold text-brand-dark">2021</h3>
                             <p className="text-slate-600 text-xs mt-1">National Task Force.</p>
                             <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded">Health</span>
                         </div>
                    </div>

                    {/* Item 5: LEFT */}
                    <div className="flex w-full justify-between items-center relative">
                         <div className="w-[45%] text-right pr-6" data-aos="fade-right">
                             <h3 className="text-lg font-bold text-brand-dark">2024</h3>
                             <p className="text-slate-600 text-xs mt-1">Launched Campaign.</p>
                             <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded">Leadership</span>
                         </div>
                         <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-somalia rounded-full border-4 border-white shadow-lg z-20"></div>
                         <div className="w-[45%] pl-6"></div>
                    </div>

                 </div>
             </div>


             {/* =======================
                 DESKTOP TIMELINE (Horizontal Wavy)
                 ======================= */}
             <div className="hidden lg:block relative w-full">
                 <div className="timeline-wavy-horizontal"></div>
                 
                 <div className="flex justify-between items-center relative z-10 w-full">
                    
                    {/* Item 1 (Top) */}
                    <div className="flex flex-col items-center group">
                       <div className="h-24 flex flex-col justify-end items-center mb-4" data-aos="fade-down">
                           <h3 className="text-lg font-bold text-brand-dark">2012</h3>
                           <p className="text-slate-600 text-xs mt-1">Restored electricity.</p>
                       </div>
                       <div className="w-4 h-4 bg-brand-somalia rounded-full border-4 border-white shadow-lg z-10"></div>
                       <div className="h-24 flex flex-col justify-start items-center mt-4" data-aos="fade-up">
                           <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded">Infrastructure</span>
                       </div>
                    </div>

                    {/* Item 2 (Bottom) */}
                    <div className="flex flex-col items-center group">
                       <div className="h-24 flex flex-col justify-end items-center mb-4" data-aos="fade-down">
                           <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded">Diplomacy</span>
                       </div>
                       <div className="w-4 h-4 bg-brand-dark rounded-full border-4 border-white shadow-lg z-10"></div>
                       <div className="h-24 flex flex-col justify-start items-center mt-4" data-aos="fade-up">
                           <h3 className="text-lg font-bold text-brand-dark">2015</h3>
                           <p className="text-slate-600 text-xs mt-1">Galmudug Dialogue.</p>
                       </div>
                    </div>

                    {/* Item 3 (Top) */}
                    <div className="flex flex-col items-center group">
                       <div className="h-24 flex flex-col justify-end items-center mb-4" data-aos="fade-down">
                           <h3 className="text-lg font-bold text-brand-dark">2018</h3>
                           <p className="text-slate-600 text-xs mt-1">Built 20 schools.</p>
                       </div>
                       <div className="w-4 h-4 bg-brand-somalia rounded-full border-4 border-white shadow-lg z-10"></div>
                       <div className="h-24 flex flex-col justify-start items-center mt-4" data-aos="fade-up">
                           <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded">Education</span>
                       </div>
                    </div>

                     {/* Item 4 (Bottom) */}
                     <div className="flex flex-col items-center group">
                       <div className="h-24 flex flex-col justify-end items-center mb-4" data-aos="fade-down">
                           <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded">Health</span>
                       </div>
                       <div className="w-4 h-4 bg-brand-dark rounded-full border-4 border-white shadow-lg z-10"></div>
                       <div className="h-24 flex flex-col justify-start items-center mt-4" data-aos="fade-up">
                           <h3 className="text-lg font-bold text-brand-dark">2021</h3>
                           <p className="text-slate-600 text-xs mt-1">National Task Force.</p>
                       </div>
                    </div>

                    {/* Item 5 (Top) */}
                    <div className="flex flex-col items-center group">
                       <div className="h-24 flex flex-col justify-end items-center mb-4" data-aos="fade-down">
                           <h3 className="text-lg font-bold text-brand-dark">2024</h3>
                           <p className="text-slate-600 text-xs mt-1">Launched Campaign.</p>
                       </div>
                       <div className="w-4 h-4 bg-brand-somalia rounded-full border-4 border-white shadow-lg z-10"></div>
                       <div className="h-24 flex flex-col justify-start items-center mt-4" data-aos="fade-up">
                           <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded">Leadership</span>
                       </div>
                    </div>

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
                    <h2 className="text-4xl font-serif font-bold">Moments of <span className="italic text-blue-400">Unity</span></h2>
                </div>
                <a href="#" className="text-xs font-bold tracking-widest border-b border-blue-400 pb-1 hover:text-blue-400 transition mt-6 md:mt-0 text-left md:text-right" data-aos="fade-left">FOLLOW ON INSTAGRAM</a>
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
      <section className="py-20 relative flex items-center justify-center bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2072')" }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white" data-aos="zoom-in">
            <i className="fa-solid fa-quote-left text-4xl text-blue-400 mb-6 opacity-80"></i>
            <h2 className="text-3xl md:text-5xl font-serif italic leading-normal mb-8">"Waxaan rabnaa i aan awooda dib ugu celino Dhalinyarada, sidoo kalena talada dalka qaybtooda aan siino haweenka"</h2>
            <p className="uppercase tracking-[0.2em] font-bold text-sm opacity-80">— Nasir Ige</p>
        </div>
      </section>

      {/* --- ADVISORS --- */}
      <section className="py-12 md:py-16 bg-white" id="advisors">
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
                {[
                    { date: 'NOV 24, 2025', category: 'International Tour', title: 'Grand Diaspora Welcome in Sweden', desc: 'Presidential Candidate Nasir Ige receives a thunderous and historic reception from the Somali community upon his arrival in Sweden.', loc: 'Sweden', url: 'https://www.facebook.com/watch/?v=1166128272402732' },
                    { date: 'NOV 25, 2025', category: 'Gala Event', title: 'Sweden Victory Ceremony', desc: 'An electric atmosphere at the "Xaflada Sweden" where Nasir Ige shared his bold vision for a united and prosperous future.', loc: 'Stockholm, Sweden', url: 'https://www.facebook.com/watch/?v=1166128272402732' },
                    { date: 'DEC 15, 2025', category: 'Keynote Speech', title: 'The Garowe Declaration', desc: 'A pivotal moment in Puntland as Nasir Ige delivers a powerful speech on unity, greeted by thousands of supporters in Garowe.', loc: 'Garowe, Puntland', url: 'https://www.facebook.com/watch/?v=1424889892385666' }
                ].map((ev, i) => (
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
                                <span className="text-xs font-bold text-slate-500 flex items-center gap-2"><i className="fa-solid fa-location-dot text-blue-500"></i> {ev.loc}</span>
                                <a href={ev.url} target="_blank" rel="noopener noreferrer" className="text-white bg-blue-600 hover:bg-blue-700 text-xs font-bold px-4 py-2 rounded-lg transition flex items-center gap-2 shadow-lg shadow-blue-200"><i className="fa-solid fa-play"></i> WATCH VIDEO</a>
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
      <section className="py-12 md:py-16 bg-white border-y border-slate-100" id="manifesto">
        <div className="container mx-auto px-6">
            <div className="glass-card-dark animated-gradient-bg p-12 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden" data-aos="fade-up">
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

      {/* --- BLOG --- */}
      <section className="py-12 md:py-16 bg-slate-50" id="blog">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <p className="text-blue-600 uppercase text-xs font-bold tracking-widest mb-2">Media & Press</p>
                <h2 className="text-4xl font-serif font-bold text-brand-dark inline-block border-b-2 border-blue-200 pb-2">Campaign Updates & <span className="text-blue-600 italic">Latest News</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-auto md:h-[500px] mb-12">
                <a href="https://www.facebook.com/onderzoekJournalist/posts/somali-politician-nasir-ige-who-previously-served-as-a-senior-political-advisor-/1374233577401102/" target="_blank" rel="noopener noreferrer" className="relative h-[400px] md:h-full w-full overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer">
                    <img src="https://nasaige.com/wp-content/uploads/2022/11/WhatsApp-Image-2022-10-30-at-02.18.15.jpg" alt="Nasir Ige Candidacy" className="absolute inset-0 w-full h-full object-cover object-top transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-95 transition"></div>
                    <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
                        <div className="flex items-center gap-3 mb-4">
                             <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 uppercase rounded-sm tracking-wide">Official Statement</span>
                             <span className="text-slate-300 text-xs font-semibold"><i className="fa-regular fa-calendar mr-1"></i> Nov 18, 2025</span>
                        </div>
                        <h3 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight mb-3 group-hover:text-blue-400 transition">Nasir Ige Officially Declares Candidacy for 2026 Presidency</h3>
                        <p className="text-slate-300 text-sm md:text-base line-clamp-2 md:line-clamp-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Former Senior Political Advisor and diplomat announces his bid to lead the Federal Republic of Somalia, promising a new era of reform-oriented governance.</p>
                    </div>
                </a>
                <div className="flex flex-col gap-6 h-full">
                    <a href="https://www.soomaalinimo.com/2025/12/somalia-presidential-candidate-nasa-ige.html" target="_blank" rel="noopener noreferrer" className="relative flex-1 overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white border border-slate-100 flex flex-row md:flex-row">
                          <div className="w-1/3 relative overflow-hidden">
                             <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5KP8jRTunykQOnmziEm0ib1jBz3EVfAUD3nQLNZwSeQTIFQpTWOkIQaxPO1ctB00-te2aoWO8YeZ6nqBD-waaqjlyGcbsY1wutwnPQb8-aPzXJLKDgIIk79dg-oqCGrhjFJE6S4NbDHwc4cd-jgJb9mp-AaOc5XvWaNQGX8kdCogJ_Mq0FjZoViNtTlxi/w403-h490-rw/589587964_24672926419052523_7666588254033096270_n.jpg" className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" alt="Female Leader" />
                             <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition"></div>
                          </div>
                          <div className="w-2/3 p-6 flex flex-col justify-center bg-white relative">
                             <span className="text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-2">Policy Pledge</span>
                             <h4 className="text-xl font-serif font-bold text-slate-800 mb-2 leading-snug group-hover:text-blue-700 transition">Historic Promise: Appointing a Female Prime Minister</h4>
                             <p className="text-slate-500 text-xs line-clamp-2">Breaking barriers: Nasir Ige vows to empower women at the highest level of government if elected.</p>
                             <span className="text-slate-400 text-[10px] mt-3 font-semibold">Dec 02, 2025</span>
                          </div>
                    </a>
                    <a href="https://www.facebook.com/100046989917710/posts/nasir-cige-oo-hore-u-soo-noqday-la-taliye-ka-tirsan-xafiiska-madaxweynaha-ahna-d/1386806012895716/" target="_blank" rel="noopener noreferrer" className="relative flex-1 overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white border border-slate-100 flex flex-row md:flex-row">
                          <div className="w-1/3 relative overflow-hidden">
                             <img src="https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/584460156_1386805759562408_481910161125043664_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=VItiu1GV6-kQ7kNvwHxPY9O&_nc_oc=Adnqr52UrOLAuHYUQ2f25ir-BaDT-aSM2NxpzCO12WpaYq0X4s-NNAp03xcEHOWvWco&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=u0hATC-VkairiTflTCvLWg&oh=00_AfmWA6cpxLGkhSPaJ4euvmYEVglwDsLpIyVkHT72_p8ZtQ&oe=694AB68D" className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" alt="Nasir Ige" />
                             <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition"></div>
                          </div>
                          <div className="w-2/3 p-6 flex flex-col justify-center bg-white relative">
                             <span className="text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-2">Wararka</span>
                             <h4 className="text-xl font-serif font-bold text-slate-800 mb-2 leading-snug group-hover:text-blue-700 transition">Nasir Cige oo ku dhawaaqay Musharraxnimadiisa 2026</h4>
                             <p className="text-slate-500 text-xs line-clamp-2">Nasir Cige oo hore u soo noqday la taliye ka tirsan Xafiiska Madaxweynaha ayaa si rasmi ah u shaaciyay...</p>
                             <span className="text-slate-400 text-[10px] mt-3 font-semibold">Nov 18, 2025</span>
                          </div>
                    </a>
                </div>
            </div>
            <div className="text-center">
                <a href="/news" className="inline-flex bg-brand-dark text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition shadow-lg items-center gap-3 text-sm tracking-wide">
                    READ ALL NEWS <i className="fa-solid fa-arrow-right-long"></i>
                </a>
            </div>
        </div>
      </section>

      {/* --- MARQUEE --- */}
      <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
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

      {/* --- SHOP --- */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-6 text-center mb-16">
             <p className="text-blue-600 uppercase text-xs font-bold tracking-widest mb-2">Wear The Change</p>
             <h2 className="text-4xl font-serif font-bold text-brand-dark">Campaign <span className="italic text-blue-600">Store</span></h2>
        </div>
        <div className="container mx-auto px-6 flex flex-wrap justify-center gap-8">
            {products.map((prod, i) => (
                <div key={i} className="group cursor-pointer w-full md:w-80 relative" data-aos="fade-up" data-aos-delay={i*50}>
                    <div className="bg-gray-100 h-64 flex items-center justify-center rounded-lg mb-4 overflow-hidden relative p-6">
                        <img src={prod.i} className="w-full h-full object-contain group-hover:scale-110 transition duration-500" />
                        {prod.b && <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">{prod.b}</div>}
                        <div className="absolute bottom-4 left-0 right-0 text-center">
                            <button onClick={() => addToCart(prod)} className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition">
                                ADD TO CART <i className="fa-solid fa-plus ml-1"></i>
                            </button>
                        </div>
                    </div>
                    <h3 className="font-bold text-lg">{prod.n}</h3>
                    <p className="text-sm text-slate-500 mb-2">{prod.sub}</p>
                    <p className="font-bold text-brand-dark">{prod.p}</p>
                </div>
            ))}
        </div>
        <div className="text-center mt-16" data-aos="fade-up">
            <a href="/shop" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full transition duration-300 shadow-lg hover:shadow-xl uppercase tracking-wider text-sm">
                Explore More Products
            </a>
        </div>
      </section>

      {/* --- SUBSCRIBE FORM --- */}
      <section className="bg-blue-600 py-12 relative overflow-hidden">
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
      <footer className="bg-brand-dark text-slate-300 py-12 border-t border-white/10">
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