'use client'
import React from 'react'
import Image from 'next/image';
import { Bungee_Inline } from 'next/font/google';
import { testimonials } from '@/app/data-dummy/testimoni';
const Bungee = Bungee_Inline({
  subsets: ['latin'],
  weight: "400"
})

// pages/testimonials.tsx


export default function testimoniPage() {
  
  const testi = testimonials
  return (
    <>
    <section className="min-h-screen bg-yellow-500 p-6 flex flex-col items-center justify-center">
      
    <div className='flex-col justify-center items-center mb-20 '>
      <h1 className={`text-6xl lg:text-9xl mb-10 mt-10 font-bold text-blue-700 text-center ${Bungee.className}`}> Testimoni </h1>
      <hr className='border-4 border-white mt-4'/>
    </div>

    

      <div className="w-full max-w-2xl">
        {testi.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className="bg-white rounded-lg shadow-lg p-6 mb-6"
          >
            <div className="flex items-start">
              <div className="mr-4">
                <Image
                  src={testimonial.avatarUrl} 
                  alt={`${testimonial.name}'s avatar`} 
                  width={100}
                  height={100}
                  className="w-15 h-15 rounded-full object-cover"
                  
                />
              </div>
              <div className="flex-1">

                <h3 className="text-xl font-bold">{testimonial.name}</h3>

                <p className="text-gray-700">{testimonial.text}</p>
              </div>
            </div>
          </div>
        ))}

      
      </div>
    </section>
    </>
  );
}
