/**
 * Auth Context Provider for Supabase Authentication
 * 
 * Provides authentication state and methods throughout the app:
 * - user: Current authenticated user
 * - session: Current auth session
 * - loading: Auth state loading indicator
 * - signUp: Create new account with email/password
 * - signIn: Sign in with email/password
 * - signInWithGoogle: OAuth sign in with Google
 * - signOut: Sign out current user
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { User, Session, AuthError } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signUp: (email: string, password: string, name?: string) => Promise<{ error: AuthError | null }>;
    signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
    signInWithGoogle: () => Promise<{ error: AuthError | null }>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);

                // Create user profile on first sign up
                if (event === 'SIGNED_IN' && session?.user) {
                    await ensureUserProfile(session.user);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    // Ensure user has a profile in the users table
    async function ensureUserProfile(user: User) {
        const { data: existingProfile } = await supabase
            .from('users')
            .select('id')
            .eq('id', user.id)
            .single();

        if (!existingProfile) {
            await supabase.from('users').insert({
                id: user.id,
                email: user.email!,
                name: user.user_metadata.full_name || user.email?.split('@')[0] || 'User',
                image: user.user_metadata.avatar_url || null,
            });
        }
    }

    async function signUp(email: string, password: string, name?: string) {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: name },
            },
        });
        return { error };
    }

    async function signIn(email: string, password: string) {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { error };
    }

    async function signInWithGoogle() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/dashboard`,
            },
        });
        return { error };
    }

    async function signOut() {
        await supabase.auth.signOut();
    }

    const value = {
        user,
        session,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
