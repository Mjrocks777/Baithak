/**
 * Database Types for Supabase
 * 
 * These types match the Supabase database schema.
 * In a production environment, you can generate these types automatically
 * using the Supabase CLI: `supabase gen types typescript`
 */

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null;
                    university: string | null;
                    stream: string | null;
                    created_at: string;
                };
                Insert: {
                    id: string;
                    email: string;
                    name: string;
                    image?: string | null;
                    university?: string | null;
                    stream?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    email?: string;
                    name?: string;
                    image?: string | null;
                    university?: string | null;
                    stream?: string | null;
                    created_at?: string;
                };
            };
            subjects: {
                Row: {
                    id: string;
                    name: string;
                    course: string;
                    description: string | null;
                    enrolled_count: number;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    course: string;
                    description?: string | null;
                    enrolled_count?: number;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    course?: string;
                    description?: string | null;
                    enrolled_count?: number;
                    created_at?: string;
                };
            };
            enrollments: {
                Row: {
                    id: string;
                    user_id: string;
                    subject_id: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    subject_id: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    subject_id?: string;
                    created_at?: string;
                };
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
    };
}

// Convenience types for direct table access
export type User = Database['public']['Tables']['users']['Row'];
export type Subject = Database['public']['Tables']['subjects']['Row'];
export type Enrollment = Database['public']['Tables']['enrollments']['Row'];
