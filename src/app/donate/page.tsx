"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCardIcon, BanknotesIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { MtnIcon } from '@/components/PaymentIcons/MtnIcon';
import { AirtelIcon } from '@/components/PaymentIcons/AirtelIcon';
import { PaypalIcon } from '@/components/PaymentIcons/PaypalIcon';
const DonatePage = () => {
  const [activeTab, setActiveTab] = useState<'mobileMoney' | 'bank' | 'paypal'>('mobileMoney');
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Support Our Mission
          </motion.h1>
          <motion.p
            className="text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your generosity helps us spread the gospel and transform lives across Uganda and beyond.
          </motion.p>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Methods */}
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Donation Methods</h2>
                
                {/* Payment Method Tabs */}
                <div className="mb-6 border-b border-gray-200">
                  <nav className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab('mobileMoney')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'mobileMoney' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                      <CreditCardIcon className="w-5 h-5 mr-2" />
                      Mobile Money
                    </button>
                    <button
                      onClick={() => setActiveTab('bank')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'bank' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                      <BanknotesIcon className="w-5 h-5 mr-2" />
                      Bank Transfer
                    </button>
                    <button
                      onClick={() => setActiveTab('paypal')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'paypal' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                      <PaypalIcon className="w-5 h-5 mr-2" />
                      PayPal
                    </button>
                  </nav>
                </div>

                {/* Mobile Money Content */}
                {activeTab === 'mobileMoney' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 bg-purple-50 p-4 rounded-lg">
                        <div className="flex items-center mb-3">
                          <MtnIcon className="w-8 h-8 text-yellow-500 mr-3" />
                          <h3 className="text-lg font-semibold text-gray-900">MTN MoMo</h3>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Send to number:</p>
                            <p className="text-lg font-mono font-bold">0782 461 402</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard('0782461402', 'MTN Number')}
                            className="text-purple-600 hover:text-purple-800 flex items-center text-sm"
                          >
                            <DocumentDuplicateIcon className="w-4 h-4 mr-1" />
                            {copied === 'MTN Number' ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>

                      <div className="flex-1 bg-purple-50 p-4 rounded-lg">
                        <div className="flex items-center mb-3">
                          <AirtelIcon className="w-8 h-8 text-red-500 mr-3" />
                          <h3 className="text-lg font-semibold text-gray-900">Airtel Money</h3>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Send to number:</p>
                            <p className="text-lg font-mono font-bold">0756 623 877</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard('0756623877', 'Airtel Number')}
                            className="text-purple-600 hover:text-purple-800 flex items-center text-sm"
                          >
                            <DocumentDuplicateIcon className="w-4 h-4 mr-1" />
                            {copied === 'Airtel Number' ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h4 className="text-sm font-medium text-blue-800 mb-2">How to Donate via Mobile Money:</h4>
                      <ol className="text-sm text-gray-700 space-y-1 list-decimal pl-5">
                        <li>Dial *165# (MTN) or *185# (Airtel) on your phone</li>
                        <li>Select &quot;Send Money&quot; or &quot;Pay Bill&quot; option</li>
                        <li>Enter our number above as recipient</li>
                        <li>Enter the amount you wish to donate</li>
                        <li>Complete the transaction with your PIN</li>
                        <li>Save the transaction receipt for your records</li>
                      </ol>
                    </div>
                  </div>
                )}

                {/* Bank Transfer Content */}
                {activeTab === 'bank' && (
                  <div className="space-y-6">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Bank Transfer Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Bank Name:</span>
                          <div className="flex items-center">
                            <span className="font-mono font-medium">Standard Chartered Bank Uganda</span>
                            <button
                              onClick={() => copyToClipboard('Standard Chartered Bank Uganda', 'Bank Name')}
                              className="ml-2 text-purple-600 hover:text-purple-800"
                            >
                              <DocumentDuplicateIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Account Name:</span>
                          <div className="flex items-center">
                            <span className="font-mono font-medium">Latter Glory Ministries</span>
                            <button
                              onClick={() => copyToClipboard('Latter Glory Ministries', 'Account Name')}
                              className="ml-2 text-purple-600 hover:text-purple-800"
                            >
                              <DocumentDuplicateIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Account Number:</span>
                          <div className="flex items-center">
                            <span className="font-mono font-medium">01024567890</span>
                            <button
                              onClick={() => copyToClipboard('01024567890', 'Account Number')}
                              className="ml-2 text-purple-600 hover:text-purple-800"
                            >
                              <DocumentDuplicateIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">SWIFT Code:</span>
                          <div className="flex items-center">
                            <span className="font-mono font-medium">SCBLUGKA</span>
                            <button
                              onClick={() => copyToClipboard('SCBLUGKA', 'SWIFT Code')}
                              className="ml-2 text-purple-600 hover:text-purple-800"
                            >
                              <DocumentDuplicateIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Branch:</span>
                          <div className="flex items-center">
                            <span className="font-mono font-medium">Kampala Main Branch</span>
                            <button
                              onClick={() => copyToClipboard('Kampala Main Branch', 'Branch')}
                              className="ml-2 text-purple-600 hover:text-purple-800"
                            >
                              <DocumentDuplicateIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h4 className="text-sm font-medium text-blue-800 mb-2">Important Notes:</h4>
                      <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                        <li>For international transfers, please include &quot;DONATION&quot; in the reference</li>
                        <li>Bank transfers may take 1-3 business days to process</li>
                        <li>Contact finance@latterglory.org with your transfer details for receipt</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* PayPal Content */}
                {activeTab === 'paypal' && (
                  <div className="space-y-6">
                    <div className="bg-purple-50 p-6 rounded-lg flex flex-col items-center text-center">
                      <PaypalIcon className="w-12 h-12 mb-4 text-blue-500" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Donate via PayPal</h3>
                      <p className="text-gray-600 mb-4">
                        Make a secure international donation using your PayPal account or credit card.
                      </p>
                      
                      {/* PayPal Donation Button - Replace with your actual PayPal button code */}
                      <form action="https://www.paypal.com/ncp/payment/YYPSPLDDB97GN" method="post" target="_blank" className="w-full">
                        <input type="hidden" name="business" value="donations@latterglory.org" />
                        <input type="hidden" name="item_name" value="Latter Glory Ministries Donation" />
                        <input type="hidden" name="currency_code" value="USD" />
                        <button
                          type="submit"
                          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
                        >
                          <PaypalIcon className="w-6 h-6 mr-2" />
                          Donate with PayPal
                        </button>
                      </form>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h4 className="text-sm font-medium text-blue-800 mb-2">PayPal Donation Notes:</h4>
                      <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                        <li>You&apos;ll be redirected to PayPal&apos;s secure payment page</li>
                        <li>Accepts all major credit cards even without a PayPal account</li>
                        <li>Receipt will be emailed to you automatically</li>
                        <li>For large donations, please contact us first</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Donation Information */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Give?</h3>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Your generous donations enable us to carry out our mission of spreading the Gospel and transforming lives through:
                  </p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Supporting student ministries and campus fellowships</li>
                    <li>Organizing evangelism and discipleship programs</li>
                    <li>Providing leadership training for young believers</li>
                    <li>Funding community outreach and humanitarian projects</li>
                    <li>Maintaining our church facilities and operations</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Donation Policy</h3>
                <div className="space-y-4 text-gray-600 text-sm">
                  <p>
                    Latter Glory Ministries is committed to financial transparency and accountability. All donations are used strictly for ministry purposes as designated.
                  </p>
                  <p>
                    We provide receipts for all donations upon request. For mobile money donations, please send your transaction details to finance@latterglory.org to receive your receipt.
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl shadow-lg p-6 sm:p-8">
                <h3 className="text-xl font-bold text-purple-800 mb-4">Need Help?</h3>
                <p className="text-gray-700 mb-4">
                  For any questions about giving or payment issues, please contact our finance team:
                </p>
                <div className="space-y-2">
                  <p className="text-sm"><span className="font-medium">Phone:</span> +256 392 175 191</p>
                  <p className="text-sm"><span className="font-medium">Email:</span> finance@latterglory.org</p>
                  <p className="text-sm"><span className="font-medium">Hours:</span> Mon-Fri, 8am-5pm EAT</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonatePage;