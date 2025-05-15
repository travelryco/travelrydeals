-- SQL script to make jake@travelry.net an admin
-- Run this in your Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- First, get the auth.users user ID for the email
SELECT id FROM auth.users WHERE email = 'jake@travelry.net';

-- Copy the ID from the result above, then use it in this command:
-- Replace 'USER_ID_HERE' with the actual ID you copied

-- Insert or update the user's profile to be an admin
INSERT INTO profiles (id, email, is_admin)
VALUES ('USER_ID_HERE', 'jake@travelry.net', true)
ON CONFLICT (id) 
DO UPDATE SET is_admin = true;

-- Verify the update worked
SELECT * FROM profiles WHERE email = 'jake@travelry.net'; 