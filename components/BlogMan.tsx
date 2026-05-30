"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, FileText, Globe, Clock, Search, Loader2, Calendar } from "lucide-react";
import BlogAddEdit, { BlogPost } from "./BlogAddEdit"; // Ensure this import matches your file structure

export default function BlogMan() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Editor State
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<BlogPost | null>(null);

  // 1. Fetch Blogs from your universal admin API
  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin?col=blogs");
      const data = await res.json();
      
      // Safety check: Only set if it's a real array to prevent .map crashes
      if (Array.isArray(data)) {
        setBlogs(data);
      } else {
        console.error("API Error:", data.error);
        setBlogs([]); 
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // 2. Handle Save (Creates or Updates via your universal API)
  const handleSaveBlog = async (blogData: any) => {
    const isUpdate = !!blogData.id;
    const method = isUpdate ? "PUT" : "POST";
    
    const payload = {
      collectionName: "blogs",
      data: blogData,
      ...(isUpdate && { id: blogData.id }),
    };

    const res = await fetch("/api/admin", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to save blog");

    // Close editor and refresh list
    setIsEditing(false);
    setCurrentBlog(null);
    fetchBlogs();
  };

  // 3. Handle Delete
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this publication? This action cannot be undone.")) return;

    try {
      const res = await fetch(`/api/admin?col=blogs&id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete blog");
      
      // Update local UI immediately for a snappy feel
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete the publication.");
    }
  };

  // 4. Filter logic for the search bar
  const filteredBlogs = blogs.filter((blog) => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- RENDER EDITOR IF ACTIVE ---
  if (isEditing) {
    return (
      <BlogAddEdit 
        initialData={currentBlog} 
        onSave={handleSaveBlog} 
        onCancel={() => {
          setIsEditing(false);
          setCurrentBlog(null);
        }} 
      />
    );
  }

  // --- RENDER MANAGEMENT DASHBOARD ---
  return (
    <div className="bg-white dark:bg-[#0a0a0a] p-6 lg:p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl animate-fade-in-up">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Publications.</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your engineering journal and articles.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:border-indigo-500 transition-all text-slate-900 dark:text-white"
            />
          </div>
          
          {/* Create Button */}
          <button 
            onClick={() => {
              setCurrentBlog(null);
              setIsEditing(true);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg hover:shadow-indigo-500/20 active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" /> New Post
          </button>
        </div>
      </div>

      {/* Data Grid */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[800px]">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-100 dark:border-white/5 text-xs font-bold uppercase tracking-widest text-slate-400">
            <div className="col-span-5">Article</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Metrics</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-100 dark:divide-white/5">
            {isLoading ? (
              // Skeleton Loader
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 px-6 py-6 items-center animate-pulse">
                  <div className="col-span-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-white/5 shrink-0" />
                    <div className="space-y-2 w-full">
                      <div className="h-4 bg-slate-200 dark:bg-white/5 rounded w-3/4" />
                      <div className="h-3 bg-slate-200 dark:bg-white/5 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="col-span-2"><div className="h-6 w-20 bg-slate-200 dark:bg-white/5 rounded-full" /></div>
                  <div className="col-span-2"><div className="h-4 w-24 bg-slate-200 dark:bg-white/5 rounded" /></div>
                  <div className="col-span-2"><div className="h-4 w-16 bg-slate-200 dark:bg-white/5 rounded" /></div>
                  <div className="col-span-1 flex justify-end gap-2"><div className="h-8 w-8 bg-slate-200 dark:bg-white/5 rounded-lg" /><div className="h-8 w-8 bg-slate-200 dark:bg-white/5 rounded-lg" /></div>
                </div>
              ))
            ) : filteredBlogs.length === 0 ? (
              // Empty State
              <div className="py-16 text-center">
                <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No articles found</h3>
                <p className="text-slate-500 text-sm">Create your first blog post to get started.</p>
              </div>
            ) : (
              // Actual Data Rows
              filteredBlogs.map((blog) => (
                <div key={blog.id} className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                  
                  {/* Article Info */}
                  <div className="col-span-5 flex items-center gap-4 pr-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200 dark:bg-black shrink-0 border border-slate-200 dark:border-white/10">
                      {blog.featuredImage ? (
                        <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400"><FileText className="w-5 h-5" /></div>
                      )}
                    </div>
                    <div className="truncate">
                      <p className="font-bold text-slate-900 dark:text-white truncate text-sm mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {blog.title}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-slate-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(blog.updatedAt || Date.now()).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="col-span-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                      blog.status === "published" 
                        ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20"
                        : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20"
                    }`}>
                      {blog.status === "published" ? <Globe className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                      {blog.status}
                    </span>
                  </div>

                  {/* Category */}
                  <div className="col-span-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                    {blog.category}
                  </div>

                  {/* Metrics */}
                  <div className="col-span-2 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <Clock className="w-3.5 h-3.5" />
                    {blog.readingTime}
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => {
                        setCurrentBlog(blog);
                        setIsEditing(true);
                      }}
                      className="p-2 bg-white dark:bg-black border border-slate-200 dark:border-white/10 rounded-lg text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500 transition-all shadow-sm"
                      title="Edit Post"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => blog.id && handleDelete(blog.id)}
                      className="p-2 bg-white dark:bg-black border border-slate-200 dark:border-white/10 rounded-lg text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500 transition-all shadow-sm"
                      title="Delete Post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}