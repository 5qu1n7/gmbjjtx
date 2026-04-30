'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import AuthModal from './AuthModal';

export default function Navigation() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>('member');
  const [authModalOpen, setAuthModalOpen] = useState(false);

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
    } else {
      setRole('member');
    }
  }

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    window.location.reload();
  }

  return (
    <>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
            <a href="/" className="text-lg sm:text-xl font-bold text-gray-900 whitespace-nowrap">BJJ Curriculum</a>
            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
              <a href="/" className="text-gray-600 hover:text-gray-900 transition">Calendar</a>
              <a href="/notes" className="text-gray-600 hover:text-gray-900 transition">Notes</a>
              <a href="/milestones" className="text-gray-600 hover:text-gray-900 transition">Milestones</a>
              <a href="/explore" className="text-gray-600 hover:text-gray-900 transition">Browse</a>
              {(role === 'admin' || role === 'coach') && (
                <a href="/admin" className="text-blue-600 hover:text-blue-800 font-medium transition">Admin</a>
              )}
            </div>
          </div>
          <div>
            {user ? (
              <button
                onClick={handleSignOut}
                className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition whitespace-nowrap"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium transition whitespace-nowrap"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
