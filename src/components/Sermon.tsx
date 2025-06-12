"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PlayCircleIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/outline';
import ReactPlayer from 'react-player/youtube';

interface Sermon {
  title: string;
  videoId: string;
  thumbnail: string;
  date: string;
  speaker: string;
  quote: string;
  reference: string;
}

export default function Sermon() {
  const [latestSermon, setLatestSermon] = useState<Sermon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playingVideo, setPlayingVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);

  // Fetch latest sermon from API route
  useEffect(() => {
    const fetchLatestSermon = async () => {
      try {
        const response = await fetch('/api/latest-sermon');
        console.log('Fetching latest sermon from API');
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error('Failed to fetch latest sermon');
        }
        const data = await response.json();
        setLatestSermon(data);
        setLoading(false);
      } catch (err:unknown) {
        setError('Error fetching latest sermon' +err);
        setLoading(false);
      }
    };
    fetchLatestSermon();
  }, []);

  // Handle video play/pause
  const handlePlayPause = () => {
    if (playingVideo) {
      setIsPlaying(!isPlaying);
    } else {
      setPlayingVideo(true);
      setIsPlaying(true);
    }
  };

  // Placeholder component for loading state
  const Placeholder = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto animate-pulse">
      <div className="md:flex">
        <div className="relative w-full md:w-1/2 h-48 md:h-80 bg-gray-200"></div>
        <div className="p-6 md:w-1/2">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="py-8 sm:py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Latest Sermon
          </h2>
          <Placeholder />
        </div>
      </section>
    );
  }

  if (error || !latestSermon) {
    return (
      <section className="py-8 sm:py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Latest Sermon
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Unable to load the latest sermon. Please check back later or view all sermons.
          </p>
          <Placeholder />
          <div className="text-center mt-6">
            <Link
              href="/sermons"
              className="text-blue-600 hover:underline text-sm sm:text-base"
            >
              View All Sermons
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const thumbnailUrl = latestSermon.thumbnail || `https://img.youtube.com/vi/${latestSermon.videoId}/hqdefault.jpg`;

  return (
    <section className="py-8 sm:py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
          Latest Sermon
        </h2>
        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:flex">
            {/* Thumbnail/Video */}
            <div className="relative w-full md:w-1/2 h-48 md:h-auto">
              {playingVideo ? (
                <div className="relative w-full h-full">
                  <ReactPlayer
                    ref={playerRef}
                    url={`https://www.youtube.com/watch?v=${latestSermon.videoId}`}
                    playing={isPlaying}
                    controls={false} // Disable default controls
                    width="100%"
                    height="100%"
                    className="rounded-t-lg md:rounded-none"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 flex justify-center">
                    <button
                      onClick={handlePlayPause}
                      className="text-white hover:text-gray-200 transition"
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    >
                      {isPlaying ? (
                        <PauseIcon className="w-8 h-8" />
                      ) : (
                        <PlayIcon className="w-8 h-8" />
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full cursor-pointer" onClick={handlePlayPause}>
                  <Image
                    src={thumbnailUrl}
                    alt={latestSermon.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-lg md:rounded-none"
                    priority
                  />
                  <div className="absolute inset-0 hover:bg-opacity-10 transition-opacity duration-300" />
                  <PlayCircleIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white opacity-80 hover:opacity-100 transition-opacity" />
                </div>
              )}
            </div>
            {/* Content */}
            <div className="p-6 md:w-1/2">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                {latestSermon.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                <span className="font-medium">Date:</span> {latestSermon.date}
              </p>
              <p className="text-gray-600 text-sm mb-2">
                <span className="font-medium">Speaker:</span> {latestSermon.speaker}
              </p>
              <p className="text-gray-700 text-sm sm:text-base mb-4">{latestSermon.quote}</p>
              <p className="text-gray-600 text-sm italic mb-4">{latestSermon.reference}</p>
              <button
                onClick={handlePlayPause}
                className="inline-flex items-center bg-purple-800 text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-purple-900 transition"
                aria-label={isPlaying ? `Pause ${latestSermon.title}` : `Watch ${latestSermon.title}`}
              >
                {isPlaying ? (
                  <PauseIcon className="w-5 h-5 mr-2" />
                ) : (
                  <PlayCircleIcon className="w-5 h-5 mr-2" />
                )}
                {isPlaying ? 'Pause' : 'Watch Now'}
              </button>
            </div>
          </div>
        </motion.div>
        <div className="text-center mt-6">
          <Link
            href="/ffc/sermons"
            className="text-blue-600 hover:underline text-sm sm:text-base"
          >
            View All Sermons
          </Link>
        </div>
      </div>
    </section>
  );
}