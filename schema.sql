-- Garuda CBT PostgreSQL Schema
-- Generated from Sequelize models with additional features for PKL, BK, and expanded attendance tracking

-- Users and Authentication Tables
CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_groups (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, group_id)
);

-- Academic Year and Semester
CREATE TABLE academic_years (
  id SERIAL PRIMARY KEY,
  year VARCHAR(9) NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE semesters (
  id SERIAL PRIMARY KEY,
  semester INTEGER NOT NULL,
  name VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Departments and Subjects
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subjects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(20) NOT NULL,
  department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Classes
CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  grade INTEGER NOT NULL,
  department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
  homeroom_teacher_id INTEGER,
  academic_year_id INTEGER REFERENCES academic_years(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teacher and Student Profiles
CREATE TABLE teacher_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  nip VARCHAR(20),
  name VARCHAR(100) NOT NULL,
  gender VARCHAR(10),
  birth_date DATE,
  address TEXT,
  phone VARCHAR(15),
  photo VARCHAR(255),
  qualification VARCHAR(50),
  joining_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE classes ADD CONSTRAINT fk_classes_homeroom_teacher FOREIGN KEY (homeroom_teacher_id) REFERENCES teacher_profiles(id) ON DELETE SET NULL;

CREATE TABLE student_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  student_number VARCHAR(20) NOT NULL UNIQUE,
  nisn VARCHAR(20),
  nis VARCHAR(20),
  name VARCHAR(100) NOT NULL,
  gender VARCHAR(10),
  birth_place VARCHAR(50),
  birth_date DATE,
  religion VARCHAR(20),
  address TEXT,
  phone VARCHAR(15),
  parent_name VARCHAR(100),
  parent_phone VARCHAR(15),
  photo VARCHAR(255),
  entry_year VARCHAR(4),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE class_students (
  id SERIAL PRIMARY KEY,
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  academic_year_id INTEGER NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  semester_id INTEGER NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(class_id, student_id, academic_year_id, semester_id)
);

-- Teacher Journals
CREATE TABLE teacher_journals (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  academic_year_id INTEGER NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  semester_id INTEGER NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  material_topic VARCHAR(255) NOT NULL,
  activity_description TEXT NOT NULL,
  learning_methods VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Class Attendance
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'sick', 'permission');

CREATE TABLE class_attendances (
  id SERIAL PRIMARY KEY,
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status attendance_status NOT NULL DEFAULT 'present',
  notes TEXT,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Extracurricular Activities
CREATE TABLE extracurriculars (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  coach_id INTEGER NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  day VARCHAR(20) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  location VARCHAR(100) NOT NULL,
  max_participants INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE extracurricular_students (
  id SERIAL PRIMARY KEY,
  extracurricular_id INTEGER NOT NULL REFERENCES extracurriculars(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  academic_year_id INTEGER NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  semester_id INTEGER NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
  join_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status VARCHAR(20) DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE extracurricular_attendances (
  id SERIAL PRIMARY KEY,
  extracurricular_id INTEGER NOT NULL REFERENCES extracurriculars(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status attendance_status NOT NULL DEFAULT 'present',
  notes TEXT,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teacher Duty and Student Permission
CREATE TYPE day_of_week AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

CREATE TABLE teacher_duties (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  day_of_week day_of_week NOT NULL,
  academic_year_id INTEGER NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  semester_id INTEGER NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE permission_type AS ENUM ('leave_early', 'late_arrival', 'sick_leave', 'absence_permission', 'other');
CREATE TYPE confirmation_method AS ENUM ('phone', 'written_note', 'in_person', 'sms', 'other');

CREATE TABLE student_permissions (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  permission_type permission_type NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME,
  reason TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT FALSE,
  approved_by_duty_teacher INTEGER REFERENCES teacher_profiles(id) ON DELETE SET NULL,
  parent_confirmation BOOLEAN DEFAULT FALSE,
  parent_confirmation_method confirmation_method,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- E-Learning: Learning Materials and Assignments
CREATE TABLE learning_materials (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT,
  file_path VARCHAR(255),
  teacher_id INTEGER NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  academic_year_id INTEGER NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  semester_id INTEGER NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
  publish_date DATE NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assignments (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  instructions TEXT NOT NULL,
  file_path VARCHAR(255),
  teacher_id INTEGER NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  academic_year_id INTEGER NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  semester_id INTEGER NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
  publish_date DATE NOT NULL,
  due_date DATE NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  max_score FLOAT DEFAULT 100,
  allow_late_submission BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assignment_submissions (
  id SERIAL PRIMARY KEY,
  assignment_id INTEGER NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  submission_text TEXT,
  file_path VARCHAR(255),
  submission_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_late BOOLEAN DEFAULT FALSE,
  score FLOAT,
  feedback TEXT,
  graded_at TIMESTAMP,
  graded_by INTEGER REFERENCES teacher_profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Exam System
CREATE TABLE exam_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(20) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exam_sessions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(20) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exam_rooms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(20) NOT NULL,
  capacity INTEGER NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_banks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  teacher_id INTEGER NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  grade_level INTEGER,
  difficulty_level VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  question_bank_id INTEGER NOT NULL REFERENCES question_banks(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type VARCHAR(20) NOT NULL,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  option_e TEXT,
  correct_answer VARCHAR(1),
  explanation TEXT,
  points INTEGER DEFAULT 1,
  difficulty_level VARCHAR(20),
  image_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exam_schedules (
  id SERIAL PRIMARY KEY,
  exam_type_id INTEGER NOT NULL REFERENCES exam_types(id) ON DELETE CASCADE,
  subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  question_bank_id INTEGER NOT NULL REFERENCES question_banks(id) ON DELETE CASCADE,
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  academic_year_id INTEGER NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  semester_id INTEGER NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
  exam_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  duration INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  random_questions BOOLEAN DEFAULT TRUE,
  show_result BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exam_tokens (
  id SERIAL PRIMARY KEY,
  exam_schedule_id INTEGER NOT NULL REFERENCES exam_schedules(id) ON DELETE CASCADE,
  token VARCHAR(20) NOT NULL,
  session_id INTEGER NOT NULL REFERENCES exam_sessions(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT TRUE,
  expiry_time TIMESTAMP NOT NULL,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE student_exam_rooms (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  room_id INTEGER NOT NULL REFERENCES exam_rooms(id) ON DELETE CASCADE,
  exam_number VARCHAR(20),
  academic_year_id INTEGER NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  semester_id INTEGER NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE student_exam_sessions (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  session_id INTEGER NOT NULL REFERENCES exam_sessions(id) ON DELETE CASCADE,
  exam_schedule_id INTEGER NOT NULL REFERENCES exam_schedules(id) ON DELETE CASCADE,
  academic_year_id INTEGER NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  semester_id INTEGER NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE student_questions (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  exam_schedule_id INTEGER NOT NULL REFERENCES exam_schedules(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  student_answer VARCHAR(1),
  is_correct BOOLEAN,
  score FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exam_results (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  exam_schedule_id INTEGER NOT NULL REFERENCES exam_schedules(id) ON DELETE CASCADE,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  total_questions INTEGER,
  correct_answers INTEGER,
  score FLOAT,
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Report Card System
CREATE TABLE report_card_settings (
  id SERIAL PRIMARY KEY,
  academic_year_id INTEGER NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  semester_id INTEGER NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
  grade_scale_type VARCHAR(20) NOT NULL DEFAULT 'numeric',
  min_passing_grade FLOAT NOT NULL DEFAULT 70.0,
  attendance_weight FLOAT NOT NULL DEFAULT 10.0,
  assignment_weight FLOAT NOT NULL DEFAULT 20.0,
  daily_test_weight FLOAT NOT NULL DEFAULT 20.0,
  midterm_weight FLOAT NOT NULL DEFAULT 20.0,
  final_weight FLOAT NOT NULL DEFAULT 30.0,
  show_rank BOOLEAN DEFAULT TRUE,
  show_principal_signature BOOLEAN DEFAULT TRUE,
  principal_name VARCHAR(100),
  principal_id_number VARCHAR(50),
  principal_signature_path VARCHAR(255),
  school_logo_path VARCHAR(255),
  report_header TEXT,
  report_footer TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE report_cards (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  academic_year_id INTEGER NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  semester_id INTEGER NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
  homeroom_teacher_id INTEGER NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  rank_in_class INTEGER,
  total_students INTEGER,
  attendance_present INTEGER DEFAULT 0,
  attendance_sick INTEGER DEFAULT 0,
  attendance_absent INTEGER DEFAULT 0,
  attendance_permission INTEGER DEFAULT 0,
  behavior_grade VARCHAR(20),
  behavior_notes TEXT,
  social_grade VARCHAR(20),
  social_notes TEXT,
  health_condition TEXT,
  height_start FLOAT,
  height_end FLOAT,
  weight_start FLOAT,
  weight_end FLOAT,
  achievement_notes TEXT,
  homeroom_notes TEXT,
  parent_notes TEXT,
  is_promoted BOOLEAN,
  promoted_to_class VARCHAR(50),
  principal_approval BOOLEAN DEFAULT FALSE,
  homeroom_approval BOOLEAN DEFAULT FALSE,
  report_date DATE,
  is_final BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE report_card_subjects (
  id SERIAL PRIMARY KEY,
  report_card_id INTEGER NOT NULL REFERENCES report_cards(id) ON DELETE CASCADE,
  subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  teacher_id INTEGER NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  assignment_score FLOAT,
  daily_test_score FLOAT,
  midterm_score FLOAT,
  final_score FLOAT,
  final_grade FLOAT,
  letter_grade VARCHAR(2),
  competency_description TEXT,
  teacher_notes TEXT,
  minimum_competency FLOAT,
  class_average FLOAT,
  class_highest FLOAT,
  class_lowest FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE extracurricular_reports (
  id SERIAL PRIMARY KEY,
  report_card_id INTEGER NOT NULL REFERENCES report_cards(id) ON DELETE CASCADE,
  extracurricular_id INTEGER NOT NULL REFERENCES extracurriculars(id) ON DELETE CASCADE,
  grade VARCHAR(20) NOT NULL,
  description TEXT,
  coach_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE achievement_type AS ENUM ('academic', 'non-academic', 'sports', 'arts', 'other');
CREATE TYPE achievement_level AS ENUM ('school', 'district', 'city', 'province', 'national', 'international');

CREATE TABLE student_achievements (
  id SERIAL PRIMARY KEY,
  report_card_id INTEGER REFERENCES report_cards(id) ON DELETE SET NULL,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  achievement_type achievement_type NOT NULL,
  achievement_level achievement_level NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  achievement_date DATE NOT NULL,
  organizer VARCHAR(100),
  position VARCHAR(50),
  certificate_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- School Profile
CREATE TYPE school_type AS ENUM ('SD', 'MI', 'SMP', 'MTs', 'SMA', 'MA', 'SMK', 'other');
CREATE TYPE school_status AS ENUM ('public', 'private');

CREATE TABLE school_profiles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  npsn VARCHAR(20),
  nsm VARCHAR(20),
  address TEXT NOT NULL,
  postal_code VARCHAR(10),
  village VARCHAR(100),
  district VARCHAR(100),
  city VARCHAR(100) NOT NULL,
  province VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(100),
  website VARCHAR(100),
  logo_path VARCHAR(255),
  principal_name VARCHAR(100),
  principal_id_number VARCHAR(50),
  principal_signature_path VARCHAR(255),
  school_type school_type NOT NULL,
  school_status school_status NOT NULL DEFAULT 'public',
  foundation_name VARCHAR(100),
  accreditation VARCHAR(10),
  decree_number VARCHAR(50),
  decree_date DATE,
  operational_permit VARCHAR(50),
  founded_year INTEGER,
  land_area FLOAT,
  building_area FLOAT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Settings
CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(50) NOT NULL UNIQUE,
  value TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Offices (for PKL/Internships)
CREATE TABLE offices (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  radius INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PKL Internships
CREATE TYPE internship_status AS ENUM ('pending', 'active', 'inactive');

CREATE TABLE pkl_internships (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  guru_pembimbing_id INTEGER NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  office_id INTEGER NOT NULL REFERENCES offices(id) ON DELETE CASCADE,
  company_leader VARCHAR(255) NOT NULL,
  company_type VARCHAR(255) NOT NULL,
  company_phone VARCHAR(20) NOT NULL,
  company_description TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  position VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  description TEXT NOT NULL,
  status internship_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PKL Journals
CREATE TABLE jurnal_pkl (
  id SERIAL PRIMARY KEY,
  pkl_internship_id INTEGER NOT NULL REFERENCES pkl_internships(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  activity_description TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  verified_by INTEGER REFERENCES teacher_profiles(id) ON DELETE SET NULL,
  verified_at TIMESTAMP,
  verification_status VARCHAR(20) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student Mutations
CREATE TYPE mutation_type AS ENUM ('masuk', 'keluar');
CREATE TYPE mutation_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE mutations (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  tanggal DATE NOT NULL,
  jenis mutation_type NOT NULL,
  alasan TEXT NOT NULL,
  sekolah_asal VARCHAR(255),
  sekolah_tujuan VARCHAR(255),
  status mutation_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Prayer Attendance
CREATE TYPE prayer_status AS ENUM ('hadir', 'izin', 'alpha');

CREATE TABLE prayer_attendances (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  check_in TIME,
  status prayer_status NOT NULL DEFAULT 'alpha',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Counseling (BK)
CREATE TABLE counseling (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  teacher_id INTEGER NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  problem_category VARCHAR(100) NOT NULL,
  problem_description TEXT NOT NULL,
  action_taken TEXT,
  recommendations TEXT,
  follow_up TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Home Visits
CREATE TABLE home_visits (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  teacher_id INTEGER NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  visit_date DATE NOT NULL,
  purpose TEXT NOT NULL,
  findings TEXT,
  recommendations TEXT,
  follow_up_required BOOLEAN DEFAULT FALSE,
  follow_up_date DATE,
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Career Guidance
CREATE TABLE career_guidance (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  class_room_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  assessment_name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  score FLOAT NOT NULL,
  description TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assessments
CREATE TABLE assessments (
  id SERIAL PRIMARY KEY,
  class_room_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  teacher_id INTEGER NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  assessment_name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student Assessments
CREATE TABLE student_assessments (
  id SERIAL PRIMARY KEY,
  assessment_id INTEGER NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  score FLOAT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(assessment_id, student_id)
);

-- Teaching Activities
CREATE TABLE teaching_activities (
  id SERIAL PRIMARY KEY,
  guru_id INTEGER NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  class_room_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  mata_pelajaran VARCHAR(255) NOT NULL,
  materi TEXT NOT NULL,
  jam_mulai TIME NOT NULL,
  jam_selesai TIME NOT NULL,
  media_dan_alat VARCHAR(255),
  important_notes TEXT,
  tanggal DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teaching Activity Attendances
CREATE TABLE teaching_activity_attendances (
  id SERIAL PRIMARY KEY,
  teaching_activity_id INTEGER NOT NULL REFERENCES teaching_activities(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  status attendance_status NOT NULL DEFAULT 'present',
  keterangan TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(teaching_activity_id, student_id)
);

-- Extracurricular Activities
CREATE TABLE extracurricular_activities (
  id SERIAL PRIMARY KEY,
  extracurricular_id INTEGER NOT NULL REFERENCES extracurriculars(id) ON DELETE CASCADE,
  tanggal DATE NOT NULL,
  jam_mulai TIME NOT NULL,
  jam_selesai TIME NOT NULL,
  materi TEXT NOT NULL,
  important_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Extracurricular Activity Attendances
CREATE TABLE extracurricular_activity_attendances (
  id SERIAL PRIMARY KEY,
  extracurricular_activity_id INTEGER NOT NULL REFERENCES extracurricular_activities(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  status attendance_status NOT NULL DEFAULT 'present',
  keterangan TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(extracurricular_activity_id, student_id)
);

-- QR Attendance Sessions
CREATE TABLE qr_attendance_sessions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  qr_code TEXT NOT NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  location_latitude DOUBLE PRECISION,
  location_longitude DOUBLE PRECISION,
  max_distance INTEGER DEFAULT 100,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- QR Attendance Records
CREATE TABLE qr_attendance_records (
  id SERIAL PRIMARY KEY,
  session_id INTEGER NOT NULL REFERENCES qr_attendance_sessions(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  scan_time TIMESTAMP NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  distance INTEGER,
  device_info TEXT,
  is_valid BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial Data
INSERT INTO groups (name) VALUES ('admin'), ('teacher'), ('student');

-- Default admin user (password: admin123)
INSERT INTO users (username, password, email, first_name, last_name, active) 
VALUES ('admin', '$2a$10$2b8rn4.aP9jq9YBv4kCyL.K6Hg5rs.KFEQhKI0GPGqwGYFp3YFzjG', 'admin@garudacbt.com', 'Admin', 'User', true);

-- Link admin user to admin group
INSERT INTO user_groups (user_id, group_id) VALUES (1, 1);

-- Create default settings
INSERT INTO settings (key, value, description) 
VALUES 
('school_name', 'Garuda CBT School', 'Name of the school'),
('school_address', 'Jl. Pendidikan No. 123', 'Address of the school'),
('school_phone', '021-1234567', 'Phone number of the school'),
('school_email', 'info@garudacbt.com', 'Email address of the school'),
('app_version', '1.0.0', 'Application version');

-- Create an academic year
INSERT INTO academic_years (year, is_active) VALUES ('2024/2025', true);

-- Create semesters
INSERT INTO semesters (semester, name, start_date, end_date, is_active)
VALUES 
(1, 'Semester 1', '2024-07-15', '2024-12-15', true),
(2, 'Semester 2', '2025-01-05', '2025-06-15', false);
