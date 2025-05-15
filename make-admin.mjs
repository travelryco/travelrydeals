// Script to make a user an admin
import { createClient } from '@supabase/supabase-js';

// Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://emgainlaebkiiifljwii.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtZ2FpbmxhZWJraWlpZmxqd2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMzA5MDEsImV4cCI6MjA2MjkwNjkwMX0.iT0N1YuKmlAUMQkG9lG6N4HsY4-GholgC_cjOdNGRq0';

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const EMAIL_TO_MAKE_ADMIN = 'jake@travelry.net';

async function makeUserAdmin() {
  try {
    console.log(`Attempting to make ${EMAIL_TO_MAKE_ADMIN} an admin...`);
    
    // First, we need to get the user's auth ID from the auth.users table via email
    // This is a workaround since we can't directly query the auth.users table
    
    // 1. First check if the user already has a profile
    const { data: existingProfiles, error: profileQueryError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', EMAIL_TO_MAKE_ADMIN);
      
    if (profileQueryError) {
      console.error('Error querying profiles:', profileQueryError.message);
      return;
    }
    
    // If profile exists with this email, make it admin
    if (existingProfiles && existingProfiles.length > 0) {
      console.log(`Found existing profile for ${EMAIL_TO_MAKE_ADMIN}`);
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ is_admin: true })
        .eq('email', EMAIL_TO_MAKE_ADMIN);
        
      if (updateError) {
        console.error('Error updating profile to admin:', updateError.message);
      } else {
        console.log(`✅ Successfully made ${EMAIL_TO_MAKE_ADMIN} an admin by updating profile!`);
      }
      return;
    }
    
    // 2. If no profile, try to create a profile by signing in with the user
    // This is just for demonstration purposes to look up users, but in production,
    // you would either use Service Role key or create the user profile via admin panel
    console.log(`No profile found for ${EMAIL_TO_MAKE_ADMIN}`);
    console.log('Creating a new profile with admin privileges...');
    
    // Get current user - this won't work in Node.js script, 
    // you'll need to manually insert the user's ID
    
    // For demonstration, let's manually insert a record with a placeholder ID
    // IMPORTANT: In a real scenario, you would need the actual user ID from Supabase Auth
    const PLACEHOLDER_USER_ID = '00000000-0000-0000-0000-000000000000';
    console.log('⚠️ WARNING: Using placeholder user ID. You need to replace this with the actual user ID.');
    console.log('Please check Supabase Authentication dashboard to get the correct user ID for this email.');
    
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({
        id: PLACEHOLDER_USER_ID, // Replace with actual user ID from auth.users
        email: EMAIL_TO_MAKE_ADMIN,
        is_admin: true
      });
      
    if (insertError) {
      console.error('Error creating admin profile:', insertError.message);
      console.log('\nMANUAL STEPS:');
      console.log('1. Go to Supabase dashboard: https://app.supabase.io');
      console.log('2. Select your project');
      console.log('3. Go to Authentication > Users');
      console.log(`4. Find user with email ${EMAIL_TO_MAKE_ADMIN}`);
      console.log('5. Copy the User UID');
      console.log('6. Go to Table Editor > profiles');
      console.log('7. Insert a new row with:');
      console.log('   - id: [User UID you copied]');
      console.log(`   - email: ${EMAIL_TO_MAKE_ADMIN}`);
      console.log('   - is_admin: true');
    } else {
      console.log(`✅ Created admin profile for ${EMAIL_TO_MAKE_ADMIN} with placeholder ID.`);
      console.log('⚠️ You may need to update the ID to match the actual user ID from auth.users');
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the function to make the specified email an admin
makeUserAdmin()
  .then(() => console.log('Operation complete'))
  .catch(err => console.error('Top level error:', err)); 