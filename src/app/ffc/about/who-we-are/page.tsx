
import FFCNav from '@/components/FFCNav';
import Head from 'next/head';
import Link from 'next/link';

export default function WhoWeAre() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Who We Are - Faith Family Church</title>
        <meta
          name="description"
          content="Discover the vision, mission, and origins of Faith Family Church, along with ways to get involved."
        />
      </Head>
      <FFCNav />

      

      {/* Hero Section */}
      <section className="relative h-80 w-full overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 rounded-b-[50px]">
        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Who We Are
            </h1>
            <p className="text-lg sm:text-xl text-white opacity-90 mb-6">
              The heart and soul of Faith Family Church.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Faith Family Church</strong> - A Christ-like church reaching souls and causing revival.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To be a Christ-like family, devoted to communion with God, spiritual maturity, and transformation through
              discipleship, outreach, and exemplary living in Uganda and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* How It Started Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Started</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Faith Family Church began in 2005 with a small group of believers in Uganda, united by a shared vision of
            revival. From humble prayer meetings, we grew into a thriving community, expanding our outreach across the
            nation and beyond, guided by faith and love.
          </p>
        </div>
      </section>

      {/* How You Can Get Involved */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">How You Can Get Involved</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-purple-600 mb-2">Volunteer</h3>
              <p className="text-gray-600 mb-4">Serve in our ministries and make a difference in our community.</p>
              <Link href="/ffc/volunteer" className="text-purple-600 hover:underline">Learn More</Link>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-purple-600 mb-2">Partner With Us</h3>
              <p className="text-gray-600 mb-4">Join hands with us to expand our mission worldwide.</p>
              <Link href="/ffc/partnership" className="text-purple-600 hover:underline">Learn More</Link>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-purple-600 mb-2">Donate</h3>
              <p className="text-gray-600 mb-4">Support our work with your generous contribution.</p>
              <Link href="/donate" className="text-purple-600 hover:underline">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Programs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Programs</h2>
          <p className="text-lg text-gray-600 mb-8">
            Explore our diverse programs designed to inspire and uplift. Click below to learn more.
          </p>
          <Link href="/programs" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors">
            View Programs
          </Link>
        </div>
      </section>

    </div>
  );
}