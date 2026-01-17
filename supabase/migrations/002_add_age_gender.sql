-- ===========================================
-- MIGRATION: 002_add_age_gender
-- ===========================================
-- Adds age and gender columns to the users table

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS age INTEGER,
ADD COLUMN IF NOT EXISTS gender TEXT;

-- Verify columns were added (optional check)
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users';
