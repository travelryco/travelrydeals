'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export default function MakeAdminPage() {
  const { user } = useAuth();
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const makeAdmin = async () => {
    if (!user) {
      setStatus('You must be logged in to use this feature');
      return;
    }

    setLoading(true);
    setStatus('Processing...');

    try {
      // First check if a profile record exists
      const { data: existingProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        // Profile doesn't exist, so create one with admin privileges
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            is_admin: true
          });

        if (insertError) {
          throw new Error(`Failed to create admin profile: ${insertError.message}`);
        }
        
        setStatus(`Successfully created admin profile for ${user.email}`);
      } else {
        // Profile exists, update it to make the user an admin
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ is_admin: true })
          .eq('id', user.id);

        if (updateError) {
          throw new Error(`Failed to update profile: ${updateError.message}`);
        }
        
        setStatus(`Successfully updated ${user.email} to admin status!`);
      }
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-dark mb-6">Make Admin Utility</h1>
        
        {!user ? (
          <div className="p-4 bg-yellow-100 border border-yellow-200 rounded mb-4">
            You must be logged in to use this utility.
          </div>
        ) : (
          <>
            <div className="p-4 bg-blue-100 border border-blue-200 rounded mb-6">
              <p>Logged in as: <span className="font-semibold">{user.email}</span></p>
            </div>
            
            <button
              onClick={makeAdmin}
              disabled={loading}
              className="btn-primary w-full py-2 px-4 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Make Me an Admin'}
            </button>
            
            {status && (
              <div className={`mt-4 p-4 rounded ${status.includes('Error') ? 'bg-red-100 border border-red-200' : 'bg-green-100 border border-green-200'}`}>
                {status}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 