import '@/styles/globals.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { useUserStore } from '@/store/useUserStore';
import { auth } from '@/firebase/firebase-config';
import { createUserDoc, getUserById } from '@/firebase/user';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { setUser, setUserAuth, setIsLogIn, setIsCheckedLogIn } =
    useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        setUserAuth(userAuth);
        if (userAuth.emailVerified === false) {
          router.push('/auth/verify-email');
        } else {
          setIsLogIn(true);
          await createUserDoc(userAuth);
          const result = await getUserById(userAuth.uid);
          setUser(result);
        }
      } else {
        setIsLogIn(false);
        setUserAuth(null);
        setUser(null);
      }
      setIsCheckedLogIn(true);
    });

    return unsubscribe;
  }, []);

  return <Component {...pageProps} />;
}
