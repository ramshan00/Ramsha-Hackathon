
import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from "next/link"

export default function HeroSection() {
  return (
  <div className='flex items-center justify-center md:py-16 text-white font-clashDisplay'>
      <div className='flex-col px-10 w-full max-w-3xl bg-[#2A254B] h-[502px] md:h-[450px] py-20 '>
        <h2 className='text-2xl'>
            The furniture brand for the<br />
            fututre, with timeless designs
        </h2>
        <Link href="/AllProducts">
        <Button className='hidden md:flex sm:bg-slate-50 sm:text-black bg-opacity-50 bg-slate-400 hover:bg-slate-400 rounded-none py-6 px-6 mt-8 mb-28'>
            View collection
        </Button>
        </Link>
        <h2 className='mt-20 md:mt-0'>
            A new era in eco friendly furniture with Avelon, the French luxury retail brand<br />
            with nice fonts, tasteful colors and a beautiful way to display things digitally<br />
            using modern web technologies.
        </h2>
        <Link href="/AllProducts">
          <Button className="mt-10 mb-8 md:hidden md:w-[170px] w-full h-[56px] bg-[#F9F9F926] text-[#FFFFFF] font-[400] text-[1rem] leading-6 satoshi tracking-wider hover:bg-[#4a393978] md:text-[3rem] lg:text-[1rem]">
            View collection
          </Button>
          </Link>
      </div>
      <Image
      src="/Right-Image.png"
      alt='Hero Right Image'
      width={400}
      height={400}
      className='hidden lg:flex'
      />
    </div>
  )
}

