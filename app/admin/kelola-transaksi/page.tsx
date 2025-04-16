import React from 'react'
import { Search, Edit2, Trash2 } from 'lucide-react'
import Image from 'next/image'

export default function transaction() {
  return (
    <div className='flex-h-screen bg-gray-100'>
      <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header */}
              <header className="bg-yellow-500 shadow-md">
                <div className="flex justify-between items-center p-4">
                  <h1 className="text-xl font-semibold text-white">Kelola Transaksi</h1>
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-white rounded-full overflow-hidden mr-2">
                        <Image src="/assets/Atmin.jpg" alt="Admin" className="h-full w-full object-cover" 
                        width={20}
                        height={20}/>
                    </div>
                    <span className="text-white text-sm">Admin</span>
                  </div>
                </div>
              </header>
      </div>
    </div>
  )
}
