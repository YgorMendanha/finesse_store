'use client'

import Image from 'next/image'
import React, { useMemo } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

//These are Third party packages for smooth slideshow
import { Zoom } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

export const Banner = () => {
  //Array of Images
  const images = [
    '/images/banner/product-2-1.png',
    '/images/banner/product-3-1.png',
    '/images/banner/product-7-2.png',
    '/images/banner/product-8-1.png'
  ]

  //These are custom properties for zoom effect while slide-show
  const zoomInProperties = {
    scale: 1,
    duration: 5000,
    transitionDuration: 300,
    infinite: true,
    prevArrow: (
      <div className="ml-10">
        <MdKeyboardArrowLeft className="h-8 w-8 text-white cursor-pointer" />
      </div>
    ),
    nextArrow: (
      <div className="mr-10">
        <MdKeyboardArrowRight className="h-8 w-8 text-white cursor-pointer" />
      </div>
    )
  }

  return (
    <div className="w-full">
      <Zoom {...zoomInProperties}>
        {images.map((each, index) => (
          <div
            key={index}
            className={`flex justify-center items-center relative bg-gradient-to-r from-black via-zinc-400 to-black `}
          >
            <Image
              className="object-cover"
              src={each}
              alt="product-image"
              width={400}
              height={400}
            />
          </div>
        ))}
      </Zoom>
    </div>
  )
}
