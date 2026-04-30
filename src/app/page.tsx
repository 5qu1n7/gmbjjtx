'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  getCurrentWeek, getPositionForWeek, getWeekDateRange, getTechniquesForWeek, curriculumPositions,
  curriculumCategories, getTechniquesForCategoryWeek, generate52WeekCategorySchedule
} from '@/lib/curriculum-data';
import type { Position, TrainingType, Category, Technique } from '@/lib/curriculum-data';
import AuthModal from '@/components/AuthModal';

type BeltFilter = 'white' | 'blue' | 'purple' | 'brown' | 'black' | 'all';
type ViewMode = 'positions' | 'categories';

function beltBadgeClass(belt: string): string {
  if (belt === 'white')  return 'bg-white text-gray-800 border border-gray-300';
  if (belt === 'blue')   return 'bg-blue-600 text-white border border-blue-600';
  if (belt === 'purple') return 'bg-purple-600 text-white border border-purple-600';
  if (belt === 'brown')  return 'bg-amber-800 text-white border border-amber-800';
  if (belt === 'black')  return 'bg-gray-900 text-white border border-gray-900';
  return 'bg-gray-100 text-gray-700';
}

function getYouTubeVideoId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\&\?\/\r\n]+)/);
  return match ? match[1] : null;
}

const ALL_TECHNIQUES = curriculumPositions.flatMap(p => p.techniques);

