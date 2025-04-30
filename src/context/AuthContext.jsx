// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { supabase } from '../lib/supabase';

// const AuthContext = createContext(undefined);

// export function AuthProvider({ children }) {
//   const [authState, setAuthState] = useState({
//     user: null,
//     session: null,
//     loading: true,
//   });

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const { data: { session }, error } = await supabase.auth.getSession();

//         if (error) throw error;

//         if (session) {
//           const { data: { user } } = await supabase.auth.getUser();
//           setAuthState({
//             user,
//             session,
//             loading: false,
//           });
//         } else {
//           setAuthState({ user: null, session: null, loading: false });
//         }
//       } catch (error) {
//         console.error('Error checking session:', error);
//         setAuthState({ user: null, session: null, loading: false });
//       }
//     };

//     checkSession();

//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (_event, session) => {
//         if (session) {
//           const { data: { user } } = await supabase.auth.getUser();
//           setAuthState({
//             user,
//             session,
//             loading: false,
//           });
//         } else {
//           setAuthState({ user: null, session: null, loading: false });
//         }
//       }
//     );

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);

//   const signIn = async (email, password) => {
//     try {
//       const { error } = await supabase.auth.signInWithPassword({
//         email: email.trim().toLowerCase(),
//         password,
//       });

//       if (error) {
//         console.error('Sign in error:', error);
//         return { error };
//       }

//       return null;
//     } catch (error) {
//       console.error('Unexpected sign in error:', error);
//       return { error };
//     }
//   };

//   const signUp = async (email, password) => {
//     try {
//       const { data: existingUser } = await supabase
//         .from('users')
//         .select('email')
//         .eq('email', email.trim().toLowerCase())
//         .maybeSingle();

//       if (existingUser) {
//         return {
//           data: null,
//           error: { message: 'An account with this email already exists. Please try logging in instead.' },
//         };
//       }

//       const { data, error } = await supabase.auth.signUp({
//         email: email.trim().toLowerCase(),
//         password,
//         options: {
//           emailRedirectTo: `${window.location.origin}/auth/callback`,
//         },
//       });

//       if (error) {
//         console.error('Sign up error:', error);
//         return {
//           data: null,
//           error: {
//             message:
//               error.message === 'User already registered'
//                 ? 'An account with this email already exists. Please try logging in instead.'
//                 : error.message,
//           },
//         };
//       }

//       return { data, error: null };
//     } catch (error) {
//       console.error('Unexpected sign up error:', error);
//       return { data: null, error };
//     }
//   };

//   const signOut = async () => {
//     try {
//       await supabase.auth.signOut();
//     } catch (error) {
//       console.error('Sign out error:', error);
//     }
//   };

//   const createUserProfile = async (userData) => {
//     try {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();

//       const userId = session?.user?.id;
//       if (!userId) {
//         console.error('No authenticated user found during profile creation');
//         return { error: 'No authenticated user found' };
//       }

//       const { data: existingProfile } = await supabase
//         .from('users')
//         .select('id')
//         .eq('id', userId)
//         .maybeSingle();

//       if (existingProfile) {
//         return { error: null };
//       }

//       const { error } = await supabase.from('users').insert([{
//         id: userId,
//         full_name: userData.fullName,
//         age: parseInt(userData.age, 10),
//         gender: userData.gender,
//         education_level: userData.educationLevel,
//         email: userData.email.trim().toLowerCase(),
//         created_at: new Date().toISOString(),
//       }]);

//       if (error) {
//         console.error('Create user profile error:', error);
//         return { error };
//       }

//       return { error: null };
//     } catch (error) {
//       console.error('Unexpected create profile error:', error);
//       return { error };
//     }
//   };

//   const value = {
//     user: authState.user,
//     session: authState.session,
//     loading: authState.loading,
//     signIn,
//     signUp,
//     signOut,
//     createUserProfile,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }

// export default AuthContext;