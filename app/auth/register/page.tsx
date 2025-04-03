'use client';
import React, { useState,FormEvent } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { FaEye,FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';








export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nama,setNama] = useState('');
  const router = useRouter();
  const [errors, setErrors] = useState<{email?: string; password?: string;}>({});
  const [showPassword,setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if(email.trim() === ''){
      newErrors.email = 'Email tidak boleh kosong';
    } else if(email !== 'customer@gmail.com' && email !== ''){
      newErrors.email = 'Email anda salah'
    }
   
    // Password validation
    if (password.trim() === '') {
      newErrors.password = 'Password tidak boleh kosong';
    } else if (password.length < 6) {
      newErrors.password = 'Password harus lebih dari 6 karakter';
    } else if (password !== 'pascal12345'  && password !== ''){
      newErrors.password = 'password anda salah'
    }
    setErrors(newErrors);
    // jika ada error maka lengthnya gak bakal 0 maka yang di return dari function ini false
    // errornya dari setiap block if jika ada error maka object newErrors akan diisi dengan newErrors.email/password
    return Object.keys(newErrors).length === 0;
  };

  const validateAdminForm = () => {
    const newErrors :  { email?: string; password?: string } = {};

    if (email.trim() === '') {
      newErrors.email = 'Email tidak boleh kosong';
    } else if (email !== 'admin@gmail.com') {
      newErrors.email = 'Email admin salah';
    }

    if (password.trim() === '') {
      newErrors.password = 'Password tidak boleh kosong';
    } else if (password !== 'sayaadmin') {
      newErrors.password = 'Password admin salah';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(email !== '' && email!== 'admin@gmail.com'){
        if(validateForm() ){
          router.push('/customers/beranda')
        }
      }
      // jalur login admin
      if(email === 'admin@gmail.com')
        if(validateAdminForm()){
          router.push('/dashboard/admin')
      }
       
      
      }
      console.log('Login attempt with:', { email, password });

  return (
    <div className="grid grid-cols-2 gap-0">
 
    <div className="min-h-screen flex items-center justify-center bg-yellow-500">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md grid grid-cols-1 gap-4">
        <h2 className="text-2xl font-bold text-center mb-4">Selamat Datang</h2>
        
        <form onSubmit={handleRegister} className="space-y-4">

          <div>
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              type="text"
              id="text-name"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              // required
              placeholder='Masukan Nama Anda'
            />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>


          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Alamat Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              // required
              placeholder='Masukan Alamat Email'
            />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
              placeholder='Masukan Password'
              
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
            
            
          </div>
          
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-2 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Daftar
          </button>
        </form>
        
        
        
        {/* <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-50">
            <FcGoogle className="mr-2" /> Google
          </button>
          <button className="flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-50">
            <FaApple className="mr-2" /> Apple
          </button>
        </div> */}
        

        {/* diganti login */}
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">
            Sudah Punya AKun? {' '}
            <Link 
              href={'/auth/login'}
              className="text-indigo-600 hover:text-indigo-500"
            >
              Login
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
  )
} 

