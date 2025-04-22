'use client';

import React, { useState,FormEvent } from 'react';
import Link from 'next/link';
import { FaEye,FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  // state Errors di inisialisasi sebagai object kosong, objek hanya dapat menerima properti(key) username dan password dengan tipe data string
  const [errors, setErrors] = useState<{username?: string; password?: string;}>({});
  const [showPassword,setShowPassword] = useState(false);
 
// users
  const validateForm = () => {
    // accumulator pattern di dalam berfungsi untuk menampung hasil yang dikembalikan dari blok validator
    // dilakukan agar tidak terjadi konflik (race condition?) dan supaya selalu mendapat data state terbaru untuk di display di error span bawah
    const newErrors: { username?: string; password?: string; } = {};

    // Email validation
    if(username.trim() === ''){
      newErrors.username = 'Username tidak boleh kosong';
    } else if(username !== 'user123' && username !== ''){
      newErrors.username = 'Username anda salah'
    }
   
    // Password validation
    if (password.trim() === '') {
      newErrors.password = 'Password tidak boleh kosong';
    } else if (password !== '12345' && password !== ''){
      newErrors.password = 'password anda salah'
    }


    setErrors(newErrors);

    //deteksi jumlah error di function ini
    // jika ada error maka lengthnya gak bakal 0 maka yang di return dari function ini false
    // errornya dari setiap block if jika ada error maka object newErrors akan diisi dengan newErrors.username/password
    
    return Object.keys(newErrors).length === 0;
  };

  const validateAdminForm = () => {
    const newErrors :  { username?: string; password?: string } = {};

    if (username.trim() === '') {
      newErrors.username = 'Username tidak boleh kosong';
    } else if (username !== 'admin123' && username !== '') {
      newErrors.username = 'Username anda salah';
    }

    if (password.trim() === '') {
      newErrors.password = 'Password tidak boleh kosong';
    }else if (password !== '12345' && password !== ' ') {
      newErrors.password = 'Password anda salah';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
     

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 
    if (username === 'admin123') {
      if (validateAdminForm()) {
        router.push('/admin/dashboard');
      }
    } 
    // Pengecekan untuk user biasa
    else {
      if (validateForm()) {
        router.push('/customers/beranda');
      }
    }
    
    }
    console.log('Login attempt with:', { username, password });

  return (

    <div className="grid grid-cols-2 gap-0">
 
    <div className="min-h-screen flex items-center justify-center bg-yellow-500">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md grid grid-cols-1 gap-4">
        <h2 className="text-2xl font-bold text-center mb-4">Selamat Datang</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
              Alamat Email
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              // required
            />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            {/* <div className="relative"> */}
            <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              // required
              
            />
            
            {showPassword ? (
                  <FaEye
                  size={24}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
                ) : (
                  <FaEyeSlash
                  size={24}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
                )}
            </div>
            <span>{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}</span>
            

            <div className="flex items-center justify-between mt-2">
              <div>
                <Link 
                  href="/auth/lupa-password" 
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Lupa Password?
                </Link>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-2 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Login
          </button>
        </form>
        
        
       
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">
            Belum punya akun? {' '}
            <Link 
              href="register" 
              className="text-indigo-600 hover:text-indigo-500"
            >
              Daftar
            </Link>
          </span>
        </div>
      </div>
    </div>
    <div className='min-h-screen flex h-80 w-100 justify-center '>
      <Image 
        src="/assets/Legoside1.png"
        alt="Login Illustration"
        layout="responsive"
        width={50}
        height={50}
        
      />
    </div>
  </div>
  );
}