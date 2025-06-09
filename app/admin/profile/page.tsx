'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminProfile() {
  return (
<>
      <div className="bg-yellow-500 p-5 max-lg:">
          <h1 className="text-xl font-semibold text-white">Profil admin</h1>
      </div>
      <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
        
            <div className="bg-yellow-500 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                {/* Profile Photo */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
                  <Image
                  src={'/assets/atmin.png'}
                  width={150}
                  height={150}
                  alt='Profil admin'/>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-grow text-center lg:text-left">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">John doe</h1>
                  <p className="text-lg text-black mb-1"> Administrator</p>
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      Active
                    </span>
                  </div>
                  <p className="text-black text-sm">Login: 9 Juni 2025 </p>
                </div>
                <Link href='/auth/login' className='bg-red-700 text-white rounded-lg px-3 py-3'> Logout
                </Link>
              </div>
            </div>

            {/* Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Contact Info Card */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                </div>
                <p className="text-gray-600">johndoe@company.com</p>
              </div>

              {/* Phone Card */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                </div>
                <p className="text-gray-600">+62-555-123-4567</p>
              </div>

              {/* Role Card */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Role</h3>
                </div>
                <p className="text-gray-600">Administrator</p>
              </div>

              {/* Department Card */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Departemen</h3>
                </div>
                <p className="text-gray-600">Operator IT</p>
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Account Details */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Detail akun</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">ID karyawan</span>
                    <span className="font-medium text-gray-900">EMP-2024-001</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Tanggal bergabung</span>
                    <span className="font-medium text-gray-900">15 Januari 2024</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Lokasi</span>
                    <span className="font-medium text-gray-900">Bandung, Jawa Barat</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Status</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Overview Admin</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Total Login</span>
                    <span className="font-medium text-blue-600">1,247</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Jumlah Produk Tercatat</span>
                    <span className="font-medium text-green-600">156</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Jumlah Transaksi Terproses</span>
                    <span className="font-medium text-purple-600">2,489</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600"> Uptime sistem</span>
                    <span className="font-medium text-orange-600">99.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
</> 
  )
}