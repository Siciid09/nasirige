import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; 
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp, query, orderBy } from "firebase/firestore";

// --- GET: Fetch Data from any collection ---
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const colName = searchParams.get("col");

    if (!colName) return NextResponse.json({ error: "Collection name required" }, { status: 400 });

    const baseRef = collection(db, colName);
    let finalQuery = query(baseRef);
    
    // Order messages and bookings by newest first
    if (colName === 'messages' || colName === 'bookings') {
      finalQuery = query(baseRef, orderBy('timestamp', 'desc'));
    }

    const querySnapshot = await getDocs(finalQuery);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(`GET Error:`, error);
    return NextResponse.json({ error: "Failed to fetch data." }, { status: 500 });
  }
}

// --- POST: Create a new document ---
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { collectionName, data } = body;

    if (!collectionName || !data) {
      return NextResponse.json({ error: "Missing collection name or data." }, { status: 400 });
    }

    // Clean arrays for projects
    if (collectionName === "projects") {
      data.techStack = typeof data.techStack === "string" 
        ? data.techStack.split(',').map((tech: string) => tech.trim()).filter(Boolean) : [];
      data.gallery = typeof data.gallery === "string"
        ? data.gallery.split(',').map((url: string) => url.trim()).filter(Boolean) : [];
    }

    const finalData = { ...data, timestamp: serverTimestamp() };
    const docRef = await addDoc(collection(db, collectionName), finalData);

    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Failed to create document." }, { status: 500 });
  }
}

// --- PUT: Update an existing document ---
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { collectionName, id, data } = body;

    if (!collectionName || !id || !data) {
      return NextResponse.json({ error: "Missing required update fields." }, { status: 400 });
    }

    // Clean arrays for projects if they were edited as strings
    if (collectionName === "projects") {
      if (typeof data.techStack === "string") {
        data.techStack = data.techStack.split(',').map((t: string) => t.trim()).filter(Boolean);
      }
      if (typeof data.gallery === "string") {
        data.gallery = data.gallery.split(',').map((t: string) => t.trim()).filter(Boolean);
      }
    }

    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Failed to update document." }, { status: 500 });
  }
}

// --- DELETE: Remove a document ---
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const colName = searchParams.get("col");
    const id = searchParams.get("id");

    if (!colName || !id) {
      return NextResponse.json({ error: "Collection name and ID required." }, { status: 400 });
    }

    await deleteDoc(doc(db, colName, id));
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete document." }, { status: 500 });
  }
}