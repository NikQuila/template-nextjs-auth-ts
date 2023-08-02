import { useState } from 'react';
import { useRouter } from 'next/router';
import { loginUser, loginWithGoogle } from '@/firebase/auth';
import { SyncLoader } from 'react-spinners';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorAuth, setErrorAuth] = useState<null | string>(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSubmit(true);
    const result = await loginUser(email, password);
    console.log(result);
    if (!result.success) {
      setErrorAuth(result.message);
    }
    setLoadingSubmit(false);
  };

  const handleLoginWithGoogle = async () => {
    setLoadingGoogle(true);
    const result = await loginWithGoogle();
    if (!result.success) {
      setErrorAuth(result.message);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorAuth(null);
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleRegister = () => {
    router.push('/register');
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
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
            Sign in to your account
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

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
                <div className='text-sm'>
                  <a
                    href='/auth/forgot'
                    className='font-semibold text-indigo-600 hover:text-indigo-500'
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  onChange={handleChangeInput}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            {errorAuth && (
              <div className='text-red-500 text-sm font-semibold'>
                {errorAuth}
              </div>
            )}
            {loadingSubmit ? (
              <div className='flex justify-center'>
                <SyncLoader color='#2563eb' />
              </div>
            ) : (
              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Sign in
                </button>
              </div>
            )}
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Don't have an account?{' '}
            <a
              href='/auth/register'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
            >
              Register here
            </a>
          </p>
        </div>
        <div className=' sm:mx-auto sm:w-full sm:max-w-sm'>
          <p className='mt-6 text-gray-500 text-center text-sm leading-5 '>
            Or log in with
          </p>
          {loadingGoogle ? (
            <div className='flex justify-center'>
              <SyncLoader color='#2563eb' />
            </div>
          ) : (
            <div className='mt-1'>
              <button
                onClick={handleLoginWithGoogle}
                className='w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                Google
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
