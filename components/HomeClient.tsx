"use client"; // This marks this file as interactive (Javascript allowed)

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { db } from "@/lib/firebase"; // Imports from Step 1
import { collection, addDoc, doc, updateDoc, increment, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";

// Type definition for the form
type VolunteerData = {
  name: string;
  email: string;
  phone: string;
  role: string;
};

export default function HomeClient() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 1. SETUP FORM
  const { register, handleSubmit, reset, formState: { isSubmitting, isSubmitSuccessful } } = useForm<VolunteerData>();

  // 2. ON LOAD: START ANIMATIONS & COUNT VISIT
  useEffect(() => {
    AOS.init({ once: true, offset: 100, duration: 800 });

    // This counts the visit in Firebase
    const countVisit = async () => {
      const ref = doc(db, "analytics", "visitors");
      try {
        await updateDoc(ref, { total: increment(1) });
      } catch (e) {
        await setDoc(ref, { total: 1 }); // Create if doesn't exist
      }
    };
    countVisit();
  }, []);

  // 3. HANDLE FORM SUBMIT
  const onSubmit = async (data: VolunteerData) => {
    try {
      await addDoc(collection(db, "volunteers"), {
        ...data,
        createdAt: new Date(),
      });
      alert("Success! Data sent to Firebase.");
      reset();
    } catch (error) {
      alert("Error sending data.");
    }
  };

  return (
    <main className="font-sans text-slate-800 bg-white overflow-x-hidden">
      
      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0c2448] shadow-xl">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white font-serif">Nasa Ige.</div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-white text-sm tracking-widest uppercase font-medium">
            <Link href="#about" className="hover:text-blue-400">About</Link>
            <Link href="#issues" className="hover:text-blue-400">Issues</Link>
            <Link href="#gallery" className="hover:text-blue-400">Gallery</Link>
            <Link href="#volunteer" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">Join Us</Link>
          </nav>

          {/* Mobile Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white text-2xl">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
           <div className="bg-[#0c2448] border-t border-white/10 p-4 text-white flex flex-col gap-4 md:hidden">
              <Link href="#about" onClick={()=>setIsMobileMenuOpen(false)}>About</Link>
              <Link href="#issues" onClick={()=>setIsMobileMenuOpen(false)}>Issues</Link>
              <Link href="#volunteer" onClick={()=>setIsMobileMenuOpen(false)}>Join Us</Link>
           </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center pt-20 bg-[#0c2448] text-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div data-aos="fade-right">
            <div className="inline-block px-3 py-1 bg-blue-600/20 border border-blue-500 rounded-full text-blue-300 text-xs font-bold tracking-widest mb-6">
              INDEPENDENT • UNITED
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8">
              Make <span className="text-blue-500 italic">Somalia</span> <br/> Great Again
            </h1>
            <div className="flex gap-4">
              <Link href="/manifesto" className="px-8 py-4 bg-blue-600 font-bold rounded hover:bg-blue-700 transition">
                READ VISION
              </Link>
              <Link href="#volunteer" className="px-8 py-4 border border-white/20 font-bold rounded hover:bg-white/10 transition">
                VOLUNTEER
              </Link>
            </div>
          </div>
          
          {/* Candidate Image */}
          <div className="relative h-[500px] w-full" data-aos="zoom-in">
             <Image 
               src="https://firebasestorage.googleapis.com/v0/b/guriapp123.firebasestorage.app/o/Gg%2F20251120_134403.png?alt=media&token=0258e491-8eae-48b2-b427-8d76c6197581"
               alt="Nasa Ige"
               fill
               className="object-contain object-bottom"
             />
          </div>
        </div>
      </section>

      {/* --- VOLUNTEER FORM SECTION (Connected to Firebase) --- */}
      <section id="volunteer" className="py-24 bg-blue-600 relative">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-serif font-bold text-white mb-8">Join The Movement</h2>
            
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg mx-auto text-left">
                {isSubmitSuccessful ? (
                    <div className="text-green-600 text-center font-bold text-xl">Thank you! We received your info.</div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500">FULL NAME</label>
                            <input {...register("name", {required:true})} className="w-full border p-3 rounded" placeholder="Your Name" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500">PHONE</label>
                            <input {...register("phone", {required:true})} className="w-full border p-3 rounded" placeholder="+252..." />
                        </div>
                        <div>
                             <label className="text-xs font-bold text-gray-500">I WANT TO...</label>
                             <select {...register("role")} className="w-full border p-3 rounded">
                                <option value="volunteer">Volunteer</option>
                                <option value="host">Host Event</option>
                             </select>
                        </div>
                        <button disabled={isSubmitting} className="w-full bg-[#0c2448] text-white py-4 font-bold rounded hover:bg-blue-900">
                            {isSubmitting ? "SENDING..." : "SUBMIT"}
                        </button>
                    </form>
                )}
            </div>
        </div>
      </section>

    </main>
  );
}