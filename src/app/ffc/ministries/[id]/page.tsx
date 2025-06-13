import FFCNav from '@/components/FFCNav';
import Footer from '@/components/Footer';
import { MinistryDetailsClient } from '../ClientComponents';

interface Ministry {
  _id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  link: string;
  location?: string;
  isActive: boolean;
  vision?: string;
  leaders?: { name: string; role: string; image?: string }[];
  galleryImages?: { url: string; caption: string }[];
  contact?: { email: string; phone: string; socialMedia: { facebook?: string; instagram?: string } };
  videoUrl?: string;
  events?: {
    _id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    image: string;
    isUpcoming: boolean;
  }[];
}

async function fetchMinistry(id: string): Promise<Ministry | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/ministries?id=${encodeURIComponent(id)}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching ministry:', error);
    return null;
  }
}

export default async function MinistryDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ministry = await fetchMinistry(id);

  const Placeholder = () => (
    <div className="min-h-screen bg-gray-50">
      <FFCNav />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="h-12 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-[60vh] bg-gray-200 animate-pulse"></div>
            <div className="p-8">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
              <div className="relative h-64 bg-gray-200 rounded-lg animate-pulse mb-8"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );

  if (!ministry) {
    return (
      <div className="min-h-screen bg-gray-50">
        <FFCNav />
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
              Ministry Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8 text-center">
              The ministry you are looking for could not be found. Please check the URL or explore other ministries.
            </p>
            <Placeholder />
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <FFCNav />
      <MinistryDetailsClient ministry={ministry} />
      {/* <Footer /> */}
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ministry = await fetchMinistry(id);
  return {
    title: ministry ? `${ministry.name} - Latter Glory Ministries` : 'Ministry Not Found',
    description: ministry ? ministry.description : 'Ministry not found.',
  };
}