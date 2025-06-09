
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';
import { Bungee_Inline,Roboto_Condensed } from 'next/font/google';

const Bungee = Bungee_Inline({
  subsets: ['latin'],
  weight: "400"
})
const robotCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: "700"
})

export default function tentagKamiPage() {
  return (
    <>
      <section className=' min-h-[1024px] bg-yellow-500'>
        <main className='container mx-auto p-4'>
          <div className="pt-10 pb-6 mb-10">
            <h1 className={`text-8xl pt-5 font-bold text-blue-700 ${Bungee.className}`}>PROFIL TOKO</h1>
            <hr className='border-[5px] w-[350px] lg:w-[675px] mt-4'></hr>
          </div>

          {/* Main Content */}
          <div className="flex flex-col px-3 lg:flex-row rounded-lg gap-8 bg-yellow-200 ">
            {/* Image Section */}
            <div className="pl-8 pt-8 pb-8 pr-8 w-full">
              <div className="relative w-full rounded-lg overflow-hidden">
                <Image 
                  src="/assets/Profil-toko.png" 
                  alt="Gambar Toko"
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover"
                  style={{
                    maxHeight: '500px',
                    aspectRatio: '1/1'
                  }}
                  priority
                />
              </div>
            </div>

            {/* Text Section */}
            <div className={`bg-yellow-200  mr-10 rounded-lg ${robotCondensed.className}`}>
              <h2 className="tracking-normal text-[34px] font-bold text-blue-800 mb-4 text-center pt-5">TENTANG TOKO</h2>
              
              <p className="text-blue-800 text-justify tracking-normal text-[24px]">
                Dodolanan adalah toko mainan yang menyediakan berbagai jenis mainan berkualitas untuk anak-anak dari segala usia. 
                Fokus pada mainan edukatif dan kreatif, Dodolanan mendorong perkembangan motorik, kognitif, dan sosial anak melalui koleksi mainan ramah lingkungan, puzzle, action figure, dan boneka ceria. 
                Selain memamerkan pengalaman berbelanja yang menyenangkan dengan area bermain di dalam toko, Dodolanan 
                juga aktif mengadakan acara kreatif, diskon ulang tahun, dan berkontribusi pada komunitas lokal melalui donasi dan kolaborasi spesial.

              </p>

              <div className="mt-6 flex justify-center">
                <Link href='/customers/profil-tim'className="bg-blue-700 hover:bg-blue-800 text-yellow-500 tracking-wide text-[36px]  font-bold py-2 px-8 rounded-full">
                  TIM KAMI
                </Link>
              </div>

              <div className="flex flex-col md:flex-row items-center bg-yellow-200 gap-20  pt-6 pb-8 tracking-normal text-[24px]  mt-4 mr-8">

                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-blue-700 text-xl mr-2" />
                  <p className="text-blue-800 font-semibold">JALAN MELATI NO. 25, KOTA BANDUNG</p>
                </div>

                <div className="flex items-center">
                  <p className="font-bold text-blue-800">08321-888-777</p>
                </div>
                
                <div className="flex items-center">
                  <FaInstagram className="text-pink-600 text-2xl mr-2" />
                  <p className="text-blue-800 font-semibold">@DODOLANAN</p>
                </div>
              
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}