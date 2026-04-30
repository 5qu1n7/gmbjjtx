'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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

function VideoModal({ 
  tech, 
  isOpen, 
  onClose 
}: { 
  tech: Technique | null; 
  isOpen: boolean; 
  onClose: () => void;
}) {
  if (!isOpen || !tech) return null;
  
  const videoId = getYouTubeVideoId(tech.videoUrl);
  if (!videoId) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-900 rounded-lg max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-white font-semibold text-lg">{tech.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">✕</button>
        </div>
        <div className="aspect-video bg-black flex-1">
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
    </div>
  );
}

function TechniqueItem({ 
  tech, 
  drilled, 
  onToggleCompletion,
  onWatchClick
}: { 
  tech: Technique; 
  drilled: boolean; 
  onToggleCompletion: (id: number) => void;
  onWatchClick: (tech: Technique) => void;
}) {
  const videoId = getYouTubeVideoId(tech.videoUrl);

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/15 transition">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">{tech.name}</h3>
          <p className="text-gray-200">{tech.description}</p>
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

      <div className="flex gap-3 flex-wrap">
        {videoId && (
          <button
            onClick={() => onWatchClick(tech)}
            className="text-sm px-4 py-2 rounded-full font-medium bg-red-600 text-white hover:bg-red-700 transition"
          >
            ▶ Watch Video
          </button>
        )}
        <button
          onClick={() => onToggleCompletion(tech.id)}
          className={`text-sm px-4 py-2 rounded-full font-semibold transition ${
            drilled
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-400 text-white hover:bg-gray-500'
          }`}
        >
          {drilled ? '✓ Drilled' : 'Mark drilled'}
        </button>
      </div>
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
  const [selectedTechForVideo, setSelectedTechForVideo] = useState<Technique | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

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
  let displaySubtitle = '';

  if (viewMode === 'positions' && weekPosition) {
    displayTechniques = getTechniquesForWeek(weekPosition, currentWeek, beltFilter);
    displayTitle = weekPosition.name;
    displaySubtitle = `${weekPosition.category.replace(/_/g, ' ')} • ${weekPosition.trainingType.toUpperCase()}`;
  } else if (viewMode === 'categories' && weekCategory) {
    displayTechniques = getTechniquesForCategoryWeek(weekCategory, currentWeek, beltFilter);
    displayTitle = weekCategory.name;
    displaySubtitle = weekCategory.description;
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
      <VideoModal 
        tech={selectedTechForVideo} 
        isOpen={videoModalOpen} 
        onClose={() => setVideoModalOpen(false)}
      />

      <div 
        className="min-h-screen bg-fixed bg-cover bg-center flex flex-col items-center justify-center p-4"
        style={{
          backgroundImage: 'url(/gustavo-machado.jpg)',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/30 pointer-events-none" />

        {/* Main Content */}
        <div className="relative z-10 max-w-2xl w-full">
          {/* Controls Panel */}
          <div className="bg-white/95 backdrop-blur-md rounded-lg p-6 mb-8 border border-white/20 shadow-lg">
            {/* Week Navigation */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <button
                onClick={prevWeek}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
              >
                ← Prev Week
              </button>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">Week {currentWeek}</div>
                <div className="text-sm text-gray-500 mt-1">{getWeekDateRange(currentWeek)}</div>
              </div>
              <button
                onClick={nextWeek}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
              >
                Next Week →
              </button>
            </div>

            {/* Mode & Filters */}
            <div className="border-t border-gray-200 pt-4 space-y-4">
              {/* Title */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{displayTitle}</h2>
                <p className="text-gray-600 text-sm mt-1">{displaySubtitle}</p>
              </div>

              {/* Controls Row */}
              <div className="flex flex-wrap gap-3 items-center">
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

                <select
                  value={trainingFilter}
                  onChange={(e) => setTrainingFilter(e.target.value as TrainingType | 'all')}
                  className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="gi">Gi</option>
                  <option value="no-gi">No-Gi</option>
                  <option value="both">Both</option>
                </select>

                <select
                  value={beltFilter}
                  onChange={(e) => setBeltFilter(e.target.value as BeltFilter)}
                  className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm"
                >
                  <option value="all">All Belts</option>
                  <option value="white">White+</option>
                  <option value="blue">Blue+</option>
                  <option value="purple">Purple+</option>
                  <option value="brown">Brown+</option>
                  <option value="black">Black+</option>
                </select>

                {authChecked && user && completedCount > 0 && (
                  <div className="text-xs text-gray-600 ml-auto">
                    {completedCount}/{ALL_TECHNIQUES.length} techniques drilled
                  </div>
                )}

                {authChecked && !user && (
                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition ml-auto"
                  >
                    Sign in
                  </button>
                )}

                <Link
                  href="/explore"
                  className="px-4 py-2 rounded-lg bg-gray-600 text-white text-sm font-medium hover:bg-gray-700 transition"
                >
                  Explore All
                </Link>
              </div>
            </div>
          </div>

          {/* Techniques Display */}
          <div className="space-y-4">
            {filteredTechniques.length > 0 ? (
              filteredTechniques.map((tech) => {
                const drilled = completedIds.has(tech.id);
                return (
                  <TechniqueItem
                    key={tech.id}
                    tech={tech}
                    drilled={drilled}
                    onToggleCompletion={toggleCompletion}
                    onWatchClick={(t) => {
                      setSelectedTechForVideo(t);
                      setVideoModalOpen(true);
                    }}
                  />
                );
              })
            ) : (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 text-center">
                <p className="text-gray-100 text-lg">No techniques match your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
