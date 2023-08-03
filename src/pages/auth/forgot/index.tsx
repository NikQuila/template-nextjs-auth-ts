import { useState } from 'react';
import { useRouter } from 'next/router';
import { sendPasswordReset } from '@/firebase/auth';
import { SyncLoader } from 'react-spinners';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await sendPasswordReset(email);
    if (!result.success) {
      setError(result.message);
    } else {
      setSuccessMsg(result.message);
    }
    setLoading(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const { value } = e.target;
    setEmail(value);
  };

  const handleSignIn = () => {
    router.push('/login');
  };

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
            Reset your password
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            onSubmit={handleSubmit}
            className='space-y-6'
            action='#'
            method='POST'
          >
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  onChange={handleChangeInput}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            {error && (
              <div className='text-red-500 text-sm font-semibold'>{error}</div>
            )}
            {loading ? (
              <div className='flex justify-center'>
                <SyncLoader color='#2563eb' />
              </div>
            ) : (
              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Reset Password
                </button>
              </div>
            )}
          </form>
          {successMsg && (
            <div className='text-green-500 text-sm font-semibold'>
              {successMsg}
            </div>
          )}

          <p className='mt-10 text-center text-sm text-gray-500'>
            Remember your password?{' '}
            <a
              href='/auth/login'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
