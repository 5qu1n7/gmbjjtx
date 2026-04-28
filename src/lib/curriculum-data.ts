// Gustavo Machado BJJ Curriculum - Position-first structure
// Organized by belt level and positions

export type TrainingType = 'gi' | 'no-gi' | 'both';

export interface Technique {
  id: number;
  name: string;
  description: string;
  type: 'attack' | 'escape' | 'transition' | 'drill';
  beltRequired: 'white' | 'blue' | 'purple' | 'brown' | 'black';
  trainingType: TrainingType;
}

export interface Position {
  id: number;
  name: string;
  category: string;
  techniques: Technique[];
  beltRequired: 'white' | 'blue' | 'purple' | 'brown' | 'black';
  trainingType: TrainingType;
}

// Gustavo Machado curriculum based on his teaching methodology
export const curriculumPositions: Position[] = [
  {
    id: 1,
    name: "Mount",
    category: "top_positions",
    beltRequired: "white",
    trainingType: "both",
    techniques: [
      { id: 1, name: "Americana", description: "Shoulder lock from mount", type: "attack", beltRequired: "white", trainingType: "both" },
      { id: 2, name: "Ezekiel", description: "Choke using gi lapel", type: "attack", beltRequired: "white", trainingType: "gi" },
      { id: 3, name: "Armbar", description: "Arm lock extending elbow", type: "attack", beltRequired: "white", trainingType: "both" },
      { id: 4, name: "Cross Collar Choke", description: "Traditional gi choke", type: "attack", beltRequired: "white", trainingType: "gi" },
      { id: 5, name: "Mount Escape - Bridge and Roll", description: "Basic escape by bridging", type: "escape", beltRequired: "white", trainingType: "both" },
      { id: 6, name: "Mount Escape - Elbow Escape", description: "Shrimp to escape", type: "escape", beltRequired: "white", trainingType: "both" },
    ]
  },
  {
    id: 2,
    name: "Side Control",
    category: "top_positions",
    beltRequired: "white",
    trainingType: "both",
    techniques: [
      { id: 7, name: "Americana", description: "Shoulder lock from side", type: "attack", beltRequired: "white", trainingType: "both" },
      { id: 8, name: "Kimura", description: "Figure-four shoulder lock", type: "attack", beltRequired: "white", trainingType: "both" },
      { id: 9, name: "North-South Choke", description: "Choke from north-south", type: "attack", beltRequired: "blue", trainingType: "both" },
      { id: 10, name: "Side Control Escape - Shrimp", description: "Create space and shrimp", type: "escape", beltRequired: "white", trainingType: "both" },
      { id: 11, name: "Side Control Escape - Knee to Elbow", description: "Frame and recover guard", type: "escape", beltRequired: "white", trainingType: "both" },
    ]
  },
  {
    id: 3,
    name: "Closed Guard",
    category: "guard",
    beltRequired: "white",
    trainingType: "both",
    techniques: [
      { id: 12, name: "Cross Collar Choke", description: "Traditional gi choke", type: "attack", beltRequired: "white", trainingType: "gi" },
      { id: 13, name: "Armbar", description: "Arm lock from closed guard", type: "attack", beltRequired: "white", trainingType: "both" },
      { id: 14, name: "Triangle Choke", description: "Choke using legs", type: "attack", beltRequired: "blue", trainingType: "both" },
      { id: 15, name: "Scissor Sweep", description: "Sweep using legs", type: "attack", beltRequired: "white", trainingType: "both" },
      { id: 16, name: "Hip Bump Sweep", description: "Sit-up sweep", type: "attack", beltRequired: "white", trainingType: "both" },
      { id: 17, name: "Open Guard", description: "Open guard transition", type: "transition", beltRequired: "blue", trainingType: "both" },
    ]
  },
  {
    id: 4,
    name: "Open Guard - Spider",
    category: "guard",
    beltRequired: "blue",
    trainingType: "gi",
    techniques: [
      { id: 18, name: "Spider Guard Sweep", description: "Sweep using spider control", type: "attack", beltRequired: "blue", trainingType: "gi" },
      { id: 19, name: "Triangle from Spider", description: "Triangle using spider legs", type: "attack", beltRequired: "blue", trainingType: "gi" },
      { id: 20, name: "Omoplata from Spider", description: "Shoulder lock from spider", type: "attack", beltRequired: "blue", trainingType: "gi" },
      { id: 21, name: "Spider Guard Drill", description: "Maintain distance and control", type: "drill", beltRequired: "blue", trainingType: "gi" },
    ]
  },
  {
    id: 5,
    name: "Back Mount",
    category: "top_positions",
    beltRequired: "white",
    trainingType: "both",
    techniques: [
      { id: 22, name: "Rear Naked Choke", description: "Basic back choke", type: "attack", beltRequired: "white", trainingType: "both" },
      { id: 23, name: "Collar Choke from Back", description: "Gi choke from back", type: "attack", beltRequired: "blue", trainingType: "gi" },
      { id: 24, name: "Armbar from Back", description: "Arm lock from back control", type: "attack", beltRequired: "purple", trainingType: "both" },
      { id: 25, name: "Back Escape - Peel Grip", description: "Escape by peeling hooks", type: "escape", beltRequired: "white", trainingType: "both" },
      { id: 26, name: "Back Escape - Turn In", description: "Escape by turning into opponent", type: "escape", beltRequired: "blue", trainingType: "both" },
    ]
  },
  {
    id: 6,
    name: "Half Guard",
    category: "guard",
    beltRequired: "blue",
    trainingType: "both",
    techniques: [
      { id: 27, name: "Kimura from Half Guard", description: "Shoulder lock from bottom", type: "attack", beltRequired: "blue", trainingType: "both" },
      { id: 28, name: "Sweep from Half Guard", description: "Basic sweep", type: "attack", beltRequired: "blue", trainingType: "both" },
      { id: 29, name: "Deep Half Guard", description: "Underhook control", type: "transition", beltRequired: "purple", trainingType: "both" },
      { id: 30, name: "Half Guard Pass - Tornado", description: "Pass using leg control", type: "attack", beltRequired: "purple", trainingType: "both" },
      { id: 31, name: "Half Guard Escape - Knee Cut", description: "Pass half guard", type: "escape", beltRequired: "blue", trainingType: "both" },
    ]
  },
  {
    id: 7,
    name: "Takedowns",
    category: "takedowns",
    beltRequired: "white",
    trainingType: "both",
    techniques: [
      { id: 32, name: "Double Leg Takedown", description: "Basic wrestling takedown", type: "attack", beltRequired: "white", trainingType: "both" },
      { id: 33, name: "Single Leg Takedown", description: "Wrestling single leg", type: "attack", beltRequired: "white", trainingType: "both" },
      { id: 34, name: "Osoto Gari", description: "Judo major outer reap", type: "attack", beltRequired: "blue", trainingType: "gi" },
      { id: 35, name: "Seoi Nage", description: "Judo shoulder throw", type: "attack", beltRequired: "purple", trainingType: "gi" },
      { id: 36, name: "Takedown Defense - Sprawl", description: "Defend takedowns", type: "escape", beltRequired: "white", trainingType: "both" },
      { id: 37, name: "Takedown Defense - Whizzer", description: "Use underhook defense", type: "escape", beltRequired: "blue", trainingType: "both" },
    ]
  },
  {
    id: 8,
    name: "Open Guard - De La Riva",
    category: "guard",
    beltRequired: "purple",
    trainingType: "both",
    techniques: [
      { id: 38, name: "DLR Sweep", description: "Sweep using DLR hook", type: "attack", beltRequired: "purple", trainingType: "both" },
      { id: 39, name: "Berimbolo", description: "Rolling attack to back", type: "attack", beltRequired: "brown", trainingType: "both" },
      { id: 40, name: "DLR Pass", description: "Pass DLR guard", type: "attack", beltRequired: "purple", trainingType: "both" },
      { id: 41, name: "DLR Drill", description: "Maintain DLR control", type: "drill", beltRequired: "purple", trainingType: "both" },
    ]
  },
  {
    id: 9,
    name: "Knee on Belly",
    category: "top_positions",
    beltRequired: "blue",
    trainingType: "both",
    techniques: [
      { id: 42, name: "Knee on Belly Choke", description: "Choke from knee on belly", type: "attack", beltRequired: "blue", trainingType: "both" },
      { id: 43, name: "Transition to Mount", description: "Move to mount", type: "transition", beltRequired: "blue", trainingType: "both" },
      { id: 44, name: "Knee on Belly Escape", description: "Escape knee pressure", type: "escape", beltRequired: "blue", trainingType: "both" },
    ]
  },
  {
    id: 10,
    name: "Turtle Guard",
    category: "guard",
    beltRequired: "purple",
    trainingType: "both",
    techniques: [
      { id: 45, name: "Clock Choke", description: "Choke from turtle top", type: "attack", beltRequired: "purple", trainingType: "both" },
      { id: 46, name: "Turtle Roll", description: "Roll out from turtle", type: "escape", beltRequired: "purple", trainingType: "both" },
      { id: 47, name: "Back Take from Turtle", description: "Take back from turtle", type: "attack", beltRequired: "purple", trainingType: "both" },
    ]
  },
  // No-Gi Positions
  {
    id: 11,
    name: "Butterfly Guard",
    category: "guard",
    beltRequired: "blue",
    trainingType: "no-gi",
    techniques: [
      { id: 48, name: "Butterfly Sweep", description: "Hook and sweep opponent", type: "attack", beltRequired: "blue", trainingType: "no-gi" },
      { id: 49, name: "Armbar from Butterfly", description: "Arm lock using butterfly hooks", type: "attack", beltRequired: "blue", trainingType: "no-gi" },
      { id: 50, name: "Butterfly to Back Take", description: "Transition to back control", type: "transition", beltRequired: "purple", trainingType: "no-gi" },
      { id: 51, name: "Butterfly Guard Drill", description: "Maintain hooks and posture", type: "drill", beltRequired: "blue", trainingType: "no-gi" },
    ]
  },
  {
    id: 12,
    name: "50/50 Guard",
    category: "guard",
    beltRequired: "purple",
    trainingType: "no-gi",
    techniques: [
      { id: 52, name: "50/50 Knee Bar", description: "Leg lock from 50/50", type: "attack", beltRequired: "purple", trainingType: "no-gi" },
      { id: 53, name: "50/50 Toe Hold", description: "Foot lock variation", type: "attack", beltRequired: "purple", trainingType: "no-gi" },
      { id: 54, name: "50/50 Pass", description: "Pass 50/50 guard", type: "attack", beltRequired: "brown", trainingType: "no-gi" },
      { id: 55, name: "50/50 Escape", description: "Stack and escape", type: "escape", beltRequired: "purple", trainingType: "no-gi" },
    ]
  },
  {
    id: 13,
    name: "No-Gi Takedowns",
    category: "takedowns",
    beltRequired: "white",
    trainingType: "no-gi",
    techniques: [
      { id: 56, name: "Double Leg Shot", description: "Penetration step takedown", type: "attack", beltRequired: "white", trainingType: "no-gi" },
      { id: 57, name: "Single Leg High Crotch", description: "Wrestling single leg variation", type: "attack", beltRequired: "white", trainingType: "no-gi" },
      { id: 58, name: "Ankle Pick", description: "Quick ankle pickup", type: "attack", beltRequired: "blue", trainingType: "no-gi" },
      { id: 59, name: "Arm Drag to Back", description: "Arm drag and take back", type: "attack", beltRequired: "blue", trainingType: "no-gi" },
      { id: 60, name: "Snap Down", description: "Snap head down to front headlock", type: "attack", beltRequired: "white", trainingType: "no-gi" },
      { id: 61, name: "Takedown Defense - Downblock", description: "Defend shots with underhook", type: "escape", beltRequired: "white", trainingType: "no-gi" },
    ]
  },
  {
    id: 14,
    name: "Rubber Guard",
    category: "guard",
    beltRequired: "purple",
    trainingType: "no-gi",
    techniques: [
      { id: 62, name: "Rubber Guard Entry", description: "High guard with leg control", type: "transition", beltRequired: "purple", trainingType: "no-gi" },
      { id: 63, name: "Gogoplata", description: "Choke using shin", type: "attack", beltRequired: "brown", trainingType: "no-gi" },
      { id: 64, name: "Rubber Guard Armbar", description: "Arm lock from rubber guard", type: "attack", beltRequired: "purple", trainingType: "no-gi" },
      { id: 65, name: "Rubber Guard Escape", description: "Stack and break grip", type: "escape", beltRequired: "brown", trainingType: "no-gi" },
    ]
  },
  {
    id: 15,
    name: "Ashi Garami (Leg Locks)",
    category: "guard",
    beltRequired: "purple",
    trainingType: "no-gi",
    techniques: [
      { id: 66, name: "Straight Ankle Lock", description: "Basic foot lock", type: "attack", beltRequired: "purple", trainingType: "no-gi" },
      { id: 67, name: "Knee Bar", description: "Knee joint lock", type: "attack", beltRequired: "brown", trainingType: "no-gi" },
      { id: 68, name: "Heel Hook", description: "Twisting leg lock", type: "attack", beltRequired: "black", trainingType: "no-gi" },
      { id: 69, name: "Toe Hold", description: "Figure-four foot lock", type: "attack", beltRequired: "brown", trainingType: "no-gi" },
      { id: 70, name: "Leg Lock Defense", description: "Defend against leg attacks", type: "escape", beltRequired: "purple", trainingType: "no-gi" },
    ]
  },
];

