'use client'

import Image from 'next/image'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

//These are Third party packages for smooth slideshow
import { Zoom } from 'react-slideshow-image'
import { useWindowSize } from '@/hooks/useWindowSize'

const zoomInProperties = {
  scale: 1,
  duration: 5000,
  transitionDuration: 300,
  infinite: true,
  prevArrow: (
    <div role="button" className="ml-10">
      <MdKeyboardArrowLeft className="h-8 w-8 text-white cursor-pointer" />
    </div>
  ),
  nextArrow: (
    <div role="button" className="mr-10">
      <MdKeyboardArrowRight className="h-8 w-8 text-white cursor-pointer" />
    </div>
  )
}

export const BannerHome = () => {
  const { width } = useWindowSize()

  //Array of Images
  const images = [
    '/images/banner/product-2-1.png',
    '/images/banner/product-3-1.png',
    '/images/banner/product-7-2.png',
    '/images/banner/product-8-1.png'
  ]

  return (
    <div className="w-full">
      {!width ? (
        <div
          className={`flex justify-center h-[450px] items-center bg-gradient-to-r from-black via-zinc-400 to-black `}
        >
          <Image
            className="object-cover"
            src={'/images/banner/product-2-1.png'}
            priority
            alt="product-image"
            width={400}
            height={400}
          />
        </div>
      ) : (
        <Zoom {...zoomInProperties}>
          {images.map((each, index) => (
            <div
              key={index}
              className={`flex justify-center h-[450px] items-center relative bg-gradient-to-r from-black via-zinc-400 to-black `}
            >
              <Image
                className="object-cover"
                src={each}
                priority
                alt="product-image"
                width={400}
                height={400}
              />
            </div>
          ))}
        </Zoom>
      )}
    </div>
  )
}