function TechniqueItem({ 
  tech, 
  drilled, 
  onToggleCompletion 
}: { 
  tech: Technique; 
  drilled: boolean; 
  onToggleCompletion: (id: number) => void;
}) {
  const videoId = getYouTubeVideoId(tech.videoUrl);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="py-6 border-b border-gray-300/50">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-white">{tech.name}</h4>
          <p className="text-sm text-gray-200 mt-1">{tech.description}</p>
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          <span className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ${
            tech.type === 'attack'     ? 'bg-red-100 text-red-800' :
            tech.type === 'escape'     ? 'bg-green-100 text-green-800' :
            tech.type === 'transition' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {tech.type}
          </span>
          <span className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ${beltBadgeClass(tech.beltRequired)}`}>
            {tech.beltRequired}+
          </span>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap mb-4">
        {videoId && (
          <button
            onClick={() => setShowVideo(!showVideo)}
            className="text-xs px-3 py-1.5 rounded-full font-medium bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-1"
          >
            {showVideo ? '✕ Hide Video' : '▶ Watch'}
          </button>
        )}
        <button
          onClick={() => onToggleCompletion(tech.id)}
          className={`text-xs px-3 py-1.5 rounded-full font-semibold transition ${
            drilled
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {drilled ? '✓ Drilled' : 'Mark drilled'}
        </button>
      </div>

      {showVideo && videoId && (
        <div className="mb-4 bg-black/5 rounded-lg overflow-hidden">
          <div className="aspect-video bg-gray-900">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={tech.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
  const [viewMode, setViewMode] = useState<ViewMode>('positions');
  const [user, setUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [trainingFilter, setTrainingFilter] = useState<TrainingType | 'all'>('all');
  const [beltFilter, setBeltFilter] = useState<BeltFilter>('all');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    if (!supabase) { setAuthChecked(true); loadFromLocalStorage(); return; }
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    setAuthChecked(true);
    if (user) {
      await loadAndMigrateCompletions(user.id);
    } else {
      loadFromLocalStorage();
    }
  }

  function loadFromLocalStorage() {
    try {
      const raw = localStorage.getItem('bjj_completions');
      if (raw) setCompletedIds(new Set(JSON.parse(raw)));
    } catch {}
  }

  async function loadAndMigrateCompletions(userId: string) {
    if (!supabase) return;
    try {
      const raw = localStorage.getItem('bjj_completions');
      if (raw) {
        const localIds: number[] = JSON.parse(raw);
        if (localIds.length > 0) {
          await supabase.from('technique_completions').upsert(
            localIds.map(id => ({ user_id: userId, technique_id: id }))
          );
        }
        localStorage.removeItem('bjj_completions');
      }
    } catch {}

    const { data } = await supabase
      .from('technique_completions')
      .select('technique_id')
      .eq('user_id', userId);

    if (data) setCompletedIds(new Set(data.map((r: { technique_id: number }) => r.technique_id)));
  }

  async function toggleCompletion(techId: number) {
    const wasDrilled = completedIds.has(techId);

    setCompletedIds(prev => {
      const next = new Set(prev);
      if (next.has(techId)) next.delete(techId); else next.add(techId);
      return next;
    });

    if (user && supabase) {
      if (wasDrilled) {
        await supabase.from('technique_completions')
          .delete()
          .eq('user_id', user.id)
          .eq('technique_id', techId);
      } else {
        await supabase.from('technique_completions')
          .upsert({ user_id: user.id, technique_id: techId });
      }
    } else {
      setCompletedIds(prev => {
        try { localStorage.setItem('bjj_completions', JSON.stringify([...prev])); } catch {}
        return prev;
      });
    }
  }

  function nextWeek() { setCurrentWeek(w => (w % 52) + 1); }
  function prevWeek() { setCurrentWeek(w => w === 1 ? 52 : w - 1); }

  // Get active position or category for current week
  const weekPosition = getPositionForWeek(currentWeek, beltFilter);
  const categorySchedule = generate52WeekCategorySchedule(beltFilter);
  const weekCategoryId = categorySchedule[currentWeek];
  const weekCategory = curriculumCategories.find(c => c.id === weekCategoryId);

  // Get weekly techniques
  let displayTechniques: Technique[] = [];
  let displayTitle = '';
  let displayDescription = '';

  if (viewMode === 'positions' && weekPosition) {
    displayTechniques = getTechniquesForWeek(weekPosition, currentWeek, beltFilter);
    displayTitle = weekPosition.name;
    displayDescription = `Position: ${weekPosition.category.replace(/_/g, ' ')} • Belt: ${weekPosition.beltRequired}+ • Type: ${weekPosition.trainingType.toUpperCase()}`;
  } else if (viewMode === 'categories' && weekCategory) {
    displayTechniques = getTechniquesForCategoryWeek(weekCategory, currentWeek, beltFilter);
    displayTitle = weekCategory.name;
    displayDescription = weekCategory.description;
  }

  // Apply filters
  const filteredTechniques = displayTechniques.filter(tech =>
    (trainingFilter === 'all' || tech.trainingType === trainingFilter || tech.trainingType === 'both') &&
    (beltFilter === 'all' || tech.beltRequired === beltFilter)
  );

  const completedCount = [...completedIds].filter(id => ALL_TECHNIQUES.some(t => t.id === id)).length;

  return (
    <>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      <div 
        className="min-h-screen bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: 'url(/gustavo-machado.jpg)',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay to darken/blend watermark */}
        <div className="fixed inset-0 bg-black/40 pointer-events-none" />

        <main className="relative z-10 max-w-4xl mx-auto px-6 py-8 md:py-12">
        {/* Controls - Fixed/Sticky */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-md z-50 -mx-6 px-6 py-4 mb-8 border-b border-gray-300 shadow-lg">
          <div className="flex flex-col gap-3">
            {/* Week navigation */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={prevWeek}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
              >
                ← Prev
              </button>
              <div className="text-center flex-1">
                <div className="text-2xl font-bold">Week {currentWeek} <span className="text-lg text-gray-500 font-normal">/ 52</span></div>
                <div className="text-sm text-gray-500 mt-1">{getWeekDateRange(currentWeek)}</div>
              </div>
              <button
                onClick={nextWeek}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
              >
                Next →
              </button>
            </div>

            {/* View mode & filters */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('positions')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    viewMode === 'positions'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Positions
                </button>
                <button
                  onClick={() => setViewMode('categories')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    viewMode === 'categories'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Categories
                </button>
              </div>

              <select
                value={trainingFilter}
                onChange={(e) => setTrainingFilter(e.target.value as TrainingType | 'all')}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium"
              >
                <option value="all">All Training Types</option>
                <option value="gi">Gi</option>
                <option value="no-gi">No-Gi</option>
                <option value="both">Both</option>
              </select>

              <select
                value={beltFilter}
                onChange={(e) => setBeltFilter(e.target.value as BeltFilter)}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium"
              >
                <option value="all">All Belts</option>
                <option value="white">White+</option>
                <option value="blue">Blue+</option>
                <option value="purple">Purple+</option>
                <option value="brown">Brown+</option>
                <option value="black">Black+</option>
              </select>
            </div>

            {/* Stats */}
            {authChecked && user && completedCount > 0 && (
              <div className="text-xs text-gray-600">
                {completedCount} of {ALL_TECHNIQUES.length} techniques drilled
              </div>
            )}
          </div>
        </div>

        {/* Main content - continuous scroll */}
        <div className="mb-12">
          {/* Header */}
          <div className="mb-8 bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h2 className="text-4xl font-bold text-white mb-2">{displayTitle}</h2>
            <p className="text-lg text-gray-100">{displayDescription}</p>
            <p className="text-sm text-gray-300 mt-3">
              Showing {filteredTechniques.length} technique{filteredTechniques.length !== 1 ? 's' : ''} for week {currentWeek}
            </p>
          </div>

          {/* Techniques - continuous list with embedded videos */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
            {filteredTechniques.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredTechniques.map((tech) => {
                  const drilled = completedIds.has(tech.id);
                  return (
                    <TechniqueItem
                      key={tech.id}
                      tech={tech}
                      drilled={drilled}
                      onToggleCompletion={toggleCompletion}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-300">
                <p>No techniques match your current filters.</p>
              </div>
            )}
          </div>

          {/* Navigation helper at bottom */}
          <div className="mt-8 p-4 bg-blue-900/50 backdrop-blur-sm rounded-lg border border-blue-500/30">
            <p className="text-sm text-blue-100">
              💡 <strong>Tip:</strong> Click "Watch" buttons to see technique videos embedded on this page. Use the sticky controls at the top to navigate weeks or change your filters.
            </p>
          </div>
        </div>
      </main>
    </div>
    </>
  );
}
