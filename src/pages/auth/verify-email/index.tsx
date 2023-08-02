import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  onAuthStateChanged,
  sendEmailVerification,
  reload,
} from 'firebase/auth';
import { auth } from '@/firebase/firebase-config';
import { useUserStore } from '@/store/useUserStore';
import { SyncLoader } from 'react-spinners';
import { logoutUser } from '@/firebase/auth';

const VerifyEmailPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, setUser, userAuth, setUserAuth } = useUserStore();
  const [emailSent, setEmailSent] = useState(false);

  const handleClickEmailVerification = async () => {
    setLoading(true);
    if (userAuth) {
      await sendEmailVerification(userAuth);
    }
    setLoading(false);
    setEmailSent(true);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (userAuth) {
        await reload(userAuth);
        if (userAuth.emailVerified) {
          router.push(`/profile/${userAuth.uid}`);
        }
      }
    }, 3000); // checks every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, [userAuth]);

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            className='mx-auto h-10 w-auto'
            src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
            alt='Your Company'
          />
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Verify Your Email
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600 max-w'>
            {userAuth?.email}
          </p>
          {loading ? (
            <div className='flex justify-center mt-4'>
              <SyncLoader color='#6366F1' />
            </div>
          ) : (
            <div>
              <button
                onClick={handleClickEmailVerification}
                className='flex my-6 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Send Verification Email
              </button>
            </div>
          )}
          <div className=' mt-2 space-x-2 flex justify-center text-sm'>
            <p className='text-gray-600'>This is not your email?</p>
            <button
              onClick={() => logoutUser()}
              className='text-indigo-600 font-bold'
            >
              Register with other email
            </button>
          </div>
          {emailSent && (
            <div>
              <div className='flex justify-center mt-4'>
                <p className='text-center text-sm text-green-500'>
                  Email sent successfully
                </p>
              </div>
              <p className='mt-2 text-center text-sm text-gray-500'>
                Please check your inbox and follow the instructions to verify
                your email address.
              </p>
              <div className='flex justify-center mt-4'>
                <p className='text-center text-sm text-gray-500'>
                  Already confirmed? You will be redirected in a few seconds
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyEmailPage;
