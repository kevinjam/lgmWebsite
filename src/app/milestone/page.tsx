import React from 'react';
import Head from 'next/head';

export default function MilestonePage() {
  const milestones = [
    {
      period: "2000–2012",
      title: "A Journey of Glory",
      verse: "‘The glory of this present house will be greater!’ – Haggai 2:9",
      items: [
        {
          year: 2000,
          events: [
            { title: 'March Through Kampala', description: 'Led by Pr. Solomon Sebinyasi, believers marched to spark revival.', image: '/images/march-kampala.jpg' },
            { title: 'July – LGM Launch at Nile Hotel', description: 'Latter Glory Ministries began, igniting a vision for a glorious bride.', image: '/images/nile-hotel-launch.jpg' },
          ],
        },
        {
          year: 2001,
          events: [
            { title: '1st Anniversary', description: 'Celebrated with worship and prayer, uniting the LGM family.', image: '/images/anniversary-gathering.jpg' },
          ],
        },
        {
          year: 2002,
          events: [
            { title: '2nd Anniversary', description: 'Marked by deeper commitment to discipleship.', image: '/images/anniversary-event.jpg' },
            { title: '30th June – National Youth Prayer Day', description: 'Youth, led by Pr. Aloysius Kibirige, interceded for Uganda.', image: '/images/youth-prayer.jpg' },
          ],
        },
        {
          year: 2003,
          events: [
            { title: '3rd Anniversary', description: "Celebrated growth and God's faithfulness.", image: '/images/anniversary-celebration.jpg' },
            { title: 'Launch of Faith Family Church', description: "LGM's flagship congregation began, fostering revival.", image: '/images/ffc-launch.jpg' },
          ],
        },
        {
          year: 2004,
          events: [
            { title: '4th Anniversary', description: 'Testimonies of transformed lives filled the celebration.', image: '/images/anniversary-event.jpg' },
            { title: '12th–19th March – All Believers Conference, Mbarara', description: 'Drew thousands, sparking revival in Western Uganda.', image: '/images/mbarara-conference.jpg' },
          ],
        },
        {
          year: 2005,
          events: [
            { title: '5th Anniversary', description: 'Reflected on five years of God\'s grace.', image: '/images/anniversary-gathering.jpg' },
          ],
        },
        {
          year: 2006,
          events: [
            { title: '6th Anniversary', description: 'Welcomed new members into the vision.', image: '/images/anniversary-event.jpg' },
          ],
        },
        {
          year: 2007,
          events: [
            { title: '1st July – Anniversary with Guests', description: 'Justice Mwondah and Ms. Kyogire ("Ebenezer") joined the celebration.', image: '/images/anniversary-guests.jpg' },
            { title: '30th June–4th July – Revival Week', description: 'Pr. Nyonyintono and Pr. Senfuma led hundreds to Christ.', image: '/images/revival-week.jpg' },
          ],
        },
        {
          year: 2008,
          events: [
            { title: '5th July – Ordination of Pr. Kasirye', description: 'Apostle Mulinde ordained Pr. Kasirye, strengthening leadership.', image: '/images/ordination.jpg' },
          ],
        },
        {
          year: 2009,
          events: [
            { title: 'Church Office Established', description: 'Enhanced LGM\'s operations and outreach.', image: '/images/church-office.jpg' },
            { title: 'Eagles SACCO Launched', description: 'Empowered members through a financial cooperative.', image: '/images/sacco-launch.jpg' },
          ],
        },
        {
          year: 2010,
          theme: 'Abiding in Christ to Bear Fruit (John 15:5)',
          events: [
            { title: 'Church Vision Unveiled', description: '"Disciples of Christ indeed discipling others" set a bold direction.', image: '/images/vision-unveiling.jpg' },
            { title: 'January – Church Structure Reconstruction', description: 'Improved worship facilities.', image: '/images/church-construction.jpg' },
            { title: '12th September – 1st Singles Meeting', description: 'Launched ministry for singles.', image: '/images/singles-meeting.jpg' },
          ],
        },
        {
          year: 2011,
          events: [
            { title: '1st January – Family Day Out', description: 'Strengthened family bonds through fellowship.', image: '/images/family-day-out.jpg' },
          ],
        },
        {
          year: 2012,
          theme: 'Growth & Soul Winning',
          events: [
            { title: '18th August – 45 Ministers Graduated', description: 'ISOM training equipped leaders.', image: '/images/graduation.jpg' },
            { title: 'November – 12 Tribes of Israel Introduced', description: 'Fostered community structure.', image: '/images/tribes-event.jpg' },
            { title: 'Season of Jubilee for the Nation', description: "Prayed for Uganda's renewal.", image: '/images/jubilee-prayer.jpg' },
          ],
        },
      ],
      bgColor: 'bg-white'
    },
    {
      period: "2013–2025",
      title: "A Legacy of Revival",
      verse: "‘And the glory of the Lord will be revealed!' – Isaiah 40:5",
      items: [
        {
          year: 2013,
          events: [
            { title: '15th December – Family Day Out', description: 'United families in joyful fellowship.', image: '/images/family-day-out.jpg' },
          ],
        },
        {
          year: 2014,
          events: [
            { title: 'Continued Discipleship and Outreach', description: "Strengthened LGM's mission in Uganda.", image: '/images/worship-service.jpg' },
          ],
        },
        {
          year: 2015,
          events: [
            { title: 'Community Engagement', description: 'Expanded training and outreach programs.', image: '/images/community-outreach.jpg' },
          ],
        },
        {
          year: 2016,
          events: [
            { title: "28th January – Tribes' Expo", description: "Showcased the 12 Tribes' contributions.", image: '/images/tribes-expo.jpg' },
          ],
        },
        {
          year: 2017,
          events: [
            { title: "Children's Church Repairs", description: 'Enhanced facilities for Glory Kids.', image: '/images/children-church.jpg' },
            { title: 'Toilet Construction', description: 'Improved church amenities.', image: '/images/construction-site.jpg' },
          ],
        },
        {
          year: 2018,
          events: [
            { title: 'Expo (6th, 13th, 20th January)', description: 'Highlighted ministry achievements.', image: '/images/expo-event.jpg' },
            { title: 'Sports Day Expo', description: 'United members through sports.', image: '/images/sports-day.jpg' },
          ],
        },
        {
          year: 2019,
          theme: 'Kingdom Alignment',
          events: [
            { title: "Aligned Ministries with God's Purpose", description: 'Focused on spiritual growth.', image: '/images/worship-service.jpg' },
          ],
        },
        {
          year: 2020,
          events: [
            { title: 'Medical Camp', description: 'Served the community with healthcare.', image: '/images/medical-camp.jpg' },
          ],
        },
        {
          year: 2021,
          events: [
            { title: 'Online Services Expansion', description: 'Reached thousands globally via live streams.', image: '/images/online-service.jpg' },
          ],
        },
        {
          year: 2022,
          theme: 'Seek God and Live',
          events: [
            { title: 'Deepened Prayer and Revival', description: 'Strengthened spiritual focus.', image: '/images/prayer-meeting.jpg' },
          ],
        },
        {
          year: 2023,
          theme: 'Arise and Shine',
          events: [
            { title: 'Expanded Outreach Programs', description: 'Reached new communities.', image: '/images/outreach-event.jpg' },
          ],
        },
        {
          year: 2024,
          theme: 'Let Christ Reign/Dominion',
          events: [
            { title: 'Global Missions Growth', description: 'Trained over 7,000 disciples.', image: '/images/mission-trip.jpg' },
          ],
        },
        {
          year: 2025,
          theme: 'Victory, Revival & Serving God',
          events: [
            { title: 'Silver Jubilee Celebration', description: 'Marked 25 years with global outreach.', image: '/images/silver-jubilee.jpg' },
          ],
        },
      ],
      bgColor: 'bg-gray-50'
    }
  ];

  return (
    <>
      <Head>
        <title>LGM Silver Jubilee Timeline | 25 Years of God&apos;s Faithfulness</title>
        <meta name="description" content="Celebrating 25 Years of God's Faithfulness at Latter Glory Ministries (2000–2025)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen font-sans antialiased text-gray-800">
        {/* Hero Section */}
        <div className="relative bg-[#BF2323] text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              Latter Glory Ministries
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold mb-6 animate-fade-in delay-100">
              Silver Jubilee Timeline
            </h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto animate-fade-in delay-200">
              Celebrating 25 Years of God&apos;s Faithfulness (2000–2025)
            </p>
            <div className="mt-8 animate-fade-in delay-300">
              <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Timeline Sections */}
        {milestones.map((section, sectionIndex) => (
          <section key={sectionIndex} className={`py-16 ${section.bgColor}`}>
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1 bg-[#BF2323] text-white text-sm font-semibold rounded-full mb-3">
                  {section.period}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#BF2323] mb-3">
                  {section.title}
                </h2>
                <p className="text-lg italic text-gray-600 max-w-2xl mx-auto">
                  {section.verse}
                </p>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Main timeline line */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-400 transform -translate-x-1/2"></div>
                
                {/* Timeline items */}
                <div className="space-y-16 md:space-y-0">
                  {section.items.map((milestone, index) => (
                    <div 
                      key={milestone.year}
                      className={`relative md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between mb-16`}
                    >
                      {/* Year marker */}
                      <div className="md:absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-10">
                        <div className="w-16 h-16 rounded-full bg-[#BF2323] flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-xl">{milestone.year}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`md:w-5/12 mt-8 md:mt-0 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                        {milestone.theme && (
                          <p className="text-sm font-semibold text-[#BF2323] mb-2">
                            Theme: {milestone.theme}
                          </p>
                        )}
                        
                        <div className="space-y-6">
                          {milestone.events.map((event, eventIndex) => (
                            <div 
                              key={eventIndex}
                              className={`p-6 rounded-lg shadow-md bg-white transition-all duration-300 hover:shadow-lg ${index % 2 === 0 ? 'hover:-translate-x-2' : 'hover:translate-x-2'}`}
                            >
                              <h3 className="text-lg font-bold text-gray-800 mb-2">{event.title}</h3>
                              <p className="text-gray-600 mb-3">{event.description}</p>
                              {event.image && (
                                <div className="mt-3 overflow-hidden rounded-md">
                                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                                    <img 
                                      src={event.image} 
                                      alt={event.title} 
                                      className="object-cover w-full h-full"
                                      loading="lazy"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Spacer for even items */}
                      <div className="hidden md:block md:w-5/12"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Footer */}
        <footer className="bg-[#BF2323] text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <img 
                src="/lgm-logo-white.png" 
                alt="LGM Logo" 
                className="h-16"
              />
            </div>
            <p className="text-lg mb-4">
              Join us as we continue this journey of faith
            </p>
            <div className="flex justify-center space-x-4 mb-6">
              <a href="#" className="hover:text-yellow-300 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="hover:text-yellow-300 transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="hover:text-yellow-300 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Latter Glory Ministries. All rights reserved.
            </p>
            <p className="text-sm mt-2">
              <a href="https://www.latterglory.ug" className="hover:text-yellow-300 underline transition-colors">
                www.latterglory.ug
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}