'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectTo?: string;
}

const COOLDOWN_SECONDS = 60;

function friendlyError(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes('rate limit') || lower.includes('too many') || lower.includes('for security purposes')) {
    return `Too many sign-in attempts. Please wait a minute before trying again.`;
  }
  if (lower.includes('invalid email')) return 'Please enter a valid email address.';
  return msg;
}

export default function AuthModal({ isOpen, onClose, redirectTo }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase || cooldown > 0) return;
    setStatus('loading');

    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setStatus('error');
      setErrorMsg("You're already signed in. Refresh the page or use the Sign Out button.");
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + (redirectTo || '') },
    });

    if (error) {
      setStatus('error');
      setErrorMsg(friendlyError(error.message));
      if (error.message.toLowerCase().includes('rate limit') ||
          error.message.toLowerCase().includes('too many') ||
          error.message.toLowerCase().includes('for security purposes')) {
        setCooldown(COOLDOWN_SECONDS);
      }
    } else {
      setStatus('sent');
      setCooldown(COOLDOWN_SECONDS);
    }
  }

  function handleClose() {
    setEmail('');
    setStatus('idle');
    setErrorMsg('');
    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-4">
        {status === 'sent' ? (
          <div className="text-center py-4">
            <div className="text-5xl mb-4">📧</div>
            <h2 className="text-xl font-bold mb-2">Check your email</h2>
            <p className="text-gray-600 mb-2">
              We sent a sign-in link to <strong>{email}</strong>
            </p>
            <p className="text-gray-400 text-sm mb-6">Check your spam folder if it doesn't arrive within a minute.</p>
            {cooldown > 0 && (
              <p className="text-gray-400 text-xs mb-4">Resend available in {cooldown}s</p>
            )}
            <div className="flex gap-2">
              {cooldown === 0 && (
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-secondary flex-1"
                >
                  Resend
                </button>
              )}
              <button onClick={handleClose} className="btn-secondary flex-1">Close</button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Sign in</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none w-8 h-8 flex items-center justify-center"
              >
                ×
              </button>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Enter your email and we'll send a magic link — no password needed.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                autoFocus
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {status === 'error' && (
                <p className="text-red-600 text-sm">{errorMsg}</p>
              )}
              <button
                type="submit"
                disabled={status === 'loading' || cooldown > 0}
                className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading'
                  ? 'Sending…'
                  : cooldown > 0
                  ? `Retry in ${cooldown}s`
                  : 'Send magic link'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
