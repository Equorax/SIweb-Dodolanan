'use client'
import React from 'react'
import Image from 'next/image';
import { Bungee_Inline } from 'next/font/google';
const Bungee = Bungee_Inline({
  subsets: ['latin'],
  weight: "400"
})

// pages/testimonials.tsx


export default function testimoniPage() {
  const testimonials = [
    {
      id: 1,
      name: "Berren Yesra",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.",
      avatarUrl: "/assets/Berren.png",
    },
    {
      id: 2,
      name: "Evan Abel",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.",
      avatarUrl: "/assets/Evan.png",
    },
  ];

  return (
    <>

  
  
    <div className="min-h-screen bg-yellow-400 p-6 flex flex-col items-center justify-center">
      
    <div className='flex-col justify-center items-center mb-20 '>
      <h1 className={`text-6xl lg:text-9xl mb-10 mt-10 font-bold text-blue-700 text-center ${Bungee.className}`}> Testimoni </h1>
      <hr className='border-4 border-white mt-4'/>
    </div>

    

      <div className="w-full max-w-2xl">
        {testimonials.map((testimonial) => (
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
                <div className="flex text-yellow-400 my-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700">{testimonial.text}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Tambah Komentar
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
