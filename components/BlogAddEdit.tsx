"use client";

import React, { useState, useEffect } from "react";
import { Save, X, Image as ImageIcon, Tag, Clock, LayoutTemplate, Settings2, Loader2, Sparkles } from "lucide-react";

// The schema based on your professional structure
export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Storing markdown or HTML/block strings
  featuredImage: string;
  category: string;
  tags: string; // We will use a comma-separated string for easy editing
  author: string;
  status: "draft" | "published";
  readingTime: string;
  seoTitle?: string;
  seoDesc?: string;
  createdAt?: string; // <-- Added this
  updatedAt?: string; // <-- Added this
}

interface BlogAddEditProps {
  initialData: BlogPost | null;
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
}

export default function BlogAddEdit({ initialData, onSave, onCancel }: BlogAddEditProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form state
  const [formData, setFormData] = useState<BlogPost>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    category: "Engineering",
    tags: "",
    author: "Mubarik Osman", 
    status: "published", // <--- Defaults to published now!
    readingTime: "5 min read",
    seoTitle: "",
    seoDesc: "",
  });

  // Populate data if editing an existing post
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        // Ensure tags are a joined string if they come from the DB as an array
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(", ") : (initialData.tags || ""),
      });
    }
  }, [initialData]);

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Auto-generate Slug from Title
  const generateSlug = () => {
    if (!formData.title) return;
    const cleanSlug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData((prev) => ({ ...prev, slug: cleanSlug }));
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Clean up data before sending to Firebase (e.g., convert tags string to array)
      const cleanData = {
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        updatedAt: new Date().toISOString(),
        // If it's a new post, we could also attach a createdAt timestamp here, 
        // though your server/route.ts usually handles serverTimestamp()
      };

      await onSave(cleanData);
    } catch (error) {
      console.error("Failed to save post", error);
      alert("Failed to save post. Check console.");
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
            <button type="button" onClick={onCancel} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
            <span className="text-sm font-bold uppercase tracking-widest text-slate-400">
              {initialData ? "Edit Publication" : "New Publication"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <select 
              name="status" 
              value={formData.status} 
              onChange={handleChange}
              className="bg-transparent text-sm font-bold border-none outline-none cursor-pointer text-slate-600 dark:text-slate-300 focus:ring-0"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-full font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-70"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSubmitting ? "Saving..." : "Save Post"}
            </button>
          </div>
        </div>

        {/* Editor Main Layout (2 Columns) */}
        <div className="flex-1 max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Column: The Writing Experience */}
          <div className="lg:col-span-8 p-6 lg:p-12 border-r border-slate-200 dark:border-white/5">
            <div className="max-w-3xl mx-auto space-y-8">
              
              {/* Title Input */}
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="Article Title..." 
                required
                className="w-full text-4xl lg:text-6xl font-black bg-transparent border-none outline-none placeholder:text-slate-300 dark:placeholder:text-white/10 text-slate-900 dark:text-white focus:ring-0 p-0"
              />

              {/* Content Input (Textarea acting as Markdown/Block input) */}
              <div className="relative group">
                <textarea 
                  name="content" 
                  value={formData.content} 
                  onChange={handleChange} 
                  placeholder="Start writing your engineering thoughts... (Markdown supported)" 
                  required
                  rows={25}
                  className="w-full text-lg leading-relaxed bg-transparent border-none outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-700 dark:text-slate-300 focus:ring-0 p-0 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Metadata & Settings */}
          <div className="lg:col-span-4 p-6 lg:p-8 bg-slate-50 dark:bg-[#0a0a0a] space-y-10">
            
            {/* Slug Generation */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                <Settings2 className="w-4 h-4" /> URL Slug
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  name="slug" 
                  value={formData.slug} 
                  onChange={handleChange} 
                  required
                  className="flex-1 bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
                />
                <button type="button" onClick={generateSlug} className="px-4 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-100 transition-colors" title="Auto-generate from title">
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                <ImageIcon className="w-4 h-4" /> Featured Image URL
              </label>
              <input 
                type="url" 
                name="featuredImage" 
                value={formData.featuredImage} 
                onChange={handleChange} 
                placeholder="https://unsplash.com/..." 
                className="w-full bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
              />
              {formData.featuredImage && (
                <div className="mt-4 w-full aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-white/10">
                  <img src={formData.featuredImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                <LayoutTemplate className="w-4 h-4" /> Short Excerpt
              </label>
              <textarea 
                name="excerpt" 
                value={formData.excerpt} 
                onChange={handleChange} 
                rows={3}
                placeholder="A brief summary for the blog cards..." 
                className="w-full bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            {/* Classification (Category & Tags) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Category</label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
                >
                  <option>Engineering</option>
                  <option>Mobile</option>
                  <option>Design</option>
                  <option>Security</option>
                  <option>Career</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                  <Clock className="w-4 h-4" /> Read Time
                </label>
                <input 
                  type="text" 
                  name="readingTime" 
                  value={formData.readingTime} 
                  onChange={handleChange} 
                  placeholder="e.g. 5 min read"
                  className="w-full bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                <Tag className="w-4 h-4" /> Tags (Comma Separated)
              </label>
              <input 
                type="text" 
                name="tags" 
                value={formData.tags} 
                onChange={handleChange} 
                placeholder="react, firebase, networking" 
                className="w-full bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
              />
            </div>

          </div>
        </div>

      </form>
    </div>
  );
}