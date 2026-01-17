-- ===========================================
-- Baithak Database Schema for Supabase
-- ===========================================
-- Run this SQL in your Supabase SQL Editor (Dashboard -> SQL Editor)
-- This creates all necessary tables and RLS policies

-- Enable UUID extension (usually enabled by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- TABLE: users
-- ===========================================
-- Stores user profile information, linked to Supabase Auth
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  image TEXT,
  university TEXT,
  stream TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- TABLE: subjects
-- ===========================================
-- Stores subjects/courses that users can enroll in
CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  course TEXT NOT NULL,
  description TEXT,
  enrolled_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- TABLE: enrollments
-- ===========================================
-- Junction table linking users to subjects (many-to-many)
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, subject_id)
);

-- ===========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ===========================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- USERS: Users can read and update only their own profile
CREATE POLICY "Users can view their own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- SUBJECTS: All authenticated users can view subjects
CREATE POLICY "Anyone can view subjects"
  ON public.subjects FOR SELECT
  TO authenticated
  USING (true);

-- ENROLLMENTS: Users can manage their own enrollments
CREATE POLICY "Users can view their enrollments"
  ON public.enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create enrollments"
  ON public.enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their enrollments"
  ON public.enrollments FOR DELETE
  USING (auth.uid() = user_id);

-- ===========================================
-- INDEXES for performance
-- ===========================================
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_subject_id ON public.enrollments(subject_id);
CREATE INDEX IF NOT EXISTS idx_subjects_name ON public.subjects(name);

-- ===========================================
-- OPTIONAL: Seed data for testing
-- ===========================================
-- Uncomment below to add sample subjects

-- INSERT INTO public.subjects (name, course, description, enrolled_count) VALUES
--   ('Data Structures', 'CS - Year 2', 'Learn fundamental data structures', 0),
--   ('Algorithms', 'CS - Year 2', 'Algorithm design and analysis', 0),
--   ('Database Systems', 'CS - Year 3', 'Relational databases and SQL', 0),
--   ('Web Development', 'CS - Year 2', 'Full-stack web development', 0),
--   ('Machine Learning', 'CS - Year 4', 'Introduction to ML concepts', 0);
