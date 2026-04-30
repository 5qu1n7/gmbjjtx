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
  videoUrl?: string;
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
      { id: 1, name: "Americana", description: "Shoulder lock from mount", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=XUrxSihViJI" },
      { id: 2, name: "Ezekiel", description: "Choke using gi lapel", type: "attack", beltRequired: "white", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=S9MW4YOy4WU" },
      { id: 3, name: "Armbar", description: "Arm lock extending elbow", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DrCp_RLXpG8" },
      { id: 4, name: "Cross Collar Choke", description: "Traditional gi choke", type: "attack", beltRequired: "white", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=0hQAmrwqteg" },
      { id: 5, name: "Mount Escape - Bridge and Roll", description: "Basic escape by bridging", type: "escape", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=_p8TK68fjo8" },
      { id: 6, name: "Mount Escape - Elbow Escape", description: "Shrimp to escape", type: "escape", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DvVL4piYGbk" },
      { id: 71, name: "Arm Triangle from Mount", description: "Head and arm choke from top", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=fqYw8uqkBgQ" },
      { id: 72, name: "Bow and Arrow Choke", description: "Gi collar choke with leg hook", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=yrUXIujVGTM" },
      { id: 73, name: "Triangle from Mount", description: "Set up triangle from top position", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=EOzOsv4jc80" },
      { id: 99, name: "Kipping Escape", description: "Explosive hip escape from bottom mount", type: "escape", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=MswSPZCqvCo" },
      { id: 100, name: "S-Mount Escape", description: "Defend and escape S-mount armbar setup", type: "escape", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=E2cT25uVi28" },
    ]
  },
  {
    id: 2,
    name: "Side Control",
    category: "top_positions",
    beltRequired: "white",
    trainingType: "both",
    techniques: [
      { id: 7, name: "Americana", description: "Shoulder lock from side", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=XUrxSihViJI" },
      { id: 8, name: "Kimura", description: "Figure-four shoulder lock", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=XUrxSihViJI" },
      { id: 9, name: "North-South Choke", description: "Choke from north-south", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=fyqluZ0CAXI" },
      { id: 10, name: "Side Control Escape - Shrimp", description: "Create space and shrimp", type: "escape", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DvVL4piYGbk" },
      { id: 11, name: "Side Control Escape - Knee to Elbow", description: "Frame and recover guard", type: "escape", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=qtxYOhOpbBw" },
      { id: 74, name: "Arm Triangle from Side Control", description: "Head and arm choke from side", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=EXM0CP1YvCY" },
      { id: 75, name: "Paper Cutter Choke", description: "Cross-collar choke from side control", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=b1BRayJPrEk" },
      { id: 76, name: "Armbar from Side Control", description: "Far-side armbar", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=qouu5qFtZZA" },
      { id: 101, name: "Buggy Choke", description: "Leg-assisted choke from bottom side control", type: "attack", beltRequired: "blue", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=0VDUwuyT6N4" },
      { id: 102, name: "Ghost Escape", description: "Roll under and recover guard", type: "escape", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=1ODL69z-DdQ" },
      { id: 103, name: "Baseball Bat Choke", description: "Gi cross-collar choke from top side control", type: "attack", beltRequired: "purple", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=lLJIZHax4GE" },
      { id: 104, name: "Kesa Gatame Escape", description: "Hip escape and guard recovery from scarf hold", type: "escape", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=bHneNFyONwo" },
    ]
  },
  {
    id: 3,
    name: "Closed Guard",
    category: "guard",
    beltRequired: "white",
    trainingType: "both",
    techniques: [
      { id: 12, name: "Cross Collar Choke", description: "Traditional gi choke", type: "attack", beltRequired: "white", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=0hQAmrwqteg" },
      { id: 13, name: "Armbar", description: "Arm lock from closed guard", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=XUrxSihViJI" },
      { id: 14, name: "Triangle Choke", description: "Choke using legs", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=ndi0GwXiJe4" },
      { id: 15, name: "Scissor Sweep", description: "Sweep using legs", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
      { id: 16, name: "Hip Bump Sweep", description: "Sit-up sweep", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=F0Qz-DcqxJw" },
      { id: 17, name: "Open Guard", description: "Open guard transition", type: "transition", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
      { id: 77, name: "Omoplata", description: "Shoulder lock using legs from guard", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=w06XdYJnYAU" },
      { id: 78, name: "Pendulum Sweep", description: "Flower sweep using arm and leg", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=F0Qz-DcqxJw" },
      { id: 79, name: "Guillotine from Guard", description: "Pull guard and finish guillotine", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=UbcqJETDUY8" },
    ]
  },
   {
     id: 4,
     name: "Open Guard - Spider",
     category: "guard",
     beltRequired: "blue",
     trainingType: "gi",
     techniques: [
       { id: 18, name: "Spider Guard Sweep", description: "Sweep using spider control", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=ndi0GwXiJe4" },
       { id: 19, name: "Triangle from Spider", description: "Triangle using spider legs", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=DXYwICronlg" },
       { id: 20, name: "Omoplata from Spider", description: "Shoulder lock from spider", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=DXYwICronlg" },
       { id: 21, name: "Spider Guard Drill", description: "Maintain distance and control", type: "drill", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
       { id: 159, name: "Spider Armbar", description: "Arm lock setup from spider guard", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=XUrxSihViJI" },
       { id: 160, name: "Spider Guard Lasso Transition", description: "Move into lasso guard from spider", type: "transition", beltRequired: "purple", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=DXYwICronlg" },
     ]
   },
  {
    id: 5,
    name: "Back Mount",
    category: "top_positions",
    beltRequired: "white",
    trainingType: "both",
    techniques: [
      { id: 22, name: "Rear Naked Choke", description: "Basic back choke", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=LbYUxFJ9kQg" },
      { id: 23, name: "Collar Choke from Back", description: "Gi choke from back", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=S9MW4YOy4WU" },
      { id: 24, name: "Armbar from Back", description: "Arm lock from back control", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DrCp_RLXpG8" },
      { id: 25, name: "Back Escape - Peel Grip", description: "Escape by peeling hooks", type: "escape", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=_p8TK68fjo8" },
      { id: 26, name: "Back Escape - Turn In", description: "Escape by turning into opponent", type: "escape", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DvVL4piYGbk" },
      { id: 80, name: "Bow and Arrow Choke from Back", description: "Gi collar choke with leg control", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=xqNhZVNhxnE" },
      { id: 105, name: "Crucifix Choke", description: "Choke using opponent's trapped arm and leg", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=NBP8iFp3ypM" },
      { id: 106, name: "Rear Triangle (Ura Sankaku)", description: "Triangle choke from back control", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=96GTzr5AzKw" },
      { id: 107, name: "Body Triangle Escape", description: "Escape from rear body triangle lock", type: "escape", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=RA8Qc6hE23s" },
    ]
  },
  {
    id: 6,
    name: "Half Guard",
    category: "guard",
    beltRequired: "blue",
    trainingType: "both",
    techniques: [
      { id: 27, name: "Kimura from Half Guard", description: "Shoulder lock from bottom", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=XUrxSihViJI" },
      { id: 28, name: "Sweep from Half Guard", description: "Basic sweep", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
      { id: 29, name: "Deep Half Guard", description: "Underhook control", type: "transition", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=_p8TK68fjo8" },
      { id: 30, name: "Half Guard Pass - Tornado", description: "Pass using leg control", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=F0Qz-DcqxJw" },
      { id: 31, name: "Half Guard Escape - Knee Cut", description: "Pass half guard", type: "escape", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
      { id: 81, name: "Lockdown", description: "Foot lock control to stall and sweep", type: "transition", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=oZ7eQkPU4ms" },
      { id: 82, name: "Electric Chair Sweep", description: "Groin stretch sweep from lockdown", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=3f2Qkpb98WI" },
    ]
  },
   {
     id: 7,
     name: "Takedowns",
     category: "takedowns",
     beltRequired: "white",
     trainingType: "both",
     techniques: [
       { id: 32, name: "Double Leg Takedown", description: "Basic wrestling takedown", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=mRIDD2zoKJ8" },
       { id: 33, name: "Single Leg Takedown", description: "Wrestling single leg", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=rwq5g9RvPz8" },
       { id: 34, name: "Osoto Gari", description: "Judo major outer reap", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=5M1wkbaOYUM" },
       { id: 35, name: "Seoi Nage", description: "Judo shoulder throw", type: "attack", beltRequired: "purple", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=5M1wkbaOYUM" },
       { id: 36, name: "Takedown Defense - Sprawl", description: "Defend takedowns", type: "escape", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=mRIDD2zoKJ8" },
       { id: 37, name: "Takedown Defense - Whizzer", description: "Use underhook defense", type: "escape", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=rwq5g9RvPz8" },
       { id: 190, name: "High Crotch Takedown", description: "Wrestling high crotch position takedown", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=rwq5g9RvPz8" },
       { id: 191, name: "Foot Sweep Takedown", description: "Judo-style foot sweep from collar tie", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=5M1wkbaOYUM" },
     ]
   },
   {
     id: 8,
     name: "Open Guard - De La Riva",
     category: "guard",
     beltRequired: "purple",
     trainingType: "both",
     techniques: [
       { id: 38, name: "DLR Sweep", description: "Sweep using DLR hook", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=ndi0GwXiJe4" },
       { id: 39, name: "Berimbolo", description: "Rolling attack to back", type: "attack", beltRequired: "brown", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DXYwICronlg" },
       { id: 40, name: "DLR Pass", description: "Pass DLR guard", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=F0Qz-DcqxJw" },
       { id: 41, name: "DLR Drill", description: "Maintain DLR control", type: "drill", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=ndi0GwXiJe4" },
       { id: 187, name: "DLR Triangle", description: "Triangle choke setup from DLR position", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=ndi0GwXiJe4" },
       { id: 188, name: "DLR Leglock Entry", description: "Transition to leg lock positions from DLR", type: "transition", beltRequired: "brown", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
       { id: 189, name: "DLR Back Take", description: "Take the back from De La Riva guard", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DXYwICronlg" },
     ]
   },
   {
     id: 9,
     name: "Knee on Belly",
     category: "top_positions",
     beltRequired: "blue",
     trainingType: "both",
     techniques: [
       { id: 42, name: "Knee on Belly Choke", description: "Choke from knee on belly", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=LbYUxFJ9kQg" },
       { id: 43, name: "Transition to Mount", description: "Move to mount", type: "transition", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=_p8TK68fjo8" },
       { id: 44, name: "Knee on Belly Escape", description: "Escape knee pressure", type: "escape", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DvVL4piYGbk" },
       { id: 161, name: "Knee on Belly Armbar", description: "Arm lock from knee on belly", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=XUrxSihViJI" },
       { id: 162, name: "Knee on Belly Darce", description: "D'arce choke setup from knee on belly", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=VOliFfkp5Ik" },
       { id: 163, name: "Transition to Side Control", description: "Move from knee on belly to side control", type: "transition", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=_p8TK68fjo8" },
     ]
   },
   {
     id: 10,
     name: "Turtle Guard",
     category: "guard",
     beltRequired: "purple",
     trainingType: "both",
     techniques: [
       { id: 45, name: "Clock Choke", description: "Choke from turtle top", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=LbYUxFJ9kQg" },
       { id: 46, name: "Turtle Roll", description: "Roll out from turtle", type: "escape", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=_p8TK68fjo8" },
       { id: 47, name: "Back Take from Turtle", description: "Take back from turtle", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DXYwICronlg" },
       { id: 83, name: "D'arce Choke from Turtle", description: "Arm-around choke from top of turtle", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=VOliFfkp5Ik" },
       { id: 84, name: "Anaconda Choke from Turtle", description: "Rolling arm-around choke", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=8Qg5BH0sXKY" },
       { id: 164, name: "Turtle Guard Armbar", description: "Arm lock setup from turtle position", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=XUrxSihViJI" },
       { id: 165, name: "Turtle Roll to Guard Recovery", description: "Escape and recover guard position", type: "escape", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DvVL4piYGbk" },
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
       { id: 48, name: "Butterfly Sweep", description: "Hook and sweep opponent", type: "attack", beltRequired: "blue", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
       { id: 49, name: "Armbar from Butterfly", description: "Arm lock using butterfly hooks", type: "attack", beltRequired: "blue", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=XUrxSihViJI" },
       { id: 50, name: "Butterfly to Back Take", description: "Transition to back control", type: "transition", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=DXYwICronlg" },
       { id: 51, name: "Butterfly Guard Drill", description: "Maintain hooks and posture", type: "drill", beltRequired: "blue", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
       { id: 192, name: "Butterfly Triangle", description: "Triangle choke setup from butterfly hooks", type: "attack", beltRequired: "blue", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=ndi0GwXiJe4" },
       { id: 193, name: "Butterfly Hooks Mount Escape", description: "Use butterfly hooks to escape mount pressure", type: "escape", beltRequired: "blue", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=DvVL4piYGbk" },
     ]
   },
   {
     id: 12,
     name: "50/50 Guard",
     category: "guard",
     beltRequired: "purple",
     trainingType: "no-gi",
     techniques: [
       { id: 52, name: "50/50 Knee Bar", description: "Leg lock from 50/50", type: "attack", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
       { id: 53, name: "50/50 Toe Hold", description: "Foot lock variation", type: "attack", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
       { id: 54, name: "50/50 Pass", description: "Pass 50/50 guard", type: "attack", beltRequired: "brown", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=F0Qz-DcqxJw" },
       { id: 55, name: "50/50 Escape", description: "Stack and escape", type: "escape", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
       { id: 194, name: "50/50 Heel Hook", description: "Advanced heel hook setup from 50/50", type: "attack", beltRequired: "brown", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=hNTsYUShvLU" },
       { id: 195, name: "50/50 Sweep to Leglock", description: "Sweep and transition into leg lock position", type: "transition", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
     ]
   },
  {
    id: 13,
    name: "No-Gi Takedowns",
    category: "takedowns",
    beltRequired: "white",
    trainingType: "no-gi",
    techniques: [
      { id: 56, name: "Double Leg Shot", description: "Penetration step takedown", type: "attack", beltRequired: "white", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=mRIDD2zoKJ8" },
      { id: 57, name: "Single Leg High Crotch", description: "Wrestling single leg variation", type: "attack", beltRequired: "white", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=rwq5g9RvPz8" },
      { id: 58, name: "Ankle Pick", description: "Quick ankle pickup", type: "attack", beltRequired: "blue", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=KzEoF49h-Ic" },
      { id: 59, name: "Arm Drag to Back", description: "Arm drag and take back", type: "attack", beltRequired: "blue", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=DU7CS7jz_gY" },
      { id: 60, name: "Snap Down", description: "Snap head down to front headlock", type: "attack", beltRequired: "white", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=z5ivorQAs9s" },
      { id: 61, name: "Takedown Defense - Downblock", description: "Defend shots with underhook", type: "escape", beltRequired: "white", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=mRIDD2zoKJ8" },
    ]
  },
   {
     id: 14,
     name: "Rubber Guard",
     category: "guard",
     beltRequired: "purple",
     trainingType: "no-gi",
     techniques: [
       { id: 62, name: "Rubber Guard Entry", description: "High guard with leg control", type: "transition", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
       { id: 63, name: "Gogoplata", description: "Choke using shin", type: "attack", beltRequired: "brown", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=PQ5Rv4JmEF8" },
       { id: 64, name: "Rubber Guard Armbar", description: "Arm lock from rubber guard", type: "attack", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=XUrxSihViJI" },
       { id: 65, name: "Rubber Guard Escape", description: "Stack and break grip", type: "escape", beltRequired: "brown", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=DvVL4piYGbk" },
       { id: 196, name: "Rubber Guard Triangle", description: "Triangle setup from rubber guard position", type: "attack", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=ndi0GwXiJe4" },
       { id: 197, name: "Rubber Guard Sweep", description: "Sweep using leg positioning and frame", type: "attack", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
     ]
   },
  {
    id: 15,
    name: "Ashi Garami (Leg Locks)",
    category: "guard",
    beltRequired: "purple",
    trainingType: "no-gi",
    techniques: [
      { id: 66, name: "Straight Ankle Lock", description: "Basic foot lock", type: "attack", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
      { id: 67, name: "Knee Bar", description: "Knee joint lock", type: "attack", beltRequired: "brown", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
      { id: 68, name: "Heel Hook", description: "Twisting leg lock", type: "attack", beltRequired: "black", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=hNTsYUShvLU" },
      { id: 69, name: "Toe Hold", description: "Figure-four foot lock", type: "attack", beltRequired: "brown", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
      { id: 70, name: "Leg Lock Defense", description: "Defend against leg attacks", type: "escape", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
    ]
  },
  {
    id: 16,
    name: "Front Headlock",
    category: "top_positions",
    beltRequired: "white",
    trainingType: "both",
    techniques: [
      { id: 85, name: "Guillotine Choke", description: "Arm-around neck choke from front headlock", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=UbcqJETDUY8" },
      { id: 86, name: "D'arce Choke", description: "Arm-triangle choke from front headlock", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=VOliFfkp5Ik" },
      { id: 87, name: "Anaconda Choke", description: "Rolling arm-around choke from front headlock", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=8Qg5BH0sXKY" },
      { id: 88, name: "Arm-In Guillotine", description: "High-elbow guillotine with arm trapped", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=wq7r0NPixOA" },
      { id: 89, name: "Back Take from Front Headlock", description: "Transition to back control", type: "transition", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=4qnnIV8xJko" },
      { id: 90, name: "Front Headlock Escape", description: "Posture up and clear the head", type: "escape", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=8zYqR57F8PE" },
    ]
  },
  {
    id: 17,
    name: "Guard Passing",
    category: "top_positions",
    beltRequired: "white",
    trainingType: "both",
    techniques: [
      { id: 91, name: "Toreando Pass", description: "Bull-fighter pass using sleeve grips", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=LGwa2fQwWYc" },
      { id: 92, name: "Knee Slice Pass", description: "Drive knee through to pass", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=lOPh9K5kOcE" },
      { id: 93, name: "Leg Drag Pass", description: "Drag legs across and establish side control", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=bAxn19Pwf1c" },
      { id: 94, name: "Stack Pass", description: "Stack opponent and drive through guard", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=i29jJKrK29M" },
      { id: 95, name: "Over-Under Pass", description: "Over-under body lock guard pass", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=4hAY12ghrGk" },
    ]
  },
   {
     id: 18,
     name: "X-Guard",
     category: "guard",
     beltRequired: "purple",
     trainingType: "both",
     techniques: [
       { id: 96, name: "X-Guard Sweep", description: "Lift and dump opponent from X-guard", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=f7A1vv0-A2U" },
       { id: 97, name: "Single Leg X Entry", description: "Enter single leg X from seated guard", type: "transition", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=Hl174fDTD7Q" },
       { id: 98, name: "X-Guard Back Take", description: "Transition to back from X-guard", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=PfvLyeVBa4o" },
       { id: 181, name: "X-Guard Footlock", description: "Foot lock setup from X-guard position", type: "attack", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
       { id: 182, name: "X-Guard to Single Leg", description: "Transition into single leg takedown from X", type: "transition", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=Hl174fDTD7Q" },
       { id: 183, name: "Double X-Guard", description: "Both legs in X position for maximum control", type: "drill", beltRequired: "brown", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=f7A1vv0-A2U" },
     ]
   },
   {
     id: 19,
     name: "North-South",
     category: "top_positions",
     beltRequired: "blue",
     trainingType: "both",
     techniques: [
       { id: 108, name: "North-South Kimura", description: "Shoulder lock from north-south position", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=nPie9yUU4LM" },
       { id: 109, name: "North-South Back Take", description: "Transition to back control from north-south", type: "transition", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=SAKV7M_yDUs" },
       { id: 148, name: "North-South Choke", description: "Cross-collar strangle from north-south", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=fyqluZ0CAXI" },
       { id: 149, name: "North-South Armbar", description: "Arm lock from north-south position", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=Mc3v9VpM0uU" },
       { id: 150, name: "North-South Escape Defense", description: "Maintaining control when opponent tries to escape", type: "drill", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=bHneNFyONwo" },
     ]
   },
   {
     id: 20,
     name: "Lasso Guard",
     category: "guard",
     beltRequired: "blue",
     trainingType: "gi",
     techniques: [
       { id: 110, name: "Lasso Sweep", description: "Sweep using lasso sleeve and collar control", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=avrcVQ2mQIw" },
       { id: 111, name: "Triangle from Lasso", description: "Triangle choke using lasso leg control", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=DyQD86cvS7k" },
       { id: 112, name: "Loop Choke", description: "Collar choke using opponent's own lapel", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=PFqYQ7gF7VQ" },
       { id: 157, name: "Lasso Entry & Control", description: "Establish lasso guard with sleeve and collar grips", type: "drill", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=avrcVQ2mQIw" },
       { id: 158, name: "Lasso Back Take", description: "Take the back from lasso guard position", type: "transition", beltRequired: "purple", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=DyQD86cvS7k" },
     ]
   },
   {
     id: 21,
     name: "Reverse De La Riva",
     category: "guard",
     beltRequired: "purple",
     trainingType: "both",
     techniques: [
       { id: 113, name: "RDLR Sweep", description: "Dump and sweep from reverse De La Riva", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=a0UF6674jI0" },
       { id: 114, name: "RDLR Back Take", description: "Take back using RDLR hook", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=9UWgyOO8Sjg" },
       { id: 151, name: "RDLR Leglock Entry", description: "Transition to leg lock positions from RDLR", type: "transition", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
       { id: 152, name: "RDLR Hook Control", description: "Establish and maintain hook placement for control", type: "drill", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=a0UF6674jI0" },
       { id: 153, name: "RDLR Escape Defense", description: "Defending when opponent tries to pressure escape", type: "escape", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=9UWgyOO8Sjg" },
     ]
   },
   {
     id: 22,
     name: "Z Guard / Knee Shield",
     category: "guard",
     beltRequired: "blue",
     trainingType: "both",
     techniques: [
       { id: 115, name: "Z Guard Sweep", description: "Sweep using knee shield and hip control", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=gFMmfWLNsDI" },
       { id: 116, name: "Z Guard Back Take", description: "Transition to back from knee shield position", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=gFMmfWLNsDI" },
       { id: 154, name: "Knee Shield Frame & Distance", description: "Using knee shield to maintain distance and prevent passes", type: "drill", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DvVL4piYGbk" },
       { id: 155, name: "Z Guard Armbar", description: "Arm lock setup from Z guard position", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=XUrxSihViJI" },
       { id: 156, name: "Half Guard to Z Guard Transition", description: "Moving from half guard into Z guard position", type: "transition", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=gFMmfWLNsDI" },
     ]
   },
   {
     id: 23,
     name: "Guard Headquarters (HQ)",
     category: "top_positions",
     beltRequired: "blue",
     trainingType: "both",
     techniques: [
       { id: 117, name: "Knee Cut Pass from HQ", description: "Knee slice pass from headquarters position", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=peqZ1a2_sfE" },
       { id: 118, name: "Backstep Pass from HQ", description: "Backstep around the legs to complete the pass", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=VMkAZCbUN18" },
       { id: 119, name: "Crab Ride", description: "Back harness control transition from top position", type: "transition", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=9FC4guomBHE" },
       { id: 184, name: "HQ Armbar", description: "Arm lock setup from headquarters position", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=XUrxSihViJI" },
       { id: 185, name: "HQ Transition to Mount", description: "Move from headquarters to mounted position", type: "transition", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=_p8TK68fjo8" },
       { id: 186, name: "HQ Escape Defense", description: "Controlling when opponent tries to escape", type: "drill", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=peqZ1a2_sfE" },
     ]
   },
   {
     id: 24,
     name: "Crab Ride",
     category: "top_positions",
     beltRequired: "purple",
     trainingType: "no-gi",
     techniques: [
       { id: 120, name: "Crab Ride Armlock", description: "Arm lock from crab ride position", type: "attack", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=9FC4guomBHE" },
       { id: 121, name: "Crab Ride to Back", description: "Transition from crab ride to back control", type: "transition", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=9FC4guomBHE" },
       { id: 122, name: "Crab Ride Choke", description: "Neck crank from crab ride position", type: "attack", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=9FC4guomBHE" },
       { id: 178, name: "Crab Ride Entry", description: "Establish crab ride position with proper harness", type: "drill", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=9FC4guomBHE" },
       { id: 179, name: "Crab Ride Shoulder Control", description: "Pressure and control using shoulder positioning", type: "drill", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=9FC4guomBHE" },
       { id: 180, name: "Crab Ride Ankle Lock", description: "Foot lock setup from crab ride", type: "attack", beltRequired: "brown", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
     ]
   },
   {
     id: 25,
     name: "Inverted Guard",
     category: "guard",
     beltRequired: "purple",
     trainingType: "both",
     techniques: [
       { id: 123, name: "Inverted Triangle", description: "Triangle choke from inverted guard position", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=5mE_XPYVBWc" },
       { id: 124, name: "Inverted Armbar", description: "Arm lock from inverted guard", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=5mE_XPYVBWc" },
       { id: 125, name: "Entry to Inverted Guard", description: "How to safely enter and control inverted guard", type: "transition", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=5mE_XPYVBWc" },
       { id: 175, name: "Inverted Guard Sweep", description: "Sweep opponent using inversion momentum", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=5mE_XPYVBWc" },
       { id: 176, name: "Inverted Omoplata", description: "Shoulder lock setup from inverted position", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=w06XdYJnYAU" },
       { id: 177, name: "Inverted Guard Back Take", description: "Transition to back control from inverted", type: "transition", beltRequired: "brown", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DXYwICronlg" },
     ]
   },
   {
     id: 26,
     name: "K Guard",
     category: "guard",
     beltRequired: "blue",
     trainingType: "both",
     techniques: [
       { id: 126, name: "K Guard Sweep", description: "Sweep from K guard position using leg control", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=GH_2i2tOSJg" },
       { id: 127, name: "K Guard Armbar", description: "Straight armbar setup from K guard", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=GH_2i2tOSJg" },
       { id: 128, name: "K Guard Back Take", description: "Transition to back control from K guard", type: "transition", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=GH_2i2tOSJg" },
       { id: 172, name: "K Guard Entry", description: "Establish K guard with deep foot placement on hip", type: "drill", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=GH_2i2tOSJg" },
       { id: 173, name: "K Guard Leg Lock Entry", description: "Transition into leg lock positions from K guard", type: "transition", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
       { id: 174, name: "K Guard Against Knee Cut", description: "Defending knee slice pass from K guard", type: "escape", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=GH_2i2tOSJg" },
     ]
   },
   {
     id: 27,
     name: "Kesa Gatame",
     category: "top_positions",
     beltRequired: "white",
     trainingType: "gi",
     techniques: [
       { id: 129, name: "Kesa Gatame Choke", description: "Collar choke from kesa gatame position", type: "attack", beltRequired: "white", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=bHneNFyONwo" },
       { id: 130, name: "Kesa Gatame Armbar", description: "Arm lock setup from kesa gatame", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=bHneNFyONwo" },
       { id: 131, name: "Kesa Gatame Escape", description: "Hip escape from kesa gatame position", type: "escape", beltRequired: "white", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=bHneNFyONwo" },
       { id: 166, name: "Kesa Gatame Transition to Mount", description: "Move from scarf hold to mount position", type: "transition", beltRequired: "white", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=_p8TK68fjo8" },
       { id: 167, name: "Kesa Gatame Lapel Choke", description: "Loop choke using lapel from kesa gatame", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=PFqYQ7gF7VQ" },
       { id: 168, name: "Kesa Gatame Pressure Drill", description: "Maintaining tight position control", type: "drill", beltRequired: "white", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=bHneNFyONwo" },
     ]
   },
   {
     id: 28,
     name: "Octopus Guard",
     category: "guard",
     beltRequired: "blue",
     trainingType: "gi",
     techniques: [
       { id: 132, name: "Octopus Guard Sweep", description: "Lapel-based sweep from octopus guard", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=KHB5MgKIJIk" },
       { id: 133, name: "Octopus Triangle", description: "Triangle choke setup using lapel control", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=KHB5MgKIJIk" },
       { id: 134, name: "Octopus Guard Back Take", description: "Transition to back control from octopus guard", type: "transition", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=KHB5MgKIJIk" },
       { id: 169, name: "Octopus Guard Entry", description: "Establish octopus guard with proper lapel and hook", type: "drill", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=KHB5MgKIJIk" },
       { id: 170, name: "Octopus Armbar", description: "Arm lock setup from octopus position", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=XUrxSihViJI" },
       { id: 171, name: "Octopus Guard Escape Defense", description: "Defending when opponent tries to pressure escape", type: "escape", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=KHB5MgKIJIk" },
     ]
   },
   {
     id: 29,
     name: "Open Guard",
     category: "guard",
     beltRequired: "white",
     trainingType: "both",
     techniques: [
       { id: 135, name: "Collar & Sleeve Control", description: "Establish collar and sleeve grips for control and distance management", type: "drill", beltRequired: "white", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=ndi0GwXiJe4" },
       { id: 136, name: "Open Guard Sweep", description: "Basic hook sweep from open guard position with hip bump", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
       { id: 137, name: "Triangle from Open Guard", description: "Set up triangle choke using legs and off-balance", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=ndi0GwXiJe4" },
       { id: 138, name: "Open Guard Frame & Distance", description: "Use frames and foot placement to maintain distance and prevent passes", type: "drill", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DvVL4piYGbk" },
       { id: 139, name: "Rubber Guard Entry", description: "Establish underhook and butterfly guard position for arm drag control", type: "transition", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=w06XdYJnYAU" },
       { id: 140, name: "K-Guard Basics", description: "Deep grip on leg with inside foot on hip - setup for leg lock entries", type: "drill", beltRequired: "blue", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=DrCp_RLXpG8" },
     ]
   },
   {
     id: 30,
     name: "Back Control",
     category: "top_positions",
     beltRequired: "white",
     trainingType: "both",
     techniques: [
       { id: 141, name: "Rear Naked Choke Finish", description: "High and low finish variations of RNC", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=LbYUxFJ9kQg" },
       { id: 143, name: "Back Control Escape Defense", description: "Preventing escapes while on the back", type: "transition", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=_p8TK68fjo8" },
       { id: 144, name: "Seatbelt Grip Control", description: "Establish dominant seatbelt grip and maintain back control", type: "drill", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=LbYUxFJ9kQg" },
       { id: 145, name: "Hook Placement & Elevation", description: "Effective hook placement to prevent escape and elevate opponent", type: "drill", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DrCp_RLXpG8" },
       { id: 146, name: "Back Take from Closed Guard", description: "Arm drag and arm-across technique to take the back from guard", type: "transition", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=ndi0GwXiJe4" },
       { id: 147, name: "Back Take from Turtle", description: "Rolling back take and seat belt entry from turtle position", type: "transition", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DvVL4piYGbk" },
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

export function getWeekDateRange(week: number): string {
  const year = new Date().getFullYear();
  const jan1 = new Date(year, 0, 1);
  const startMs = jan1.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000;
  const endMs = startMs + 6 * 24 * 60 * 60 * 1000;
  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return `${fmt(new Date(startMs))} – ${fmt(new Date(endMs))}`;
}

/**
 * Get techniques for a specific position in a given week.
 * When a position appears multiple times in the 52-week schedule, different
 * techniques are shown each time to ensure all techniques are eventually covered.
 * 
 * @param position - The position object
 * @param week - The week number (1-52)
 * @param beltLevel - Filter by belt level
 * @returns Array of techniques to show for this position in this week
 */
export function getTechniquesForWeek(
  position: Position,
  week: number,
  beltLevel: 'white' | 'blue' | 'purple' | 'brown' | 'black' | 'all' = 'all'
): Technique[] {
  const schedule = generate52WeekSchedule(beltLevel);
  const adjustedWeek = ((week - 1) % 52) + 1;
  
  // Find all weeks where this position appears in the schedule
  const weeksWithPosition = Object.entries(schedule)
    .filter(([_, posId]) => posId === position.id)
    .map(([w]) => parseInt(w))
    .sort((a, b) => a - b);

  if (weeksWithPosition.length === 0) {
    // Position not in schedule for this belt level, return first 3 techniques
    return position.techniques.slice(0, 3);
  }

  // Find the index of current week in the sequence of this position's appearances
  const currentIndex = weeksWithPosition.indexOf(adjustedWeek);
  const occurrenceNumber = currentIndex >= 0 ? currentIndex : 0;

  // Determine how many techniques to show per week (aim for 2-3)
  const techniquesPerWeek = Math.min(3, Math.max(2, Math.ceil(position.techniques.length / Math.max(weeksWithPosition.length, 1))));

  // Calculate which techniques to show for this occurrence
  const startIdx = (occurrenceNumber * techniquesPerWeek) % position.techniques.length;
  const techniques: Technique[] = [];

  for (let i = 0; i < techniquesPerWeek; i++) {
    const idx = (startIdx + i) % position.techniques.length;
    techniques.push(position.techniques[idx]);
  }

  return techniques;
}

// ============================================================================
// BJJ University Category System
// ============================================================================

export interface Category {
  id: number;
  name: string;
  description: string;
  techniques: Technique[];
  color: string;  // Tailwind color class for UI
}

/**
 * BJJ University categories - organized by technique type rather than position
 * Each category contains techniques organized by progression level
 */
export const curriculumCategories: Category[] = [
  {
    id: 101,
    name: "Submissions",
    description: "Finishing techniques: chokes, armlocks, and leg locks",
    color: "red",
    techniques: [
      { id: 200, name: "Rear Naked Choke (RNC)", description: "Most dominant submission from back control", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=uJnOJG0TqGk" },
      { id: 201, name: "Guillotine Choke", description: "Arm-around-neck choke from guard or clinch", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=UbcqJETDUY8" },
      { id: 202, name: "Triangle Choke", description: "Legs used as arms to choke opponent", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=ndi0GwXiJe4" },
      { id: 203, name: "Cross Collar Choke (Gi)", description: "Traditional gi collar choke using both lapels", type: "attack", beltRequired: "white", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=0hQAmrwqteg" },
      { id: 204, name: "Armbar", description: "Hyperextend elbow joint - fundamental arm lock", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=XUrxSihViJI" },
      { id: 205, name: "Kimura", description: "Shoulder lock using figure-four grip", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=XUrxSihViJI" },
      { id: 206, name: "Americana", description: "Shoulder lock from top position", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=XUrxSihViJI" },
      { id: 207, name: "D'arce Choke", description: "Arm-triangle choke variation", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=VOliFfkp5Ik" },
      { id: 208, name: "Straight Ankle Lock", description: "Basic foot lock targeting ankle joint", type: "attack", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
      { id: 209, name: "Knee Bar", description: "Leg lock targeting knee joint", type: "attack", beltRequired: "brown", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
      { id: 210, name: "Heel Hook", description: "Advanced leg lock with twisting mechanism", type: "attack", beltRequired: "black", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=hNTsYUShvLU" },
      { id: 211, name: "Omoplata", description: "Shoulder lock using legs from guard", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=w06XdYJnYAU" },
      { id: 212, name: "Gogoplata", description: "Choke using shin from rubber guard", type: "attack", beltRequired: "brown", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=PQ5Rv4JmEF8" },
      { id: 213, name: "Anaconda Choke", description: "Rolling arm-around choke from top", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=8Qg5BH0sXKY" },
      { id: 214, name: "Bow and Arrow Choke", description: "Gi collar choke with leg hook", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=yrUXIujVGTM" },
    ]
  },
  {
    id: 102,
    name: "Escapes",
    description: "Defense and recovery from bad positions",
    color: "blue",
    techniques: [
      { id: 215, name: "Mount Escape - Bridge and Roll", description: "Basic bridge and roll escape from mount", type: "escape", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=_p8TK68fjo8" },
      { id: 216, name: "Mount Escape - Elbow Escape", description: "Shrimp and frame to escape mount", type: "escape", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DvVL4piYGbk" },
      { id: 217, name: "Side Control Escape - Shrimp", description: "Create space and recover guard from side control", type: "escape", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DvVL4piYGbk" },
      { id: 218, name: "Side Control Escape - Knee to Elbow", description: "Frame and recover half guard or full guard", type: "escape", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=qtxYOhOpbBw" },
      { id: 219, name: "Kesa Gatame Escape", description: "Hip escape and guard recovery from scarf hold", type: "escape", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=bHneNFyONwo" },
      { id: 220, name: "Front Headlock Escape", description: "Posture and clear the head to avoid choke", type: "escape", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=8zYqR57F8PE" },
      { id: 221, name: "Knee on Belly Escape", description: "Escape pressure from knee on belly position", type: "escape", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DvVL4piYGbk" },
      { id: 222, name: "Back Control Escape - Roll", description: "Roll away from back control to side control", type: "escape", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DvVL4piYGbk" },
      { id: 223, name: "Turtle Guard Escape - Shoulder Roll", description: "Roll out of turtle to recover guard", type: "escape", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=_p8TK68fjo8" },
      { id: 224, name: "Guard Escape - Leg Lock Defense", description: "Defend against leg lock and recover", type: "escape", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
      { id: 225, name: "RNC Escape - Palming the Head", description: "Defend rear naked choke by palming head", type: "escape", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DvVL4piYGbk" },
      { id: 226, name: "Armbar Escape - Hand on Chest", description: "Defend armbar with proper hand positioning", type: "escape", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=E2cT25uVi28" },
    ]
  },
  {
    id: 103,
    name: "Sweeps",
    description: "Reversals from guard to top position",
    color: "green",
    techniques: [
      { id: 227, name: "Hip Bump Sweep", description: "Basic sit-up sweep from closed guard", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=F0Qz-DcqxJw" },
      { id: 228, name: "Scissor Sweep", description: "Sweep using legs in scissor motion", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
      { id: 229, name: "Flower Sweep (Pendulum)", description: "Arm and leg sweep variation", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=F0Qz-DcqxJw" },
      { id: 230, name: "De La Riva Sweep", description: "Sweep using DLR hook and collar grip", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=ndi0GwXiJe4" },
      { id: 231, name: "Lasso Sweep", description: "Sweep using lasso sleeve and collar control", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=avrcVQ2mQIw" },
      { id: 232, name: "Spider Guard Sweep", description: "Sweep using spider leg control", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=ndi0GwXiJe4" },
      { id: 233, name: "X-Guard Sweep", description: "Lift and dump from X-guard position", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=f7A1vv0-A2U" },
      { id: 234, name: "Butterfly Sweep", description: "Hook and sweep from butterfly hooks", type: "attack", beltRequired: "blue", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
      { id: 235, name: "Reverse De La Riva Sweep", description: "Sweep using RDR hook positioning", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
      { id: 236, name: "Berimbolo", description: "Rolling attack to back from De La Riva", type: "attack", beltRequired: "brown", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DXYwICronlg" },
    ]
  },
  {
    id: 104,
    name: "Guard Passing",
    description: "Techniques to bypass opponent's guard",
    color: "purple",
    techniques: [
      { id: 237, name: "Knee Slice Pass", description: "Drive knee through to pass open guard", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=lOPh9K5kOcE" },
      { id: 238, name: "Toreando Pass", description: "Bull-fighter pass using sleeve grips", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=LGwa2fQwWYc" },
      { id: 239, name: "Leg Drag Pass", description: "Drag legs across to establish side control", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=bAxn19Pwf1c" },
      { id: 240, name: "Stack Pass", description: "Stack opponent and drive through guard", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=i29jJKrK29M" },
      { id: 241, name: "Over-Under Pass", description: "Over-under body lock guard pass", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=4hAY12ghrGk" },
      { id: 242, name: "DLR Pass", description: "Pass De La Riva guard", type: "attack", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=F0Qz-DcqxJw" },
      { id: 243, name: "50/50 Pass", description: "Pass 50/50 guard safely", type: "attack", beltRequired: "brown", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=F0Qz-DcqxJw" },
      { id: 244, name: "Knee Cut from Headquarters", description: "Knee slice pass from headquarters position", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=peqZ1a2_sfE" },
      { id: 245, name: "Backstep Pass", description: "Backstep around legs to complete pass", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=VMkAZCbUN18" },
    ]
  },
  {
    id: 105,
    name: "Positional Control",
    description: "Maintaining and improving position",
    color: "amber",
    techniques: [
      { id: 246, name: "Mount Pressure & Control", description: "Maintain mount with proper weight distribution", type: "drill", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=_p8TK68fjo8" },
      { id: 247, name: "Side Control Pressure", description: "Apply pressure and prevent escape from side", type: "drill", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=qtxYOhOpbBw" },
      { id: 248, name: "Back Control Seatbelt Grip", description: "Secure back control with seatbelt position", type: "drill", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DXYwICronlg" },
      { id: 249, name: "North-South Position Control", description: "Maintain dominant north-south position", type: "drill", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=nPie9yUU4LM" },
      { id: 250, name: "Knee on Belly Control", description: "Pressure and control from knee on belly", type: "drill", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=LbYUxFJ9kQg" },
      { id: 251, name: "Kesa Gatame (Scarf Hold) Control", description: "Maintain pressure from scarf hold position", type: "drill", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=bHneNFyONwo" },
      { id: 252, name: "Guard Headquarters Control", description: "Maintain control in headquarters position", type: "drill", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=peqZ1a2_sfE" },
      { id: 253, name: "Crab Ride Control", description: "Back harness control from crab ride position", type: "drill", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=9FC4guomBHE" },
    ]
  },
  {
    id: 106,
    name: "Guard Retention",
    description: "Preventing guard pass when on bottom",
    color: "cyan",
    techniques: [
      { id: 254, name: "Closed Guard Frame", description: "Frame and maintain distance in closed guard", type: "drill", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
      { id: 255, name: "Open Guard Distance Management", description: "Control distance to prevent pass", type: "drill", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=ndi0GwXiJe4" },
      { id: 256, name: "Half Guard Hip Block", description: "Block passing leg with hip and frame", type: "drill", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
      { id: 257, name: "Z Guard Setup", description: "Establish Z guard to prevent pass", type: "transition", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
      { id: 258, name: "Knee Shield Defense", description: "Use knee shield to stop guard pass", type: "drill", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
      { id: 259, name: "De La Riva Guard Retention", description: "Maintain DLR against pass attempts", type: "drill", beltRequired: "purple", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=ndi0GwXiJe4" },
      { id: 260, name: "Spider Guard Distance Control", description: "Keep distance with spider hooks", type: "drill", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
    ]
  },
  {
    id: 107,
    name: "Leg Locks",
    description: "Submissions targeting the legs",
    color: "rose",
    techniques: [
      { id: 261, name: "Straight Ankle Lock Setup", description: "Basic ankle lock from bottom position", type: "attack", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
      { id: 262, name: "50/50 Leglock Entry", description: "Enter 50/50 position for leg lock attacks", type: "transition", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
      { id: 263, name: "Ashi Garami Position", description: "Fundamental leg lock control position", type: "drill", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
      { id: 264, name: "Knee Bar Setup", description: "Transition to knee bar from various positions", type: "attack", beltRequired: "brown", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
      { id: 265, name: "Heel Hook (Advanced)", description: "Twisting leg lock targeting heel and ankle", type: "attack", beltRequired: "black", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=hNTsYUShvLU" },
      { id: 266, name: "Toe Hold", description: "Figure-four foot lock", type: "attack", beltRequired: "brown", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
      { id: 267, name: "X-Guard Footlock", description: "Foot lock setup from X-guard", type: "attack", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
      { id: 268, name: "Kneereap Leglock", description: "Attack knee with reaping motion", type: "attack", beltRequired: "brown", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
      { id: 269, name: "Leg Lock Defense", description: "Escape leg lock positions safely", type: "escape", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
    ]
  },
  {
    id: 108,
    name: "Takedowns & Stand Up",
    description: "Techniques from standing position",
    color: "indigo",
    techniques: [
      { id: 270, name: "Double Leg Takedown", description: "Basic wrestling double leg", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=mRIDD2zoKJ8" },
      { id: 271, name: "Single Leg Takedown", description: "Wrestling single leg takedown", type: "attack", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=rwq5g9RvPz8" },
      { id: 272, name: "Osoto Gari", description: "Judo major outer reap", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=5M1wkbaOYUM" },
      { id: 273, name: "Seoi Nage", description: "Judo shoulder throw", type: "attack", beltRequired: "purple", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=5M1wkbaOYUM" },
      { id: 274, name: "Takedown Defense - Sprawl", description: "Defend takedowns with proper sprawl", type: "escape", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=mRIDD2zoKJ8" },
      { id: 275, name: "Takedown Defense - Whizzer", description: "Use underhook for takedown defense", type: "escape", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=rwq5g9RvPz8" },
      { id: 276, name: "High Crotch Takedown", description: "Wrestling high crotch takedown", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=rwq5g9RvPz8" },
      { id: 277, name: "Foot Sweep Takedown", description: "Judo-style foot sweep from collar tie", type: "attack", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=5M1wkbaOYUM" },
    ]
  },
  {
    id: 109,
    name: "Transitions",
    description: "Moving between positions",
    color: "lime",
    techniques: [
      { id: 278, name: "Mount to Side Control", description: "Transition from mount to side control", type: "transition", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=_p8TK68fjo8" },
      { id: 279, name: "Side Control to Mount", description: "Move from side control to mounted position", type: "transition", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=_p8TK68fjo8" },
      { id: 280, name: "Guard to Back Control", description: "Transition from guard to back control", type: "transition", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DXYwICronlg" },
      { id: 281, name: "Back Control to Mount", description: "Transition from back to mount", type: "transition", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DXYwICronlg" },
      { id: 282, name: "Guard to Half Guard", description: "Move to half guard position", type: "transition", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
      { id: 283, name: "Half Guard to Full Guard", description: "Recover full guard from half guard", type: "transition", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
      { id: 284, name: "Front Headlock to Back Control", description: "Take the back from front headlock position", type: "transition", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=4qnnIV8xJko" },
      { id: 285, name: "North-South to Back Take", description: "Transition to back control from north-south", type: "transition", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=SAKV7M_yDUs" },
      { id: 286, name: "Lasso Guard to Back Take", description: "Take the back from lasso guard position", type: "transition", beltRequired: "purple", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=DyQD86cvS7k" },
      { id: 287, name: "De La Riva to Berimbolo", description: "Rolling attack to back from DLR", type: "transition", beltRequired: "brown", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DXYwICronlg" },
    ]
  },
  {
    id: 110,
    name: "Drills",
    description: "Repetition-based training movements",
    color: "sky",
    techniques: [
      { id: 288, name: "Bridge Hold Drill", description: "Basic bridge from mount for escape power", type: "drill", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=_p8TK68fjo8" },
      { id: 289, name: "Hip Escape Reps", description: "Shrimp movement repetition drill", type: "drill", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DvVL4piYGbk" },
      { id: 290, name: "Frame Drill", description: "Proper framing technique repetition", type: "drill", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
      { id: 291, name: "Guard Maintenance Drill", description: "Stay safe and control distance in closed guard", type: "drill", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
      { id: 292, name: "Mount Pressure Drill", description: "Apply proper weight and pressure from mount", type: "drill", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=_p8TK68fjo8" },
      { id: 293, name: "Back Control Hook Placement", description: "Practice proper hook positioning on back", type: "drill", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DXYwICronlg" },
      { id: 294, name: "Collar and Sleeve Control Drill", description: "Establish and maintain collar-sleeve grips", type: "drill", beltRequired: "white", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=ndi0GwXiJe4" },
      { id: 295, name: "Spider Leg Control Drill", description: "Maintain proper spider leg positioning", type: "drill", beltRequired: "blue", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
      { id: 296, name: "Butterfly Hook Drill", description: "Practice butterfly hook placement and control", type: "drill", beltRequired: "blue", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
    ]
  },
  {
    id: 111,
    name: "Counters",
    description: "Defensive counters to common attacks",
    color: "fuchsia",
    techniques: [
      { id: 297, name: "Counter to Guard Pass - Leg Lock", description: "Attack the leg when opponent passes", type: "attack", beltRequired: "purple", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
      { id: 298, name: "Counter to Arm Drag - Back Escape", description: "Escape when opponent attempts arm drag", type: "escape", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DU7CS7jz_gY" },
      { id: 299, name: "Counter to Mount Escape - Finish", description: "Finish mount when opponent tries to escape", type: "attack", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=_p8TK68fjo8" },
      { id: 300, name: "Counter to Armbar - Hand Position", description: "Defend armbar with proper hand positioning", type: "escape", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=E2cT25uVi28" },
      { id: 301, name: "Counter to Triangle - Stack & Pass", description: "Counter triangle by stacking and passing", type: "escape", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=ndi0GwXiJe4" },
      { id: 302, name: "Counter to Sweep - Head Control", description: "Prevent sweep by maintaining head control", type: "drill", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
      { id: 303, name: "Counter to RNC - Chin Tuck", description: "Defend RNC by tucking chin properly", type: "escape", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DvVL4piYGbk" },
    ]
  },
  {
    id: 112,
    name: "Concepts & Strategy",
    description: "Fundamental BJJ principles and positioning theory",
    color: "violet",
    techniques: [
      { id: 304, name: "Base and Posture", description: "Fundamental principles of maintaining base", type: "drill", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=_p8TK68fjo8" },
      { id: 305, name: "Weight Distribution", description: "Proper weight distribution in top positions", type: "drill", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=_p8TK68fjo8" },
      { id: 306, name: "Distance Management", description: "Control distance to prevent passes", type: "drill", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=ndi0GwXiJe4" },
      { id: 307, name: "Grip Fighting", description: "Control and break opponent grips", type: "drill", beltRequired: "white", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=ndi0GwXiJe4" },
      { id: 308, name: "Hip Positioning", description: "Use hips as primary lever for power", type: "drill", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=F0Qz-DcqxJw" },
      { id: 309, name: "Timing and Tempo", description: "Read opponent's timing to set up attacks", type: "drill", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=6oo323AQ0JI" },
      { id: 310, name: "Collar Grip Importance", description: "Understand the power of collar control", type: "drill", beltRequired: "white", trainingType: "gi", videoUrl: "https://www.youtube.com/watch?v=ndi0GwXiJe4" },
    ]
  },
  {
    id: 113,
    name: "Survival & Defense",
    description: "Avoiding danger and surviving bad positions",
    color: "orange",
    techniques: [
      { id: 311, name: "Survival from Mount", description: "Survive and avoid submission from mount", type: "escape", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=_p8TK68fjo8" },
      { id: 312, name: "Survival from Back Control", description: "Survive RNC and back attacks safely", type: "escape", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DvVL4piYGbk" },
      { id: 313, name: "Survival from Side Control", description: "Frame, breathe, and recover from heavy side", type: "escape", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DvVL4piYGbk" },
      { id: 314, name: "Leg Lock Survival", description: "Tap early and understand leg lock dangers", type: "drill", beltRequired: "white", trainingType: "no-gi", videoUrl: "https://www.youtube.com/watch?v=5ZAqUQpsus8" },
      { id: 315, name: "North-South Survival", description: "Survive and escape north-south pressure", type: "escape", beltRequired: "blue", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=bHneNFyONwo" },
      { id: 316, name: "Defend Guillotine - Posture", description: "Keep posture to defend guillotine choke", type: "escape", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=UbcqJETDUY8" },
      { id: 317, name: "Defend Chokes - Neck Positioning", description: "Protect neck when in danger of choke", type: "drill", beltRequired: "white", trainingType: "both", videoUrl: "https://www.youtube.com/watch?v=DvVL4piYGbk" },
    ]
  },
];

/**
 * Generate a 52-week rotation for BJJ University categories
 * Each category gets roughly equal exposure throughout the year
 */
export function generate52WeekCategorySchedule(beltLevel: 'white' | 'blue' | 'purple' | 'brown' | 'black' | 'all' = 'all'): Record<number, number> {
  const schedule: Record<number, number> = {};
  const categoryCount = curriculumCategories.length;
  const weeksPerCategory = Math.floor(52 / categoryCount);
  
  // Distribute categories throughout 52 weeks
  let currentWeek = 1;
  for (let i = 0; i < categoryCount; i++) {
    for (let j = 0; j < weeksPerCategory && currentWeek <= 52; j++) {
      schedule[currentWeek] = curriculumCategories[i].id;
      currentWeek++;
    }
  }
  
  // Fill remaining weeks with popular categories
  while (currentWeek <= 52) {
    schedule[currentWeek] = curriculumCategories[currentWeek % categoryCount].id;
    currentWeek++;
  }
  
  return schedule;
}

/**
 * Get techniques for a specific category in a given week
 */
export function getTechniquesForCategoryWeek(
  category: Category,
  week: number,
  beltLevel: 'white' | 'blue' | 'purple' | 'brown' | 'black' | 'all' = 'all'
): Technique[] {
  const schedule = generate52WeekCategorySchedule(beltLevel);
  const adjustedWeek = ((week - 1) % 52) + 1;
  
  // Find all weeks where this category appears
  const weeksWithCategory = Object.entries(schedule)
    .filter(([_, catId]) => catId === category.id)
    .map(([w]) => parseInt(w))
    .sort((a, b) => a - b);

  if (weeksWithCategory.length === 0) {
    return category.techniques.slice(0, 3);
  }

  // Find index of current week
  const currentIndex = weeksWithCategory.indexOf(adjustedWeek);
  const occurrenceNumber = currentIndex >= 0 ? currentIndex : 0;

  // Show 3-4 techniques per week from category
  const techniquesPerWeek = Math.min(4, Math.max(3, Math.ceil(category.techniques.length / Math.max(weeksWithCategory.length, 1))));

  // Cycle through techniques
  const startIdx = (occurrenceNumber * techniquesPerWeek) % category.techniques.length;
  const techniques: Technique[] = [];

  for (let i = 0; i < techniquesPerWeek; i++) {
    const idx = (startIdx + i) % category.techniques.length;
    techniques.push(category.techniques[idx]);
  }

  return techniques;
}
