import Image from 'next/image'

export const BannerCategories = () => {
  return (
    <div className="flex mt-10 mb-5">
      <div className="flex-1 w-[25vw] h-[25vw] relative m-2 rounded flex items-center justify-center bg-gray-100">
        <p className="text-white z-10 backdrop-blur-xl rounded p-4">CAMISAS</p>
        <Image src={'/images/banner/product-2-1.png'} fill alt="category image" />
      </div>
      <div className="flex-1 w-[25vw] h-[25vw] relative m-2 rounded flex items-center justify-center bg-gray-100">
        <p className="text-white z-10 backdrop-blur-xl rounded p-4">RELOGIOS</p>
        <Image src={'/images/banner/product-3-1.png'} fill alt="category image" />
      </div>
      <div className="flex-1 w-[25vw] h-[25vw] relative m-2 rounded flex items-center justify-center bg-gray-100">
        <p className="text-white z-10 backdrop-blur-xl rounded p-4">SAPATOS</p>
        <Image src={'/images/banner/product-7-2.png'} fill alt="category image" />
      </div>
      <div className="flex-1 w-[25vw] h-[25vw] relative m-2 rounded flex items-center justify-center bg-gray-100">
        <p className="text-white z-10 backdrop-blur-xl rounded p-4">BOLSAS</p>
        <Image src={'/images/banner/product-8-1.png'} fill alt="category image" />
      </div>
    </div>
  )
}
