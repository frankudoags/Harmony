import React from 'react'
import { Link } from 'react-router-dom'
import { LogoWhite } from '../assets'

function Footer() {
  return (
    <footer className='w-full bg-[#070F6F] px-8 pt-12 pb-24'>
      <div className='grid grid-cols-1 lg:grid-cols-4 max-w-7xl gap-8 lg:gap-12 w-full mx-auto'>
        {/* First Grid */}
        <div className='lg:col-span-1'>
          <div className='flex flex-col items-center justify-start h-full'>
            <img src={LogoWhite} alt='Logo' className="h-8 w-auto sm:h-10"/>
            <p className='text-white text-center text-sm mt-4'>
              © {new Date().getFullYear()} Harmony. All rights reserved.
            </p>
            </div>
        </div>
        {/* Second Grid */}
        <div className='lg:col-span-3 w-full grid grid-cols-2 gap-8  md:grid-cols-3 text-[14px] text-[#FFFFFF]'>
          <div className='flex flex-col space-y-2'>
            <h1 className="text-xl text-white font-medium">Explore</h1>
            <Link href="#">
              Home
            </Link>
            <Link href="#">
              Blog
            </Link>
            <Link href="#">
              Gallery
            </Link>
            <Link href="#">
              Community
            </Link>
          </div>
          <div className='flex flex-col space-y-2'>
            <h1 className="text-xl text-white font-medium">About us</h1>
            <Link href="#">
              Our Story
            </Link>
            <Link href="#">
              Meet our team
            </Link>
            <Link href="#">
              Collaborations
            </Link>
            <Link href="#">
              Contact us
            </Link>
          </div>
          <div className='flex flex-col space-y-2'>
            <h1 className="text-xl text-white font-medium">Companies</h1>
            <Link href="#">
              Our Partners
            </Link>
            <Link href="#">
              Careers
            </Link>
            <Link href="#">
              Privacy and Policy
            </Link>
            <Link href="#">
            FAQs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer