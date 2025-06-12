import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

interface Sermon {
  title: string;
  videoId: string;
  thumbnail: string;
  duration: string;
}

export default function Youtube() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch sermons from API route
  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const response = await fetch('/api/youtube');
        if (!response.ok) {
          throw new Error('Failed to fetch sermons');
        }
        const data = await response.json();
        setSermons(data);
        setLoading(false);
      } catch (err:unknown) {
        console.error('Error fetching sermons:', err);
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      }
    };
    fetchSermons();
  }, []);

  // Handle video play
  const handlePlayVideo = (videoId: string) => {
    setPlayingVideo(videoId === playingVideo ? null : videoId); // Toggle video playback
  };

  // Placeholder component for when no data is available
  const PlaceholderCard = () => (
    <div className="relative animate-pulse">
      <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-200"></div>
      <div className="mt-2 text-center">
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Watch and Listen to Our Sermons
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <PlaceholderCard key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || sermons.length === 0) {
    return (
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Watch and Listen to Our Sermons
          </h2>
          <p className="text-gray-600 mb-6">
            {error ? 'Unable to load sermons at this time.' : 'No sermons available yet.'}
            Please check back later or visit our YouTube channel.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <PlaceholderCard key={index} />
            ))}
          </div>
          <Link href="https://www.youtube.com/@lattergloryministries3882" target="_blank" rel="noopener noreferrer">
            <button className="mt-6 bg-purple-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-purple-700 transition">
              Visit Our YouTube Channel
            </button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div>
      {/* Watch and Listen to Our Sermons Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Watch and Listen to Our Sermons
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {sermons.map((sermon) => (
              <div key={sermon.videoId} className="relative">
                {/* Video Container (Thumbnail or Player) */}
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  {playingVideo === sermon.videoId ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${sermon.videoId}?autoplay=1`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={sermon.title}
                      className="rounded-lg"
                    ></iframe>
                  ) : (
                    <>
                      <Image
                        src={sermon.thumbnail}
                        alt={`${sermon.title} thumbnail`}
                        layout="fill"
                        objectFit="cover"
                        className="transition-opacity duration-300"
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-opacity-0 cursor-pointer"
                        onClick={() => handlePlayVideo(sermon.videoId)}
                      >
                        <svg
                          className="w-16 h-16 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </>
                  )}
                </div>
                {/* Sermon Details */}
                <div className="mt-2 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">{sermon.title}</h3>
                  <p className="text-gray-600 text-sm">{sermon.duration}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="https://www.youtube.com/@lattergloryministries3882" target="_blank" rel="noopener noreferrer">
            <button className="mt-6 bg-purple-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-purple-700 transition">
              Visit Our YouTube Channel
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}