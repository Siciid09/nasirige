import { NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(req: Request) {
  try {
    // 1. Parse the incoming request data
    const body = await req.json();
    const { name, email, projectType, budget, message } = body;

    // 2. Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // 3. Save to Firestore in a new 'inquiries' collection
    const docRef = await addDoc(collection(db, "inquiries"), {
      name,
      email,
      projectType: projectType || "Not specified",
      budget: budget || "Not specified",
      message,
      status: "New", // Helps you track unread messages in your database
      createdAt: serverTimestamp(),
    });

    // 4. Return success response
    return NextResponse.json({ success: true, id: docRef.id }, { status: 200 });
    
  } catch (error) {
    console.error("Failed to submit inquiry:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}