import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; 
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    // 1. Reference your "certificates" collection in Firestore
    const certificatesRef = collection(db, "certificates");
    
    // 2. Fetch the documents from Firebase
    const querySnapshot = await getDocs(certificatesRef);
    
    // 3. Map through the documents and build the certificates array
    const certificates = querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));

    // 4. Fallback Data Block: If your Firestore collection is completely empty, 
    // it automatically returns this beautifully formatted static data as an insurance policy.
    if (certificates.length === 0) {
      const fallbackCredentials = [
        {
          title: "Google Cybersecurity",
          issuer: "Google",
          date: "2023",
          desc: "Hands-on experience with Linux, SQL, and Python for security analysis and threat mitigation.",
          img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?fit=crop&w=800&q=80",
          color: "from-blue-500",
        },
        {
          title: "AWS Solutions Architect",
          issuer: "AWS",
          date: "2023",
          desc: "Validated expertise in designing distributed systems, security, and cloud cost-optimization.",
          img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?fit=crop&w=800&q=80",
          color: "from-orange-500",
        },
        {
          title: "Meta Frontend Developer",
          issuer: "Meta",
          date: "2024",
          desc: "Advanced React.js concepts, UX/UI principles, and highly accessible web development practices.",
          img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?fit=crop&w=800&q=80",
          color: "from-blue-400",
        },
        {
          title: "IBM Full-Stack Developer",
          issuer: "IBM",
          date: "2024",
          desc: "Comprehensive deployment pipelines, cloud native development, and advanced containerization.",
          img: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?fit=crop&w=800&q=80",
          color: "from-slate-700",
        },
        {
          title: "Azure Fundamentals",
          issuer: "Microsoft",
          date: "2025",
          desc: "Core cloud concepts, management tools, and architecture principles for enterprise applications.",
          img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?fit=crop&w=800&q=80",
          color: "from-cyan-600",
        },
        {
          title: "Google Data Analytics",
          issuer: "Google",
          date: "2022",
          desc: "Complete comprehensive training in data cleaning, analysis, and visualization architectures.",
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=800&q=80",
          color: "from-green-500",
        }
      ];
      
      return NextResponse.json(fallbackCredentials, { status: 200 });
    }

    // 5. Return live dynamic tracking data from your Firebase instance
    return NextResponse.json(certificates, { status: 200 });
    
  } catch (error) {
    console.error("Database connection failure on certificates route:", error);
    return NextResponse.json(
      { error: "Failed to communicate with credentials database." },
      { status: 500 }
    );
  }
}