"use client"
import React, { useState } from 'react';

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
  const [showToast, setShowToast] = useState(false);

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
    setError(''); // Clear previous errors

    // Validate required fields
    if (!formData.fullName) {
      setError('Full name is required.');
      return;
    }
    if (!formData.receiveInfo.length) {
      setError('Please select at least one preferred method for info updates.');
      return;
    }

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
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      } else {
        setError(data.message || 'Failed to register. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Registration
          </h1>
        </div>
      </section>
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          {success && (
            <p className="text-green-600 mb-4 text-center">Registration successful! Thank you.</p>
          )}
          {error && (
            <p className="text-red-600 mb-4 text-center">{error}</p>
          )}
          {showToast && (
            <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg transform transition-opacity duration-300 opacity-100">
              Thank you for registering, we shall get in touch with you
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                1. Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 text-gray-900"
                placeholder="Enter your full name"
                required
              />
            </div>
            {/* 2. Phone Number or Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                2. Phone or Email
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full p-2 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 text-gray-900"
                placeholder="Enter your phone number or email"
                required
              />
            </div>
            {/* 3. Children Attending */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                3. Children (10 years & below) Count
              </label>
              <input
                type="number"
                name="childrenCount"
                value={formData.childrenCount}
                onChange={handleChange}
                className="w-full p-2 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 text-gray-900"
                min="0"
                placeholder="Enter number of children (10 years & below)"
                required
              />
            </div>
            {/* 4. Event Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                4. Event Time Commitment
              </label>
              <select
                name="eventTime"
                value={formData.eventTime}
                onChange={handleChange}
                className="w-full p-2 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 text-gray-900"
                required
              >
                <option value="">Select</option>
                <option value="I will keep time">I will keep time</option>
                <option value="May join late">May join late</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* 5. Book Launch */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                5. Book Launch (UGX 25,000 each)
              </label>
              <select
                name="bookLaunch"
                value={formData.bookLaunch}
                onChange={handleChange}
                className="w-full p-2 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 text-gray-900"
                required
              >
                <option value="">Select an option</option>
                <option value="Autographed in advance (Pay via mobile money)">
                  Autographed in advance (Pay via mobile money)
                </option>
                <option value="Multiple copies">Multiple copies (Enter number below)</option>
                <option value="Souvenir/gift package">Souvenir/gift package</option>
                <option value="Autograph on site or none (Pay on event day)">
                  Autograph on site or none (Pay on event day)
                </option>
              </select>
              {formData.bookLaunch === 'Multiple copies' && (
                <div className="mt-2">
                  <label className="block text-sm text-gray-600 mb-1">Number of Copies</label>
                  <input
                    type="number"
                    name="bookCopies"
                    value={formData.bookCopies}
                    onChange={handleChange}
                    className="w-full p-2 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 text-gray-900"
                    min="2"
                    required
                  />
                </div>
              )}
            </div>
            {/* 6. Shuttle Service */}
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
                    className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500 text-gray-900"
                    required
                  />
                  <span className="ml-2 text-sm text-gray-600">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shuttleService"
                    value="No"
                    checked={formData.shuttleService === 'No'}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">No</span>
                </label>
              </div>
            </div>
            {/* 7. Food Allergies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                7. Food Allergies?
              </label>
              <textarea
                name="foodAllergies"
                value={formData.foodAllergies}
                onChange={handleChange}
                className="w-full p-2 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 text-gray-900"
                rows={2}
                required
              />
            </div>
            {/* 8. Contribution */}
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
                    className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500 text-gray-900"
                    required
                  />
                  <span className="ml-2 text-sm text-gray-600">No, thanks</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="contribution"
                    value="Yes (Contact Stella Mbaijana on 0782461402)"
                    checked={formData.contribution === 'Yes (Contact Stella Mbaijana on 0782461402)'}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Yes (Contact Stella on 0782461402)</span>
                </label>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Other</label>
                  <input
                    type="text"
                    name="contributionDetails"
                    value={formData.contributionDetails}
                    onChange={handleChange}
                    className="w-full p-2 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 text-gray-900"
                  />
                </div>
              </div>
            </div>
            {/* 9. Hear About Event */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                9. Heard About Event Via?
              </label>
              <select
                name="hearAboutEvent"
                value={formData.hearAboutEvent}
                onChange={handleChange}
                className="w-full p-2 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 text-gray-900"
                required
              >
                <option value="">Select</option>
                <option value="Website/Church">Website or Church</option>
                <option value="Family/Friend">Family or Friend</option>
                <option value="Social Media">Social Media</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* 10. Receive Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                10. Prefer Info Updates Via? <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="receiveInfo"
                    value="Phone call"
                    checked={formData.receiveInfo.includes("Phone call")}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Phone call</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="receiveInfo"
                    value="Email"
                    checked={formData.receiveInfo.includes("Email")}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Email</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="receiveInfo"
                    value="Text"
                    checked={formData.receiveInfo.includes("Text")}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Text</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="receiveInfo"
                    value="WhatsApp"
                    checked={formData.receiveInfo.includes("WhatsApp")}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">WhatsApp</span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition"
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
      </section>
    </div>
  );
}