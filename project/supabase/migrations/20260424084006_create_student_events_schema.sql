/*
  # Student Events and Hackathons Schema

  1. New Tables
    - `events` - General student events (type: 'event')
      - id, title, description, date, time, location, type, created_at
    - `hackathons` - Hackathon entries with extended details
      - id, title, description, date, time, location, theme, prizes, jury (jsonb), max_team_members, created_at
    - `applications` - Hackathon registration applications
      - id, hackathon_id, first_name, last_name, email, team_name, members_count, created_at
    - `support_tickets` - Support requests from users
      - id, name, email, description, created_at

  2. Security
    - RLS enabled on all tables
    - Public read access for events and hackathons
    - Public insert for hackathons, applications, support_tickets (open platform)

  3. Seed Data
    - Sample events and hackathons for demo purposes
*/

-- EVENTS TABLE
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  date date NOT NULL,
  time time NOT NULL DEFAULT '09:00',
  location text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'event',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read events"
  ON events FOR SELECT
  TO anon, authenticated
  USING (true);

-- HACKATHONS TABLE
CREATE TABLE IF NOT EXISTS hackathons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  date date NOT NULL,
  time time NOT NULL DEFAULT '09:00',
  location text NOT NULL DEFAULT '',
  theme text NOT NULL DEFAULT '',
  prizes text NOT NULL DEFAULT '',
  jury jsonb NOT NULL DEFAULT '[]',
  max_team_members integer NOT NULL DEFAULT 4,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE hackathons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read hackathons"
  ON hackathons FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert hackathons"
  ON hackathons FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hackathon_id uuid NOT NULL REFERENCES hackathons(id) ON DELETE CASCADE,
  first_name text NOT NULL DEFAULT '',
  last_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  team_name text NOT NULL DEFAULT '',
  members_count integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert applications"
  ON applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- SUPPORT TICKETS TABLE
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert support tickets"
  ON support_tickets FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- SEED DATA: Events
INSERT INTO events (title, description, date, time, location, type) VALUES
  ('Отворен ден на технолошкиот факултет', 'Посетете го нашиот отворен ден и запознајте ги програмите и лабораториите на Технолошкиот факултет. Можност за разговор со profesori и студенти.', '2026-05-10', '10:00', 'Технолошки факултет, Скопје', 'event'),
  ('Работилница за Machine Learning', 'Практична работилница за основи на машинско учење со Python. Донесете ги своите лаптопи и подгответе се да кодирате!', '2026-05-18', '14:00', 'ФИНКИ, Скопје', 'event'),
  ('Tech Talk: Иднината на AI', 'Предавање на тема вештачка интелигенција и нејзиното влијание врз индустријата. Предавачи од водечки технолошки компании.', '2026-06-05', '17:00', 'Студентски дом, Скопје', 'event'),
  ('Career Fair 2026', 'Годишен саем на работни места за студенти по технички науки. Над 50 компании, можности за стаж и вработување.', '2026-06-15', '09:00', 'Борис Трајковски, Скопје', 'event');

-- SEED DATA: Hackathons
INSERT INTO hackathons (title, description, date, time, location, theme, prizes, jury, max_team_members) VALUES
  (
    'HackSkopje 2026',
    'Најголемиот студентски хакатон во Македонија! 48 часа неспиење, код, и иновација. Тимови од 2-4 члена ќе работат на решавање реални проблеми со технологија. Очекувајте менторска поддршка, слободна храна и пијалаци, и незаборавно искуство.',
    '2026-05-24',
    '09:00',
    'Innovation Hub, Скопје',
    'SmartCity & UrbanTech',
    '1-во место: 1.000€ + интернство\n2-ро место: 500€\n3-то место: 300€\nСпецијална награда за Best UI/UX: 200€',
    '["д-р Иван Петровски - CTO @ TechMK", "Марија Стоилова - Lead Engineer @ Google", "Проф. д-р Борис Ангелов - ФИНКИ", "Стефан Николов - Founder @ StartupMK"]',
    4
  ),
  (
    'GreenTech Hackathon',
    'Хакатон посветен на еколошки решенија и одржлив развој. Искористете технологија за да создадете позелена иднина. Фокус на IoT, обновливи енергии и паметни еколошки системи.',
    '2026-06-07',
    '10:00',
    'Технолошки факултет, Битола',
    'Sustainability & Green Technology',
    '1-во место: 800€\n2-ро место: 400€\n3-то место: 200€\nЕко Иновација награда: Посета на еко-кампус во Германија',
    '["Елена Ристовска - Еколошки инженер", "Проф. д-р Никола Блажевски - УКИМ", "Томе Андревски - Green Startup CEO"]',
    3
  ),
  (
    'AI Challenge Macedonia',
    'Предизвик за студенти заинтересирани за вештачка интелигенција и податочна наука. Работете со реални датасети и создадете иновативни AI решенија во рок од 36 часа.',
    '2026-07-12',
    '08:00',
    'ФИНКИ, Скопје',
    'Artificial Intelligence & Data Science',
    '1-во место: 1.500€ + менторство во AI компанија\n2-ро место: 700€\n3-то место: 350€',
    '["д-р Александра Димовска - AI Researcher", "Горан Трпевски - Data Scientist @ Microsoft", "Проф. д-р Веселин Јовановски - ФИНКИ", "Ана Стефановска - ML Engineer @ Amazon"]',
    5
  );
