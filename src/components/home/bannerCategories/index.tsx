import Image from 'next/image'

export const BannerCategories = () => {
  return (
    <div className="flex xl:flex-nowrap flex-wrap justify-center mt-10 mb-5 py-5 bg-indigo-500">
      <div className="xl:w-[25vw] xl:h-[25vw] w-[45vw] h-[45vw] relative m-2 rounded flex items-center justify-center bg-gray-100 ">
        <p className="text-white z-10 backdrop-blur-xl rounded p-4">CAMISAS</p>
        <Image src={'/images/banner/product-2-1.png'} fill alt="category image" />
      </div>
      <div className="xl:w-[25vw] xl:h-[25vw] w-[45vw] h-[45vw] relative m-2 rounded flex items-center justify-center bg-gray-100 ">
        <p className="text-white z-10 backdrop-blur-xl rounded p-4">RELOGIOS</p>
        <Image src={'/images/banner/product-3-1.png'} fill alt="category image" />
      </div>
      <div className="xl:w-[25vw] xl:h-[25vw] w-[45vw] h-[45vw] relative m-2 rounded flex items-center justify-center bg-gray-100 ">
        <p className="text-white z-10 backdrop-blur-xl rounded p-4">SAPATOS</p>
        <Image src={'/images/banner/product-7-2.png'} fill alt="category image" />
      </div>
      <div className="xl:w-[25vw] xl:h-[25vw] w-[45vw] h-[45vw] relative m-2 rounded flex items-center justify-center bg-gray-100 ">
        <p className="text-white z-10 backdrop-blur-xl rounded p-4">BOLSAS</p>
        <Image src={'/images/banner/product-8-1.png'} fill alt="category image" />
      </div>
    </div>
  )
}
