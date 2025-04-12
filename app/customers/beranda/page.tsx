'use client'

import React, {useEffect,useState} from 'react'
import Image from 'next/image'
import Link from 'next/link';



export default function Page() {
  // membuat array yang berisi objek yang menyimpan alamat gambar,alt, dan background color card
  const products = [
    {
      imageSrc: "/assets/toy-moose.png",
      alt: "Boneka kelinci",
      bgColor: "bg-pink-200"
    },
    {
      imageSrc: "/assets/toy-truck.png",
      alt: "Mobil mainan",
      bgColor: "bg-blue-200"
    },
    {
      imageSrc: "/assets/toy-bear.png",
      alt: "Boneka beruang",
      bgColor: "bg-pink-200"
    },
    {
      imageSrc: "/assets/toy-robot.png",
      alt: "Robot mainan",
      bgColor: "bg-blue-200"
    }
  ];

  const [imageOpacity,setImageOpacity] = useState(0);

  useEffect(() => {
    setTimeout(()=>{
      setImageOpacity(1);
    },100);
  },[]);

return (
<>
  <section className='flex flex-col md:flex-row justify-between items-start w-full px-4 py-16  relative bg-yellow-500'>
    <div className='max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start'> 
           {/* text block */}
      <div className='text-container md:w-1/2 md:pr-8 mb-10 md:mb-0 md:mt-20'>
        <h1 className="text-4xl font-bold text-white leading-tight mb-2">
          Temukan mainan baru yang bikin si kecil bahagia!
        </h1>
        <p className="text-white text-lg mb-6">
          Sedang mencari mainan untuk anak? Langsung klik tombol di bawah ini aja!
        </p>
        <Link href={'/customers/produk'} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-5 rounded-full">
          BELANJA SEKARANG! <span className="ml-1">→</span>
        </Link>

        <div className="image-container flex justify-start space-x-8 max-w-7xl mx-auto mt-16 overflow-x-hidden">
          <Image src="/assets/Dad-books.png" width={80} height={80} alt="Kid riding toy horse" className="h-16 w-auto" />
          <Image src="/assets/Girl-horse.png" width={80} height={80} alt="Kids playing with toys" className="h-16 w-auto" />
          <Image src="/assets/Mother-toys.png" width={80} height={80} alt="Kid playing on floor" className="h-16 w-auto" />
          <Image src="/assets/sitting-boy.png" width={80} height={80} alt="Kids reading together" className="h-16 w-auto" />
        </div>
      </div>
      
      {/* image kid */}
        <div className='md:w-1/2 flex justify-end'>
          <Image
            src="/assets/Students.png"
            width={750}
            height={750}
            alt="Picture of child"
            style={{borderRadius:'100px',
              opacity: imageOpacity,
              transition: 'opacity 1.5s ease-in-out'
            }}
            className="w-auto h-auto"
            priority
          />
        </div>
      </div>
   
      

      

        
  </section>

    <section className="flex bg-yellow-500 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2">
              PRODUK TERBARU DARI KAMI
            </h2>
            <hr className='mb-10'/>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {/* Menggunakan array.map untuk membuat kartu produk */}
              {products.map((product, index) => (
                <div 
                  key={index} 
                  className={`${product.bgColor} rounded-lg p-4 flex items-center justify-center`}
                >
                  <Image 
                    src={product.imageSrc} 
                    width={150} 
                    height={150} 
                    alt={product.alt} 
                  />
                </div>
              ))}
            </div>
            
            <p className="text-white mb-6 max-w-3xl">
              Temukan mainan seru dari kami, sekarang ada koleksi terbaru pilihan orang tua. Aman, terjamin kualitasnya, dan tersedia dengan harga terbaik yang patut Anda coba. Anak-anak pasti akan bahagia dan mainan kami dibuat dengan standar kualitas terbaik.
            </p>
            
            <Link  href={'/customers/produk'} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-5 rounded-full ">
              BELANJA SEKARANG! <span className="ml-1">→</span>
            </Link>
          </div>
      
        </section>
</>
    
    
  );
};