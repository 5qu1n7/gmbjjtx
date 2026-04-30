'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import AuthModal from '@/components/AuthModal';
import Toast from '@/components/Toast';

type Belt = 'white' | 'blue' | 'purple' | 'brown' | 'black';
type TournamentResult = 'gold' | 'silver' | 'bronze' | 'no_placement';

interface BeltMilestone {
  id: number;
  belt: Belt;
  stripes: number;
  promoted_by: string | null;
  promoted_at: string;
  notes: string | null;
}

interface TournamentEntry {
  id: number;
  tournament_name: string;
  tournament_date: string;
  location: string | null;
  division: string | null;
  result: TournamentResult;
  opponent: string | null;
  notes: string | null;
}

const BELTS: Belt[] = ['white', 'blue', 'purple', 'brown', 'black'];

const beltStyle: Record<Belt, { bar: string; text: string; label: string }> = {
  white:  { bar: 'bg-gray-100 border-2 border-gray-300', text: 'text-gray-800', label: 'White' },
  blue:   { bar: 'bg-blue-600 border-2 border-blue-700', text: 'text-white',    label: 'Blue'  },
  purple: { bar: 'bg-purple-700 border-2 border-purple-800', text: 'text-white', label: 'Purple' },
  brown:  { bar: 'bg-amber-800 border-2 border-amber-900', text: 'text-white',  label: 'Brown' },
  black:  { bar: 'bg-gray-900 border-2 border-black', text: 'text-white',       label: 'Black' },
};

const resultStyle: Record<TournamentResult, { bg: string; text: string; icon: string; label: string }> = {
  gold:         { bg: 'bg-yellow-400', text: 'text-yellow-900', icon: '🥇', label: '1st Place' },
  silver:       { bg: 'bg-gray-300',   text: 'text-gray-800',   icon: '🥈', label: '2nd Place' },
  bronze:       { bg: 'bg-amber-600',  text: 'text-white',      icon: '🥉', label: '3rd Place' },
  no_placement: { bg: 'bg-gray-100',   text: 'text-gray-600',   icon: '🎯', label: 'Competed'  },
};

