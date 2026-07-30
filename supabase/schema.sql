-- ============================================================
-- Springfield State University Portal — Database Schema
-- Run this in Supabase SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  plain_password VARCHAR(255),
  role VARCHAR(20) NOT NULL DEFAULT 'student',
  email VARCHAR(255) DEFAULT '',
  full_name VARCHAR(255) DEFAULT '',
  staff_id VARCHAR(50) DEFAULT '',
  department VARCHAR(100) DEFAULT '',
  title VARCHAR(100) DEFAULT '',
  student_id VARCHAR(50) DEFAULT '',
  major VARCHAR(100) DEFAULT 'Undeclared',
  year VARCHAR(20) DEFAULT 'Freshman',
  gpa DECIMAL(3,2) DEFAULT 0.00,
  ssn VARCHAR(20) DEFAULT '',
  dob VARCHAR(20) DEFAULT '',
  address TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  code VARCHAR(20) NOT NULL,
  title VARCHAR(255) NOT NULL,
  instructor VARCHAR(255) DEFAULT '',
  instructor_id INTEGER REFERENCES users(id),
  credits INTEGER DEFAULT 3,
  schedule VARCHAR(100) DEFAULT '',
  capacity INTEGER DEFAULT 30
);

CREATE TABLE IF NOT EXISTS enrollments (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES users(id),
  course_id INTEGER REFERENCES courses(id),
  grade VARCHAR(5) DEFAULT '—'
);

CREATE TABLE IF NOT EXISTS announcements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  body TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS reset_tokens (
  token VARCHAR(255) PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CTF challenge progress tracking
CREATE TABLE IF NOT EXISTS user_flags (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  challenge_id VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, challenge_id)
);
