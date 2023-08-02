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
  const { user, setUser, setUserAuth } = useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        setUserAuth(userAuth);
        if (userAuth.emailVerified === false) {
          router.push('/auth/verify-email');
        } else {
          await createUserDoc(userAuth);
          const result = await getUserById(userAuth.uid);
          setUser(result);
          router.push(`/profile/${userAuth.uid}`);
        }
      } else {
        setUserAuth(null);
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return <Component {...pageProps} />;
}
