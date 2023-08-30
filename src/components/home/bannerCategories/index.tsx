import Image from 'next/image'
import { getDictionary } from '@/utils/functions/getDictionary'
import Banner1 from '~/public/images/banner/product-2-1.png'
import Banner2 from '~/public/images/banner/product-3-1.png'
import Banner3 from '~/public/images/banner/product-7-2.png'
import Banner4 from '~/public/images/banner/product-8-1.png'

export const BannerCategories = ({ lang }: { lang: 'pt' | 'en' }) => {
  const dict = getDictionary(lang)
  return (
    <div className="flex xl:flex-nowrap flex-wrap justify-center mt-10 mb-5 py-5 bg-indigo-500">
      <div className="xl:w-[25vw] xl:h-[25vw] w-[45vw] h-[45vw] relative m-2 rounded flex items-center justify-center bg-gray-100 ">
        <p className="text-white z-10 backdrop-blur-xl rounded p-4">{dict.shirts}</p>
        <Image src={Banner1} fill alt="category image" />
      </div>
      <div className="xl:w-[25vw] xl:h-[25vw] w-[45vw] h-[45vw] relative m-2 rounded flex items-center justify-center bg-gray-100 ">
        <p className="text-white z-10 backdrop-blur-xl rounded p-4">{dict.clocks}</p>
        <Image src={Banner2} fill alt="category image" />
      </div>
      <div className="xl:w-[25vw] xl:h-[25vw] w-[45vw] h-[45vw] relative m-2 rounded flex items-center justify-center bg-gray-100 ">
        <p className="text-white z-10 backdrop-blur-xl rounded p-4">{dict.shoes}</p>
        <Image src={Banner3} fill alt="category image" />
      </div>
      <div className="xl:w-[25vw] xl:h-[25vw] w-[45vw] h-[45vw] relative m-2 rounded flex items-center justify-center bg-gray-100 ">
        <p className="text-white z-10 backdrop-blur-xl rounded p-4">{dict.bags}</p>
        <Image src={Banner4} fill alt="category image" />
      </div>
    </div>
  )
}
