import React from 'react';
import { Bungee_Inline } from 'next/font/google';
import Image from 'next/image';
const Bungee = Bungee_Inline({
  subsets: ['latin'],
  weight: "400"
})
export default function profilTim() {

  const teamMembers = [
    {
      id: 1,
      name: "Benedictus Pascal Senjaya",
      birthdate: "18-04-2000",
      role: "SWE-1",
      instagram: "@Pascal1",
      imageUrl: "/assets/Pascal-siweb.jpg", // Pastikan file gambar ada di folder public
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porttitor metus vel lorem finibus efficitur."
    },
    {
      id: 2,
      name: "Yosua Arda Kurnia",
      birthdate: "12-01-1990",
      role: "SWE-2",
      instagram: "@Yosua1",
      imageUrl: "/assets/Yosua-siweb.jpg",
      description: "Nullam nec purus ex. Integer eget sapien eu nisi tempus maximus. Aenean et nisl dignissim, tincidunt ex ut, egestas justo."
    },
    {
      id: 3,
      name: "Richard Eason",
      birthdate: "18-04-2005",
      role: "SWE-3",
      instagram: "@Richard1",
      imageUrl: "/assets/Richard-siweb.jpg",
      description: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam porttitor, ipsum vel fermentum hendrerit, lorem ipsum congue dui."
    }
  ];


  return (
    <>
    <section className='min-h-screen bg-yellow-500 pb-12'>
      <main className='contaner mx-auto px-4'>
        <div className=' flex flex-col items-center justify-center '>
          <h1 className={`pt-10 text-9xl font-bold text-blue-700 text-center ${Bungee.className}`}>Profil Tim</h1>
          <hr className='border-[5px] w-[650px] mt-4 border-blue-700'/>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16'>
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className='bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-600 transform transition-transform hover:scale-105'
            >
              <div className='p-6 flex flex-col items-center'>

                {/* Gambar dengan border circular */}
                <div className='w-32 h-32 rounded-full border-4 border-blue-600 overflow-hidden mb-4 relative'>
                  <div className='w-full h-full rounded-full overflow-hidden'>
                    <Image 
                      src={member.imageUrl} 
                      alt={member.name} 
                      width={128} 
                      height={128} 
                      className='object-cover w-full h-full'
                      priority
                    />
                  </div>
                </div>
                
                {/* Informasi anggota tim */}
                <h2 className='text-xl font-bold text-center mb-1'>{member.name}</h2>
                <p className='text-gray-600 mb-2'>{member.birthdate}</p>
                <div className='bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4'>
                  {member.role}
                </div>
                
                {/* Deskripsi */}
                <p className='text-gray-700 text-center mb-4'>
                  {member.description}
                </p>
                
                {/* Instagram */}
                <div className='flex items-center justify-center w-full'>
                  <div className='relative w-6 h-6 mr-2'>
                    <Image 
                      src="/assets/Instagram.png" 
                      alt="Instagram" 
                      width={24} 
                      height={24}
                      className='object-contain'
                    />
                  </div>
                  <span className='text-gray-800'>{member.instagram}</span>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      
    </section>
    </>
  )
}
