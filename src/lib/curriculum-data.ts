// Gustavo Machado BJJ Curriculum - Position-first structure
// Organized by belt level and positions

export interface Technique {
  id: number;
  name: string;
  description: string;
  type: 'attack' | 'escape' | 'transition' | 'drill';
  beltRequired: 'white' | 'blue' | 'purple' | 'brown' | 'black';
}

export interface Position {
  id: number;
  name: string;
  category: string;
  techniques: Technique[];
  beltRequired: 'white' | 'blue' | 'purple' | 'brown' | 'black';
}

// Gustavo Machado curriculum based on his teaching methodology
export const curriculumPositions: Position[] = [
  {
    id: 1,
    name: "Mount",
    category: "top_positions",
    beltRequired: "white",
    techniques: [
      { id: 1, name: "Americana", description: "Shoulder lock from mount", type: "attack", beltRequired: "white" },
      { id: 2, name: "Ezekiel", description: "Choke using gi lapel", type: "attack", beltRequired: "white" },
      { id: 3, name: "Armbar", description: "Arm lock extending elbow", type: "attack", beltRequired: "white" },
      { id: 4, name: "Cross Collar Choke", description: "Traditional gi choke", type: "attack", beltRequired: "white" },
      { id: 5, name: "Mount Escape - Bridge and Roll", description: "Basic escape by bridging", type: "escape", beltRequired: "white" },
      { id: 6, name: "Mount Escape - Elbow Escape", description: "Shrimp to escape", type: "escape", beltRequired: "white" },
    ]
  },
  {
    id: 2,
    name: "Side Control",
    category: "top_positions",
    beltRequired: "white",
    techniques: [
      { id: 7, name: "Americana", description: "Shoulder lock from side", type: "attack", beltRequired: "white" },
      { id: 8, name: "Kimura", description: "Figure-four shoulder lock", type: "attack", beltRequired: "white" },
      { id: 9, name: "North-South Choke", description: "Choke from north-south", type: "attack", beltRequired: "blue" },
      { id: 10, name: "Side Control Escape - Shrimp", description: "Create space and shrimp", type: "escape", beltRequired: "white" },
      { id: 11, name: "Side Control Escape - Knee to Elbow", description: "Frame and recover guard", type: "escape", beltRequired: "white" },
    ]
  },
  {
    id: 3,
    name: "Closed Guard",
    category: "guard",
    beltRequired: "white",
    techniques: [
      { id: 12, name: "Cross Collar Choke", description: "Traditional gi choke", type: "attack", beltRequired: "white" },
      { id: 13, name: "Armbar", description: "Arm lock from closed guard", type: "attack", beltRequired: "white" },
      { id: 14, name: "Triangle Choke", description: "Choke using legs", type: "attack", beltRequired: "blue" },
      { id: 15, name: "Scissor Sweep", description: "Sweep using legs", type: "attack", beltRequired: "white" },
      { id: 16, name: "Hip Bump Sweep", description: "Sit-up sweep", type: "attack", beltRequired: "white" },
      { id: 17, name: "Open Guard", description: "Open guard transition", type: "transition", beltRequired: "blue" },
    ]
  },
  {
    id: 4,
    name: "Open Guard - Spider",
    category: "guard",
    beltRequired: "blue",
    techniques: [
      { id: 18, name: "Spider Guard Sweep", description: "Sweep using spider control", type: "attack", beltRequired: "blue" },
      { id: 19, name: "Triangle from Spider", description: "Triangle using spider legs", type: "attack", beltRequired: "blue" },
      { id: 20, name: "Omoplata from Spider", description: "Shoulder lock from spider", type: "attack", beltRequired: "blue" },
      { id: 21, name: "Spider Guard Drill", description: "Maintain distance and control", type: "drill", beltRequired: "blue" },
    ]
  },
  {
    id: 5,
    name: "Back Mount",
    category: "top_positions",
    beltRequired: "white",
    techniques: [
      { id: 22, name: "Rear Naked Choke", description: "Basic back choke", type: "attack", beltRequired: "white" },
      { id: 23, name: "Collar Choke from Back", description: "Gi choke from back", type: "attack", beltRequired: "blue" },
      { id: 24, name: "Armbar from Back", description: "Arm lock from back control", type: "attack", beltRequired: "purple" },
      { id: 25, name: "Back Escape - Peel Grip", description: "Escape by peeling hooks", type: "escape", beltRequired: "white" },
      { id: 26, name: "Back Escape - Turn In", description: "Escape by turning into opponent", type: "escape", beltRequired: "blue" },
    ]
  },
  {
    id: 6,
    name: "Half Guard",
    category: "guard",
    beltRequired: "blue",
    techniques: [
      { id: 27, name: "Kimura from Half Guard", description: "Shoulder lock from bottom", type: "attack", beltRequired: "blue" },
      { id: 28, name: "Sweep from Half Guard", description: "Basic sweep", type: "attack", beltRequired: "blue" },
      { id: 29, name: "Deep Half Guard", description: "Underhook control", type: "transition", beltRequired: "purple" },
      { id: 30, name: "Half Guard Pass - Tornado", description: "Pass using leg control", type: "attack", beltRequired: "purple" },
      { id: 31, name: "Half Guard Escape - Knee Cut", description: "Pass half guard", type: "escape", beltRequired: "blue" },
    ]
  },
  {
    id: 7,
    name: "Takedowns",
    category: "takedowns",
    beltRequired: "white",
    techniques: [
      { id: 32, name: "Double Leg Takedown", description: "Basic wrestling takedown", type: "attack", beltRequired: "white" },
      { id: 33, name: "Single Leg Takedown", description: "Wrestling single leg", type: "attack", beltRequired: "white" },
      { id: 34, name: "Osoto Gari", description: "Judo major outer reap", type: "attack", beltRequired: "blue" },
      { id: 35, name: "Seoi Nage", description: "Judo shoulder throw", type: "attack", beltRequired: "purple" },
      { id: 36, name: "Takedown Defense - Sprawl", description: "Defend takedowns", type: "escape", beltRequired: "white" },
      { id: 37, name: "Takedown Defense - Whizzer", description: "Use underhook defense", type: "escape", beltRequired: "blue" },
    ]
  },
  {
    id: 8,
    name: "Open Guard - De La Riva",
    category: "guard",
    beltRequired: "purple",
    techniques: [
      { id: 38, name: "DLR Sweep", description: "Sweep using DLR hook", type: "attack", beltRequired: "purple" },
      { id: 39, name: "Berimbolo", description: "Rolling attack to back", type: "attack", beltRequired: "brown" },
      { id: 40, name: "DLR Pass", description: "Pass DLR guard", type: "attack", beltRequired: "purple" },
      { id: 41, name: "DLR Drill", description: "Maintain DLR control", type: "drill", beltRequired: "purple" },
    ]
  },
  {
    id: 9,
    name: "Knee on Belly",
    category: "top_positions",
    beltRequired: "blue",
    techniques: [
      { id: 42, name: "Knee on Belly Choke", description: "Choke from knee on belly", type: "attack", beltRequired: "blue" },
      { id: 43, name: "Transition to Mount", description: "Move to mount", type: "transition", beltRequired: "blue" },
      { id: 44, name: "Knee on Belly Escape", description: "Escape knee pressure", type: "escape", beltRequired: "blue" },
    ]
  },
  {
    id: 10,
    name: "Turtle Guard",
    category: "guard",
    beltRequired: "purple",
    techniques: [
      { id: 45, name: "Clock Choke", description: "Choke from turtle top", type: "attack", beltRequired: "purple" },
      { id: 46, name: "Turtle Roll", description: "Roll out from turtle", type: "escape", beltRequired: "purple" },
      { id: 47, name: "Back Take from Turtle", description: "Take back from turtle", type: "attack", beltRequired: "purple" },
    ]
  },
];

// 52-week rotating schedule - maps week numbers to position IDs
export function generate52WeekSchedule(): Record<number, number> {
  const schedule: Record<number, number> = {};
  const positionCount = curriculumPositions.length;
  
  for (let week = 1; week <= 52; week++) {
    // Rotate through positions, repeating after all positions covered
    schedule[week] = curriculumPositions[(week - 1) % positionCount].id;
  }
  
  return schedule;
}

export function getPositionForWeek(week: number): Position | undefined {
  const schedule = generate52WeekSchedule();
  const positionId = schedule[((week - 1) % 52) + 1];
  return curriculumPositions.find(p => p.id === positionId);
}

export function getCurrentWeek(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.ceil(diff / oneWeek);
}
