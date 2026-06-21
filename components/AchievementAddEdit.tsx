"use client";

import React, { useState, useEffect } from "react";
import { 
  Save, 
  X, 
  Image as ImageIcon, 
  Settings2, 
  Loader2, 
  Target, 
  Trophy, 
  Star, 
  Award, 
  Sparkles,
  Zap
} from "lucide-react";

// The schema representing the database structure
export interface AchievementFormData {
  id?: string;
  title: string;
  subtitle: string;
  metric: string;
  desc: string;
  img: string;
  iconName: string; // Stores the string reference for the icon
  gradient: string;
}

interface AchievementAddEditProps {
  initialData?: AchievementFormData | null;
  onSave: (data: AchievementFormData) => Promise<void>;
  onCancel: () => void;
}

// Preset visual options
const GRADIENT_OPTIONS = [
  { label: "Indigo to Purple", value: "from-indigo-600 to-purple-600" },
  { label: "Amber to Orange", value: "from-amber-500 to-orange-600" },
  { label: "Teal to Emerald", value: "from-teal-500 to-emerald-600" },
  { label: "Rose to Pink", value: "from-rose-500 to-pink-600" },
  { label: "Blue to Cyan", value: "from-blue-600 to-cyan-500" },
  { label: "Fuchsia to Red", value: "from-fuchsia-600 to-red-600" },
];

const ICON_OPTIONS = ["Target", "Trophy", "Star", "Award", "Sparkles", "Zap"];

export default function AchievementAddEdit({ initialData, onSave, onCancel }: AchievementAddEditProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form state with default modern values
  const [formData, setFormData] = useState<AchievementFormData>({
    title: "",
    subtitle: "",
    metric: "",
    desc: "",
    img: "",
    iconName: "Trophy",
    gradient: "from-indigo-600 to-purple-600",
  });

  // Populate data if editing an existing achievement
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Handle standard Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSave(formData);
    } catch (error) {
      console.error("Failed to save achievement:", error);
      alert("Failed to save achievement. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-50 dark:bg-[#050505] overflow-y-auto animate-fade-in-up">
      <form onSubmit={handleSubmit} className="min-h-screen flex flex-col">
        
        {/* Editor Top Navbar */}
        <div className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              type="button" 
              onClick={onCancel} 
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Cancel"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
            <span className="text-sm font-bold uppercase tracking-widest text-slate-400">
              {initialData ? "Edit Achievement" : "New Achievement"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-full font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSubmitting ? "Saving..." : "Save Achievement"}
            </button>
          </div>
        </div>

        {/* Form Main Layout */}
        <div className="flex-1 max-w-5xl w-full mx-auto p-6 lg:p-12">
          <div className="bg-white dark:bg-[#0a0a0a] rounded-[2rem] border border-slate-200 dark:border-white/10 p-8 shadow-xl">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Category / Title Input */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">
                  Category / Title
                </label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  placeholder="e.g. National Public Infrastructure" 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-900 dark:text-white"
                />
              </div>

              {/* Subtitle / Project Name Input */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">
                  Project Subtitle
                </label>
                <input 
                  type="text" 
                  name="subtitle" 
                  value={formData.subtitle} 
                  onChange={handleChange} 
                  placeholder="e.g. Digital Embassy Ecosystem" 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Metric Highlight */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">
                  Key Metric
                </label>
                <input 
                  type="text" 
                  name="metric" 
                  value={formData.metric} 
                  onChange={handleChange} 
                  placeholder="e.g. 100% Secured or 10k+ Tenants" 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-900 dark:text-white text-xl font-bold"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                  <ImageIcon className="w-4 h-4" /> Cover Image URL
                </label>
                <input 
                  type="url" 
                  name="img" 
                  value={formData.img} 
                  onChange={handleChange} 
                  placeholder="https://images.unsplash.com/..." 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">
                Impact Description
              </label>
              <textarea 
                name="desc" 
                value={formData.desc} 
                onChange={handleChange} 
                placeholder="Describe the architectural impact, challenges solved, or systems scaled..." 
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-900 dark:text-white resize-none"
              />
            </div>

            {/* UI Configuration */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
              <h4 className="text-sm font-bold flex items-center gap-2 mb-6 text-slate-900 dark:text-white">
                <Settings2 className="w-4 h-4 text-indigo-500" /> UI Configuration
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Gradient Selector */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">
                    Metric Text Gradient
                  </label>
                  <select 
                    name="gradient" 
                    value={formData.gradient} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-900 dark:text-white appearance-none"
                  >
                    {GRADIENT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {/* Live Gradient Preview */}
                  <div className="mt-3">
                    <span className={`text-xl font-black bg-gradient-to-r ${formData.gradient} bg-clip-text text-transparent`}>
                      Preview Color
                    </span>
                  </div>
                </div>

                {/* Icon Selector */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">
                    Accent Icon
                  </label>
                  <select 
                    name="iconName" 
                    value={formData.iconName} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-900 dark:text-white appearance-none"
                  >
                    {ICON_OPTIONS.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

          </div>
        </div>

      </form>
    </div>
  );
}