-- ============================================================
-- Springfield State University Portal — Seed Data
-- Run this AFTER schema.sql in Supabase SQL Editor
-- ============================================================

-- Users (passwords are MD5 hashes — intentionally weak)
INSERT INTO users (id, username, password, plain_password, role, email, full_name, staff_id, department, title, student_id, major, year, gpa, ssn, dob, address) VALUES
(1, 'admin',      '0192023a7bbd73250516f069df18b500', 'admin123',     'admin',    'registrar@springfield.edu',  'Dr. Sarah Admin',      'REG-001', 'Registrar',       'University Registrar',     '', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'vc',         '4bf7c122590f1d0234321eed85ea242f', 'vc123',        'vc',       'vc@springfield.edu',        'Prof. James Thornton', 'VC-001',  'Office of the VC', 'Vice Chancellor',          '', NULL, NULL, NULL, 'FLAG{1dor_pr0f1l3}', NULL, NULL),
(3, 'it_staff',   '0b1dd5fabd221ef63c58c026bce4cf6b', 'it123',        'it_staff', 'it@springfield.edu',         'Maria Garcia',         'IT-001',  'IT Services',      'IT Systems Lead',          '', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'dr_williams','e9f37ab3a738c4704a5d6035166d75d3', 'lecturer123',  'lecturer', 'rwilliams@springfield.edu',  'Dr. Robert Williams',  'LEC-001', 'Computer Science',  'Senior Lecturer',          '', NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'jdoe',       '482c811da5d5b4bc6d497ffa98491e38', 'password123',  'student',  'jdoe@springfield.edu',      'John Doe',             NULL,      NULL,               NULL,                       'STU-1002', 'Computer Science', 'Junior', 3.5, 'XXX-XX-1002', '2002-05-20', '200 Oak St'),
(6, 'jsmith',     '482c811da5d5b4bc6d497ffa98491e38', 'password123',  'student',  'jsmith@springfield.edu',    'Jane Smith',           NULL,      NULL,               NULL,                       'STU-1003', 'Cybersecurity',    'Senior', 3.8, 'XXX-XX-1003', '2001-11-08', '300 Pine Ave'),
(7, 'dr_chen',    'd30b6a4d9e94cbb9db971c6283cfcd9e', 'chen123',      'lecturer', 'echen@springfield.edu',     'Dr. Emily Chen',       'LEC-002', 'Mathematics',      'Lecturer',                 '', NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'prof_miller','4c3d1d8e7e9e6b5c4a3b2a1d0f9e8c7d', 'miller123',   'lecturer', 'smiller@springfield.edu',   'Prof. Sarah Miller',   'LEC-003', 'English',          'Associate Professor',      '', NULL, NULL, NULL, NULL, NULL, NULL);

SELECT setval('users_id_seq', 8);

-- Courses
INSERT INTO courses (id, code, title, instructor, instructor_id, credits, schedule, capacity) VALUES
(1, 'CS301',  'Database Systems',      'Dr. Robert Williams', 4, 3, 'MWF 10:00-10:50', 30),
(2, 'CS401',  'Network Security',      'Dr. Robert Williams', 4, 4, 'TTh 2:00-3:15',   25),
(3, 'MATH201','Calculus II',           'Dr. Emily Chen',      7, 3, 'MWF 9:00-9:50',   35),
(4, 'ENG101', 'English Composition',   'Prof. Sarah Miller',  8, 3, 'TTh 10:00-11:15', 40);

SELECT setval('courses_id_seq', 4);

-- Enrollments (grade is — by default, meaning not yet graded)
INSERT INTO enrollments (id, student_id, course_id, grade) VALUES
(1, 5, 1, 'B+'),
(2, 5, 2, 'A-'),
(3, 6, 2, 'A'),
(4, 6, 3, 'A+'),
(5, 5, 4, 'B'),
(6, 6, 1, 'A-');

SELECT setval('enrollments_id_seq', 6);

-- Announcements
INSERT INTO announcements (title, date, body) VALUES
('Spring Semester Registration Now Open', '2026-07-20', 'Registration for the Spring 2027 semester is now open. Students can enroll via the course catalog.'),
('New Cybersecurity Lab Launch', '2026-07-15', 'Springfield State is proud to announce our new state-of-the-art cybersecurity lab, funded by a $2M grant.'),
('VC Town Hall Meeting', '2026-07-10', 'Prof. James Thornton will host a town hall meeting on August 5th in the Main Auditorium.');
