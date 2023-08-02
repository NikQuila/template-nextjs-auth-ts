import {
  createUserWithEmailAndPassword,
  UserCredential,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase-config';

export const createUserAuth = async (
  email: string,
  password: string
): Promise<UserCredential | undefined> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

export const createUserDoc = async (
  user: User,
  userDisplayName?: string
): Promise<{ success: boolean; code: string; message: string }> => {
  const userDocRef = doc(db, 'users', user.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    try {
      await setDoc(userDocRef, {
        displayName: userDisplayName ? userDisplayName : user.displayName,
        email: user.email,
        id: user.uid,
      });
      return {
        success: true,
        code: 'auth/success',
        message: 'Login successful',
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        code: 'auth/error',
        message: 'Error creating user',
      };
    }
  }
  return {
    success: false,
    code: 'auth/failure',
    message: 'User already exists',
  };
};

export const getUserById = async (uid: string): Promise<any> => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      console.log('No such user!');
      return {
        id: uid,
      };
    }
  } catch (error) {
    console.log('Error getting user:', error);
  }
};
