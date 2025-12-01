'use client';

import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase'; 
import { 
  collection, getDocs, addDoc, deleteDoc, doc, 
  query, orderBy, serverTimestamp 
} from 'firebase/firestore';
import { 
  LayoutDashboard, Newspaper, Calendar, ShoppingBag, 
  Image as ImageIcon, Settings, Users, FileText,
  Plus, Trash2, Loader2, RefreshCw, Upload
} from 'lucide-react';

// --- TYPES ---
type Tab = 'overview' | 'news' | 'events' | 'shop' | 'testimonials' | 'gallery' | 'manifesto' | 'settings';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // --- DATA STATES ---
  const [stats, setStats] = useState({ visits: 0, subscribers: 0, volunteers: 0 });
  const [news, setNews] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [manifestos, setManifestos] = useState<any[]>([]); // NEW
  
  // --- UNIVERSAL FORM STATE ---
  // This holds data for ALL forms. We clear it when switching tabs.
  const initialFormState = {
    title: '', category: 'General', image: '', date: '', 
    content: '', author: '', role: '', quote: '', rating: '5',
    location: '', time: '', link: '', price: '', stock: 'In Stock', description: '',
    fileUrl: '', icon: 'fa-file-pdf'
  };
  const [formData, setFormData] = useState(initialFormState);

  // --- 1. FETCH OVERVIEW STATS ---
  const fetchStats = async () => {
    try {
      const visitsSnap = await getDocs(collection(db, "page_visits"));
      const subsSnap = await getDocs(collection(db, "subscribers"));
      const volsSnap = await getDocs(collection(db, "volunteers"));
      setStats({ visits: visitsSnap.size, subscribers: subsSnap.size, volunteers: volsSnap.size });
    } catch (error) { console.error("Error fetching stats:", error); }
  };

  // --- 2. FETCH COLLECTION DATA ---
  const fetchCollection = async (colName: string, setState: Function) => {
    setRefreshing(true);
    try {
      const q = query(collection(db, colName), orderBy("timestamp", "desc"));
      const snap = await getDocs(q);
      setState(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) { console.error(`Error fetching ${colName}:`, error); }
    setRefreshing(false);
  };

  // --- INITIAL LOAD ---
  useEffect(() => {
    const init = async () => { await fetchStats(); setLoading(false); };
    init();
  }, []);

  // --- TAB SWITCH LOGIC ---
  useEffect(() => {
    setFormData(initialFormState); // Clear form when switching tabs
    if (activeTab === 'news') fetchCollection('news', setNews);
    if (activeTab === 'events') fetchCollection('events', setEvents);
    if (activeTab === 'shop') fetchCollection('products', setProducts);
    if (activeTab === 'testimonials') fetchCollection('testimonials', setTestimonials);
    if (activeTab === 'gallery') fetchCollection('gallery', setGallery);
    if (activeTab === 'manifesto') fetchCollection('manifestos', setManifestos);
  }, [activeTab]);

  // --- ACTIONS ---
  const handleAddItem = async (e: React.FormEvent, colName: string) => {
    e.preventDefault();
    if (!confirm("Add this item to the database?")) return;
    try {
      // We filter formData to only save non-empty fields to keep DB clean
      const payload = { ...formData, timestamp: serverTimestamp() };
      await addDoc(collection(db, colName), payload);
      alert("Success!");
      // Refresh
      if (colName === 'news') fetchCollection('news', setNews);
      if (colName === 'events') fetchCollection('events', setEvents);
      if (colName === 'products') fetchCollection('products', setProducts);
      if (colName === 'testimonials') fetchCollection('testimonials', setTestimonials);
      if (colName === 'gallery') fetchCollection('gallery', setGallery);
      if (colName === 'manifestos') fetchCollection('manifestos', setManifestos);
      setFormData(initialFormState);
    } catch (error) { alert("Error adding item."); console.error(error); }
  };

  const handleDelete = async (colName: string, id: string, setState: Function, state: any[]) => {
    if (!confirm("Delete this item?")) return;
    try {
      await deleteDoc(doc(db, colName, id));
      setState(state.filter(item => item.id !== id));
    } catch (error) { alert("Error deleting."); }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- UI HELPERS ---
  const SidebarItem = ({ id, label, Icon }: any) => (
    <button onClick={() => setActiveTab(id)} className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-medium transition ${activeTab === id ? 'bg-blue-600 text-white border-r-4 border-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
      <Icon size={18} /> {label}
    </button>
  );

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-100 text-[#0a1f44] font-bold"><Loader2 className="animate-spin mr-2"/> Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans text-slate-800">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0a1f44] fixed h-full z-20 hidden md:flex flex-col">
        <div className="h-20 flex items-center px-8 border-b border-white/10"><h1 className="text-xl font-bold text-white font-serif">Nasir Ige.</h1></div>
        <div className="flex-1 py-6 overflow-y-auto">
          <p className="px-6 text-xs font-bold text-slate-500 uppercase mb-2">Main</p>
          <SidebarItem id="overview" label="Overview" Icon={LayoutDashboard} />
          <SidebarItem id="news" label="News & Blog" Icon={Newspaper} />
          <SidebarItem id="events" label="Campaign Trail" Icon={Calendar} />
          <SidebarItem id="manifesto" label="Manifesto Files" Icon={FileText} />
          
          <p className="px-6 text-xs font-bold text-slate-500 uppercase mt-8 mb-2">Management</p>
          <SidebarItem id="shop" label="Merch Store" Icon={ShoppingBag} />
          <SidebarItem id="testimonials" label="Testimonials" Icon={Users} />
          <SidebarItem id="gallery" label="Media Gallery" Icon={ImageIcon} />
          
          <p className="px-6 text-xs font-bold text-slate-500 uppercase mt-8 mb-2">System</p>
          <SidebarItem id="settings" label="Settings" Icon={Settings} />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64 p-8 overflow-y-auto h-screen">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#0a1f44] capitalize flex items-center gap-2">{activeTab} Manager {refreshing && <Loader2 size={16} className="animate-spin text-blue-500"/>}</h2>
          </div>
          <button onClick={() => window.location.reload()} className="bg-white p-2 rounded-full shadow hover:bg-slate-50 text-slate-600"><RefreshCw size={18}/></button>
        </header>

        {/* --- 1. OVERVIEW --- */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <p className="text-slate-500 text-sm font-bold uppercase">Total Visits</p>
                <h3 className="text-4xl font-bold text-[#0a1f44] mt-2">{stats.visits}</h3>
             </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <p className="text-slate-500 text-sm font-bold uppercase">Subscribers</p>
                <h3 className="text-4xl font-bold text-[#0a1f44] mt-2">{stats.subscribers}</h3>
             </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <p className="text-slate-500 text-sm font-bold uppercase">Volunteers</p>
                <h3 className="text-4xl font-bold text-[#0a1f44] mt-2">{stats.volunteers}</h3>
             </div>
          </div>
        )}

        {/* --- 2. NEWS FORM --- */}
        {activeTab === 'news' && (
           <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                 {news.map(item => (
                    <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border flex justify-between">
                       <div><h4 className="font-bold text-lg">{item.title}</h4><p className="text-sm text-slate-500">{item.date} • {item.category}</p></div>
                       <button onClick={() => handleDelete('news', item.id, setNews, news)} className="text-red-500"><Trash2/></button>
                    </div>
                 ))}
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border h-fit">
                 <h3 className="font-bold mb-4">Add Article</h3>
                 <form onSubmit={(e) => handleAddItem(e, 'news')} className="space-y-3">
                    <input name="title" placeholder="Article Title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <div className="grid grid-cols-2 gap-2">
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded">
                            <option>General</option><option>Economy</option><option>Security</option><option>Health</option>
                        </select>
                        <input name="date" placeholder="Date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" required />
                    </div>
                    <input name="image" placeholder="Image URL (http://...)" value={formData.image} onChange={handleChange} className="w-full p-2 border rounded" />
                    <input name="author" placeholder="Author Name" value={formData.author} onChange={handleChange} className="w-full p-2 border rounded" />
                    <textarea name="content" placeholder="Full Article Content..." value={formData.content} onChange={handleChange} className="w-full p-2 border rounded h-32" required />
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded">Publish</button>
                 </form>
              </div>
           </div>
        )}

        {/* --- 3. EVENTS FORM --- */}
        {activeTab === 'events' && (
           <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                 {events.map(item => (
                    <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border flex justify-between">
                       <div><h4 className="font-bold text-lg">{item.title}</h4><p className="text-sm text-slate-500">{item.date} @ {item.time} • {item.location}</p></div>
                       <button onClick={() => handleDelete('events', item.id, setEvents, events)} className="text-red-500"><Trash2/></button>
                    </div>
                 ))}
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border h-fit">
                 <h3 className="font-bold mb-4">Add Event</h3>
                 <form onSubmit={(e) => handleAddItem(e, 'events')} className="space-y-3">
                    <input name="title" placeholder="Event Name" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <div className="grid grid-cols-2 gap-2">
                        <input name="date" placeholder="Date (Nov 24)" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" required />
                        <input name="time" placeholder="Time (2:00 PM)" value={formData.time} onChange={handleChange} className="w-full p-2 border rounded" />
                    </div>
                    <input name="location" placeholder="Location (e.g. Mogadishu)" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input name="link" placeholder="RSVP / Registration Link" value={formData.link} onChange={handleChange} className="w-full p-2 border rounded" />
                    <textarea name="description" placeholder="Event details..." value={formData.description} onChange={handleChange} className="w-full p-2 border rounded h-24" />
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded">Create Event</button>
                 </form>
              </div>
           </div>
        )}

        {/* --- 4. MANIFESTO FORM (NEW) --- */}
        {activeTab === 'manifesto' && (
           <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                 {manifestos.map(item => (
                    <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border flex items-center justify-between">
                       <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-red-50 text-red-500 rounded flex items-center justify-center"><FileText /></div>
                           <div><h4 className="font-bold text-lg">{item.title}</h4><p className="text-xs text-slate-400 truncate max-w-xs">{item.fileUrl}</p></div>
                       </div>
                       <button onClick={() => handleDelete('manifestos', item.id, setManifestos, manifestos)} className="text-red-500"><Trash2/></button>
                    </div>
                 ))}
                 {manifestos.length === 0 && <p className="text-slate-400 italic">No manifesto documents uploaded.</p>}
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border h-fit">
                 <h3 className="font-bold mb-4">Upload Document</h3>
                 <form onSubmit={(e) => handleAddItem(e, 'manifestos')} className="space-y-3">
                    <input name="title" placeholder="Document Title (e.g. Economic Plan)" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input name="fileUrl" placeholder="PDF Download URL" value={formData.fileUrl} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <textarea name="description" placeholder="Short description of this document..." value={formData.description} onChange={handleChange} className="w-full p-2 border rounded h-24" />
                    <button type="submit" className="w-full bg-[#0a1f44] text-white font-bold py-2 rounded flex items-center justify-center gap-2"><Upload size={16}/> Add Document</button>
                 </form>
              </div>
           </div>
        )}

        {/* --- 5. SHOP FORM --- */}
        {activeTab === 'shop' && (
           <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                 {products.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-xl border relative group">
                       <img src={item.image} className="w-full h-32 object-cover rounded bg-slate-100 mb-2" />
                       <h4 className="font-bold">{item.title}</h4>
                       <div className="flex justify-between mt-1"><span className="text-blue-600 font-bold">{item.price}</span><span className="text-xs bg-green-100 text-green-700 px-2 rounded">{item.stock}</span></div>
                       <button onClick={() => handleDelete('products', item.id, setProducts, products)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100"><Trash2 size={16}/></button>
                    </div>
                 ))}
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border h-fit">
                 <h3 className="font-bold mb-4">Add Product</h3>
                 <form onSubmit={(e) => handleAddItem(e, 'products')} className="space-y-3">
                    <input name="title" placeholder="Product Name" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <div className="grid grid-cols-2 gap-2">
                        <input name="price" placeholder="Price ($25.00)" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
                        <select name="stock" value={formData.stock} onChange={handleChange} className="w-full p-2 border rounded"><option>In Stock</option><option>Low Stock</option><option>Out of Stock</option></select>
                    </div>
                    <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="w-full p-2 border rounded" />
                    <textarea name="description" placeholder="Product details..." value={formData.description} onChange={handleChange} className="w-full p-2 border rounded h-24" />
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded">Add Product</button>
                 </form>
              </div>
           </div>
        )}

        {/* --- 6. TESTIMONIALS FORM --- */}
        {activeTab === 'testimonials' && (
           <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                 {testimonials.map(item => (
                    <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border">
                       <div className="flex justify-between">
                           <div className="flex gap-4">
                               <img src={item.image} className="w-10 h-10 rounded-full bg-slate-200" />
                               <div><h4 className="font-bold">{item.author}</h4><p className="text-xs text-slate-500">{item.role}</p></div>
                           </div>
                           <button onClick={() => handleDelete('testimonials', item.id, setTestimonials, testimonials)} className="text-red-500"><Trash2/></button>
                       </div>
                       <p className="text-slate-600 italic mt-3 text-sm">"{item.quote}"</p>
                    </div>
                 ))}
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border h-fit">
                 <h3 className="font-bold mb-4">Add Testimonial</h3>
                 <form onSubmit={(e) => handleAddItem(e, 'testimonials')} className="space-y-3">
                    <input name="author" placeholder="Person's Name" value={formData.author} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input name="role" placeholder="Role (e.g. Teacher, Elder)" value={formData.role} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input name="image" placeholder="Photo URL" value={formData.image} onChange={handleChange} className="w-full p-2 border rounded" />
                    <textarea name="quote" placeholder="Their quote..." value={formData.quote} onChange={handleChange} className="w-full p-2 border rounded h-24" required />
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded">Save</button>
                 </form>
              </div>
           </div>
        )}

        {/* --- 7. GALLERY FORM --- */}
        {activeTab === 'gallery' && (
           <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 grid grid-cols-3 gap-2">
                 {gallery.map(item => (
                    <div key={item.id} className="relative group h-32">
                       <img src={item.image} className="w-full h-full object-cover rounded bg-slate-100" />
                       <button onClick={() => handleDelete('gallery', item.id, setGallery, gallery)} className="absolute inset-0 bg-red-500/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition"><Trash2/></button>
                    </div>
                 ))}
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border h-fit">
                 <h3 className="font-bold mb-4">Add Photo</h3>
                 <form onSubmit={(e) => handleAddItem(e, 'gallery')} className="space-y-3">
                    <input name="image" placeholder="Photo URL" value={formData.image} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input name="title" placeholder="Caption (Optional)" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" />
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded"><option>Campaign</option><option>Rally</option><option>Meeting</option></select>
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded">Upload</button>
                 </form>
              </div>
           </div>
        )}

      </main>
    </div>
  );
}