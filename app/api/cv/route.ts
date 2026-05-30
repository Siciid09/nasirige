import { NextResponse } from "next/server";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
  try {
    // Query the 'cv' collection and limit to 1 document (since you only have one CV)
    const q = query(collection(db, "cv"), limit(1));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return NextResponse.json({ link: "#" }, { status: 200 });
    }

    // Extract the 'link' field from the first document
    const cvData = snapshot.docs[0].data();
    
    return NextResponse.json({ link: cvData.link || "#" }, { status: 200 });
    
  } catch (error) {
    console.error("CV API Error:", error);
    return NextResponse.json({ link: "#" }, { status: 500 });
  }
}