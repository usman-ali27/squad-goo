
import { create } from 'zustand';

export interface JobSeeker {
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
  github?: string | null;
  emergency_contact_suburb?: string | null;
  emergency_contact_country?: string | null;
  country_of_birth?: string | null;
  abn?: string | null;
  tfn?: string | null;
  trs?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Recruiter {
  id: number;
  user_id: number;
  title: string | null;
  last_name: string;
  first_name: string;
  dob: string | null;
  position: string | null;
  bio: string | null;
  email: string;
  phone: string;
  address: string | null;
  kyc_verified: number;
  company_name: string | null;
  business_address: string | null;
  abn: string | null;
  business_phone: string | null;
  director_name: string | null;
  director_contact_number: string | null;
  director_contact_email: string | null;
  industry: string | null;
  kyb_verified: number;
  payment_method: string | null;
  card_last_four: string | null;
  save_card: boolean;
  auto_charge: boolean;
  terms_accepted: boolean;
  status: string;
  job_title: string | null;
  job_type: string | null;
  job_description: string | null;
  pay_rate: string | null;
  start_date: string | null;
  start_time: string | null;
  finish_date: string | null;
  finish_time: string | null;
  extra_qualification: string | null;
  number_of_staff: string | null;
  company_reg_date: string | null;
  daily_pay_from: string | null;
  daily_pay_to: string | null;
  fixed_rate: string | null;
  other_pay_type: string | null;
  other_rate: string | null;
  yearly_rate: string | null;
  created_at: string;
  updated_at: string;
  tfn: string | null;
  trs: string | null;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  linkedin: string | null;
  github?: string | null;

}

export interface Individual {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address?: string | null;
  bio?: string | null;
  kyc_verified: 0 | 1;
  tfn?: string | null;
  abn?: string | null;
  trs?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  github?: string | null;

  status: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  profile_picture?: string | null;
  email: string;
  email_verified_at?: string | null;
  role: "job_seeker" | "recruiter" | "individual";
  created_at: string;
  updated_at: string;
  job_seeker?: JobSeeker;
  recruiter?: Recruiter;
  individual?: Individual;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  actions: {
    login: (userData: User, token: string, rememberMe: boolean) => void;
    logout: () => void;
    updateJobSeeker: (jobSeekerData: JobSeeker) => void;
    updateRecruiter: (recruiterData: Recruiter) => void;
    updateIndividual: (individualData: Individual) => void;
    updateUser: (userData: Partial<User>) => void;
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
    },
    updateRecruiter: (recruiterData) => {
      const { user, token } = get();
      if (user) {
        const updatedUser = { ...user, recruiter: recruiterData };
        const rememberMe = !!localStorage.getItem('auth-storage');
        const storage = rememberMe ? localStorage : sessionStorage;
        const stateToPersist = { user: updatedUser, token };
        storage.setItem('auth-storage', JSON.stringify({ state: stateToPersist, version: 0 }));
        set({ user: updatedUser });
      }
    },
    updateIndividual: (individualData) => {
      const { user, token } = get();
      if (user) {
        const updatedUser = { ...user, individual: individualData };
        const rememberMe = !!localStorage.getItem('auth-storage');
        const storage = rememberMe ? localStorage : sessionStorage;
        const stateToPersist = { user: updatedUser, token };
        storage.setItem('auth-storage', JSON.stringify({ state: stateToPersist, version: 0 }));
        set({ user: updatedUser });
      }
    },
    updateUser: (userData) => {
      const { user, token } = get();
      if (user) {
        const updatedUser = { ...user, ...userData };
        const rememberMe = !!localStorage.getItem('auth-storage');
        const storage = rememberMe ? localStorage : sessionStorage;
        const stateToPersist = { user: updatedUser, token };
        storage.setItem('auth-storage', JSON.stringify({ state: stateToPersist, version: 0 }));
        set({ user: updatedUser });
      }
    },
  },
}));

export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthActions = () => useAuthStore((state) => state.actions);

export default useAuthStore;
