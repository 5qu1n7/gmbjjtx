'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { getCurrentWeek, getPositionForWeek, curriculumPositions } from '@/lib/curriculum-data';
import type { Position } from '@/lib/curriculum-data';

export default function Home() {
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
  const [position, setPosition] = useState<Position | undefined>();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    loadWeekData(currentWeek);
  }, [currentWeek]);

  async function checkUser() {
    if (!supabase) { setLoading(false); return; }
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    setLoading(false);
  }

  function loadWeekData(week: number) {
    const pos = getPositionForWeek(week);
    setPosition(pos);
  }

  async function handleSignIn() {
    if (!supabase) { alert('Supabase not configured'); return; }
    const email = prompt('Enter your email:');
    if (!email) return;
    
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    
    if (error) alert(error.message);
    else alert('Check your email for the login link!');
  }

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  }

  function nextWeek() {
    setCurrentWeek((prev) => (prev % 52) + 1);
  }

  function prevWeek() {
    setCurrentWeek((prev) => (prev === 1 ? 52 : prev - 1));
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">BJJ Curriculum - Gustavo Machado</h1>
        <div>
          {user ? (
            <button onClick={handleSignOut} className="btn-secondary">Sign Out</button>
          ) : (
            <button onClick={handleSignIn} className="btn-primary">Sign In</button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-lg shadow">
        <button onClick={prevWeek} className="btn-secondary">← Previous Week</button>
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Week {currentWeek}</h2>
          <p className="text-gray-600">of 52 (Rotating Curriculum)</p>
        </div>
        <button onClick={nextWeek} className="btn-secondary">Next Week →</button>
      </div>

      {position && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {position.category.replace('_', ' ').toUpperCase()}
            </span>
            <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full ml-2">
              {position.beltRequired.toUpperCase()}+
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-4">{position.name}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {position.techniques.map((tech) => (
              <div key={tech.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-lg">{tech.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${
                    tech.type === 'attack' ? 'bg-red-100 text-red-800' :
                    tech.type === 'escape' ? 'bg-green-100 text-green-800' :
                    tech.type === 'transition' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {tech.type}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{tech.description}</p>
                <span className="text-xs text-gray-500">Required: {tech.beltRequired}+</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Full Curriculum Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {curriculumPositions.map((pos) => (
            <div
              key={pos.id}
              onClick={() => setCurrentWeek(((pos.id - 1) % 52) + 1)}
              className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{pos.name}</h4>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{pos.techniques.length} techniques</span>
              </div>
              <p className="text-sm text-gray-600">{pos.category.replace('_', ' ')}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

