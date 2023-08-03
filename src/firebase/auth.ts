import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './firebase-config';
import { FirebaseError } from 'firebase/app';
import { createUserDoc } from './user';
import { useRouter } from 'next/router';

export const registerUser = async (
  displayName: string,
  email: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const result = await createUserDoc(userCredential.user, displayName);
    if (result.success) {
      return {
        success: true,
        code: 'auth/success',
        message: 'Register successful',
      };
    } else {
      return {
        success: false,
        code: 'auth/error',
        message: 'Error creating user',
      };
    }
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return {
      success: false,
      code: firebaseError.code,
      message: firebaseError.message,
    };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true, code: 'auth/success', message: 'Login successful' };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return {
      success: false,
      code: firebaseError.code,
      message: firebaseError.message,
    };
  }
};

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    console.log('aqui');
    return { success: true, code: 'auth/success', message: 'Login successful' };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return {
      success: false,
      code: firebaseError.code,
      message: firebaseError.message,
    };
  }
};

export const logoutUser = async () => {
  try {
    await auth.signOut();
    return {
      success: true,
      code: 'auth/success',
      message: 'Logout successful',
    };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return {
      success: false,
      code: firebaseError.code,
      message: firebaseError.message,
    };
  }
};

export const sendPasswordReset = async (
  email: string
): Promise<{ success: boolean; code: string; message: string }> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      code: 'auth/success',
      message: 'Password reset link sent!',
    };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      code: err.code,
      message: err.message,
    };
  }
};
