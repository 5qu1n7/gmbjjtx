'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { getCurrentWeek, getPositionForWeek, curriculumPositions } from '@/lib/curriculum-data';
import type { Position, TrainingType } from '@/lib/curriculum-data';
import AuthModal from '@/components/AuthModal';

type BeltFilter = 'white' | 'blue' | 'purple' | 'brown' | 'black' | 'all';

function beltFilterClass(belt: BeltFilter, active: boolean): string {
  if (belt === 'all')    return active ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200';
  if (belt === 'white')  return active ? 'bg-white text-gray-900 border-gray-900' : 'bg-gray-50 text-gray-600 border-gray-300 hover:bg-gray-100';
  if (belt === 'blue')   return active ? 'bg-blue-600 text-white border-blue-600' : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100';
  if (belt === 'purple') return active ? 'bg-purple-600 text-white border-purple-600' : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100';
  if (belt === 'brown')  return active ? 'bg-amber-800 text-white border-amber-800' : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100';
  /* black */            return active ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200';
}

function beltBadgeClass(belt: string): string {
  if (belt === 'white')  return 'bg-white text-gray-800 border border-gray-300';
  if (belt === 'blue')   return 'bg-blue-600 text-white border border-blue-600';
  if (belt === 'purple') return 'bg-purple-600 text-white border border-purple-600';
  if (belt === 'brown')  return 'bg-amber-800 text-white border border-amber-800';
  if (belt === 'black')  return 'bg-gray-900 text-white border border-gray-900';
  return 'bg-gray-100 text-gray-700';
}

const ALL_TECHNIQUES = curriculumPositions.flatMap(p => p.techniques);

