'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { getCurrentWeek } from '@/lib/curriculum-data';
import AuthModal from '@/components/AuthModal';
import Toast from '@/components/Toast';

interface Note {
  id: number;
  week_number: number;
  training_date: string;
  difficulty_rating: number;
  notes: string;
  techniques_struggled_with: string[];
}

const DIFFICULTY_LABELS = ['', 'Very Easy', 'Easy', 'Moderate', 'Hard', 'Very Hard'];

function difficultyBadge(rating: number) {
  if (rating <= 2) return 'bg-green-100 text-green-800';
  if (rating === 3) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}

export default function NotesPage() {
  const [user, setUser] = useState<any>(null);
  const [currentWeek] = useState(getCurrentWeek());
  const [notes, setNotes] = useState('');
  const [difficulty, setDifficulty] = useState(3);
  const [struggles, setStruggles] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [history, setHistory] = useState<Note[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const loadHistory = useCallback(async (userId: string) => {
    if (!supabase) return;
    const { data } = await supabase
      .from('session_notes')
      .select('*')
      .eq('user_id', userId)
      .order('week_number', { ascending: false })
      .limit(30);
    if (data) setHistory(data);
  }, []);

  useEffect(() => {
    async function init() {
      if (!supabase) { setLoading(false); return; }
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data } = await supabase
          .from('session_notes')
          .select('*')
          .eq('user_id', user.id)
          .eq('week_number', currentWeek)
          .single();
        if (data) {
          setNotes(data.notes || '');
          setDifficulty(data.difficulty_rating || 3);
          setStruggles(data.techniques_struggled_with || []);
          setSubmitted(true);
        }
        loadHistory(user.id);
      }
      setLoading(false);
    }
    init();
  }, [currentWeek, loadHistory]);

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

    if (error) {
      setToast({ message: 'Error saving: ' + error.message, type: 'error' });
    } else {
      setSubmitted(true);
      setToast({ message: 'Notes saved!', type: 'success' });
      loadHistory(user.id);
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading…</div>;
  }

  if (!user) {
    return (
      <>
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} redirectTo="/notes" />
        <main className="min-h-screen p-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Training Notes</h1>
          <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-4xl mb-4">📓</div>
            <p className="text-gray-600 mb-2 font-medium">Track your training progress</p>
            <p className="text-gray-400 text-sm mb-6">
              Sign in to record session notes, rate difficulty, and review your history.
            </p>
            <button onClick={() => setAuthModalOpen(true)} className="btn-primary px-8 py-2.5">
              Sign In
            </button>
           </div>
         </main>
       </>
     );
   }

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div 
        className="min-h-screen bg-gray-50"
        style={{
          backgroundImage: 'url(/gustavo-machado.jpg)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center bottom',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <main className="max-w-2xl mx-auto p-6 md:p-8 relative z-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-600">Training Notes</h1>
            <p className="text-blue-500 mt-1">Week {currentWeek} of 52</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6 mb-6">
          {/* Difficulty */}
          <div>
            <label className="block text-sm font-semibold mb-3">Session Difficulty</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setDifficulty(num)}
                  className={`flex-1 py-3 rounded-lg font-bold text-lg transition ${
                    difficulty === num
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-2">{DIFFICULTY_LABELS[difficulty]}</p>
          </div>

          {/* Techniques struggled */}
          <div>
            <label className="block text-sm font-semibold mb-2">Techniques You Struggled With</label>
            <input
              type="text"
              placeholder="e.g. triangle choke, guard passing  (comma-separated)"
              className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={struggles.join(', ')}
              onChange={e => setStruggles(e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold mb-2">Session Notes</label>
            <textarea
              className="w-full p-3 border border-gray-200 rounded-lg h-36 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="How did it go? What clicked? What needs more reps?"
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary w-full py-3 font-semibold">
            {submitted ? 'Update Notes' : 'Save Notes'}
          </button>
        </form>

        {/* History */}
        {history.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={() => setShowHistory(h => !h)}
              className="w-full px-6 py-4 flex items-center justify-between font-semibold text-sm hover:bg-gray-50 transition"
            >
              <span>Past Training Notes ({history.length})</span>
              <span className="text-gray-400 text-xs">{showHistory ? '▲ collapse' : '▼ expand'}</span>
            </button>

            {showHistory && (
              <div className="divide-y border-t">
                {history.map(note => (
                  <div key={note.id} className="px-6 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm">Week {note.week_number}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">{note.training_date}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyBadge(note.difficulty_rating)}`}>
                          {DIFFICULTY_LABELS[note.difficulty_rating]}
                        </span>
                      </div>
                    </div>
                    {note.notes && (
                      <p className="text-sm text-gray-700 mb-2 leading-relaxed">{note.notes}</p>
                    )}
                    {note.techniques_struggled_with?.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {note.techniques_struggled_with.map((t, i) => (
                          <span key={i} className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full border border-red-100">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        </main>
      </div>
    </>
  );
}
