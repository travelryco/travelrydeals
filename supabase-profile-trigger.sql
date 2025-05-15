-- SQL script to automatically create profiles for new users
-- Run this in your Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- Create a function that will be triggered on new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert a new row into profiles
  INSERT INTO public.profiles (id, email, is_admin, created_at, updated_at)
  VALUES (
    NEW.id, 
    NEW.email,
    FALSE, -- Default to non-admin
    NEW.created_at,
    NEW.created_at
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger that calls this function when a new user is inserted
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add a comment explaining what this trigger does
COMMENT ON TRIGGER on_auth_user_created ON auth.users 
IS 'Automatically creates a profile entry when a new user signs up';

-- The trigger is now set up. Any new users will automatically get a profile. 