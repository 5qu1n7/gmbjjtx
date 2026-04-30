/**
 * Local storage key for tracking drilled techniques
 */
const DRILLED_KEY = 'bjj-drilled-techniques';

/**
 * Get all technique IDs that have been marked as drilled
 */
export function getDrilledTechniques(): Set<number> {
  if (typeof window === 'undefined') return new Set();
  
  const stored = localStorage.getItem(DRILLED_KEY);
  if (!stored) return new Set();
  
  try {
    return new Set(JSON.parse(stored));
  } catch {
    return new Set();
  }
}

/**
 * Mark a technique as drilled
 */
export function markTechniqueDrilled(techId: number): void {
  if (typeof window === 'undefined') return;
  
  const drilled = getDrilledTechniques();
  drilled.add(techId);
  localStorage.setItem(DRILLED_KEY, JSON.stringify(Array.from(drilled)));
}

/**
 * Unmark a technique as drilled
 */
export function unmarkTechniqueDrilled(techId: number): void {
  if (typeof window === 'undefined') return;
  
  const drilled = getDrilledTechniques();
  drilled.delete(techId);
  localStorage.setItem(DRILLED_KEY, JSON.stringify(Array.from(drilled)));
}

/**
 * Check if a technique has been drilled
 */
export function isTechniqueDrilled(techId: number): boolean {
  return getDrilledTechniques().has(techId);
}

/**
 * Clear all drilled techniques
 */
export function clearAllDrilled(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(DRILLED_KEY);
}

/**
 * Get count of drilled techniques
 */
export function getDrilledCount(): number {
  return getDrilledTechniques().size;
}
