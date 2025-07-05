"use client";

import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function MilestonePage() {
  const milestones = [
    {
      period: "2000–2012",
      title: "A Journey of Glory",
      verse: "‘The glory of this present house will be greater!’ – Haggai 2:9",
      items: [
        { year: 2000, events: [
          { title: 'March Through Kampala', description: 'Led by Pr. Solomon Sebinyasi, believers marched to spark revival.', image: '/images/march-kampala.jpg' },
          { title: 'July – LGM Launch at Nile Hotel', description: 'Latter Glory Ministries began, igniting a vision for a glorious bride.', image: '/images/nile-hotel-launch.jpg' },
        ]},
        { year: 2001, events: [
          { title: '1st Anniversary', description: 'Celebrated with worship and prayer, uniting the LGM family.', image: '/images/gallery/pastor.png' },
        ]},
        { year: 2002, events: [
          { title: '2nd Anniversary', description: 'Marked by deeper commitment to discipleship.', image: '/images/anniversary-event.jpg' },
          { title: '30th June – National Youth Prayer Day', description: 'Youth, led by Pr. Aloysius Kibirige, interceded for Uganda.', image: '/images/youth-prayer.jpg' },
        ]},
        { year: 2003, events: [
          { title: '3rd Anniversary', description: "Celebrated growth and God's faithfulness.", image: '/images/anniversary-celebration.jpg' },
          { title: 'Launch of Faith Family Church', description: "LGM's flagship congregation began, fostering revival.", image: '/images/ffc-launch.jpg' },
        ]},
        { year: 2004, events: [
          { title: '4th Anniversary', description: 'Testimonies of transformed lives filled the celebration.', image: '/images/anniversary-event.jpg' },
          { title: '12th–19th March – All Believers Conference, Mbarara', description: 'Drew thousands, sparking revival in Western Uganda.', image: '/images/mbarara-conference.jpg' },
        ]},
        { year: 2005, events: [
          { title: '5th Anniversary', description: 'Reflected on five years of God\'s grace.', image: '/images/anniversary-gathering.jpg' },
        ]},
        { year: 2006, events: [
          { title: '6th Anniversary', description: 'Welcomed new members into the vision.', image: '/images/anniversary-event.jpg' },
        ]},
        { year: 2007, events: [
          { title: '1st July – Anniversary with Guests', description: 'Justice Mwondah and Ms. Kyogire ("Ebenezer") joined the celebration.', image: '/images/anniversary-guests.jpg' },
          { title: '30th June–4th July – Revival Week', description: 'Pr. Nyonyintono and Pr. Senfuma led hundreds to Christ.', image: '/images/revival-week.jpg' },
        ]},
        { year: 2008, events: [
          { title: '5th July – Ordination of Pr. Kasirye', description: 'Apostle Mulinde ordained Pr. Kasirye, strengthening leadership.', image: '/images/ordination.jpg' },
        ]},
        { year: 2009, events: [
          { title: 'Church Office Established', description: 'Enhanced LGM\'s operations and outreach.', image: '/images/church-office.jpg' },
          { title: 'Eagles SACCO Launched', description: 'Empowered members through a financial cooperative.', image: '/images/sacco-launch.jpg' },
        ]},
        { year: 2010, theme: 'Abiding in Christ to Bear Fruit (John 15:5)', events: [
          { title: 'Church Vision Unveiled', description: '"Disciples of Christ indeed discipling others" set a bold direction.', image: '/images/vision-unveiling.jpg' },
          { title: 'January – Church Structure Reconstruction', description: 'Improved worship facilities.', image: '/images/church-construction.jpg' },
          { title: '12th September – 1st Singles Meeting', description: 'Launched ministry for singles.', image: '/images/singles-meeting.jpg' },
        ]},
        { year: 2011, events: [
          { title: '1st January – Family Day Out', description: 'Strengthened family bonds through fellowship.', image: '/images/family-day-out.jpg' },
        ]},
        { year: 2012, theme: 'Growth & Soul Winning', events: [
          { title: '18th August – 45 Ministers Graduated', description: 'ISOM training equipped leaders.', image: '/images/graduation.jpg' },
          { title: 'November – 12 Tribes of Israel Introduced', description: 'Fostered community structure.', image: '/images/tribes-event.jpg' },
          { title: 'Season of Jubilee for the Nation', description: "Prayed for Uganda's renewal.", image: '/images/jubilee-prayer.jpg' },
        ]},
      ],
      bgColor: 'bg-white',
    },
    {
      period: "2013–2025",
      title: "A Legacy of Revival",
      verse: "‘And the glory of the Lord will be revealed!' – Isaiah 40:5",
      items: [
        { year: 2013, events: [
          { title: '15th December – Family Day Out', description: 'United families in joyful fellowship.', image: '/images/family-day-out.jpg' },
        ]},
        { year: 2014, events: [
          { title: 'Continued Discipleship and Outreach', description: "Strengthened LGM's mission in Uganda.", image: '/images/worship-service.jpg' },
        ]},
        { year: 2015, events: [
          { title: 'Community Engagement', description: 'Expanded training and outreach programs.', image: '/images/community-outreach.jpg' },
        ]},
        { year: 2016, events: [
          { title: "28th January – Tribes' Expo", description: "Showcased the 12 Tribes' contributions.", image: '/images/tribes-expo.jpg' },
        ]},
        { year: 2017, events: [
          { title: "Children's Church Repairs", description: 'Enhanced facilities for Glory Kids.', image: '/images/children-church.jpg' },
          { title: 'Toilet Construction', description: 'Improved church amenities.', image: '/images/construction-site.jpg' },
        ]},
        { year: 2018, events: [
          { title: 'Expo (6th, 13th, 20th January)', description: 'Highlighted ministry achievements.', image: '/images/expo-event.jpg' },
          { title: 'Sports Day Expo', description: 'United members through sports.', image: '/images/sports-day.jpg' },
        ]},
        { year: 2019, theme: 'Kingdom Alignment', events: [
          { title: "Aligned Ministries with God's Purpose", description: 'Focused on spiritual growth.', image: '/images/worship-service.jpg' },
        ]},
        { year: 2020, events: [
          { title: 'Medical Camp', description: 'Served the community with healthcare.', image: '/images/medical-camp.jpg' },
        ]},
        { year: 2021, events: [
          { title: 'Online Services Expansion', description: 'Reached thousands globally via live streams.', image: '/images/online-service.jpg' },
        ]},
        { year: 2022, theme: 'Seek God and Live', events: [
          { title: 'Deepened Prayer and Revival', description: 'Strengthened spiritual focus.', image: '/images/prayer-meeting.jpg' },
        ]},
        { year: 2023, theme: 'Arise and Shine', events: [
          { title: 'Expanded Outreach Programs', description: 'Reached new communities.', image: '/images/outreach-event.jpg' },
        ]},
        { year: 2024, theme: 'Let Christ Reign/Dominion', events: [
          { title: 'Global Missions Growth', description: 'Trained over 7,000 disciples.', image: '/images/mission-trip.jpg' },
        ]},
        { year: 2025, theme: 'Victory, Revival & Serving God', events: [
          { title: 'Silver Jubilee Celebration', description: 'Marked 25 years with global outreach.', image: '/images/silver-jubilee.jpg' },
        ]},
      ],
      bgColor: 'bg-gray-50',
    },
  ];

  return (
    <>
      <Head>
        <title>LGM Silver Jubilee Timeline | 25 Years of God&apos;s Faithfulness</title>
        <meta name="description" content="Celebrating 25 Years of God's Faithfulness at Latter Glory Ministries (2000–2025)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen font-sans antialiased text-gray-800 bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <div className="relative bg-[#BF2323] text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-full h-full bg-[url('/images/cross-pattern.svg')] bg-repeat"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#BF2323]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif">
                Latter Glory Ministries
              </h1>
              <h2 className="text-2xl md:text-4xl font-semibold mb-6">
                Silver Jubilee Timeline
              </h2>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                Celebrating 25 Years of God&apos;s Faithfulness (2000–2025)
              </p>
              <div className="mt-8 flex justify-center">
                <div className="w-20 h-1 bg-[#FFD700]"></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Timeline */}
        <div className="container mx-auto px-4 py-12">
          {milestones.map((section, sectionIndex) => (
            <section key={sectionIndex} className={`mb-20 ${section.bgColor} rounded-xl shadow-lg overflow-hidden`}>
              {/* Section Header */}
              <div className="bg-[#BF2323] text-white py-6 px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div>
                    <span className="inline-block px-3 py-1 bg-white text-[#BF2323] text-sm font-semibold rounded-full mb-2">
                      {section.period}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold">{section.title}</h2>
                  </div>
                  <p className="italic mt-2 md:mt-0 text-[#FFD700]">{section.verse}</p>
                </div>
              </div>

              {/* Horizontal Timeline */}
              <div className="relative py-8 px-6">
                {/* Timeline Bar */}
                <div className="hidden md:block absolute left-0 right-0 top-1/2 h-1 bg-gray-200 transform -translate-y-1/2"></div>
                
                {/* Timeline Items */}
                <div className="relative grid grid-cols-1 md:grid-cols-7 gap-8">
                  {section.items.map((item, index) => (
                    <motion.div
                      key={index}
                      className="relative group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {/* Year Marker */}
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-[#BF2323] flex items-center justify-center text-white font-bold z-10 relative mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          {item.year}
                        </div>
                        
                        {/* Events */}
                        <div className="w-full space-y-4">
                          {item.events.map((event, eventIndex) => (
                            <motion.div
                              key={eventIndex}
                              className="bg-white p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                              whileHover={{ scale: 1.02 }}
                            >
                              <h3 className="text-lg font-bold text-[#BF2323] mb-2">{event.title}</h3>
                              {item.theme && eventIndex === 0 && (
                                <div className="mb-2">
                                  <span className="inline-block px-2 py-1 bg-[#FFD700] text-xs font-semibold rounded">
                                    Theme: {item.theme}
                                  </span>
                                </div>
                              )}
                              <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                              {event.image && (
                                <Image
                                  src={event.image}
                                  alt={event.title}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                  width={400}
                                  height={250}
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                  style={{ objectFit: 'cover' }}
                                  priority={false}
                                />
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}