function BeltVisual({ belt, stripes, size = 'md' }: { belt: Belt; stripes: number; size?: 'sm' | 'md' | 'lg' }) {
  const s = beltStyle[belt];
  const heights = { sm: 'h-7', md: 'h-10', lg: 'h-14' };
  const stripeH = { sm: 'h-5', md: 'h-7', lg: 'h-10' };
  const stripeW = { sm: 'w-2', md: 'w-3', lg: 'w-4' };
  const gap = { sm: 'gap-0.5', md: 'gap-1', lg: 'gap-1.5' };

  return (
    <div className={`relative rounded-lg flex items-center px-4 ${heights[size]} ${s.bar} shadow-sm`}>
      <span className={`text-xs font-bold tracking-widest uppercase ${s.text} opacity-60 select-none`}>
        {s.label}
      </span>
      <div className={`absolute right-3 flex ${gap[size]} items-center`}>
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className={`${stripeW[size]} ${stripeH[size]} rounded-sm ${
              i < stripes
                ? belt === 'white' ? 'bg-gray-700 opacity-70' : 'bg-white opacity-80'
                : 'bg-transparent border border-dashed opacity-20 ' + (belt === 'white' ? 'border-gray-400' : 'border-white')
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function MilestonesPage() {
  const [user, setUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [milestones, setMilestones] = useState<BeltMilestone[]>([]);
  const [tournaments, setTournaments] = useState<TournamentEntry[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Belt form
  const [showBeltForm, setShowBeltForm] = useState(false);
  const [beltForm, setBeltForm] = useState({ belt: 'white' as Belt, stripes: 0, promoted_by: '', promoted_at: '', notes: '' });
  const [savingBelt, setSavingBelt] = useState(false);

  // Tournament form
  const [showTournamentForm, setShowTournamentForm] = useState(false);
  const [tForm, setTForm] = useState({ tournament_name: '', tournament_date: '', location: '', division: '', result: 'gold' as TournamentResult, opponent: '', notes: '' });
  const [savingT, setSavingT] = useState(false);

  useEffect(() => { checkUser(); }, []);

  async function checkUser() {
    if (!supabase) { setAuthChecked(true); return; }
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    setAuthChecked(true);
    if (user) loadData(user.id);
  }

  async function loadData(uid: string) {
    if (!supabase) return;
    setLoadingData(true);
    const [m, t] = await Promise.all([
      supabase.from('belt_milestones').select('*').eq('user_id', uid).order('promoted_at', { ascending: true }),
      supabase.from('tournament_results').select('*').eq('user_id', uid).order('tournament_date', { ascending: false }),
    ]);
    if (m.data) setMilestones(m.data);
    if (t.data) setTournaments(t.data);
    setLoadingData(false);
  }

  async function saveBeltMilestone() {
    if (!user || !supabase || !beltForm.promoted_at) return;
    setSavingBelt(true);
    const { error } = await supabase.from('belt_milestones').insert({
      user_id: user.id,
      belt: beltForm.belt,
      stripes: beltForm.stripes,
      promoted_by: beltForm.promoted_by || null,
      promoted_at: beltForm.promoted_at,
      notes: beltForm.notes || null,
    });
    setSavingBelt(false);
    if (error) {
      setToast({ message: 'Error saving: ' + error.message, type: 'error' });
    } else {
      setToast({ message: 'Milestone saved!', type: 'success' });
      setShowBeltForm(false);
      setBeltForm({ belt: 'white', stripes: 0, promoted_by: '', promoted_at: '', notes: '' });
      loadData(user.id);
    }
  }

  async function deleteMilestone(id: number) {
    if (!user || !supabase) return;
    await supabase.from('belt_milestones').delete().eq('id', id).eq('user_id', user.id);
    setMilestones(prev => prev.filter(m => m.id !== id));
  }

  async function saveTournament() {
    if (!user || !supabase || !tForm.tournament_name || !tForm.tournament_date) return;
    setSavingT(true);
    const { error } = await supabase.from('tournament_results').insert({
      user_id: user.id,
      tournament_name: tForm.tournament_name,
      tournament_date: tForm.tournament_date,
      location: tForm.location || null,
      division: tForm.division || null,
      result: tForm.result,
      opponent: tForm.opponent || null,
      notes: tForm.notes || null,
    });
    setSavingT(false);
    if (error) {
      setToast({ message: 'Error saving: ' + error.message, type: 'error' });
    } else {
      setToast({ message: 'Tournament result saved!', type: 'success' });
      setShowTournamentForm(false);
      setTForm({ tournament_name: '', tournament_date: '', location: '', division: '', result: 'gold', opponent: '', notes: '' });
      loadData(user.id);
    }
  }

  async function deleteTournament(id: number) {
    if (!user || !supabase) return;
    await supabase.from('tournament_results').delete().eq('id', id).eq('user_id', user.id);
    setTournaments(prev => prev.filter(t => t.id !== id));
  }

  const currentBelt = milestones.length > 0 ? milestones[milestones.length - 1] : null;

  if (!authChecked) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!user) {
    return (
      <>
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
        <main className="max-w-2xl mx-auto p-8 text-center">
          <div className="text-5xl mb-4">🥋</div>
          <h1 className="text-2xl font-bold mb-2">Your Milestones</h1>
          <p className="text-gray-500 mb-6">Sign in to track your belt promotions and tournament results.</p>
          <button onClick={() => setAuthModalOpen(true)} className="btn-primary">Sign In</button>
        </main>
      </>
    );
  }

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <main 
        className="max-w-3xl mx-auto p-6 md:p-8 space-y-10"
        style={{
          backgroundImage: 'url(/gustavo-machado.jpg)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center bottom',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      >

        {/* Belt Journey */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold">Belt Journey</h2>
              <p className="text-sm text-gray-500">Track every promotion and stripe</p>
            </div>
            <button onClick={() => setShowBeltForm(v => !v)} className="btn-primary text-sm">
              {showBeltForm ? 'Cancel' : '+ Add Promotion'}
            </button>
          </div>

          {/* Current belt hero */}
          {currentBelt && (
            <div className="bg-white/85 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6 mb-6 flex items-center gap-6">
              <div className="flex-1">
                <BeltVisual belt={currentBelt.belt} stripes={currentBelt.stripes} size="lg" />
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Current rank</p>
                <p className="font-bold text-lg capitalize">{currentBelt.belt} Belt{currentBelt.stripes > 0 ? `, ${currentBelt.stripes} stripe${currentBelt.stripes > 1 ? 's' : ''}` : ''}</p>
                {currentBelt.promoted_by && <p className="text-sm text-gray-500">Promoted by {currentBelt.promoted_by}</p>}
                <p className="text-sm text-gray-400">{formatDate(currentBelt.promoted_at)}</p>
              </div>
            </div>
          )}

          {/* Add belt form */}
          {showBeltForm && (
            <div className="bg-white/85 backdrop-blur-sm rounded-xl border border-blue-200 shadow-sm p-6 mb-6 space-y-4">
              <h3 className="font-semibold">Add Belt Promotion</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Belt</label>
                  <div className="space-y-2">
                    {BELTS.map(b => (
                      <button
                        key={b}
                        onClick={() => setBeltForm(f => ({ ...f, belt: b }))}
                        className={`w-full transition ${beltForm.belt === b ? 'ring-2 ring-blue-500 ring-offset-1' : 'opacity-70 hover:opacity-100'}`}
                      >
                        <BeltVisual belt={b} stripes={beltForm.belt === b ? beltForm.stripes : 0} size="sm" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Stripes (0–4)</label>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4].map(n => (
                        <button
                          key={n}
                          onClick={() => setBeltForm(f => ({ ...f, stripes: n }))}
                          className={`w-9 h-9 rounded-lg text-sm font-bold border transition ${beltForm.stripes === n ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Date *</label>
                    <input type="date" value={beltForm.promoted_at} onChange={e => setBeltForm(f => ({ ...f, promoted_at: e.target.value }))} className="w-full p-2 border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Promoted By</label>
                    <input type="text" placeholder="Instructor name" value={beltForm.promoted_by} onChange={e => setBeltForm(f => ({ ...f, promoted_by: e.target.value }))} className="w-full p-2 border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Notes</label>
                    <textarea placeholder="Any notes..." value={beltForm.notes} onChange={e => setBeltForm(f => ({ ...f, notes: e.target.value }))} className="w-full p-2 border rounded-lg text-sm h-20 resize-none" />
                  </div>
                  <button onClick={saveBeltMilestone} disabled={savingBelt || !beltForm.promoted_at} className="btn-primary w-full disabled:opacity-50">
                    {savingBelt ? 'Saving...' : 'Save Promotion'}
                  </button>
                </div>
              </div>
              {/* Live preview */}
              <div>
                <p className="text-xs text-gray-400 mb-1">Preview</p>
                <BeltVisual belt={beltForm.belt} stripes={beltForm.stripes} size="md" />
              </div>
            </div>
          )}

          {/* Timeline */}
          {loadingData ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : milestones.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <div className="text-4xl mb-2">🥋</div>
              <p>No promotions recorded yet. Add your first one!</p>
            </div>
          ) : (
            <div className="relative space-y-3">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200" />
              {[...milestones].reverse().map(m => (
                <div key={m.id} className="relative flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 bg-white border-2 border-gray-200 shadow-sm">
                    <span className="text-lg">🥋</span>
                  </div>
                  <div className="flex-1 bg-white/85 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-4">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <BeltVisual belt={m.belt} stripes={m.stripes} size="sm" />
                      <button onClick={() => deleteMilestone(m.id)} className="text-gray-300 hover:text-red-500 transition text-sm shrink-0">✕</button>
                    </div>
                    <p className="text-sm font-medium capitalize">{m.belt} belt{m.stripes > 0 ? `, ${m.stripes} stripe${m.stripes > 1 ? 's' : ''}` : ''}</p>
                    <p className="text-xs text-gray-400">{formatDate(m.promoted_at)}{m.promoted_by ? ` · ${m.promoted_by}` : ''}</p>
                    {m.notes && <p className="text-xs text-gray-500 mt-1 italic">{m.notes}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Tournament Results */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold">Tournament Results</h2>
              <p className="text-sm text-gray-500">Your competition record</p>
            </div>
            <button onClick={() => setShowTournamentForm(v => !v)} className="btn-primary text-sm">
              {showTournamentForm ? 'Cancel' : '+ Add Result'}
            </button>
          </div>

          {/* Tournament summary badges */}
          {tournaments.length > 0 && (
            <div className="flex gap-3 mb-5 flex-wrap">
              {(['gold', 'silver', 'bronze', 'no_placement'] as TournamentResult[]).map(r => {
                const count = tournaments.filter(t => t.result === r).length;
                if (count === 0) return null;
                const s = resultStyle[r];
                return (
                  <div key={r} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${s.bg} ${s.text}`}>
                    <span>{s.icon}</span>
                    <span>{count} {s.label}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tournament form */}
          {showTournamentForm && (
            <div className="bg-white/85 backdrop-blur-sm rounded-xl border border-blue-200 shadow-sm p-6 mb-6 space-y-4">
              <h3 className="font-semibold">Add Tournament Result</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Tournament Name *</label>
                  <input type="text" placeholder="e.g. IBJJF Pan American" value={tForm.tournament_name} onChange={e => setTForm(f => ({ ...f, tournament_name: e.target.value }))} className="w-full p-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Date *</label>
                  <input type="date" value={tForm.tournament_date} onChange={e => setTForm(f => ({ ...f, tournament_date: e.target.value }))} className="w-full p-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
                  <input type="text" placeholder="City, State" value={tForm.location} onChange={e => setTForm(f => ({ ...f, location: e.target.value }))} className="w-full p-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Division</label>
                  <input type="text" placeholder="e.g. Adult Blue Belt Feather" value={tForm.division} onChange={e => setTForm(f => ({ ...f, division: e.target.value }))} className="w-full p-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Result</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['gold', 'silver', 'bronze', 'no_placement'] as TournamentResult[]).map(r => {
                      const s = resultStyle[r];
                      return (
                        <button
                          key={r}
                          onClick={() => setTForm(f => ({ ...f, result: r }))}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition ${tForm.result === r ? `${s.bg} ${s.text} border-transparent` : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                        >
                          {s.icon} {s.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Opponent (optional)</label>
                  <input type="text" placeholder="Name" value={tForm.opponent} onChange={e => setTForm(f => ({ ...f, opponent: e.target.value }))} className="w-full p-2 border rounded-lg text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Notes</label>
                <textarea placeholder="How did it go?" value={tForm.notes} onChange={e => setTForm(f => ({ ...f, notes: e.target.value }))} className="w-full p-2 border rounded-lg text-sm h-20 resize-none" />
              </div>
              <button onClick={saveTournament} disabled={savingT || !tForm.tournament_name || !tForm.tournament_date} className="btn-primary disabled:opacity-50">
                {savingT ? 'Saving...' : 'Save Result'}
              </button>
            </div>
          )}

          {/* Tournament list */}
          {!loadingData && tournaments.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <div className="text-4xl mb-2">🏆</div>
              <p>No tournament results yet. Start competing!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tournaments.map(t => {
                const s = resultStyle[t.result];
                return (
                  <div key={t.id} className="bg-white/85 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-4 flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${s.bg}`}>
                      {s.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold truncate">{t.tournament_name}</p>
                          <p className="text-sm text-gray-500">{formatDate(t.tournament_date)}{t.location ? ` · ${t.location}` : ''}</p>
                        </div>
                        <button onClick={() => deleteTournament(t.id)} className="text-gray-300 hover:text-red-500 transition text-sm shrink-0">✕</button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1.5">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>{s.label}</span>
                        {t.division && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t.division}</span>}
                        {t.opponent && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">vs {t.opponent}</span>}
                      </div>
                      {t.notes && <p className="text-xs text-gray-500 mt-1 italic">{t.notes}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
