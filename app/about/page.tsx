// app/about/page.tsx
import type { Metadata } from "next";
import AboutMeClient from "../../components/about";

/**
 * ============================================================================
 * MUBARIK OSMAN ABDI - SEO & METADATA ARCHITECTURE
 * This server component handles 100% of the SEO optimization, rich snippets,
 * and OpenGraph data to ensure dominance in search rankings across Africa.
 * ============================================================================
 */

export const metadata: Metadata = {
  title: "Mubarik Osoman | The Architect | Best African Software Engineer",
  description: "The personal dossier of Mubarik Osman Abdi. From a tech enthusiast to a master builder. Discover my journey through Golis University, global hackathons, and community engineering in Hargeisa.",
  keywords: [
    "Mubarik Osoman",
    "Mubarik Osman Abdi",
    "Best African dev",
    "Best Somali dev",
    "dev near me",
    "Software Engineer in Hargeisa",
    "Next.js Developer Somalia",
    "Flutter Expert East Africa",
    "IoT Hackathon Winner 2025",
    "GCP Cloud Architect Somalia",
    "African Tech Builder"
  ],
  authors: [{ name: "Mubarik Osman Abdi", url: "https://mubarikosoman.com" }],
  creator: "Mubarik Osman Abdi",
  publisher: "Mubarik Osoman",
  alternates: {
    canonical: "https://mubarikosoman.com/about",
  },
  openGraph: {
    title: "Mubarik Osoman | The Premier African Full-Stack Developer",
    description: "Explore the deep technical journey of Mubarik Osman Abdi. A story of relentless engineering, hackathon conquests across East Africa, and community problem-solving.",
    url: "https://mubarikosoman.com/about",
    siteName: "Mubarik Osoman Portfolio",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "https://mubarikosoman.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mubarik Osoman - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mubarik Osoman | The Architect",
    description: "From tech enthusiast to master builder. Read the personal dossier of East Africa's top full-stack developer.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function AboutPage() {
  // Deep JSON-LD Schema for maximum Google Rich Results indexing
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://mubarikosoman.com/about#person",
        "name": "Mubarik Osman Abdi",
        "alternateName": ["Mubarik Osoman", "Best Somali Dev", "Best African Dev"],
        "jobTitle": "Full-Stack Software Engineer & Digital Architect",
        "url": "https://mubarikosoman.com",
        "sameAs": [
          "https://github.com/mubarikosoman",
          "https://linkedin.com/in/mubarikosoman"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Hargeisa",
          "addressRegion": "Woqooyi Galbeed",
          "addressCountry": "Somalia"
        },
        "description": "A highly skilled software engineer specializing in Next.js, Flutter, and GCP. Recognized for solving complex community problems and winning major East African hackathons.",
        "alumniOf": [
          {
            "@type": "CollegeOrUniversity",
            "name": "Golis University",
            "location": { "@type": "Place", "address": "Hargeisa, Somalia" },
            "description": "Bachelor of Science in Software Engineering"
          },
          {
            "@type": "CollegeOrUniversity",
            "name": "Tisqaad College",
            "location": { "@type": "Place", "address": "Hargeisa, Somalia" },
            "description": "Diploma in Computer Science"
          }
        ],
        "knowsAbout": [
          "Advanced Software Engineering", 
          "Next.js App Router Architecture", 
          "Flutter Cross-Platform Development", 
          "Google Cloud Platform (GCP)", 
          "Firebase & Cloud Functions", 
          "PHP/Laravel Backend Systems", 
          "Internet of Things (IoT)",
          "UI/UX Glassmorphism Design"
        ],
        "award": [
          "Winner - Xalkadoon Fikircamp 2025 (IoT Water Management Prototype 'Biyo Kaab')",
          "Top Finalist - Somalia National Hackathon",
          "Innovation Award - Kenya Tech Summit Hackathon 2023",
          "Excellence in Code Architecture - Innovate Uganda Hackathon 2024",
          "Best Scalable Solution - Ethiopia DevFest Hackathon 2024"
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Professional Certificate",
            "name": "Google Cloud Platform & Data Analytics",
            "recognizedBy": { "@type": "Organization", "name": "Google" }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Professional Certificate",
            "name": "Meta Front-End & Back-End Developer",
            "recognizedBy": { "@type": "Organization", "name": "Meta" }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Professional Certificate",
            "name": "IBM Full Stack Software Developer",
            "recognizedBy": { "@type": "Organization", "name": "IBM" }
          }
        ]
      },
      {
        "@type": "ProfilePage",
        "@id": "https://mubarikosoman.com/about#webpage",
        "url": "https://mubarikosoman.com/about",
        "name": "Mubarik Osoman - Personal Dossier & Technical Journey",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://mubarikosoman.com/#website",
          "name": "Mubarik Osoman",
          "url": "https://mubarikosoman.com"
        },
        "about": { "@id": "https://mubarikosoman.com/about#person" }
      }
    ]
  };

  return (
    <>
      {/* Injecting Structured Data into the DOM for Google Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutMeClient />
    </>
  );
}