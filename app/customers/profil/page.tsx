'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function UserProfile() {
  return (
  <>
  <div className="min-h-screen bg-yellow-500 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
     
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Profile Photo */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
                <Image
                src={'/assets/Laufey.png'}
                width={150}
                height={150}
                alt='Foto Profile'/>

             
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-grow text-center lg:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Laufey </h1>
              <p className="text-lg text-black mb-1">Pengguna</p>
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Active
                </span>
              </div>
              <p className="text-black text-sm">Login: 7 Juni 2025 </p>
            </div>
            <Link href='/auth/login' className='bg-red-700 text-white rounded-lg px-3 py-3 font-semibold'> Logout
            </Link>
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
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
            <p className="text-gray-600">Laufey@email.com</p>
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
            <p className="text-gray-600">+62-812-345-6789</p>
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
            <p className="text-gray-600">Pengguna</p>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="grid grid-cols-1 gap-6">
          {/* Account Details */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Detail akun</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">ID Pengguna</span>
                  <span className="font-medium text-gray-900">USER-2024-158</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Tanggal bergabung</span>
                  <span className="font-medium text-gray-900">3 Maret 2024</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Lokasi</span>
                  <span className="font-medium text-gray-900">Jakarta, DKI Jakarta</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Status</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)
}