export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          full_name: string;
          age: number;
          gender: string;
          education_level: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          age: number;
          gender: string;
          education_level: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          age?: number;
          gender?: string;
          education_level?: string;
          email?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [key: string]: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
    Functions: Record<string, unknown>;
  };
}

export type User = Database['public']['Tables']['users']['Row'];
export type NewUser = Database['public']['Tables']['users']['Insert'];