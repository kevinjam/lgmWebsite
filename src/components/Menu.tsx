"use client";

import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function MenuComponent() {
  return (
    <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo/logo.png"
          alt="Latter Glory Ministries Logo"
          width={150}
          height={40}
          className="h-10 w-auto"
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-1 justify-center items-center space-x-6">
        <Link href="/" className="text-gray-100 hover:text-white font-medium">
          Home
        </Link>
       
        <Menu as="div" className="relative">
          <Menu.Button className="text-gray-100 hover:text-white font-medium flex items-center">
            Students Mission
            <ChevronDownIcon className="w-4 h-4 ml-1" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute mt-2 w-48 bg-white shadow-lg rounded-md z-50">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/student-mission/about"
                    className={`${active ? 'bg-purple-100' : ''} block px-4 py-2 text-gray-700`}
                  >
                    About
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/student-mission/programs"
                    className={`${active ? 'bg-purple-100' : ''} block px-4 py-2 text-gray-700`}
                  >
                    Programs
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/student-mission/partnerships"
                    className={`${active ? 'bg-purple-100' : ''} block px-4 py-2 text-gray-700`}
                  >
                    Partnerships
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/student-mission/challenges-plans"
                    className={`${active ? 'bg-purple-100' : ''} block px-4 py-2 text-gray-700`}
                  >
                    Challenges & Plans
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/student-mission/team"
                    className={`${active ? 'bg-purple-100' : ''} block px-4 py-2 text-gray-700`}
                  >
                    Team
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/student-mission/join"
                    className={`${active ? 'bg-purple-100' : ''} block px-4 py-2 text-gray-700`}
                  >
                    Join
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
        <Menu as="div" className="relative">
          <Menu.Button className="text-gray-100 hover:text-white font-medium flex items-center">
            Missions
            <ChevronDownIcon className="w-4 h-4 ml-1" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute mt-2 w-48 bg-white shadow-lg rounded-md z-50">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/missions/local"
                    className={`${active ? 'bg-purple-100' : ''} block px-4 py-2 text-gray-700`}
                  >
                    Local
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/missions/foreign"
                    className={`${active ? 'bg-purple-100' : ''} block px-4 py-2 text-gray-700`}
                  >
                    Foreign
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/missions/community-empowerment"
                    className={`${active ? 'bg-purple-100' : ''} block px-4 py-2 text-gray-700`}
                  >
                    Community Empowerment
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
        <Link href="/market-place-ministry" className="text-gray-100 hover:text-white font-medium">
          Marketplace
        </Link>
         <Link href="/ffc" className="text-gray-100 hover:text-white font-medium">
          Faith Family Church
        </Link>
        <Link href="/donate" className="text-gray-100 hover:text-white font-medium">
          Give
        </Link>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="ml-4"
        >
          <Link
            href="/book-launch"
            className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
      
             PreOrder Book
          </Link>
        </motion.div>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <Menu as="div" className="relative">
          {({ open }) => (
            <>
              <Menu.Button
                className="text-gray-100 focus:outline-none"
                aria-label={open ? 'Close menu' : 'Open menu'}
              >
                {open ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-1"
              >
                <Menu.Items className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md z-50">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/"
                        className={`${active ? 'bg-purple-100' : ''} block px-4 py-2 text-gray-700`}
                      >
                        Home
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/sm"
                        className={`${active ? 'bg-purple-100' : ''} block px-4 py-2 text-gray-700`}
                      >
                        Students Mission
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/missions/local"
                        className={`${active ? 'bg-purple-100' : ''} block px-4 py-2 text-gray-700`}
                      >
                        Local Missions
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/missions/foreign"
                        className={`${active ? 'bg-purple-100' : ''} block px-4 py-2 text-gray-700`}
                      >
                        Foreign Missions
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/missions/community-empowerment"
                        className={`${active ? 'bg-purple-100' : ''} block px-4 py-2 text-gray-700`}
                      >
                        Community Empowerment
                      </Link>
                    )}
                  </Menu.Item>
                         <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/ffc"
                        className={`${active ? 'bg-purple-100' : ''} block px-4 py-2 text-gray-700`}
                      >
                        Faith Family Church
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/market-place-ministry"
                        className={`${active ? 'bg-purple-100' : ''} block px-4 py-2 text-gray-700`}
                      >
                        Marketplace Ministry
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/donate"
                        className={`${active ? 'bg-purple-100' : ''} block px-4 py-2 text-gray-700`}
                      >
                        Give
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {() => (
                     <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="ml-4"
        >
          <Link
            href="/book-launch"
            className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
      
             PreOrder Book
          </Link>
        </motion.div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </nav>
  );
}