export interface PersonalInfo {
  fullName: string;
  age: number | null;
  gender: string;
  educationLevel: string;
}

export interface AccountInfo {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  fullName?: string;
  age?: string;
  gender?: string;
  educationLevel?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
}

export interface Session {
  expires_at: number;
  token: string;
}