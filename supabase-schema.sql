-- BJJ Curriculum App Schema

-- User roles enum
CREATE TYPE user_role AS ENUM ('admin', 'coach', 'member');

-- Belt levels enum (IBJJF standard)
CREATE TYPE belt_level AS ENUM ('white', 'blue', 'purple', 'brown', 'black');

-- Users table (extends Supabase auth)
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role user_role DEFAULT 'member',
  belt belt_level DEFAULT 'white',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Positions table
CREATE TABLE positions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT, -- 'guard', 'mount', 'side_control', 'back', 'takedown', etc.
  order_index INTEGER DEFAULT 0
);

-- Techniques table
CREATE TABLE techniques (
  id SERIAL PRIMARY KEY,
  position_id INTEGER REFERENCES positions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  belt_required belt_level DEFAULT 'white',
  technique_type TEXT, -- 'attack', 'escape', 'transition', 'drill'
  video_url TEXT,
  order_index INTEGER DEFAULT 0
);

-- Calendar events (52-week rotating curriculum)
CREATE TABLE calendar_events (
  id SERIAL PRIMARY KEY,
  week_number INTEGER NOT NULL CHECK (week_number >= 1 AND week_number <= 52),
  position_id INTEGER REFERENCES positions(id),
  technique_ids INTEGER[], -- Array of technique IDs for this week
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(week_number)
);

-- Session notes (user training notes)
CREATE TABLE session_notes (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  calendar_event_id INTEGER REFERENCES calendar_events(id) ON DELETE CASCADE,
  week_number INTEGER NOT NULL,
  training_date DATE NOT NULL,
  difficulty_rating INTEGER CHECK (difficulty_rating >= 1 AND difficulty_rating <= 5),
  notes TEXT,
  techniques_struggled_with TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE techniques ENABLE ROW LEVEL SECURITY;
ALTER TABLE positions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can read their own profile, admins/coaches can read all
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all users" ON users FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'coach'))
);

-- Calendar events: all can view, only admin/coach can modify
CREATE POLICY "Anyone can view calendar" ON calendar_events FOR SELECT USING (true);
CREATE POLICY "Admins can manage calendar" ON calendar_events FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'coach'))
);

-- Session notes: users can manage their own, coaches/admins can view all
CREATE POLICY "Users can manage own notes" ON session_notes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Coaches can view all notes" ON session_notes FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'coach'))
);

-- Techniques and positions: all can view
CREATE POLICY "Anyone can view techniques" ON techniques FOR SELECT USING (true);
CREATE POLICY "Anyone can view positions" ON positions FOR SELECT USING (true);

-- Technique completions (per-user drill tracking)
CREATE TABLE technique_completions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  technique_id INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, technique_id)
);

ALTER TABLE technique_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own completions" ON technique_completions
  FOR ALL USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_calendar_events_week ON calendar_events(week_number);
CREATE INDEX idx_session_notes_user ON session_notes(user_id);
CREATE INDEX idx_session_notes_week ON session_notes(week_number);
CREATE INDEX idx_techniques_position ON techniques(position_id);
CREATE INDEX idx_completions_user ON technique_completions(user_id);
