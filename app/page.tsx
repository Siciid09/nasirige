import { client } from '@/sanity/lib/client';
import HomeClient from './components/HomeClient'; // Import the client component we just created

// 1. Fetch data directly in the Server Component (async function)
async function getHomePageData() {
  const query = `*[_type == "homePage"][0]{
    ...,
    heroImage { upload, url },
    actionCards[],
    priorities[],
    aboutImage { upload, url },
    timeline[],
    galleryImages[],
    galleryQuote,
    advisors[]{ 
        ..., 
        image { upload, url } 
    },
    trail[],
    testimonials[]{ 
        ..., 
        image { upload, url } 
    },
    manifestoDownloads[]{ 
        ..., 
        "fileUrl": fileUpload.asset->url 
    },
    newsSection[]->{ 
        ..., 
        mainImage 
    },
    shopSection[]->{ 
        ..., 
        image 
    },
    footer
  }`;

  // Fetch with revalidation (optional: ensures data updates every 60 seconds)
  // or use { cache: 'no-store' } for instant updates at cost of performance
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function Home() {
  // 2. Await the data on the server
  const data = await getHomePageData();

  // 3. Pass data to the Client Component
  // If data is null/missing, we can handle it or pass empty object
  return <HomeClient data={data || {}} />;
}