// 52-week rotating schedule - maps week numbers to position IDs
// Prioritizes white belt positions while ensuring variety
export function generate52WeekSchedule(beltLevel: 'white' | 'blue' | 'purple' | 'brown' | 'black' | 'all' = 'all'): Record<number, number> {
  const schedule: Record<number, number> = {};
  
  // Filter positions based on belt level
  let availablePositions = curriculumPositions.filter(p => p.trainingType !== 'no-gi');
  if (beltLevel !== 'all') {
    const beltOrder = ['white', 'blue', 'purple', 'brown', 'black'];
    const maxBeltIndex = beltOrder.indexOf(beltLevel);
    availablePositions = availablePositions.filter(p => 
      beltOrder.indexOf(p.beltRequired) <= maxBeltIndex
    );
  }
  
  const whiteBeltPositions = availablePositions.filter(p => p.beltRequired === 'white');
  const higherBeltPositions = availablePositions.filter(p => p.beltRequired !== 'white');
  
  // Ensure white belt positions appear every 2 weeks, higher belt positions fill gaps
  let whiteIndex = 0;
  let higherIndex = 0;
  
  for (let week = 1; week <= 52; week++) {
    // Every other week (or when we run out of higher belt positions), show white belt content
    if (week % 2 === 1 || higherIndex >= higherBeltPositions.length) {
      if (whiteBeltPositions.length > 0) {
        schedule[week] = whiteBeltPositions[whiteIndex % whiteBeltPositions.length].id;
        whiteIndex++;
      } else if (higherBeltPositions.length > 0) {
        schedule[week] = higherBeltPositions[higherIndex % higherBeltPositions.length].id;
        higherIndex++;
      }
    } else {
      if (higherBeltPositions.length > 0) {
        schedule[week] = higherBeltPositions[higherIndex % higherBeltPositions.length].id;
        higherIndex++;
      } else if (whiteBeltPositions.length > 0) {
        schedule[week] = whiteBeltPositions[whiteIndex % whiteBeltPositions.length].id;
        whiteIndex++;
      }
    }
  }
  
  return schedule;
}

export function getPositionForWeek(week: number, beltLevel: 'white' | 'blue' | 'purple' | 'brown' | 'black' | 'all' = 'all'): Position | undefined {
  const schedule = generate52WeekSchedule(beltLevel);
  const adjustedWeek = ((week - 1) % 52) + 1;
  const positionId = schedule[adjustedWeek];
  return curriculumPositions.find(p => p.id === positionId);
}

export function getCurrentWeek(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.ceil(diff / oneWeek);
}
