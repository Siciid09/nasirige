import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; 
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    // 1. Reference your "projects" collection in Firestore
    const projectsRef = collection(db, "projects");
    
    // 2. Fetch the documents from Firebase
    const querySnapshot = await getDocs(projectsRef);
    
    // 3. Map through the documents and build the projects array
    const projects = querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));

    // 4. Fallback Data Block: If your Firestore collection is completely empty, 
    // it automatically returns this beautifully formatted static data as an insurance policy.
    if (projects.length === 0) {
      const fallbackProjects = [
        { 
          title: "Dhiselink", 
          type: "Platform", 
          img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?fit=crop&w=1200&q=80", 
          desc: "End-to-end construction management platform streamlining contractor workflows.",
          projectLink: "/projects/dhiselink",
          // Detailed View Fields:
          tagline: "Revolutionizing Construction Management.",
          coverImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?fit=crop&w=2000&q=80",
          client: "Dhiselink Inc.",
          role: "Lead Full-Stack Engineer",
          timeline: "8 Months (2025)",
          status: "Live in Production",
          liveLink: "https://dhiselink.com",
          githubLink: "https://github.com/Siciid09/dhiselink",
          challenge: "The construction industry in East Africa relies heavily on fragmented, paper-based tracking. Dhiselink needed a centralized, real-time platform capable of syncing offline field data with corporate dashboards, all while managing multi-currency payroll and heavy equipment logistics.",
          solution: "I architected a highly scalable Next.js and Firebase ecosystem. By implementing advanced Firestore offline-persistence, field workers can log data without internet. The dashboard utilizes dynamic role-based access control (RBAC), multi-currency financial engines, and an ultra-modern UI built on Tailwind CSS.",
          techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Zod", "Framer Motion"],
          gallery: [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=1200&q=80"
          ]
        },
        { 
          title: "HantiKaab", 
          type: "Enterprise SaaS", 
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=1200&q=80", 
          desc: "Financial SaaS architecture for robust enterprise resource planning and accounting.",
          projectLink: "/projects/hantikaab",
          // Detailed View Fields:
          tagline: "Next-Generation ERP for the Somali Market.",
          coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=2000&q=80",
          client: "Internal SaaS Product",
          role: "Founder & Lead Engineer",
          timeline: "Released Sept 2025",
          status: "Live & Scaling",
          liveLink: "#",
          githubLink: "#",
          challenge: "Local businesses required a dual-currency (USD and SLSH) accounting system that calculated revenue strictly based on sales collections, circumventing the limitations of standard western ERP tools.",
          solution: "Built a highly optimized business logic engine on Firebase, structuring complex multi-currency transaction ledgers and deploying dynamic Next.js caching strategies to ensure dashboards load instantly even with thousands of active rows.",
          techStack: ["Next.js", "React", "Tailwind CSS", "Firebase Firestore", "Chart.js"],
          gallery: [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?fit=crop&w=1200&q=80"
          ]
        },
        { 
          title: "ArdayCaawiye", 
          type: "Mobile App", 
          img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?fit=crop&w=1200&q=80", 
          desc: "Native mobile learning ecosystem delivering high-speed educational resources.",
          projectLink: "/projects/ardaycaawiye",
          // Detailed View Fields:
          tagline: "Empowering Students Through Tech.",
          coverImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?fit=crop&w=2000&q=80",
          client: "Gollis University Hub",
          role: "Mobile App Developer",
          timeline: "Released Sept 2025",
          status: "Live on App Stores",
          liveLink: "#",
          githubLink: "#",
          challenge: "Students needed a unified, mobile-first platform to access aid, resources, and institutional communication without relying on heavy web browsers.",
          solution: "Engineered a cross-platform mobile application using Flutter to ensure native performance, eliminating UI jank and optimizing memory rendering for lower-end devices.",
          techStack: ["Flutter", "Dart", "Firebase Auth", "REST APIs"],
          gallery: [
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?fit=crop&w=1200&q=80"
          ]
        },
        { 
          title: "GuriUp", 
          type: "Real Estate", 
          img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?fit=crop&w=1200&q=80", 
          desc: "Real-time property booking and management application with map integrations.",
          projectLink: "/projects/guriup",
          // Detailed View Fields:
          tagline: "The Future of Property Booking.",
          coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?fit=crop&w=2000&q=80",
          client: "GuriUp Real Estate",
          role: "Full-Stack Engineer",
          timeline: "Early 2026",
          status: "Live Beta",
          liveLink: "#",
          githubLink: "#",
          challenge: "Integrating seamless agent verification systems and hotel dashboards into a single, cohesive ecosystem without locking out active 'Pro' plan agents.",
          solution: "Standardized plan logic ('agent_pro') across all application files and engineered an intuitive, premium Bento-UI dashboard for property managers.",
          techStack: ["Next.js", "Tailwind CSS", "PostgreSQL", "Prisma"],
          gallery: []
        },
        { 
          title: "HiigsiTech", 
          type: "Corporate Web", 
          img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=1200&q=80", 
          desc: "High-performance digital agency portfolio featuring advanced 3D scrolling mechanics.",
          projectLink: "/projects/hiigsitech"
        },
        { 
          title: "Israelsomali Portal", 
          type: "News Ecosystem", 
          img: "https://images.unsplash.com/photo-1529101091760-6149d3c879d4?fit=crop&w=1200&q=80", 
          desc: "High-traffic media architecture handling dynamic content delivery and configuration.",
          projectLink: "/projects/israelsomali"
        }
      ];

      return NextResponse.json(fallbackProjects, { status: 200 });
    }

    // 5. Return live dynamic tracking data from your Firebase instance
    return NextResponse.json(projects, { status: 200 });
    
  } catch (error) {
    console.error("Database connection failure on projects route:", error);
    return NextResponse.json(
      { error: "Failed to communicate with projects database." },
      { status: 500 }
    );
  }
}