'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { getCurrentWeek } from '@/lib/curriculum-data';

export default function NotesPage() {
  const [user, setUser] = useState<any>(null);
  const [currentWeek] = useState(getCurrentWeek());
  const [notes, setNotes] = useState('');
  const [difficulty, setDifficulty] = useState(3);
  const [struggles, setStruggles] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    if (!supabase) { setLoading(false); return; }
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) loadNotes(user.id);
    setLoading(false);
  }

  async function loadNotes(userId: string) {
    if (!supabase) return;
    const { data } = await supabase
      .from('session_notes')
      .select('*')
      .eq('user_id', userId)
      .eq('week_number', currentWeek)
      .single();
    
    if (data) {
      setNotes(data.notes || '');
      setDifficulty(data.difficulty_rating || 3);
      setStruggles(data.techniques_struggled_with || []);
      setSubmitted(true);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !supabase) return;

    const { error } = await supabase
      .from('session_notes')
      .upsert({
        user_id: user.id,
        week_number: currentWeek,
        training_date: new Date().toISOString().split('T')[0],
        difficulty_rating: difficulty,
        notes,
        techniques_struggled_with: struggles,
      });

    if (error) alert('Error saving notes: ' + error.message);
    else {
      setSubmitted(true);
      alert('Notes saved successfully!');
    }
  }

  async function handleSignIn() {
    if (!supabase) { alert('Supabase not configured'); return; }
    const email = prompt('Enter your email:');
    if (!email) return;
    
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + '/notes' },
    });
    
    if (error) alert(error.message);
    else alert('Check your email for the login link!');
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!user) {
    return (
      <main className="min-h-screen p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Training Notes</h1>
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="mb-4">Please sign in to add training notes</p>
          <button onClick={handleSignIn} className="btn-primary">Sign In with Email</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Training Notes - Week {currentWeek}</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Difficulty Rating (1-5)
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setDifficulty(num)}
                className={`w-12 h-12 rounded-lg font-semibold transition ${
                  difficulty === num
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Techniques You Struggled With
          </label>
          <input
            type="text"
            placeholder="Enter techniques (comma separated)"
            className="w-full p-2 border rounded-lg"
            value={struggles.join(', ')}
            onChange={(e) => setStruggles(
              e.target.value.split(',').map(s => s.trim()).filter(Boolean)
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Training Notes
          </label>
          <textarea
            className="w-full p-3 border rounded-lg h-32"
            placeholder="How did training go? What did you learn? What was difficult?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary w-full py-3">
          {submitted ? 'Update Notes' : 'Save Notes'}
        </button>
      </form>

      {submitted && (
        <div className="mt-6 bg-green-50 p-4 rounded-lg">
          <p className="text-green-800">✓ Notes saved for Week {currentWeek}</p>
        </div>
      )}
    </main>
  );
}
