"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/virtuAiLogo.png" />
          </div>
          <h1 className="text-2xl font-bold text-white">VirtuAi</h1>
        </div>
      </Link>

      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen((prev) => !prev)} className="text-white">
          {/* Burger Icon */}
          <div className="w-6 h-6 flex flex-col justify-between">
            <div className="w-full h-0.5 bg-white"></div>
            <div className="w-full h-0.5 bg-white"></div>
            <div className="w-full h-0.5 bg-white"></div>
          </div>
        </button>
      </div>

      <div className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 z-50 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:bg-transparent md:flex md:items-center md:justify-end`}>
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 text-white md:hidden">
          {/* Close Icon */}
          <div className="w-6 h-6 relative">
            <div className="absolute inset-0 bg-white transform rotate-45"></div>
            <div className="absolute inset-0 bg-white transform -rotate-45"></div>
          </div>
        </button>

        <div className="flex items-center gap-x-2 mt-16 md:mt-0">
        <Link href="/#about" passHref>
                    <Button variant="ghost" className="text-white hover:text-black transition duration-300">
                        About
                    </Button>
                </Link>
                <Link href="/#price" passHref>
                    <Button variant="ghost" className="text-white hover:text-black transition duration-300">
                        Price
                    </Button>
                </Link>
                <Link href="/#testimonials" passHref>
                    <Button variant="ghost" className="text-white hover:text-black transition duration-300">
                        Testimonials
                    </Button>
                </Link>
             
               
          {/* ... rest of your links here */}
          <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
            <Button variant="premium" className="rounded-full transition duration-300">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
