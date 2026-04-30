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

function TechniqueCard({ 
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
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow border border-gray-200">
      {/* Thumbnail */}
      <div className="bg-gray-900 aspect-video relative group cursor-pointer overflow-hidden">
        {videoId ? (
          <>
            <img 
              src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
              alt={tech.name}
              className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
            />
            <button
              onClick={() => onWatchClick(tech)}
              className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition opacity-0 group-hover:opacity-100"
            >
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">▶</span>
              </div>
            </button>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <span className="text-gray-500 text-sm">No video</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-1">{tech.name}</h3>
        <p className="text-xs text-gray-500 mb-3">{tech.description}</p>

        {/* Metadata */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className={`text-xs px-2 py-0.5 rounded font-medium ${beltBadgeClass(tech.beltRequired)}`}>
            {tech.beltRequired}+
          </span>
          <span className={`text-xs px-2 py-0.5 rounded font-medium ${
            tech.type === 'attack'     ? 'bg-red-100 text-red-800' :
            tech.type === 'escape'     ? 'bg-green-100 text-green-800' :
            tech.type === 'transition' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {tech.type}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 text-sm">
          {videoId && (
            <button
              onClick={() => onWatchClick(tech)}
              className="flex-1 px-2 py-1.5 rounded bg-red-600 text-white font-medium hover:bg-red-700 transition"
            >
              ▶ Watch
            </button>
          )}
          <button
            onClick={() => onToggleCompletion(tech.id)}
            className={`flex-1 px-2 py-1.5 rounded font-medium transition ${
              drilled
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {drilled ? '✓' : 'Mark'}
          </button>
        </div>
      </div>
    </div>
  );
}

function PositionSection({ 
  position, 
  techniques,
  drilled,
  onToggleCompletion,
  onWatchClick
}: {
  position: Position;
  techniques: Technique[];
  drilled: Set<number>;
  onToggleCompletion: (id: number) => void;
  onWatchClick: (tech: Technique) => void;
}) {
  return (
    <div className="mb-12">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{position.name}</h3>
        <p className="text-gray-600">
          {position.category.replace(/_/g, ' ')} • {position.trainingType.toUpperCase()} • {position.beltRequired}+
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {techniques.map(tech => (
          <TechniqueCard
            key={tech.id}
            tech={tech}
            drilled={drilled.has(tech.id)}
            onToggleCompletion={onToggleCompletion}
            onWatchClick={onWatchClick}
          />
        ))}
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
  const [showFilters, setShowFilters] = useState(false);

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

  const completedCount = [...completedIds].filter(id => ALL_TECHNIQUES.some(t => t.id === id)).length;

  // Get content based on view mode
  let pageTitle = '';
  let pageSubtitle = '';
  let displayPositions: Array<{ position: Position; techniques: Technique[] }> = [];
  let displayCategories: Array<{ category: Category; techniques: Technique[] }> = [];

  if (viewMode === 'positions') {
    pageTitle = `Week ${currentWeek} Training`;
    pageSubtitle = getWeekDateRange(currentWeek);
    
    // Show all positions with their filtered techniques
    displayPositions = curriculumPositions
      .map(pos => {
        const techs = pos.techniques.filter(tech =>
          (trainingFilter === 'all' || tech.trainingType === trainingFilter || tech.trainingType === 'both') &&
          (beltFilter === 'all' || tech.beltRequired === beltFilter)
        );
        return { position: pos, techniques: techs };
      })
      .filter(item => item.techniques.length > 0);
  } else {
    pageTitle = `Week ${currentWeek} Categories`;
    pageSubtitle = getWeekDateRange(currentWeek);
    
    // Show all categories with their filtered techniques
    displayCategories = curriculumCategories
      .map(cat => {
        const techs = cat.techniques.filter(tech =>
          (trainingFilter === 'all' || tech.trainingType === trainingFilter || tech.trainingType === 'both') &&
          (beltFilter === 'all' || tech.beltRequired === beltFilter)
        );
        return { category: cat, techniques: techs };
      })
      .filter(item => item.techniques.length > 0);
  }

  return (
    <>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <VideoModal 
        tech={selectedTechForVideo} 
        isOpen={videoModalOpen} 
        onClose={() => setVideoModalOpen(false)}
      />

      {/* Fixed Header Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gustavo Machado BJJ</h1>
              <p className="text-xs text-gray-500">52-Week Curriculum</p>
            </div>
            <div className="flex items-center gap-4">
              {authChecked && user && completedCount > 0 && (
                <div className="text-sm text-gray-600 font-medium">
                  {completedCount}/{ALL_TECHNIQUES.length} drilled
                </div>
              )}
              {authChecked && !user && (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero section with watermark */}
      <div 
        className="bg-fixed bg-cover bg-center py-16 border-b border-gray-200"
        style={{
          backgroundImage: 'url(/gustavo-machado.jpg)',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0,0,0,0.4)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-white mb-2">{pageTitle}</h2>
          <p className="text-xl text-gray-100">{pageSubtitle}</p>
        </div>
      </div>

      {/* Controls bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Week navigation */}
            <div className="flex gap-2 items-center">
              <button
                onClick={() => prevWeek()}
                className="px-3 py-2 rounded bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 transition"
              >
                ← Prev
              </button>
              <div className="px-4 py-2 bg-gray-100 rounded text-gray-900 text-sm font-semibold min-w-28 text-center">
                Week {currentWeek}/52
              </div>
              <button
                onClick={() => nextWeek()}
                className="px-3 py-2 rounded bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 transition"
              >
                Next →
              </button>
            </div>

            {/* View toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('positions')}
                className={`px-4 py-2 rounded text-sm font-medium transition ${
                  viewMode === 'positions'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Positions
              </button>
              <button
                onClick={() => setViewMode('categories')}
                className={`px-4 py-2 rounded text-sm font-medium transition ${
                  viewMode === 'categories'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Categories
              </button>
            </div>

            {/* Filters toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 transition ml-auto sm:ml-0"
            >
              {showFilters ? '✕ Filters' : '⚙ Filters'}
            </button>
          </div>

          {/* Expandable filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 flex gap-4 flex-wrap">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Training Type</label>
                <select
                  value={trainingFilter}
                  onChange={(e) => setTrainingFilter(e.target.value as TrainingType | 'all')}
                  className="px-3 py-2 rounded border border-gray-300 bg-white text-gray-700 text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="gi">Gi</option>
                  <option value="no-gi">No-Gi</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Belt Level</label>
                <select
                  value={beltFilter}
                  onChange={(e) => setBeltFilter(e.target.value as BeltFilter)}
                  className="px-3 py-2 rounded border border-gray-300 bg-white text-gray-700 text-sm"
                >
                  <option value="all">All Belts</option>
                  <option value="white">White+</option>
                  <option value="blue">Blue+</option>
                  <option value="purple">Purple+</option>
                  <option value="brown">Brown+</option>
                  <option value="black">Black+</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <main className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'positions' ? (
            <>
              {displayPositions.length > 0 ? (
                displayPositions.map(({ position, techniques }) => (
                  <PositionSection
                    key={position.id}
                    position={position}
                    techniques={techniques}
                    drilled={completedIds}
                    onToggleCompletion={toggleCompletion}
                    onWatchClick={(t) => {
                      setSelectedTechForVideo(t);
                      setVideoModalOpen(true);
                    }}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-500">No techniques match your filters.</p>
                </div>
              )}
            </>
          ) : (
            <>
              {displayCategories.length > 0 ? (
                displayCategories.map(({ category, techniques }) => (
                  <div key={category.id} className="mb-12">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {techniques.map(tech => (
                        <TechniqueCard
                          key={tech.id}
                          tech={tech}
                          drilled={completedIds.has(tech.id)}
                          onToggleCompletion={toggleCompletion}
                          onWatchClick={(t) => {
                            setSelectedTechForVideo(t);
                            setVideoModalOpen(true);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-500">No techniques match your filters.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
