import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { NextPage } from 'next';
import { SyncLoader } from 'react-spinners';

interface AuthenticatedComponentProps {}

const withAuth = (WrappedComponent: NextPage<AuthenticatedComponentProps>) => {
  const AuthenticatedComponent: NextPage<AuthenticatedComponentProps> = (
    props
  ) => {
    const { isLogIn, isCheckedLogIn } = useUserStore();
    const router = useRouter();

    useEffect(() => {
      if (isCheckedLogIn && !isLogIn) {
        router.push('/auth/login');
      }
    }, [isLogIn, isCheckedLogIn]);

    if (!isCheckedLogIn) {
      return (
        <div className='flex items-center justify-center h-screen pt-[400px]'>
          <SyncLoader color='#2563EB' />
        </div>
      );
    }
    return isLogIn ? <WrappedComponent {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
