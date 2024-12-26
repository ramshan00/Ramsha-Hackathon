import { Button } from '@/components/ui/button';
import React from 'react';
import Features from '../../components/Features';
import SignUpSection from '../../components/Signup';
import Navbar from './Navbar';
import Link from 'next/link';
import Image from 'next/image';

export default function About() {
  return (
    <div className="bg-white">
      <Navbar />
      {/* Page Header */}
      <div className='flex flex-wrap mx-4 md:mx-32 md:mt-16 md:gap-36 justify-center md:mb-24 md:flex-nowrap'>
<div className='md:text-[36px] text-[#2E1A47] text-[34px]  mt-7'>A brand built on the love of craftmanship, quality and outstanding customer service</div>
<div className='mt-10 mb-4 items-center '>
      <Button variant="default" className='items' >View Collection</Button>
      </div>
    </div>
    <div className="flex flex-col md:flex-row gap-4">
   <div className="bg-[#2E1A47] text-white p-10 flex-1 md:ml-16 md: mt-10 md:mb-14 flex flex-col justify-left items-left">
    <h1 className="text-3xl md:text-4xl mb-4">
     It started with a small idea
    </h1>
    <p className="text-lg md:text-xl mb-6">
     A global brand with local beginnings, our story began in a small studio in South London in early 2014
    </p>
    <button className="bg-[#4E4D93] text-[#f9f9f9] py-2 px-4 md:w-[170px] md:h-[56px] w-60 h-12 md:mt-48 ">
     View collection
    </button>
   </div>
   <div className="flex-1 mb-14 md:mt-10">
    <Image
     src= "/Image Block.jpg"
     alt='sidehero'
     width={630}
     height={478}
    />
   </div>
  </div>

      {/* Features Section 2 */}
      <div className="container md:mx-0  md:px-0 md:py-0 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2">
            <Image
            src= "/features2.png"
            alt='about hero'
            width={760}
            height={603}
            />
        </div>
        <div className="w-full md:w-1/2 md:h-[640px] h-full py-4 mt-8 md:mt-0 md:pl-0 bg-[#f9f9f9]">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 mx-4 md:mx-16 md:mt-16">
                Our service isn &apos;t just personal, it's actually hyper personally exquisite
            </h2>
            <p className="text-gray-600 mb-4 mx-4 md:mx-16">
                When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market.
            </p>
            <p className="text-gray-600 mb-8  mx-4 md:mx-16 ">
                Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community.
            </p>
            <button className="bg-white text-gray-800 border border-gray-300 py-2 px-4 mx-4 md:mx-16 md:mt-40 md:w-[150px] md:h-[56px] rounded hover:bg-gray-100">
                Get in touch
            </button>
        </div>
    </div>
      <section>
        <Features />
      </section>
      <section>
        <SignUpSection />
      </section>
    </div>
  );
}
