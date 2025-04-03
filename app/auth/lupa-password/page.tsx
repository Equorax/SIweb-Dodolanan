'use client'

import React, { FormEvent, useState } from 'react'
import Link from 'next/link'
import { Rammetto_One } from 'next/font/google';
import { useRouter } from 'next/navigation';

const RammettoOneFont = Rammetto_One({
  subsets:['latin'],
  weight:['400']
})


export default function lupaPassword() {

  const router = useRouter();
  const [email,setEmail] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    router.push('/auth/login')
  }
return (
<>
  <div className=' flex flex-col items-center justify-center bg-yellow-500 min-h-screen content-center '>
    <div className='bg-white opacity-85 max-w-7xl flex flex-col items-center justify-center rounded-lg p-[50px]'>
        <h2 className='mb-5'>
        <Link href="/auth/login" className={`text-4xl ${RammettoOneFont.className}`}>
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
        </h2>
        <form onSubmit={handleSubmit} className='flex flex-col items-center max-w-md mt-4'> 
          <div className='self-start'>
            <p className='mb-7 text-[20px]'> Masukan Email anda agar kami bisa mereset ulang password anda.</p>
            <h3 className=' text-[20px] mb-2'>Email</h3>
        </div>

        <div className='w-full'>
        <input 
          type='email'
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full px-3 py-2 border border-gray-700 mb-5 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'/>

        
          <button type='submit' className='bg-blue-700 text-white text-[24px] w-full rounded-lg p-2'>
            Reset Ulang Password
          </button>
        </div>
         
      </form>
      
    </div>
  </div>
    
</>
  )
}


