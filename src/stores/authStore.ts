
import { create } from 'zustand';

interface JobSeeker {
  id: number;
  user_id: number;
  title?: string | null;
  first_name: string;
  last_name: string;
  dob?: string | null;
  address?: string | null;
  phone?: string | null;
  phone_verified: 0 | 1;
  email: string;
  gender?: string | null;
  email_verified: 0 | 1;
  resume_path?: string | null;
  offer_type: "both" | "permanent" | "contract";
  distance_range: number;
  tax_type: "both" | "abn" | "tfn";
  emergency_contact_name?: string | null;
  emergency_contact_relationship?: string | null;
  emergency_contact_email?: string | null;
  emergency_contact_phone?: string | null;
  kyc_verified: 0 | 1;
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  emergency_contact_suburb?: string | null;
  emergency_contact_country?: string | null;
  country_of_birth?: string | null;
  abn?: string | null;
  tfn?: string | null;
  trs?: string | null;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  name: string;
  profile_picture?: string | null;
  email: string;
  email_verified_at?: string | null;
  role: "job_seeker" | "recruiter";
  created_at: string;
  updated_at: string;
  job_seeker?: JobSeeker;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  actions: {
    login: (userData: User, token: string, rememberMe: boolean) => void;
    logout: () => void;
    updateJobSeeker: (jobSeekerData: JobSeeker) => void;
  };
}

const initializeState = () => {
  try {
    const authStorage = localStorage.getItem('auth-storage') ?? sessionStorage.getItem('auth-storage');
    if (authStorage) {
      const { state } = JSON.parse(authStorage);
      return {
        user: state.user,
        token: state.token,
        isAuthenticated: !!state.token,
      };
    }
  } catch (error) {
    console.error("Failed to parse auth storage:", error);
  }
  return {
    user: null,
    token: null,
    isAuthenticated: false,
  };
};

const useAuthStore = create<AuthState>((set, get) => ({
  ...initializeState(),
  actions: {
    login: (userData, token, rememberMe) => {
      const stateToPersist = { user: userData, token };
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('auth-storage', JSON.stringify({ state: stateToPersist, version: 0 }));
      set({ user: userData, token, isAuthenticated: true });
    },
    logout: () => {
      localStorage.removeItem('auth-storage');
      sessionStorage.removeItem('auth-storage');
      set({ user: null, token: null, isAuthenticated: false });
    },
    updateJobSeeker: (jobSeekerData) => {
        const { user, token } = get();
        if (user) {
            const updatedUser = { ...user, job_seeker: jobSeekerData };
            const rememberMe = !!localStorage.getItem('auth-storage');
            const storage = rememberMe ? localStorage : sessionStorage;
            const stateToPersist = { user: updatedUser, token };
            storage.setItem('auth-storage', JSON.stringify({ state: stateToPersist, version: 0 }));
            set({ user: updatedUser });
        }
    }
  },
}));

export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthActions = () => useAuthStore((state) => state.actions);

export default useAuthStore;
