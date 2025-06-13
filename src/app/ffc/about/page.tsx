// import Footer from '@/component/Footer';
import FFCNav from '@/components/FFCNav';
import Head from 'next/head';
import Image from 'next/image';

export default function About() {
  const leadership = [
    {
      name: 'Pastor John Doe',
      title: 'Senior Pastor',
      bio: 'With over 15 years of ministry, Pastor John leads with passion and wisdom.',
      image: '/images/pastor-john.jpg', // Replace with actual image path
    },
    {
      name: 'Pastor Jane Smith',
      title: 'Associate Pastor',
      bio: 'Pastor Jane oversees youth programs with dedication and care.',
      image: '/images/pastor-john.jpg',
    },
    {
      name: 'Pastor Mark Wilson',
      title: 'Outreach Pastor',
      bio: 'Pastor Mark drives our global mission initiatives with enthusiasm.',
      image: '/images/pastor-john.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About Us - Faith Family Church</title>
        <meta
          name="description"
          content="Learn about the mission, history, and leadership of Faith Family Church."
        />
      </Head>
      <FFCNav />

      {/* Hero Section */}
      <section className="relative h-96 w-full overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              About Faith Family Church
            </h1>
            <p className="text-lg sm:text-xl text-white opacity-90 mb-6">
              A community rooted in faith, love, and service.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-8">
            At Faith Family Church, our mission is to spread the love of Christ, build a strong
            community, and serve those in need. We are committed to fostering spiritual growth,
            worship, and outreach, creating a welcoming home for all who seek faith.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our History</h2>
          <p className="text-lg text-gray-600 mb-8">
            Founded in 2005, Faith Family Church began as a small gathering of believers dedicated
            to worship and fellowship. Over the years, we have grown into a vibrant community,
            expanding our ministries and reaching out to local and global communities with the
            Gospel message.
          </p>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Leadership</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((leader) => (
              <div key={leader.name} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={leader.image}
                    alt={`${leader.name} photo`}
                    width={128}
                    height={128}
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{leader.name}</h3>
                <p className="text-purple-600 text-sm mb-4">{leader.title}</p>
                <p className="text-gray-600">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Join Us Today</h2>
          <p className="text-lg mb-8">
            Become part of our faith family. Join us for worship, community events, and ministry
            opportunities. Subscribe to stay updated!
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-100 transition-colors"
          >
            Get Involved
          </a>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
}