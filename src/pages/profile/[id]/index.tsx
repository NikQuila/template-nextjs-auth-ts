import { useEffect } from 'react';
import { logoutUser } from '@/firebase/auth';
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'next/router';
import { getUserById } from '@/firebase/user';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase-config';

const ProfilePage = () => {
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    getUserById(id as string).then((result) => {
      setUser(result);
    });
  }, [id]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      if (!userAuth) {
        router.push('/');
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='flex flex-col items-center justify-center p-10 bg-white rounded-md shadow-md w-full max-w-md'>
        <img
          className=' mb-4 '
          src='https://m.media-amazon.com/images/I/614tbnLMdML.jpg' // replace this with the actual user's profile picture if you have it
          alt='Your Profile'
        />
        <h1 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          {user?.displayName}
        </h1>
        <h2 className='mt-2 text-center text-lg text-gray-500'>
          {user?.email}
        </h2>
        <button
          className='mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => logoutUser()}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
