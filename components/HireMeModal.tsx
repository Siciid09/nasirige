"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, Loader2 } from "lucide-react";

interface HireMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HireMeModal({ isOpen, onClose }: HireMeModalProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "", email: "", projectType: "Full-Stack Development", budget: "$1k - $5k", message: ""
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/hire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
      
      // Reset form after 3 seconds and close
      setTimeout(() => {
        setStatus("idle");
        setFormData({ name: "", email: "", projectType: "Full-Stack Development", budget: "$1k - $5k", message: "" });
        onClose();
      }, 3000);

    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      {/* Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-md" 
        onClick={onClose} 
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0a0a0a] rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden transform transition-all animate-scale-up">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-slate-100 dark:border-white/5">
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Let's build together.</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Tell me about your project and I'll get back to you within 24 hours.</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in-up">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Request Received!</h3>
              <p className="text-slate-500 dark:text-slate-400">I'll review your project details and reach out to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Your Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-900 dark:text-white" placeholder="John Doe" />
                </div>
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-900 dark:text-white" placeholder="john@company.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Type */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Service Required</label>
                  <select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-900 dark:text-white appearance-none">
                    <option>Full-Stack Development</option>
                    <option>Mobile App (Flutter)</option>
                    <option>UI/UX Design</option>
                    <option>Consulting & Architecture</option>
                  </select>
                </div>
                {/* Budget */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Project Budget</label>
                  <select name="budget" value={formData.budget} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-900 dark:text-white appearance-none">
                    <option>&lt; $1,000</option>
                    <option>$1,000 - $5,000</option>
                    <option>$5,000 - $10,000</option>
                    <option>$10,000+</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Project Details</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-900 dark:text-white resize-none" placeholder="Tell me about your goals, timeline, and technical requirements..."></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={status === "submitting"}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Sending Request...</>
                ) : (
                  <><Send className="w-5 h-5" /> Submit Inquiry</>
                )}
              </button>
              {status === "error" && <p className="text-red-500 text-sm text-center mt-4">Something went wrong. Please try again.</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}