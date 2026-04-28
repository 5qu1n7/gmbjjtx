'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Navigation() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>('member');

  useEffect(() => {
    if (!supabase) return;
    checkUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkUser();
    });
    return () => subscription.unsubscribe();
  }, []);

  async function checkUser() {
    if (!supabase) return;
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    
    if (user) {
      const { data } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();
      setRole(data?.role || 'member');
    }
  }

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className="text-xl font-bold text-gray-900">
            BJJ Curriculum
          </a>
          <div className="flex gap-4">
            <a href="/" className="text-gray-600 hover:text-gray-900">Calendar</a>
            <a href="/notes" className="text-gray-600 hover:text-gray-900">My Notes</a>
            {(role === 'admin' || role === 'coach') && (
              <a href="/admin" className="text-blue-600 hover:text-blue-800 font-medium">
                Admin
              </a>
            )}
          </div>
        </div>
        
        <div>
          {user ? (
            <button onClick={handleSignOut} className="text-sm text-gray-600 hover:text-gray-900">
              Sign Out
            </button>
          ) : (
            <a href="/" className="text-sm text-blue-600 hover:text-blue-800">
              Sign In
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
