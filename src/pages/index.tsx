import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase-config';
import { createUserDoc, getUserById } from '@/firebase/user';
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
      <h1 className='text-4xl mb-4'>Template Nextjs + Auth</h1>
      <p className='mb-4'>Initializer project by Nikquila</p>
      <p className='mb-4'>
        Stack utilizado: Nextjs + Typescript + Tailwind CSS
      </p>

      <button
        onClick={() => router.push('/auth/login')}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Iniciar sesión
      </button>
    </div>
  );
}
