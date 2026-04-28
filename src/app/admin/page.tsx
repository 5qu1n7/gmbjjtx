'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { curriculumPositions, type Position, type Technique } from '@/lib/curriculum-data';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedPosition, setSelectedPosition] = useState<Position>(curriculumPositions[0]);
  const [calendarNotes, setCalendarNotes] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    if (!supabase) { setLoading(false); return; }
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    
    if (user) {
      const { data } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();
      
      setIsAdmin(data?.role === 'admin' || data?.role === 'coach');
    }
    setLoading(false);
  }

  function handlePositionChange(positionId: number) {
    const pos = curriculumPositions.find(p => p.id === positionId);
    if (pos) setSelectedPosition(pos);
  }

  async function handleSaveWeek() {
    if (!user || !isAdmin || !supabase) return;
    
    const techniqueIds = selectedPosition.techniques.map(t => t.id);
    
    const { error } = await supabase
      .from('calendar_events')
      .upsert({
        week_number: selectedWeek,
        position_id: selectedPosition.id,
        technique_ids: techniqueIds,
        notes: calendarNotes,
      });

    if (error) alert('Error saving: ' + error.message);
    else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!user || !isAdmin) {
    return (
      <main className="min-h-screen p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin - Calendar Management</h1>
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-red-600">Access denied. Admin/Coach privileges required.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin - Calendar Management</h1>
      
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Week Number (1-52)</label>
          <input
            type="number"
            min={1}
            max={52}
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(Math.min(52, Math.max(1, Number(e.target.value))))}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Position for Week {selectedWeek}</label>
          <select
            value={selectedPosition.id}
            onChange={(e) => handlePositionChange(Number(e.target.value))}
            className="w-full p-2 border rounded-lg"
          >
            {curriculumPositions.map((pos) => (
              <option key={pos.id} value={pos.id}>
                {pos.name} ({pos.beltRequired}+)
              </option>
            ))}
          </select>
        </div>

        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="font-semibold mb-2">{selectedPosition.name}</h3>
          <p className="text-sm text-gray-600 mb-2">Category: {selectedPosition.category}</p>
          <div className="space-y-1">
            {selectedPosition.techniques.map((tech) => (
              <div key={tech.id} className="text-sm flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-xs ${
                  tech.type === 'attack' ? 'bg-red-100' : 
                  tech.type === 'escape' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  {tech.type}
                </span>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Week Notes (Optional)</label>
          <textarea
            className="w-full p-3 border rounded-lg h-24"
            placeholder="Add any notes for this week's training..."
            value={calendarNotes}
            onChange={(e) => setCalendarNotes(e.target.value)}
          />
        </div>

        <button onClick={handleSaveWeek} className="btn-primary w-full py-3">
          Save Week {selectedWeek} Schedule
        </button>

        {saved && (
          <div className="bg-green-50 p-4 rounded-lg text-green-800">
            ✓ Week {selectedWeek} saved successfully!
          </div>
        )}
      </div>
    </main>
  );
}
