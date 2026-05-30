"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// 1. Define the strictly typed validation schema using Zod
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(8, { message: "Please enter a valid phone number." }),
  type: z.string().min(2, { message: "Please specify a project type." }),
  message: z.string().min(10, { message: "Please provide a bit more detail about your vision." }),
});

// Infer TypeScript types directly from the Zod schema
type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur", // Validates smoothly when the user leaves the field
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // TODO: Replace with your actual Firebase addDoc or API route logic
      console.log("Form Data Submitted:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network request
      
      setSubmitStatus("success");
      reset(); // Clear form on success
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pt-8 pb-24 relative z-10 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-slate-50 dark:bg-[#0a0a0a] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl border border-slate-200 dark:border-white/5">
          
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-teal-500/10 blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left Side: Typography & Info */}
            <div className="w-full lg:w-5/12 text-center lg:text-left">
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-slate-900 dark:text-white">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Scale?</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
                Accepting new enterprise contracts and freelance projects. Fill out the form, and let's map out the architecture for your next big move.
              </p>
              
              <div className="hidden lg:flex flex-col gap-4 mt-12">
                <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <span className="font-medium">info@mubarikosman.com</span>
                </div>
              </div>
            </div>

            {/* Right Side: Smart Form */}
            <div className="w-full lg:w-7/12">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="relative">
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="Magacaaga (Your Name)"
                      className={`w-full bg-white dark:bg-white/5 border ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-white/10 focus:border-indigo-500'} rounded-2xl px-6 py-4 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all`}
                    />
                    {errors.name && (
                      <p className="absolute -bottom-5 left-2 text-xs font-bold text-red-500 animate-fade-in-up">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="Cinwaanka Emailka (Your Email)"
                      className={`w-full bg-white dark:bg-white/5 border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-white/10 focus:border-indigo-500'} rounded-2xl px-6 py-4 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all`}
                    />
                    {errors.email && (
                      <p className="absolute -bottom-5 left-2 text-xs font-bold text-red-500 animate-fade-in-up">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Input (Native) */}
                  <div className="relative mt-2 md:mt-0">
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="Phone Number (+252...)"
                      className={`w-full bg-white dark:bg-white/5 border ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-white/10 focus:border-indigo-500'} rounded-2xl px-6 py-4 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all`}
                    />
                    {errors.phone && (
                      <p className="absolute -bottom-5 left-2 text-xs font-bold text-red-500 animate-fade-in-up">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Project Type */}
                  <div className="relative mt-2 md:mt-0">
                    <input
                      {...register("type")}
                      type="text"
                      placeholder="Nooca Mashruuca (Project Type)"
                      className={`w-full bg-white dark:bg-white/5 border ${errors.type ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-white/10 focus:border-indigo-500'} rounded-2xl px-6 py-4 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all`}
                    />
                    {errors.type && (
                      <p className="absolute -bottom-5 left-2 text-xs font-bold text-red-500 animate-fade-in-up">{errors.type.message}</p>
                    )}
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="relative mt-2">
                  <textarea
                    {...register("message")}
                    placeholder="Faahfaahin (Tell me about your vision...)"
                    className={`w-full bg-white dark:bg-white/5 border ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-white/10 focus:border-indigo-500'} rounded-2xl px-6 py-4 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all h-32 resize-none`}
                  />
                  {errors.message && (
                    <p className="absolute -bottom-5 left-2 text-xs font-bold text-red-500 animate-fade-in-up">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button & Status */}
                <div className="pt-4 flex flex-col items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg py-4 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        SEND MESSAGE <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                      </>
                    )}
                  </button>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <p className="text-green-500 font-bold text-sm mt-4 animate-fade-in-up">
                      Waad mahadsantahay! Message sent successfully.
                    </p>
                  )}
                  {submitStatus === "error" && (
                    <p className="text-red-500 font-bold text-sm mt-4 animate-fade-in-up">
                      Khalad baa dhacay. Something went wrong, please try again.
                    </p>
                  )}
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}