import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    const blogsRef = collection(db, "blogs");

    // --- SCENARIO 1: FETCH SINGLE BLOG BY SLUG ---
    if (slug) {
      // Security: Only allow fetching if the status is 'published'
      const q = query(
        blogsRef, 
        where("slug", "==", slug), 
        where("status", "==", "published")
      );
      
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return NextResponse.json({ error: "Article not found or not published" }, { status: 404 });
      }

      const blogData = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
      return NextResponse.json(blogData, { status: 200 });
    } 
    
    // --- SCENARIO 2: FETCH ALL PUBLISHED BLOGS ---
    else {
      // Security: Filter out drafts automatically
      const q = query(blogsRef, where("status", "==", "published"));
      const snapshot = await getDocs(q);
      
      const blogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Pro-Tip: We sort the dates in-memory here. 
      // If we used Firestore's orderBy(), Firebase would force you to click a link to generate a database index.
      // Doing it in-memory keeps your setup frictionless and fast.
      blogs.sort((a: any, b: any) => {
        const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
        const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
        return dateB - dateA; // Newest first
      });

      return NextResponse.json(blogs, { status: 200 });
    }
    
  } catch (error) {
    console.error("Public Blog API Error:", error);
    return NextResponse.json({ error: "Failed to fetch publications" }, { status: 500 });
  }
}