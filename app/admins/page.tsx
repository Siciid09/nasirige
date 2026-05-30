"use client";

import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, Briefcase, Award, Layers, Route,Zap, 
  Mail, CalendarCheck, LogOut, ShieldAlert, BarChart3,
  Save, Loader2, PlusCircle, Trash2, Edit, Eye, User as UserIcon, X, FileText,
  BookOpen
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from "firebase/auth";
import BlogMan from "@/components/BlogMan";

export default function AdminDashboard() {
  // Auth & General State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  
  // Data State
  const [data, setData] = useState<any[]>([]);
  const [overviewStats, setOverviewStats] = useState({ msgs: 0, bookings: 0, projects: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modals
  const [viewModal, setViewModal] = useState<any | null>(null);
  const [editModal, setEditModal] = useState<{col: string, id: string, data: any} | null>(null);

  const ALLOWED_EMAIL = "info@hiigsitech.com"; 

  // --- AUTHENTICATION ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email === ALLOWED_EMAIL) {
        setUser(currentUser);
      } else if (currentUser) {
        signOut(auth);
        setLoginError("Unauthorized email address.");
      } else {
        setUser(null);
      }
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError("");
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (email !== ALLOWED_EMAIL) {
      setLoginError("Unauthorized email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setLoginError("Invalid credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    if (confirm("Sign out of Command Center?")) await signOut(auth);
  };

  // --- DATA FETCHING ---
  const fetchData = async (collectionName: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin?col=${collectionName}`);
      const result = await res.json();
      
      // Safety check: Only set if it's a real array
      if (Array.isArray(result)) {
        setData(result);
      } else {
        console.error("API Error:", result.error);
        setData([]); 
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setData([]); 
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOverview = async () => {
    try {
      const [msgs, books, projs] = await Promise.all([
        fetch('/api/admin?col=messages').then(r => r.json()),
        fetch('/api/admin?col=bookings').then(r => r.json()),
        fetch('/api/admin?col=projects').then(r => r.json()),
      ]);
      setOverviewStats({ msgs: msgs.length, bookings: books.length, projects: projs.length });
    } catch (error) { console.error(error); }
  };

  useEffect(() => {
    if (!user) return;
    if (activeTab === "overview") fetchOverview();
    else fetchData(activeTab);
  }, [activeTab, user]);

  // --- CRUD OPERATIONS ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, collectionName: string) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collectionName, data: payload }),
      });
      (e.target as HTMLFormElement).reset();
      fetchData(collectionName);
      alert("Successfully Added!");
    } catch (err) { alert("Error saving data."); } 
    finally { setIsSubmitting(false); }
  };

  const handleDelete = async (col: string, id: string) => {
    if (!confirm("Permanently delete this item?")) return;
    try {
      await fetch(`/api/admin?col=${col}&id=${id}`, { method: "DELETE" });
      fetchData(col);
    } catch (err) { alert("Error deleting item."); }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editModal) return;
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collectionName: editModal.col, id: editModal.id, data: payload }),
      });
      setEditModal(null);
      fetchData(editModal.col);
      alert("Updated Successfully!");
    } catch (err) { alert("Error updating data."); } 
    finally { setIsSubmitting(false); }
  };

  // --- RENDER LOGIN ---
  if (isAuthLoading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white"><Loader2 className="w-10 h-10 animate-spin" /></div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-[#0a0a0a] w-full max-w-md p-8 rounded-[2rem] shadow-2xl text-center border border-slate-200 dark:border-white/10">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-indigo-500/30">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Command Center</h2>
          <p className="text-slate-500 mb-8 text-sm">Authorized personnel only.</p>
          
          <form onSubmit={handleLogin} className="space-y-5 text-left">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email</label>
              <input type="email" name="email" required className="w-full mt-2 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" placeholder="info@hiigsitech.com" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
              <input type="password" name="password" required className="w-full mt-2 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" placeholder="••••••••" />
            </div>
            {loginError && <div className="text-red-500 text-xs font-bold text-center bg-red-500/10 py-2 rounded-lg">{loginError}</div>}
            <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-xl flex justify-center items-center gap-2">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Secure Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER DASHBOARD ---
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <UserIcon className="w-5 h-5" /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'cv', label: 'Resume / CV', icon: <FileText className="w-5 h-5" /> },
    { id: 'blogs', label: 'Journal & Blogs', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'certificates', label: 'Certificates', icon: <Award className="w-5 h-5" /> },
    { id: 'services', label: 'Services', icon: <Layers className="w-5 h-5" /> },
    { id: 'experience', label: 'Experience', icon: <Route className="w-5 h-5" /> },
    { id: 'skills', label: 'Skills', icon: <Zap className="w-5 h-5" /> },
    { id: 'stats', label: 'Site Counters', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'messages', label: 'Inbox', icon: <Mail className="w-5 h-5" /> },
    { id: 'bookings', label: 'Bookings', icon: <CalendarCheck className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-[#0a0a0a] border-r border-slate-200 dark:border-white/5 flex flex-col shadow-2xl z-20 flex-shrink-0">
        <div className="h-20 flex items-center px-8 border-b border-slate-200 dark:border-white/5">
          <h2 className="text-xl font-black tracking-tighter">MUBARIK<span className="text-indigo-600">.ADMIN</span></h2>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-3 ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'}`}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-white/5">
          <button onClick={handleLogout} className="w-full text-red-500 hover:bg-red-500/10 p-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative bg-slate-50/50 dark:bg-transparent">
        <header className="sticky top-0 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 z-10 px-8 py-5 flex justify-between items-center">
          <div><h1 className="text-2xl font-black capitalize">{activeTab}</h1></div>
          <div className="flex items-center gap-4">
            <div className="text-right"><p className="text-sm font-bold">{user.email}</p></div>
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">A</div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto pb-24">
          
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
              <div className="p-6 rounded-[2rem] bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 shadow-xl flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 flex items-center justify-center"><Mail className="w-8 h-8"/></div>
                <div><p className="text-xs font-bold text-slate-400 uppercase">Total Messages</p><h3 className="text-3xl font-black">{overviewStats.msgs}</h3></div>
              </div>
              <div className="p-6 rounded-[2rem] bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 shadow-xl flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-teal-500/10 text-teal-600 flex items-center justify-center"><CalendarCheck className="w-8 h-8"/></div>
                <div><p className="text-xs font-bold text-slate-400 uppercase">Total Bookings</p><h3 className="text-3xl font-black">{overviewStats.bookings}</h3></div>
              </div>
              <div className="p-6 rounded-[2rem] bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 shadow-xl flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 flex items-center justify-center"><Briefcase className="w-8 h-8"/></div>
                <div><p className="text-xs font-bold text-slate-400 uppercase">Live Projects</p><h3 className="text-3xl font-black">{overviewStats.projects}</h3></div>
              </div>
            </div>
          )}

          {/* TAB: PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-[#0a0a0a] p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl animate-fade-in-up">
              <h3 className="text-xl font-bold mb-6">Update Profile</h3>
              <form onSubmit={(e) => handleSubmit(e, 'profile')} className="space-y-4">
                <input type="text" name="name" placeholder="Full Name" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none" required />
                <input type="text" name="titles" placeholder="Titles (Comma separated)" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none" required />
                <input type="text" name="img" placeholder="Profile Image URL" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none" required />
                <textarea name="bio" rows={4} placeholder="Bio..." className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none resize-none" required></textarea>
                <button type="submit" disabled={isSubmitting} className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl">{isSubmitting ? 'Saving...' : 'Save Profile'}</button>
              </form>
            </div>
          )}

          {/* TAB: PROJECTS (Expanded Detailed Form) */}
          {activeTab === 'projects' && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="bg-white dark:bg-[#0a0a0a] p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl relative overflow-hidden">
                <h3 className="text-2xl font-black mb-2 flex items-center gap-2"><PlusCircle className="text-indigo-500" /> Create Detailed Project</h3>
                <p className="text-slate-500 text-sm mb-8">This populates your `/projects/[slug]` detailed views.</p>
                <form onSubmit={(e) => handleSubmit(e, 'projects')} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="title" required placeholder="Project Title" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none" />
                    <input type="text" name="type" required placeholder="Category (e.g. SaaS)" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none" />
                    <input type="text" name="projectLink" required placeholder="Internal Slug (e.g. /projects/dhiselink)" className="w-full md:col-span-2 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none" />
                    <input type="text" name="desc" required placeholder="Short Grid Description" className="w-full md:col-span-2 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none" />
                    
                    {/* Detailed Metadata */}
                    <input type="text" name="tagline" placeholder="Hero Tagline" className="w-full md:col-span-2 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none" />
                  <input type="text" name="client" placeholder="Client Name" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none" />
                    <input type="text" name="provider" placeholder="Provider/Platform" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none" />
                    <input type="text" name="role" placeholder="Your Role" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none" />
                    <input type="text" name="timeline" placeholder="Timeline (e.g. 8 Months)" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none" />
                    <input type="text" name="status" placeholder="Status (e.g. Live)" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none" />
                    <input type="text" name="liveLink" placeholder="Live Site URL" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none" />
                    <input type="text" name="githubLink" placeholder="GitHub URL" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none" />
                    
                    {/* Narrative */}
                    <textarea name="challenge" rows={3} placeholder="The Challenge..." className="w-full md:col-span-2 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none resize-none"></textarea>
                    <textarea name="solution" rows={3} placeholder="The Solution..." className="w-full md:col-span-2 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none resize-none"></textarea>
                    
                    {/* Assets */}
                    <input type="text" name="techStack" placeholder="Tech Stack (Comma Separated)" className="w-full md:col-span-2 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none" />
                    <input type="text" name="img" required placeholder="Thumbnail Image URL" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none" />
                    <input type="text" name="coverImage" placeholder="Hero Cover Image URL" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none" />
                    <textarea name="gallery" rows={2} placeholder="Gallery Image URLs (Comma Separated)" className="w-full md:col-span-2 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none resize-none"></textarea>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl">{isSubmitting ? 'Publishing...' : 'Publish Project'}</button>
                </form>
              </div>
            </div>
          )}

          {/* TAB: RESUME / CV */}
          {activeTab === 'cv' && (
            <div className="bg-white dark:bg-[#0a0a0a] p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl animate-fade-in-up">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Manage Resume / CV</h3>
              </div>
              
              {/* Current CV Display */}
              {data && data.length > 0 ? (
                <div className="mb-8 p-6 bg-indigo-50/50 dark:bg-white/5 rounded-2xl border border-indigo-100 dark:border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="overflow-hidden w-full">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Active Resume Link</p>
                    <a href={data[0].link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline truncate block w-full">
                      {data[0].link}
                    </a>
                  </div>
                  <div className="flex shrink-0 gap-2">
                     <a href={data[0].link} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                       <Eye className="w-4 h-4" /> View CV
                     </a>
                     <button onClick={() => handleDelete('cv', data[0].id)} className="px-4 py-2.5 bg-red-50 dark:bg-red-500/10 text-red-600 rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 font-bold text-sm">
                       Remove
                     </button>
                  </div>
                </div>
              ) : (
                <div className="mb-8 p-6 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 rounded-2xl border border-yellow-200 dark:border-yellow-500/20">
                  <p className="text-sm font-bold flex items-center gap-2"><ShieldAlert className="w-5 h-5"/> No active CV found. Please add a link below.</p>
                </div>
              )}

              {/* Upload / Update Form */}
              <form onSubmit={(e) => {
                // Smart form: If a CV exists, UPDATE it. If not, CREATE it.
                if (data && data.length > 0) {
                  e.preventDefault();
                  setIsSubmitting(true);
                  const formData = new FormData(e.currentTarget);
                  const payload = Object.fromEntries(formData.entries());
                  fetch("/api/admin", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ collectionName: 'cv', id: data[0].id, data: payload }),
                  }).then(() => {
                    fetchData('cv');
                    alert("CV Link Successfully Updated!");
                  }).finally(() => setIsSubmitting(false));
                } else {
                  handleSubmit(e, 'cv');
                }
              }} className="space-y-4 pt-6 border-t border-slate-100 dark:border-white/5">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                  {data && data.length > 0 ? "Re-upload / Change Link" : "Upload New CV Link (Google Drive, PDF URL)"}
                </label>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex w-full gap-2">
                  {/* The visual URL input (auto-fills after upload) */}
                  <input type="url" name="link" id="cvLinkInput" required placeholder="https://... (Paste URL or click Upload)" className="flex-1 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors" />
                  
                  {/* The hidden file input */}
                  <input type="file" id="cvFileUpload" accept=".pdf,image/*" className="hidden" onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const btn = document.getElementById('cvUploadText');
                      const input = document.getElementById('cvLinkInput') as HTMLInputElement;
                      if (btn) btn.innerText = "Uploading...";
                      try {
                        const { getStorage, ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
                        const storageRef = ref(getStorage(), `cv/${Date.now()}_${file.name}`);
                        await uploadBytes(storageRef, file);
                        input.value = await getDownloadURL(storageRef); // Auto-fill the input
                        if (btn) btn.innerText = "Uploaded!";
                      } catch (err) {
                        console.error(err);
                        if (btn) btn.innerText = "Failed";
                      }
                    }} 
                  />

                  {/* The visible Upload Button */}
                  <button type="button" onClick={() => document.getElementById('cvFileUpload')?.click()} className="shrink-0 px-6 py-3 bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-300 dark:hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    <span id="cvUploadText">Upload</span>
                  </button>
                </div>
                  <button type="submit" disabled={isSubmitting} className="shrink-0 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all">
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (data && data.length > 0 ? 'Update CV' : 'Save CV')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: JOURNAL / BLOGS */}
          {activeTab === 'blogs' && (
            <div className="animate-fade-in-up">
              <BlogMan />
            </div>
          )}

          {/* TAB: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="bg-white dark:bg-[#0a0a0a] p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl animate-fade-in-up">
              <h3 className="text-xl font-bold mb-6">Add Certificate</h3>
              <form onSubmit={(e) => handleSubmit(e, 'certificates')} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="title" required placeholder="Certificate Title" className="w-full bg-slate-50 dark:bg-black/50 border rounded-xl px-4 py-3 outline-none" />
                <input type="text" name="provider" required placeholder="Provider (e.g. Coursera, Udemy)" className="w-full bg-slate-50 dark:bg-black/50 border rounded-xl px-4 py-3 outline-none" />
                <input type="text" name="issuer" required placeholder="Issuer (e.g. Google)" className="w-full bg-slate-50 dark:bg-black/50 border rounded-xl px-4 py-3 outline-none" />
                <input type="text" name="date" required placeholder="Year" className="w-full bg-slate-50 dark:bg-black/50 border rounded-xl px-4 py-3 outline-none" />
                <input type="text" name="color" required placeholder="Tailwind Color (from-blue-500)" className="w-full bg-slate-50 dark:bg-black/50 border rounded-xl px-4 py-3 outline-none" />
                <input type="text" name="img" required placeholder="Image URL" className="w-full md:col-span-2 bg-slate-50 dark:bg-black/50 border rounded-xl px-4 py-3 outline-none" />
                <input type="text" name="desc" required placeholder="Description" className="w-full md:col-span-2 bg-slate-50 dark:bg-black/50 border rounded-xl px-4 py-3 outline-none" />
                <button type="submit" className="md:col-span-2 py-4 bg-indigo-600 text-white font-bold rounded-xl">Add Certificate</button>
              </form>
            </div>
          )}

          {/* TAB: SERVICES */}
          {activeTab === 'services' && (
            <div className="bg-white dark:bg-[#0a0a0a] p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl animate-fade-in-up">
              <h3 className="text-xl font-bold mb-6">Add Service</h3>
              <form onSubmit={(e) => handleSubmit(e, 'services')} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="title" required placeholder="Service Title" className="w-full bg-slate-50 dark:bg-black/50 border rounded-xl px-4 py-3 outline-none" />
                <input type="text" name="desc" required placeholder="Description" className="w-full bg-slate-50 dark:bg-black/50 border rounded-xl px-4 py-3 outline-none" />
                <input type="text" name="gradientFrom" placeholder="Tailwind From (from-indigo-500)" className="w-full bg-slate-50 dark:bg-black/50 border rounded-xl px-4 py-3 outline-none" />
                <input type="text" name="gradientTo" placeholder="Tailwind To (to-blue-600)" className="w-full bg-slate-50 dark:bg-black/50 border rounded-xl px-4 py-3 outline-none" />
                <button type="submit" className="md:col-span-2 py-4 bg-indigo-600 text-white font-bold rounded-xl">Add Service</button>
              </form>
            </div>
          )}

          {/* TAB: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="bg-white dark:bg-[#0a0a0a] p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl animate-fade-in-up">
              <h3 className="text-xl font-bold mb-6">Add Milestone</h3>
              <form onSubmit={(e) => handleSubmit(e, 'experience')} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" name="year" required placeholder="Year (2023-Present)" className="w-full bg-slate-50 dark:bg-black/50 border rounded-xl px-4 py-3 outline-none" />
                <input type="text" name="title" required placeholder="Job Title" className="w-full bg-slate-50 dark:bg-black/50 border rounded-xl px-4 py-3 outline-none" />
                <input type="text" name="company" required placeholder="Company" className="w-full bg-slate-50 dark:bg-black/50 border rounded-xl px-4 py-3 outline-none" />
                <input type="text" name="desc" required placeholder="Description" className="w-full md:col-span-3 bg-slate-50 dark:bg-black/50 border rounded-xl px-4 py-3 outline-none" />
                <button type="submit" className="md:col-span-3 py-4 bg-indigo-600 text-white font-bold rounded-xl">Add Milestone</button>
              </form>
            </div>
          )}

          {/* TAB: SKILLS */}
          {activeTab === 'skills' && (
            <div className="bg-white dark:bg-[#0a0a0a] p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl animate-fade-in-up">
              <h3 className="text-xl font-bold mb-6">Add Skill</h3>
              <form onSubmit={(e) => handleSubmit(e, 'skills')} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" name="name" required placeholder="Skill Name" className="w-full bg-slate-50 dark:bg-black/50 border rounded-xl px-4 py-3 outline-none" />
                <select name="cat" className="w-full bg-slate-50 dark:bg-black/50 border rounded-xl px-4 py-3 outline-none">
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Design & Strategy">Design & Strategy</option>
                  <option value="Management">Management</option>
                </select>
                <button type="submit" className="py-4 bg-indigo-600 text-white font-bold rounded-xl">Add Skill</button>
              </form>
            </div>
          )}

          {/* TAB: STATS */}
          {activeTab === 'stats' && (
            <div className="bg-white dark:bg-[#0a0a0a] p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl animate-fade-in-up">
              <h3 className="text-xl font-bold mb-6">Manage Site Counters</h3>
              <form onSubmit={(e) => handleSubmit(e, 'stats')} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input type="number" name="count" required placeholder="Count (e.g. 100)" className="w-full bg-slate-50 dark:bg-black/50 border rounded-xl px-4 py-3 outline-none" />
                <input type="text" name="label" required placeholder="Label (e.g. Clients)" className="w-full bg-slate-50 dark:bg-black/50 border rounded-xl px-4 py-3 outline-none" />
                <input type="text" name="suffix" placeholder="Suffix (e.g. + or %)" className="w-full bg-slate-50 dark:bg-black/50 border rounded-xl px-4 py-3 outline-none" />
                <button type="submit" className="py-4 bg-indigo-600 text-white font-bold rounded-xl">Add Stat</button>
              </form>
            </div>
          )}

          {/* LISTS & TABLES RENDERER FOR ALL TABS (except profile & overview) */}
          {activeTab !== 'overview' && activeTab !== 'profile' && (
            <div className="mt-8 animate-fade-in-up">
              {isLoading ? (
                <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
              ) : (
                <>
                  {/* TABLES for Inbox & Bookings */}
                  {(activeTab === 'messages' || activeTab === 'bookings') ? (
                    <div className="bg-white dark:bg-[#0a0a0a] rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 font-bold uppercase text-xs">
                          <tr>
                            <th className="p-6">Date</th>
                            <th className="p-6">Name</th>
                            <th className="p-6">Contact</th>
                            <th className="p-6">Details</th>
                            <th className="p-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                          {data.map(item => (
                            <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-white/5">
                              <td className="p-6 text-xs text-slate-500">
                                {activeTab === 'bookings' ? `${item.bookingDate} @ ${item.bookingTime}` : (item.timestamp?.seconds ? new Date(item.timestamp.seconds * 1000).toLocaleDateString() : 'New')}
                              </td>
                              <td className="p-6 font-bold">{item.name}</td>
                              <td className="p-6 text-xs text-slate-500">{item.email} <br/> {item.phone || item.fullPhone}</td>
                              <td className="p-6 text-xs text-slate-500 truncate max-w-[200px]">{item.message || item.desc || "..."}</td>
                              <td className="p-6 text-right space-x-3">
                                <button onClick={() => setViewModal(item)} className="text-indigo-500 hover:text-indigo-600"><Eye className="w-5 h-5 inline" /></button>
                                <button onClick={() => handleDelete(activeTab, item.id)} className="text-red-500 hover:text-red-600"><Trash2 className="w-5 h-5 inline" /></button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    /* CARDS for Projects, Certificates, etc. */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {data.map(item => (
                        <div key={item.id} className="bg-white dark:bg-[#0a0a0a] p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-lg relative group">
                          <div className="absolute top-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setEditModal({col: activeTab, id: item.id, data: item})} className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"><Edit className="w-4 h-4"/></button>
                            <button onClick={() => handleDelete(activeTab, item.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 className="w-4 h-4"/></button>
                          </div>
                          {(item.img || item.image) && <img src={item.img || item.image} className="w-full h-40 object-cover rounded-xl mb-4" alt="cover"/>}
                          <h4 className="font-bold text-lg line-clamp-1">{item.title || item.name || item.label}</h4>
                          <p className="text-sm text-slate-500 mt-2 line-clamp-2">{item.desc || item.company || item.message || item.count}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

        </div>
      </main>

      {/* --- VIEW MODAL --- */}
      {viewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0a0a0a] w-full max-w-xl rounded-[2rem] p-8 shadow-2xl border border-slate-200 dark:border-white/10 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Details: {viewModal.name}</h3>
              <button onClick={() => setViewModal(null)} className="p-2 bg-slate-100 dark:bg-white/10 rounded-full hover:bg-red-500 hover:text-white transition-colors"><X className="w-5 h-5"/></button>
            </div>
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <p><strong>Email:</strong> {viewModal.email}</p>
              <p><strong>Phone:</strong> {viewModal.phone || viewModal.fullPhone}</p>
              {viewModal.bookingDate && <p className="text-indigo-500 font-bold"><strong>Meeting:</strong> {viewModal.bookingDate} at {viewModal.bookingTime}</p>}
              <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5 mt-4">
                <strong>Message / Context:</strong> <br/><br/> {viewModal.message}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- EDIT MODAL (Dynamic based on selected item) --- */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0a0a0a] w-full max-w-2xl rounded-[2rem] p-8 shadow-2xl border border-slate-200 dark:border-white/10 animate-fade-in-up max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-white/5 pb-4">
              <h3 className="text-xl font-bold">Edit Record</h3>
              <button onClick={() => setEditModal(null)} className="p-2 bg-slate-100 dark:bg-white/10 rounded-full hover:bg-red-500 hover:text-white transition-colors"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
              {Object.keys(editModal.data).map(key => {
                if (['id', 'timestamp', 'createdAt'].includes(key)) return null;
                
                // Format arrays back to strings for editing
                let val = editModal.data[key];
                if (Array.isArray(val)) val = val.join(', ');

                return (
                  <div key={key}>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">{key}</label>
                    {val && val.length > 50 ? (
                      <textarea name={key} defaultValue={val} rows={3} className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none resize-none"></textarea>
                    ) : (
                      <input type="text" name={key} defaultValue={val} className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none" />
                    )}
                  </div>
                )
              })}
              <button type="submit" disabled={isSubmitting} className="w-full py-4 mt-4 bg-indigo-600 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                 {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Save Changes</>}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}