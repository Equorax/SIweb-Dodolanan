
import React from 'react'
import Image from 'next/image'

export default function Dashboard() {
  return (
    <div className='flex h-screen bg-gray-100'>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-yellow-500 shadow-md">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl font-semibold text-white">Dashboard</h1>
            <div className="flex items-center">
              <div className="h-8 w-8 bg-white rounded-full overflow-hidden mr-2">
                <Image 
                  src="/assets/Atmin.jpg" 
                  alt="Admin" 
                  className="h-full w-full object-cover" 
                  width={20}
                  height={20}
                />
              </div>
              <span className="text-white text-sm">Admin</span>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4">
          {/* Data Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Income Card */}
            <div className="bg-yellow-400 rounded-lg p-4 shadow flex justify-between items-center">
              <div>
                <p className="text-xs text-yellow-800">Incomes</p>
                <p className="text-lg font-bold text-white">Rp.12.792.893,00</p>
              </div>
              <div className="bg-yellow-300 p-2 rounded-full">
                <span className="text-yellow-700 text-xl">+</span>
              </div>
            </div>
            
            {/* Outcome Card */}
            <div className="bg-yellow-400 rounded-lg p-4 shadow flex justify-between items-center">
              <div>
                <p className="text-xs text-yellow-800">Total Produk</p>
                <p className="text-lg font-bold text-white">200</p>
              </div>
              <div className="bg-yellow-400 p-2 rounded-full">
                
              </div>
            </div>
            
            {/* Total Transaction Card */}
            <div className="bg-yellow-400 rounded-lg p-4 shadow flex justify-between items-center">
              <div>
                <p className="text-xs text-yellow-800">Total Transaksi</p>
                <p className="text-lg font-bold text-white">129</p>
              </div>
              <div className="bg-yellow-400 p-2 rounded-full">
                <span className="text-yellow-700 text-xl">=</span>
              </div>
            </div>
          </div>
          
          {/* Grafik Pendapatan Section */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-5xl font-semibold mb-4 items-start ">Grafik Pendapatan</h2>
            
           
              <div className="w-full h-[600px] bg-yellow-500 rounded-lg" >
                {/* For production, replace with your actual chart image */}
                <Image 
                  src="/admin-asset/Laporan.png" 
                  alt="Income Chart" 
                  width={1200} 
                  height={1200}
                  className="max-w-8xl h-[450px] pt-20  items-start"
                />
              </div>
            
          
          </div>
        </main>
      </div>
    </div>
  )
}