# Core Features of Garuda CBT Application

This document outlines the core functionalities identified from the Garuda CBT PHP application's source code, primarily focusing on controllers and models. This analysis serves as a basis for migrating the application to Node.js Express with PostgreSQL.

## Authentication and User Management

The application implements a role-based access control system using the Ion Auth library, adapted within its controllers and models. It manages distinct user roles: administrators, teachers (guru), and students (siswa). The `Auth` controller handles user login and logout processes, validating credentials against the database (`users` table, managed partly by `Ion_auth_model`). User registration or initial setup seems handled separately, possibly during installation or by administrators.

User management functionalities are distributed across several controllers. `Useradmin`, `Userguru`, and `Usersiswa` controllers likely manage the specific operations related to administrators, teachers, and students respectively, interfacing with the `Users_model` and potentially `Master_model` for data operations like creating, reading, updating, and deleting user accounts and profiles. The `groups` table defines the roles, and the `users_groups` table links users to their respective roles. Detailed user information, including personal data and credentials, is stored in the `users` table, while specific profiles for teachers and students are maintained in `master_guru` and `master_siswa` tables.



## Computer-Based Testing (CBT) Module

The core of the application revolves around computer-based testing. The `Cbt` controller, along with the extensive `Cbt_model`, manages the primary testing functionalities. This includes creating and managing question banks (`cbt_bank_soal` table), which store questions of various types (multiple choice, essay, complex multiple choice, matching, short answer) categorized by subject (`master_mapel`), grade level (`bank_level`), and teacher (`master_guru`). The `Banksoal` controller likely provides the interface for teachers to manage these question banks.

Exam scheduling is handled via the `Cbtjadwal` controller, interacting with the `cbt_jadwal` table. This allows administrators or teachers to define exam schedules, specifying the question bank to use, the target classes, start and end times, duration, and various settings like randomizing questions (`acak_soal`) and options (`acak_opsi`), displaying results (`hasil_tampil`), and requiring a token (`token`). The system also manages exam sessions (`cbt_sesi`) and assigns students to specific rooms (`cbt_ruang`) and sessions (`cbt_kelas_ruang`, `cbt_sesi_siswa`).

## Student Examination Process

Students interact with the system primarily through the `Siswa` controller. When an exam is active, students log in and access the scheduled test. The system tracks student progress using the `cbt_durasi_siswa` table, recording start time, end time, and current status (not started, ongoing, finished). The `cbt_soal_siswa` table stores the specific questions presented to each student (potentially randomized) and their corresponding answers. The system supports various question types, including multiple choice, complex multiple choice, matching, short answer, and essays. Answers for objective questions are likely auto-graded, while essays require manual grading by teachers. The `Hasilujian` controller might be involved in displaying results to students after the exam, depending on the schedule settings.

## Master Data Management

The application includes comprehensive modules for managing master data essential for school operations. This includes managing academic years (`master_tp`) and semesters (`master_smt`), departments or majors (`master_jurusan`), classes (`master_kelas`), subjects (`master_mapel`), teachers (`master_guru`), and students (`master_siswa`). Controllers like `Datatp`, `Datasmt`, `Datajurusan`, `Datakelas`, `Datamapel`, `Userguru`, and `Datasiswa` provide interfaces for administrators to manage this data. This master data forms the foundation for scheduling exams, assigning students to classes, and managing user roles.

## Classroom and Academic Features

Beyond CBT, the application supports various classroom management and academic features. Controllers like `Kelasmateri`, `Kelasjadwal`, `Kelasabsensi`, `Kelasnilai`, and `Kelascatatan` suggest functionalities for managing course materials, class schedules, attendance tracking, grade input (potentially separate from CBT results), and teacher notes or student conduct records. The `Rapor` controller and associated `rapor_*` tables indicate a significant module dedicated to generating student report cards, calculating final grades based on various assessments (daily tests, midterms, final exams), managing KKM (minimum passing criteria), and recording student achievements, attitudes, and physical condition.

## System Settings and Administration

Administrative functions are handled through controllers like `Settings`, `Dbmanager`, `Dbclear`, and `Update`. The `Settings` controller likely allows administrators to configure application-wide parameters stored in the `setting` table, such as school details, logos, and potentially CBT or report card settings. `Dbmanager` and `Dbclear` suggest database management utilities, possibly for backups or clearing test data. The `Update` controller might handle application updates or migrations. API settings (`api_setting`) and token management (`api_token`) suggest potential integration with external applications or mobile clients.

