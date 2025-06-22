"use client";
import React, { useState, useEffect } from 'react';

type FormData = {
  fullName: string;
  contact: string;
  childrenCount: string;
  eventTime: string;
  bookLaunch: string;
  bookCopies: string;
  shuttleService: string;
  foodAllergies: string;
  contribution: string;
  contributionDetails: string;
  hearAboutEvent: string;
  receiveInfo: string[];
};

declare global {
  interface Window {
    Swal?: typeof import('sweetalert2')['default'];
  }
}

export default function Registration() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    contact: '',
    childrenCount: '',
    eventTime: '',
    bookLaunch: '',
    bookCopies: '',
    shuttleService: '',
    foodAllergies: '',
    contribution: '',
    contributionDetails: '',
    hearAboutEvent: '',
    receiveInfo: [],
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox' && name === 'receiveInfo') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        receiveInfo: checked
          ? [...prev.receiveInfo, value]
          : prev.receiveInfo.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  interface ApiResponse {
    message?: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');

    if (!formData.fullName) {
      setError('Full name is required.');
      return;
    }
    // if (!formData.receiveInfo.length) {
    //   setError('Please select at least one preferred method for info updates.');
    //   return;
    // }

    setLoading(true);
    setSuccess(false);

    try {
      const response: Response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data: ApiResponse = await response.json();
      if (response.ok) {
        setSuccess(true);
        setFormData({
          fullName: '',
          contact: '',
          childrenCount: '',
          eventTime: '',
          bookLaunch: '',
          bookCopies: '',
          shuttleService: '',
          foodAllergies: '',
          contribution: '',
          contributionDetails: '',
          hearAboutEvent: '',
          receiveInfo: [],
        });
        if (window.Swal) {
          window.Swal.fire({
            title: 'Thank You!',
            text: 'Thank you for registering, we shall get back to you.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#471396',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/';
            }
          });
        }
      } else {
        setError(data.message || 'Failed to register. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    const shareMessage = `Hey, register to attend 25 Silver Jubilee Celebration\nhttps://latterglory.ug/registration\nCelebrate 25 years of ministry with a special jubilee service, music, and community fellowship.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

    if (navigator.share) {
      navigator.share({
        title: '25 Silver Jubilee Celebration',
        text: shareMessage,
        url: 'https://latterglory.ug/registration',
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      <section className="relative w-full overflow-hidden">
        <div className="animate-slide bg-gradient-to-br from-purple-900 to-blue-800 h-40 flex items-center justify-center relative">
          <div className="text-center px-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">Registration</h1>
            <p className="text-lg text-white opacity-90 mt-2">Silver Jubilee Celebration - Latter Glory Ministries</p>
          </div>
          <button
            type="button"
            onClick={handleShare}
            className="absolute top-4 right-4 bg-purple-500 text-white p-2 rounded-full hover:bg-green-700 transition w-10 h-10 flex items-center justify-center md:w-auto md:p-2 md:rounded-lg md:px-4 md:top-6 md:right-6"
          >
            <svg
              className="w-6 h-6 md:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            <span className="hidden md:inline">Share</span>
          </button>
        </div>
      </section>

      <section className="py-6 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-purple-100 transform transition-all hover:shadow-2xl">
            {success && (
              <p className="text-green-600 mb-4 text-center font-medium">Registration successful! Thank you.</p>
            )}
            {error && (
              <p className="text-red-600 mb-4 text-center font-medium">{error}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  1. Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 text-gray-900 text-base"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  2. Phone or Email
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 text-gray-900 text-base"
                  placeholder="Enter your phone number or email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  3. How many children 10 years and below do you plan to come with?
                </label>
                <input
                  type="number"
                  name="childrenCount"
                  value={formData.childrenCount}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 text-gray-900 text-base"
                  min="0"
                  placeholder="Enter number of children (10 years & below)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  4. What time do you plan to arrive?
                </label>
                <select
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 text-gray-900 text-base appearance-none bg-white"
                >
                  <option value="">Select</option>
                  <option value="I will keep time">I will keep time</option>
                  <option value="May join late">May join late</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  5.Order your copy of All Yours by Pr. Dennis Kasirye.
                </label>
                <div className="flex space-x-4 mb-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="bookLaunch"
                      value="Yes"
                      checked={formData.bookLaunch === 'Yes'}
                      onChange={handleChange}
                      className="h-5 w-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-base text-gray-600">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="bookLaunch"
                      value="No"
                      checked={formData.bookLaunch === 'No'}
                      onChange={handleChange}
                      className="h-5 w-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-base text-gray-600">No</span>
                  </label>
                </div>
                {formData.bookLaunch === 'Yes' && (
                  <select
                    name="bookLaunch"
                    value={formData.bookLaunch}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 text-gray-900 text-base appearance-none bg-white"
                  >
                    <option value="Yes">Select an option</option>
                    <option value="Autographed in advance (Pay via mobile money)">
                      Autographed in advance (Pay via mobile money)
                    </option>
                    <option value="Multiple copies">Multiple copies (Enter number below)</option>
                    <option value="Souvenir/gift package">Souvenir/gift package</option>
                    <option value="Thank you, but I’ll not buy for now">
                      Thank you, but I’ll not buy for now
                    </option>
                  </select>
                )}
                {formData.bookLaunch === 'Multiple copies' && (
                  <div className="mt-2">
                    <label className="block text-sm text-gray-600 mb-1">Number of Copies</label>
                    <input
                      type="number"
                      name="bookCopies"
                      value={formData.bookCopies}
                      onChange={handleChange}
                      className="w-full p-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 text-gray-900 text-base"
                      min="2"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  6. Need Shuttle from Rubaga?
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="shuttleService"
                      value="Yes"
                      checked={formData.shuttleService === 'Yes'}
                      onChange={handleChange}
                      className="h-5 w-5 text-purple-600 border-gray-300 focus:ring-purple-500 text-gray-900"
                    />
                    <span className="ml-2 text-base text-gray-600">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="shuttleService"
                      value="No"
                      checked={formData.shuttleService === 'No'}
                      onChange={handleChange}
                      className="h-5 w-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-base text-gray-600">No</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  7. Food Allergies?
                </label>
                <div className="flex space-x-4 mb-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="foodAllergies"
                      value="Yes"
                      checked={formData.foodAllergies === 'Yes'}
                      onChange={handleChange}
                      className="h-5 w-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-base text-gray-600">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="foodAllergies"
                      value="No"
                      checked={formData.foodAllergies === 'No'}
                      onChange={handleChange}
                      className="h-5 w-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-base text-gray-600">No</span>
                  </label>
                </div>
                {formData.foodAllergies === 'Yes' && (
                  <textarea
                    name="foodAllergies"
                    value={formData.foodAllergies}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 text-gray-900 text-base"
                    rows={2}
                    placeholder="Please specify your food allergies"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  8. Contribute to Event?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contribution"
                      value="No"
                      checked={formData.contribution === 'No'}
                      onChange={handleChange}
                      className="h-5 w-5 text-purple-600 border-gray-300 focus:ring-purple-500 text-gray-900"
                    />
                    <span className="ml-2 text-base text-gray-600">No, thanks</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contribution"
                      value="Yes (Contact Stella Mbaijana on 0782461402)"
                      checked={formData.contribution === 'Yes (Contact Stella Mbaijana on 0782461402)'}
                      onChange={handleChange}
                      className="h-5 w-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-base text-gray-600">Yes (Contact Stella on 0782461402)</span>
                  </label>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Other</label>
                    <input
                      type="text"
                      name="contributionDetails"
                      value={formData.contributionDetails}
                      onChange={handleChange}
                      className="w-full p-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 text-gray-900 text-base"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  9. How did you hear about this event?
                </label>
                <select
                  name="hearAboutEvent"
                  value={formData.hearAboutEvent}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 text-gray-900 text-base appearance-none bg-white"
                >
                  <option value="">Select</option>
                  <option value="Website/Church">Website or Church</option>
                  <option value="Family/Friend">Family or Friend</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  10. How can we contact you in future? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="receiveInfo"
                      value="Phone call"
                      checked={formData.receiveInfo.includes("Phone call")}
                      onChange={handleChange}
                      className="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="ml-2 text-base text-gray-600">Phone call</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="receiveInfo"
                      value="Email"
                      checked={formData.receiveInfo.includes("Email")}
                      onChange={handleChange}
                      className="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="ml-2 text-base text-gray-600">Email</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="receiveInfo"
                      value="Text"
                      checked={formData.receiveInfo.includes("Text")}
                      onChange={handleChange}
                      className="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="ml-2 text-base text-gray-600">Text</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="receiveInfo"
                      value="WhatsApp"
                      checked={formData.receiveInfo.includes("WhatsApp")}
                      onChange={handleChange}
                      className="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="ml-2 text-base text-gray-600">WhatsApp</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="receiveInfo"
                      value="DontContactme"
                      checked={formData.receiveInfo.includes("DontContactme")}
                      onChange={handleChange}
                      className="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="ml-2 text-base text-gray-600">Don’t contact me</span>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition mx-auto block shadow-lg border-2 border-white hover:border-purple-300"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l-3 3 3 3v4a8 8 0 01-8-8z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Registration'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = `
  @keyframes slide {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(0); }
  }
  .animate-slide {
    animation: slide 1.5s ease-out forwards;
  }
`;

if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}