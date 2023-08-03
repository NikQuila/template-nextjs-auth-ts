import { create } from 'zustand';
import { User } from 'firebase/auth';
import { UserFS } from '@/utils/types';

type State = {
  user: UserFS | null;
  setUser: (user: UserFS | null) => void;
  userAuth: User | null;
  setUserAuth: (userAuth: User | null) => void;
  lookIfIsVerified: boolean;
  setLookIfIsVerified: (lookIfIsVerified: boolean) => void;
  isLogIn: boolean;
  setIsLogIn: (isLogIn: boolean) => void;
  isCheckedLogIn: boolean;
  setIsCheckedLogIn: (isCheckedLogIn: boolean) => void;
};

export const useUserStore = create<State>((set) => ({
  user: null,
  userAuth: null,
  lookIfIsVerified: false,
  isLogIn: false,
  isCheckedLogIn: false,
  setUser: (user) => set(() => ({ user })),
  setUserAuth: (userAuth) => set(() => ({ userAuth })),
  setLookIfIsVerified: (lookIfIsVerified) => set(() => ({ lookIfIsVerified })),
  setIsLogIn: (isLogIn) => set(() => ({ isLogIn })),
  setIsCheckedLogIn: (isCheckedLogIn) => set(() => ({ isCheckedLogIn })),
}));
