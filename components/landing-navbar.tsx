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
    <nav className="flex items-center justify-between p-4">
      <div className="flex items-center p-1">
        <Image src="/virtuAiLogo.png" alt="Logo" width={40} height={40} />
        <h1 className="text-2xl font-bold text-white">VirtuAi</h1>
      </div>

      <div className="hidden md:flex items-center space-x-4">
      <Link href="/#about" passHref>
                    <Button variant="ghost" className="text-white hover:text-black transition duration-300">
                    Preview
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
                <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
            <Button variant="premium" className="rounded-full transition duration-300">
              Get Started
            </Button>
          </Link>
        
      </div>

      <button className="md:hidden z-10" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className="space-y-1">
          <span className="block w-8 h-0.5 bg-gray-700"></span>
          <span className="block w-8 h-0.5 bg-gray-700"></span>
          <span className="block w-8 h-0.5 bg-gray-700"></span>
        </div>
      </button>

      {isMenuOpen && (
        <div className="absolute top-1 left-0 w-full md:hidden">
        <div className="flex flex-col items-center justify-center p-4 bg-white bg-opacity-80">
          <Link href="/#about" passHref>
            <Button variant="ghost" className="text-grey hover:text-black transition duration-300 mb-2">
              Preview
            </Button>
          </Link>
          <Link href="/#price" passHref>
            <Button variant="ghost" className="text-grey hover:text-black transition duration-300 mb-2">
              Price
            </Button>
          </Link>
          <Link href="/#testimonials" passHref>
            <Button variant="ghost" className="text-grey hover:text-black transition duration-300 mb-2">
              Testimonials
            </Button>
          </Link>
          <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
            <Button variant="premium" className="rounded-full transition duration-300">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      )}
    </nav>
  );
  
};
