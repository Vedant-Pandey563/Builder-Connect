/*
  # Initial Schema Setup for BuildConnect Platform

  1. Tables
    - users
      - Basic user information
      - Verification status
      - Profile details
    - builders
      - Builder-specific information
      - GST verification
      - Experience and categorization
    - projects
      - Project details and status
      - Budget and timeline
    - reviews
      - Client feedback
      - Project photos
    - requests
      - Client requests to builders
      - Project requirements

  2. Security
    - Enable RLS on all tables
    - Add policies for data access
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  user_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE,
  phone_number text UNIQUE,
  user_type text NOT NULL CHECK (user_type IN ('client', 'builder', 'admin')),
  is_verified boolean DEFAULT false,
  verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  profile_photo text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create builders table
CREATE TABLE IF NOT EXISTS builders (
  builder_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
  company_name text NOT NULL,
  license_no text UNIQUE,
  gst_number text UNIQUE,
  is_gst_verified boolean DEFAULT false,
  experience_years integer,
  category text CHECK (category IN ('newcomer', 'beginner', 'established')),
  address text,
  city text,
  state text,
  specializations text[],
  portfolio_images text[],
  projects_completed integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  project_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  builder_id uuid REFERENCES builders(builder_id) ON DELETE CASCADE,
  client_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  location text,
  start_date date,
  completion_date date,
  status text CHECK (status IN ('ongoing', 'completed')),
  budget_range text,
  photos text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  review_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(project_id) ON DELETE CASCADE,
  client_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
  builder_id uuid REFERENCES builders(builder_id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  project_photos text[],
  created_at timestamptz DEFAULT now()
);

-- Create requests table
CREATE TABLE IF NOT EXISTS requests (
  request_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
  builder_id uuid REFERENCES builders(builder_id) ON DELETE CASCADE,
  project_type text NOT NULL,
  budget_range text,
  location text,
  request_details text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'in_progress', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE builders ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Builders are publicly readable"
  ON builders
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Projects are publicly readable"
  ON projects
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Reviews are publicly readable"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Clients can create requests"
  ON requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Users can read their own requests"
  ON requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = client_id OR auth.uid() IN (
    SELECT user_id FROM builders WHERE builder_id = requests.builder_id
  ));

-- Add function to update builder category based on experience
CREATE OR REPLACE FUNCTION update_builder_category()
RETURNS TRIGGER AS $$
BEGIN
  NEW.category = CASE
    WHEN NEW.experience_years >= 5 THEN 'established'
    WHEN NEW.experience_years >= 2 THEN 'beginner'
    ELSE 'newcomer'
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_builder_category_trigger
  BEFORE INSERT OR UPDATE OF experience_years ON builders
  FOR EACH ROW
  EXECUTE FUNCTION update_builder_category();