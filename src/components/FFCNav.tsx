"use client";

import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function FFCNav() {
  return (
    <header className="sticky top-0 z-50 bg-purple-800 shadow-md">
 <nav className="container mx-auto px-4 py-4 flex items-center justify-between ">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo/logo.png"
          alt="Faith Family Church Logo"
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
             About Us
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
                    href="/ffc/about/who-we-are/"
                    className={`${
                      active ? 'bg-purple-100' : ''
                    } block px-4 py-2 text-gray-700`}
                  >
                    Who we are
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/ffc/about/our-leaders"
                    className={`${
                      active ? 'bg-purple-100' : ''
                    } block px-4 py-2 text-gray-700`}
                  >
                    Our Leaders
                  </Link>
                )}
              </Menu.Item>
               {/* <Menu.Item>
                {({ active }) => (
                  <Link
                    href="#"
                    className={`${
                      active ? 'bg-purple-100' : ''
                    } block px-4 py-2 text-gray-700`}
                  >
                    Our Leaders
                  </Link>
                )}
              </Menu.Item> */}
            </Menu.Items>
          </Transition>
        </Menu>        
    
        <Link href="/ffc/sermons" className="text-gray-100 hover:text-white font-medium">
          Sermons
        </Link>
        <Link href="/ffc/events" className="text-gray-100 hover:text-white font-medium">
          Events
        </Link>
        <Link href="/ffc/ministries" className="text-gray-100 hover:text-white font-medium">
          Ministries
        </Link>
        <Link href="https://radio.latterglory.ug/ " target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-white font-medium">
          Media
        </Link>
        <Menu as="div" className="relative">
          <Menu.Button className="text-gray-100 hover:text-white font-medium flex items-center">
            Churches
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
                   href="https://nakawuka.latterglory.ug/ " target="_blank" rel="noopener noreferrer"
                    className={`${
                      active ? 'bg-purple-100' : ''
                    } block px-4 py-2 text-gray-700`}
                  >
                    Nakawuka
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="https://ntinda.latterglory.ug/ " target="_blank" rel="noopener noreferrer"
                    className={`${
                      active ? 'bg-purple-100' : ''
                    } block px-4 py-2 text-gray-700`}
                  >
                    Ntinda
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
        <Link href="/ffc/contact" className="text-gray-100 hover:text-white font-medium">
          Contact Us
        </Link>
        <Link href="/donate" className="text-gray-100 hover:text-white font-medium">
          Give
        </Link>
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
                        href="/ffc"
                        className={`${
                          active ? 'bg-purple-100' : ''
                        } block px-4 py-2 text-gray-700`}
                      >
                        Home
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu as="div" className="relative">
          <Menu.Button className="text-gray-100 hover:text-white font-medium flex items-center">
             About Us
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
                    href="/ffc/about/who-we-are/"
                    className={`${
                      active ? 'bg-purple-100' : ''
                    } block px-4 py-2 text-gray-700`}
                  >
                    Who we are
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/ffc/about/our-leaders"
                    className={`${
                      active ? 'bg-purple-100' : ''
                    } block px-4 py-2 text-gray-700`}
                  >
                    Our Leaders
                  </Link>
                )}
              </Menu.Item>
         
            </Menu.Items>
          </Transition>
        </Menu>  
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/ffc/sermons"
                        className={`${
                          active ? 'bg-purple-100' : ''
                        } block px-4 py-2 text-gray-700`}
                      >
                        Sermons
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/ffc/events"
                        className={`${
                          active ? 'bg-purple-100' : ''
                        } block px-4 py-2 text-gray-700`}
                      >
                        Events
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/ffc/ministries"
                        className={`${
                          active ? 'bg-purple-100' : ''
                        } block px-4 py-2 text-gray-700`}
                      >
                        Ministries
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="https://radio.latterglory.ug/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                          active ? 'bg-purple-100' : ''
                        } block px-4 py-2 text-gray-700`}
                      >
                        Media
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="https://nakawuka.latterglory.ug/ " target="_blank" rel="noopener noreferrer"
                        className={`${
                          active ? 'bg-purple-100' : ''
                        } block px-4 py-2 text-gray-700`}
                      >
                        Nakawuka
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                         href="https://ntinda.latterglory.ug/ " target="_blank" rel="noopener noreferrer"
                        className={`${
                          active ? 'bg-purple-100' : ''
                        } block px-4 py-2 text-gray-700`}
                      >
                        Ntinda
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/ffc/contact"
                        className={`${
                          active ? 'bg-purple-100' : ''
                        } block px-4 py-2 text-gray-700`}
                      >
                        Contact Us
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/donate"
                        className={`${
                          active ? 'bg-purple-100' : ''
                        } block px-4 py-2 text-gray-700`}
                      >
                        Give
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </nav>
    </header>
   
  );
}