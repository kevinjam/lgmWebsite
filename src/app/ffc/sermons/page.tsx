"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FFCNav from '../../../components/FFCNav';
import Footer from '../../../components/Footer';

export default function Sermons() {
  const [sermons, setSermons] = useState<
    { title: string; description: string; audioUrl: string; formattedDate: string; speaker: string; category: string | null }[]
  >([]);
  const [filteredSermons, setFilteredSermons] = useState<
    { title: string; description: string; audioUrl: string; formattedDate: string; speaker: string; category: string | null }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const sermonsPerPage = 12;

  // Fetch sermon data from Castbox RSS feed via /api/castbox-feed
  useEffect(() => {
    const fetchSermons = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/castbox-feed');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');

        if (xml.querySelector('parsererror')) {
          throw new Error('Error parsing XML');
        }

        const channelCategories = Array.from(xml.querySelectorAll('channel itunes\\:category'))
          .map((cat) => cat.getAttribute('text'))
          .filter(Boolean);

        const items = Array.from(xml.querySelectorAll('item')).map((item) => {
          const title = item.querySelector('title')?.textContent || 'Untitled Sermon';
          const description = item.querySelector('description')?.textContent
            ? (item.querySelector('description')?.textContent || '').replace(/(<([^>]+)>)/gi, '')
            : '';
          const audioUrl = item.querySelector('enclosure')?.getAttribute('url') || '';
          const pubDate = item.querySelector('pubDate')?.textContent || '';
          const date = new Date(pubDate);
          const formattedDate = isNaN(date.getTime())
            ? 'Unknown Date'
            : date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });
          const speaker = title.split('-').pop()?.trim() || 'Unknown Speaker';
          const itemCategories = Array.from(item.querySelectorAll('itunes\\:category'))
            .map((cat) => cat.getAttribute('text'))
            .filter(Boolean);
          const category = itemCategories.length > 0 ? itemCategories[0] : channelCategories.length > 0 ? channelCategories[0] : 'General';

          return { title, description, audioUrl, formattedDate, speaker, category };
        });

        if (items.length === 0) {
          throw new Error('No sermon items found in the RSS feed');
        }

        setSermons(items);
        setFilteredSermons(items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sermons:', error);
        setError(error instanceof Error ? error.message : 'Failed to load sermons. Please try again later.');
        setLoading(false);
      }
    };

    fetchSermons();
  }, []);

  // Handle filtering by category and search
  useEffect(() => {
    let filtered = sermons;
    if (filter !== 'all') {
      filtered = sermons.filter((sermon) => (sermon.category?.toLowerCase() || 'general') === filter.toLowerCase());
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (sermon) =>
          sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredSermons(filtered);
    setCurrentPage(1);
  }, [filter, searchTerm, sermons]);

  // Get unique categories
  const categories = ['all', ...new Set(sermons.map((sermon) => sermon.category?.toLowerCase() || 'general'))];

  // Pagination
  const indexOfLastSermon = currentPage * sermonsPerPage;
  const indexOfFirstSermon = indexOfLastSermon - sermonsPerPage;
  const currentSermons = filteredSermons.slice(indexOfFirstSermon, indexOfLastSermon);
  const totalPages = Math.ceil(filteredSermons.length / sermonsPerPage);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-purple-800 shadow-md">
        <FFCNav />
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Filters and Search */}
        <section className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-100">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <motion.div
              className="w-full sm:w-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full sm:w-44 p-2 border-2 border-purple-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-600 transition duration-200"
                aria-label="Filter sermons by category"
              >
                {categories.map((category) => (
                  <option key={category} value={category} className="text-gray-900">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </motion.div>
            <motion.div
              className="w-full sm:w-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or speaker..."
                className="w-full sm:w-64 p-2 border-2 border-purple-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-600 transition duration-200"
                aria-label="Search sermons"
              />
            </motion.div>
          </div>
        </section>

        {/* Sermons Grid */}
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center">
                <svg
                  className="animate-spin h-6 w-6 text-purple-600 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-label="Loading"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l-3 3 3 3v4a8 8 0 01-8-8z" />
                </svg>
                <p className="mt-1 text-gray-600 text-sm">Loading sermons...</p>
              </div>
            ) : error ? (
              <p className="text-center text-red-600 text-sm">{error}</p>
            ) : filteredSermons.length === 0 ? (
              <p className="text-center text-gray-600 text-sm">No sermons found.</p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentSermons.map((sermon, index) => (
                    <motion.div
                      key={index}
                      className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {sermon.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          <strong>Speaker:</strong> {sermon.speaker}
                        </p>
                        <p className="text-gray-600 text-sm mb-2">
                          <strong>Date:</strong> {sermon.formattedDate}
                        </p>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{sermon.description}</p>
                        <audio
                          controls
                          className="w-full rounded"
                          src={sermon.audioUrl}
                          aria-label={`Play sermon: ${sermon.title}`}
                        >
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {/* Pagination */}
                <div className="mt-8 flex justify-center items-center gap-4">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-purple-800 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-900 transition"
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  <span className="text-gray-600 text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-purple-800 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-900 transition"
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}