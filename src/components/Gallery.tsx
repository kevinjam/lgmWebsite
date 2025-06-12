import Image from 'next/image';
import React from 'react'

  const galleryImages = [
    '/images/gallery/pastor.png',
    '/images/gallery/pastor.png',
    '/images/gallery/pastor.png',
    '/images/gallery/pastor.png',
  ];


export default function Gallery() {
  return (
    <div>
       <section className="py-8 sm:py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
             Community in Action
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative w-full h-40 sm:h-48">
                <Image
                src={image} 
                alt={`Gallery image ${index + 1}`} 
                layout="fill" 
                objectFit="cover" 
                className="rounded-lg shadow-md transition-transform transform hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
