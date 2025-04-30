import { FormErrors, PersonalInfo, AccountInfo } from '../types/auth.types';

// Validate personal information
export const validatePersonalInfo = (values: PersonalInfo): FormErrors => {
  const errors: FormErrors = {};

  if (!values.fullName) {
    errors.fullName = 'Full name is required';
  } else if (values.fullName.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters';
  }

  if (values.age === null) {
    errors.age = 'Age is required';
  } else if (values.age < 5 || values.age > 100) {
    errors.age = 'Age must be between 5 and 100';
  }

  if (!values.gender) {
    errors.gender = 'Please select a gender';
  }

  if (!values.educationLevel) {
    errors.educationLevel = 'Please select an education level';
  }

  return errors;
};

// Validate account information
export const validateAccountInfo = (values: AccountInfo): FormErrors => {
  const errors: FormErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

// Calculate password strength (0-4)
export const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  
  return strength;
};