import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  signinApi,
  signupApi,
  logoutApi,
  getUserApi,
} from "../api/authService";
import { SigninData, SignupData, User } from "../types/user";

// ==================== Types ====================
interface AuthPersistedState {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthState extends AuthPersistedState {
  isLoading: boolean;
  _hasHydrated: boolean;
}

interface AuthActions {
  setHasHydrated: (state: boolean) => void;
  signin: (values: SigninData) => Promise<{ user: User; message: string }>;
  signup: (values: SignupData) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  getUserDisplayName: () => string;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      _hasHydrated: false,

      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),

      signin: async (values: SigninData) => {
        set({ isLoading: true });
        try {
          const data = await signinApi(values);
          const { user } = data;
          set({
            user: user || data,
            isAuthenticated: true,
          });
          return data;
        } finally {
          set({ isLoading: false });
        }
      },

      signup: async (values: SignupData) => {
        set({ isLoading: true });
        try {
          const user = await signupApi(values);
          if (user && user._id) {
            set({
              user: user,
              isAuthenticated: true,
            });
          }

          return user;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await logoutApi();
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
          window.location.href = "/signin";
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },


      refreshUser: async () => {
  try {
    const freshUser = await getUserApi();
    set({ user: freshUser, isAuthenticated: true });
  } catch (error: unknown) {
    const err = error as { response?: { status?: number } };
    if (err.response?.status === 401) {
      set({ user: null, isAuthenticated: false });
    }
  }
},

      getUserDisplayName: () => {
        const { user } = get();
        if (!user) return "کاربر مهمان";
        return user.name || user.email || "کاربر بلاگ اپ";
      },
    }),
    {
      name: "blogapp-auth-storage",
      partialize: (state: AuthStore): AuthPersistedState => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);