export default function Home() {
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
  const [position, setPosition] = useState<Position | undefined>();
  const [user, setUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [trainingFilter, setTrainingFilter] = useState<TrainingType | 'all'>('all');
  const [beltFilter, setBeltFilter] = useState<BeltFilter>('all');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    checkUser();
    loadCompletions();
  }, []);

  useEffect(() => {
    setPosition(getPositionForWeek(currentWeek, beltFilter));
  }, [currentWeek, beltFilter]);

  async function checkUser() {
    if (!supabase) { setAuthChecked(true); return; }
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    setAuthChecked(true);
  }

  function loadCompletions() {
    try {
      const raw = localStorage.getItem('bjj_completions');
      if (raw) setCompletedIds(new Set(JSON.parse(raw)));
    } catch {}
  }

  function toggleCompletion(techId: number) {
    setCompletedIds(prev => {
      const next = new Set(prev);
      if (next.has(techId)) next.delete(techId); else next.add(techId);
      try { localStorage.setItem('bjj_completions', JSON.stringify([...next])); } catch {}
      return next;
    });
  }

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  }

  function nextWeek() { setCurrentWeek(w => (w % 52) + 1); }
  function prevWeek() { setCurrentWeek(w => w === 1 ? 52 : w - 1); }

  const filteredPositions = curriculumPositions.filter(pos =>
    (trainingFilter === 'all' || pos.trainingType === trainingFilter || pos.trainingType === 'both') &&
    (beltFilter === 'all' || pos.beltRequired === beltFilter)
  );

  const displayTechniques = position?.techniques.filter(tech =>
    (trainingFilter === 'all' || tech.trainingType === trainingFilter || tech.trainingType === 'both') &&
    (beltFilter === 'all' || tech.beltRequired === beltFilter)
  ) ?? position?.techniques ?? [];

  const completedCount = [...completedIds].filter(id => ALL_TECHNIQUES.some(t => t.id === id)).length;

  return (
    <>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* Hero — only for logged-out visitors once auth is resolved */}
      {authChecked && !user && (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-8 py-14">
          <div className="max-w-6xl mx-auto">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Gustavo Machado BJJ</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              A structured curriculum<br />for every training session
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-xl">
              52 weeks of positions, submissions, escapes, and transitions — organized by belt level
              for both gi and no-gi training.
            </p>
            <button
              onClick={() => setAuthModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-400 text-white px-7 py-3 rounded-lg font-semibold transition"
            >
              Sign in to track progress →
            </button>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto p-6 md:p-8">

        {/* Header row */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {authChecked && user ? 'BJJ Curriculum' : 'Browse Curriculum'}
            </h2>
            {authChecked && user && completedCount > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                {completedCount} of {ALL_TECHNIQUES.length} techniques drilled
              </p>
            )}
          </div>
          {authChecked && (
            user ? (
              <button onClick={handleSignOut} className="btn-secondary text-sm">Sign Out</button>
            ) : (
              <button onClick={() => setAuthModalOpen(true)} className="btn-primary text-sm">Sign In</button>
            )
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3 mb-8">
          {/* Week navigator */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <button onClick={prevWeek} className="btn-secondary text-sm">← Prev</button>
            <div className="text-center">
              <span className="text-2xl font-bold">Week {currentWeek}</span>
              <span className="text-gray-400 text-sm ml-2">/ 52</span>
            </div>
            <button onClick={nextWeek} className="btn-secondary text-sm">Next →</button>
          </div>

          {/* Training type filter */}
          <div className="flex items-center flex-wrap gap-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mr-1">Training:</span>
            {(['all', 'gi', 'no-gi', 'both'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTrainingFilter(t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  trainingFilter === t
                    ? t === 'all'    ? 'bg-gray-900 text-white'
                    : t === 'gi'    ? 'bg-blue-600 text-white'
                    : t === 'no-gi' ? 'bg-purple-600 text-white'
                    :                 'bg-green-600 text-white'
                    : t === 'all'    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : t === 'gi'    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    : t === 'no-gi' ? 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                    :                 'bg-green-50 text-green-700 hover:bg-green-100'
                }`}
              >
                {t === 'all' ? 'All' : t === 'gi' ? 'Gi' : t === 'no-gi' ? 'No-Gi' : 'Both'}
              </button>
            ))}
          </div>

          {/* Belt filter */}
          <div className="flex items-center flex-wrap gap-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mr-1">Belt:</span>
            {(['all', 'white', 'blue', 'purple', 'brown', 'black'] as const).map(belt => (
              <button
                key={belt}
                onClick={() => setBeltFilter(belt)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${beltFilterClass(belt, beltFilter === belt)}`}
              >
                {belt === 'all' ? 'All' : belt.charAt(0).toUpperCase() + belt.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Current week position */}
        {position && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                {position.category.replace(/_/g, ' ')}
              </span>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${beltBadgeClass(position.beltRequired)}`}>
                {position.beltRequired}+
              </span>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                position.trainingType === 'gi'    ? 'bg-blue-100 text-blue-800' :
                position.trainingType === 'no-gi' ? 'bg-purple-100 text-purple-800' :
                'bg-green-100 text-green-800'
              }`}>
                {position.trainingType.toUpperCase()}
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-5">{position.name}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayTechniques.map(tech => {
                const drilled = completedIds.has(tech.id);
                return (
                  <div
                    key={tech.id}
                    className={`rounded-xl p-4 border transition ${
                      drilled ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold pr-2 leading-snug">{tech.name}</h4>
                      <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                        tech.type === 'attack'     ? 'bg-red-100 text-red-800' :
                        tech.type === 'escape'     ? 'bg-green-100 text-green-800' :
                        tech.type === 'transition' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {tech.type}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">{tech.description}</p>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${beltBadgeClass(tech.beltRequired)}`}>
                          {tech.beltRequired}+
                        </span>
                        {tech.videoUrl && (
                          <a
                            href={tech.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-1"
                            onClick={e => e.stopPropagation()}
                          >
                            ▶ Video
                          </a>
                        )}
                      </div>
                      <button
                        onClick={() => toggleCompletion(tech.id)}
                        className={`text-xs px-3 py-1 rounded-full font-semibold transition shrink-0 ${
                          drilled
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {drilled ? '✓ Drilled' : 'Mark drilled'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Full curriculum overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold mb-4">Full Curriculum Overview</h3>
          <p className="text-sm text-gray-500 mb-4">Click a position to jump to its week.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredPositions.map(pos => (
              <button
                key={pos.id}
                onClick={() => setCurrentWeek(((pos.id - 1) % 52) + 1)}
                className="text-left border border-gray-200 rounded-xl p-4 hover:border-blue-400 hover:bg-blue-50 transition"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">{pos.name}</span>
                  <div className="flex gap-1.5 shrink-0 ml-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                      {pos.techniques.length} techniques
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      pos.trainingType === 'gi'    ? 'bg-blue-100 text-blue-800' :
                      pos.trainingType === 'no-gi' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {pos.trainingType}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 capitalize">{pos.category.replace(/_/g, ' ')}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${beltBadgeClass(pos.beltRequired)}`}>
                    {pos.beltRequired}+
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
