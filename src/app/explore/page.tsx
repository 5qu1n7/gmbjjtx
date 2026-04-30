'use client';

import { useState, useEffect } from 'react';
import { curriculumPositions, curriculumCategories } from '@/lib/curriculum-data';
import { getDrilledTechniques, markTechniqueDrilled, unmarkTechniqueDrilled } from '@/lib/drilled-tracking';
import type { Technique } from '@/lib/curriculum-data';
import Link from 'next/link';

function getYouTubeVideoId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\&\?\/\r\n]+)/);
  return match ? match[1] : null;
}

function beltBadgeClass(belt: string): string {
  if (belt === 'white')  return 'bg-white text-gray-800 border border-gray-300';
  if (belt === 'blue')   return 'bg-blue-600 text-white border border-blue-600';
  if (belt === 'purple') return 'bg-purple-600 text-white border border-purple-600';
  if (belt === 'brown')  return 'bg-amber-800 text-white border border-amber-800';
  if (belt === 'black')  return 'bg-gray-900 text-white border border-gray-900';
  return 'bg-gray-100 text-gray-700';
}

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

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPositions, setExpandedPositions] = useState<Set<number>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
  const [selectedTechForVideo, setSelectedTechForVideo] = useState<Technique | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'positions' | 'categories'>('positions');
  const [drilledIds, setDrilledIds] = useState<Set<number>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setDrilledIds(getDrilledTechniques());
    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function toggleDrilled(techId: number) {
    if (drilledIds.has(techId)) {
      unmarkTechniqueDrilled(techId);
      setDrilledIds(prev => {
        const next = new Set(prev);
        next.delete(techId);
        return next;
      });
    } else {
      markTechniqueDrilled(techId);
      setDrilledIds(prev => new Set([...prev, techId]));
    }
  }

  // Filter positions by search query
  const filteredPositions = curriculumPositions.filter(pos =>
    pos.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pos.techniques.some(tech => tech.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filter categories by search query
  const filteredCategories = curriculumCategories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.techniques.some(tech => tech.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const togglePosition = (posId: number) => {
    const newSet = new Set(expandedPositions);
    if (newSet.has(posId)) {
      newSet.delete(posId);
    } else {
      newSet.add(posId);
    }
    setExpandedPositions(newSet);
  };

  const toggleCategory = (catId: number) => {
    const newSet = new Set(expandedCategories);
    if (newSet.has(catId)) {
      newSet.delete(catId);
    } else {
      newSet.add(catId);
    }
    setExpandedCategories(newSet);
  };

  return (
    <>
      <VideoModal 
        tech={selectedTechForVideo} 
        isOpen={videoModalOpen} 
        onClose={() => setVideoModalOpen(false)}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-2 inline-block">
                  ← Back to Calendar
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Explore Curriculum</h1>
                <p className="text-gray-600 mt-2">
                  {viewMode === 'positions' ? '30 positions & 196 techniques' : '15 categories & 145+ techniques'}
                </p>
              </div>
            </div>

            {/* Mode Toggle */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setViewMode('positions')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  viewMode === 'positions'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Positions
              </button>
              <button
                onClick={() => setViewMode('categories')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  viewMode === 'categories'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Categories
              </button>
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder={`Search ${viewMode === 'positions' ? 'positions or techniques' : 'categories or techniques'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {viewMode === 'positions' ? (
            // POSITIONS VIEW
            filteredPositions.length > 0 ? (
              <div className="space-y-4">
                {filteredPositions.map((position) => {
                  const isExpanded = expandedPositions.has(position.id);
                  const matchingTechniques = position.techniques.filter(tech =>
                    searchQuery === '' || tech.name.toLowerCase().includes(searchQuery.toLowerCase())
                  );

                  return (
                    <div key={position.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition">
                      {/* Position Header - Clickable */}
                      <button
                        onClick={() => togglePosition(position.id)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition flex items-center justify-between"
                      >
                        <div className="flex-1">
                          <h2 className="text-lg md:text-xl font-semibold text-gray-900">{position.name}</h2>
                          <p className="text-sm text-gray-600 mt-1">
                            {position.category.replace(/_/g, ' ')} • {position.trainingType.toUpperCase()} • {position.techniques.length} techniques
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${beltBadgeClass(position.beltRequired)}`}>
                            {position.beltRequired}+
                          </span>
                          <span className={`text-gray-400 transition ${isExpanded ? 'rotate-180' : ''}`}>
                            ▼
                          </span>
                        </div>
                      </button>

                      {/* Techniques - Expanded View */}
                      {isExpanded && matchingTechniques.length > 0 && (
                        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                          <div className="space-y-3">
                            {matchingTechniques.map((technique) => {
                              const videoId = getYouTubeVideoId(technique.videoUrl);
                              const isDrilled = drilledIds.has(technique.id);
                              return (
                                <div key={technique.id} className="bg-white rounded-lg p-4 border border-gray-200">
                                  <div className={`flex flex-col ${isMobile ? '' : 'md:flex-row'} items-start justify-between gap-3`}>
                                    <div className="flex-1">
                                      <h3 className="font-semibold text-gray-900">{technique.name} {isDrilled && '✓'}</h3>
                                      <p className="text-sm text-gray-600 mt-1">{technique.description}</p>
                                      <div className="flex flex-wrap gap-2 mt-3">
                                        <span className={`text-xs px-2 py-1 rounded font-medium ${beltBadgeClass(technique.beltRequired)}`}>
                                          {technique.beltRequired}+
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                                          technique.type === 'attack'     ? 'bg-red-100 text-red-800' :
                                          technique.type === 'escape'     ? 'bg-green-100 text-green-800' :
                                          technique.type === 'transition' ? 'bg-yellow-100 text-yellow-800' :
                                          'bg-blue-100 text-blue-800'
                                        }`}>
                                          {technique.type}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                                          technique.trainingType === 'gi' ? 'bg-indigo-100 text-indigo-800' :
                                          technique.trainingType === 'no-gi' ? 'bg-orange-100 text-orange-800' :
                                          'bg-gray-100 text-gray-800'
                                        }`}>
                                          {technique.trainingType === 'both' ? 'Gi & No-Gi' : technique.trainingType}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex gap-2 whitespace-nowrap">
                                      {videoId && (
                                        <button
                                          onClick={() => {
                                            setSelectedTechForVideo(technique);
                                            setVideoModalOpen(true);
                                          }}
                                          className="px-3 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                                        >
                                          ▶ Watch
                                        </button>
                                      )}
                                      <button
                                        onClick={() => toggleDrilled(technique.id)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                                          isDrilled
                                            ? 'bg-green-600 text-white hover:bg-green-700'
                                            : 'bg-gray-400 text-white hover:bg-gray-500'
                                        }`}
                                      >
                                        {isDrilled ? '✓' : 'Drill'}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500">No positions or techniques match your search.</p>
              </div>
            )
          ) : (
            // CATEGORIES VIEW
            filteredCategories.length > 0 ? (
              <div className="space-y-4">
                {filteredCategories.map((category) => {
                  const isExpanded = expandedCategories.has(category.id);
                  const matchingTechniques = category.techniques.filter(tech =>
                    searchQuery === '' || tech.name.toLowerCase().includes(searchQuery.toLowerCase())
                  );

                  return (
                    <div key={category.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition">
                      {/* Category Header - Clickable */}
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition flex items-center justify-between"
                      >
                        <div className="flex-1">
                          <h2 className="text-lg md:text-xl font-semibold text-gray-900">{category.name}</h2>
                          <p className="text-sm text-gray-600 mt-1">
                            {category.description} • {category.techniques.length} techniques
                          </p>
                        </div>
                        <span className={`text-gray-400 transition ${isExpanded ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>

                      {/* Techniques - Expanded View */}
                      {isExpanded && matchingTechniques.length > 0 && (
                        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                          <div className="space-y-3">
                            {matchingTechniques.map((technique) => {
                              const videoId = getYouTubeVideoId(technique.videoUrl);
                              const isDrilled = drilledIds.has(technique.id);
                              return (
                                <div key={technique.id} className="bg-white rounded-lg p-4 border border-gray-200">
                                  <div className={`flex flex-col ${isMobile ? '' : 'md:flex-row'} items-start justify-between gap-3`}>
                                    <div className="flex-1">
                                      <h3 className="font-semibold text-gray-900">{technique.name} {isDrilled && '✓'}</h3>
                                      <p className="text-sm text-gray-600 mt-1">{technique.description}</p>
                                      <div className="flex flex-wrap gap-2 mt-3">
                                        <span className={`text-xs px-2 py-1 rounded font-medium ${beltBadgeClass(technique.beltRequired)}`}>
                                          {technique.beltRequired}+
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                                          technique.type === 'attack'     ? 'bg-red-100 text-red-800' :
                                          technique.type === 'escape'     ? 'bg-green-100 text-green-800' :
                                          technique.type === 'transition' ? 'bg-yellow-100 text-yellow-800' :
                                          'bg-blue-100 text-blue-800'
                                        }`}>
                                          {technique.type}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                                          technique.trainingType === 'gi' ? 'bg-indigo-100 text-indigo-800' :
                                          technique.trainingType === 'no-gi' ? 'bg-orange-100 text-orange-800' :
                                          'bg-gray-100 text-gray-800'
                                        }`}>
                                          {technique.trainingType === 'both' ? 'Gi & No-Gi' : technique.trainingType}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex gap-2 whitespace-nowrap">
                                      {videoId && (
                                        <button
                                          onClick={() => {
                                            setSelectedTechForVideo(technique);
                                            setVideoModalOpen(true);
                                          }}
                                          className="px-3 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                                        >
                                          ▶ Watch
                                        </button>
                                      )}
                                      <button
                                        onClick={() => toggleDrilled(technique.id)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                                          isDrilled
                                            ? 'bg-green-600 text-white hover:bg-green-700'
                                            : 'bg-gray-400 text-white hover:bg-gray-500'
                                        }`}
                                      >
                                        {isDrilled ? '✓' : 'Drill'}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500">No categories or techniques match your search.</p>
              </div>
            )
          )}
        </main>
      </div>
    </>
  );
}
