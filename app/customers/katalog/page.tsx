import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Rammetto_One } from 'next/font/google';
import { printCustomRoutes } from 'next/dist/build/utils';

const RammettoOneFont = Rammetto_One({
  subsets: ['latin'],
  weight: "400"
})

const picts = [
  {
    imageSrc: "/assets/Toy-store-1.png",
    alt: "Toy-store-1",
    title: 'DODOLANAN Menjadi Toko Mainan Terbaik Di ASIA',
    bgColor: "bg-yellow-400",
    width: 300,
    height: 200
  },
  {
    imageSrc: "/assets/Toy-store-2.png",
    alt: "Toy-store-2",
    title: 'DODOLANAN Menjadi Toko Mainan Terlengkap DI JAWA',
    bgColor: "bg-yellow-400",
    width: 300,
    height: 200
  },
  {
    imageSrc: "/assets/Toy-store-3.png",
    alt: "Toy-store-3",
    title: 'Mainan Paling Laku di DODOLANAN adalah Mainan Anak',
    bgColor: "bg-yellow-400",
    width: 300,
    height: 200
  },
  {
    imageSrc: "/assets/Toy-store-4.png",
    alt: "Toy-store-4",
    title: 'Mainan perempuan lebih banyak di beli!',
    bgColor: "bg-yellow-400",
    width: 300,
    height: 200
  }
];

export default function page() {
  return (
    <>
       <section className='flex  md:flex-row  w-full px-4 py-16  relative bg-sky-500'>
       <div className='absolute left-[750px] top-15'>
      <Image 
        src="/assets/sitting-boy.png" 
        alt="Person with laptop" 
        width={80} 
        height={80} 
      />
    </div>
    
    {/* Right top cartoon person */}
    <div className='absolute right-[750px] top-15'>
      <Image 
        src="/assets/Dad-books.png" 
        alt="Person sitting" 
        width={80} 
        height={80} 
      />
    </div>
    
    {/* Bottom left cartoon person */}
    <div className='absolute left-[800px] bottom-10'>
      <Image 
        src="/assets/Mother-toys.png" 
        alt="Person with picts" 
        width={80} 
        height={80} 
      />
    </div>

    {/* Bottom right cartoon person */}
    <div className='absolute right-[800px] bottom-10'>
      <Image 
        src="/assets/Girl-horse.png" 
        alt="Person doing activity" 
        width={80} 
        height={80} 
      />

    </div>
        <div className=' flex mx-auto w-full justify-center'> 
               {/* text block */}
               
          <div className='text-container mb-10 md:mb-0 md:mt-20 justify-center'>

            <h1 className="text-4xl font-bold text-white justify-center">
              ADA APA AJA SIH DI!
            </h1>
            <div className="flex-shrink-0 mt-5 pl-8">
              <Link href="/customers/beranda" className={`text-4xl ${RammettoOneFont.className}`}>
                <span className="text-blue-500">D</span>
                <span className="text-purple-500">O</span>
                <span className="text-pink-500">D</span>
                <span className="text-orange-500">O</span>
                <span className="text-yellow-500">L</span>
                <span className="text-green-500">A</span>
                <span className="text-blue-500">N</span>
                <span className="text-indigo-500">A</span>
                <span className="text-violet-500">N</span>
                
              </Link>
            </div>
            <hr className='mt-4 border-2 '/>
          </div>
    
        </div>  
       
      </section>

      {/* <section className='flex  md:flex-row  w-full px-4 py-16 relative bg-sky-500'>
         <div className='flex  flex-col  mx-auto justify-center'>
              <Link href={'/customers/produk'} className='grid grid-cols-2 gap-10 justify-picts-center'>

              {picts.map((pict, index) => (
                <div 
                  key={index} 
                  className={`${pict.bgColor} rounded-lg pb-10 flex`}
                >
                  <Image 
                    src={pict.imageSrc} 
                    width={400} 
                    height={400} 
                    alt={pict.alt} 
                    className="w-full h-auto"
                  />
                </div>
              ))}

              </Link>

            </div>
      </section> */}
    
    {/* <section className='flex md:flex-row w-full p-6 bg-sky-500 min-h-screen items-center justify-center'>
      <div className='flex flex-col mx-auto w-full max-w-6xl'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {picts.map((pict, index) => (
            <Link key={index} href={'/customers/produk'} className="block">
              <div className="rounded-lg overflow-hidden relative shadow-lg">
                <Image 
                  src={pict.imageSrc} 
                  width={pict.width} 
                  height={pict.height} 
                  alt={pict.title} 
                  className="w-full h-auto object-cover block"
                />
                <div className="w-full bg-yellow-400 py-3 px-4 absolute bottom-0 text-center text-black font-semibold">
                  {pict.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section> */}



<section className='flex  md:flex-row  w-full px-4 py-16 relative bg-sky-500'>
         <div className='flex  flex-col  mx-auto justify-center'>
              <Link href={'/customers/produk'} className='grid grid-cols-2 gap-10 justify-center'>

              {picts.map((pict, index) => (
                <div 
                  key={index} 
                  className={`${pict.bgColor} rounded-lg pb-10 pr-3 pl-3 pt-4 flex overflow-hidden relative`}
                >
                  <Image 
                    src={pict.imageSrc} 
                    width={400} 
                    height={400} 
                    alt={pict.alt} 
                    className="w-full h-auto"
                  />
                  <div className="w-full bg-yellow-400 py-3 px-4 absolute bottom-0 text-center text-black font-semibold">
                  {pict.title}
                </div>
                </div>
              ))}

              </Link>

            </div>
      </section>
    </>
   
  )
}
