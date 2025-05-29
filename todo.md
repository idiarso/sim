# Project Todo List: Garuda CBT Frontend Implementation

This list tracks the frontend UI components that need to be implemented based on the CHECKLIST.md found in the repository.

## Core Features
- [x] Implement Beranda (Dashboard.vue)

## Data Master
- [x] Implement Data Umum (DataMaster.vue)
- [ ] Implement Tahun Pelajaran (AcademicYears.vue)
- [ ] Implement Jurusan (Departments.vue)
- [ ] Implement Mata Pelajaran (Subjects.vue)
- [ ] Implement Ekstrakurikuler (Extracurricular.vue)
- [ ] Implement Siswa (Students.vue)
- [ ] Implement Kelas / Rombel (Classes.vue)
- [ ] Implement Guru (Teachers.vue)

## Data E-Learning
- [x] Implement Jadwal Pelajaran (ClassSchedule.vue) - Dashboard only
- [x] Implement Materi (LearningMaterials.vue) - Dashboard only
- [x] Implement Tugas (Assignments.vue) - Dashboard only
- [x] Implement Jadwal Materi/Tugas (MaterialSchedule.vue) - Dashboard only

## Data Ujian
- [x] Implement Jenis Ujian (ExamTypes.vue) - Dashboard only
- [x] Implement Sesi (ExamSessions.vue) - Dashboard only
- [x] Implement Ruang (ExamRooms.vue) - Dashboard only
- [x] Implement Atur Ruang dan Sesi (RoomSessionMapping.vue) - Dashboard only
- [x] Implement Atur Nomor Peserta (ExamParticipants.vue) - Dashboard only
- [x] Implement Bank Soal (QuestionBanks.vue) - Dashboard only
- [x] Implement Jadwal (ExamSchedules.vue) - Dashboard only
- [x] Implement Alokasi Waktu (ExamDurations.vue) - Dashboard only
- [x] Implement Token (ExamTokens.vue) - Dashboard only
- [x] Implement Pengumuman (Announcements.vue) - Dashboard only

## Pelaksanaan
- [ ] Implement Hasil E-Learning (ELearningResults.vue)
- [ ] Implement Nilai Harian (DailyGrades.vue)
- [x] Implement Kehadiran Harian (DailyAttendance.vue) - Dashboard only
- [x] Implement Kehadiran Bulanan (MonthlyAttendance.vue) - Dashboard only
- [ ] Implement Rekap Nilai (GradeSummary.vue)
- [ ] Implement Pelaksanaan Ujian (ExamImplementation.vue)
- [ ] Implement Cetak (PrintReports.vue)
- [ ] Implement Status Siswa (StudentStatus.vue)
- [x] Implement Hasil Ujian (ExamResults.vue) - Dashboard only
- [x] Implement Analisis Soal (QuestionAnalysis.vue) - Dashboard only
- [ ] Implement Rekap Nilai Ujian (ExamGradeSummary.vue)

## Rapor
- [ ] Implement Setting Rapor (ReportCardSettings.vue)
- [ ] Implement Kumpulan Nilai Rapor (ReportCards.vue)
- [ ] Implement Buku Induk (StudentRecord.vue)
- [ ] Implement Alumni (Alumni.vue)

## Pengaturan
- [ ] Implement User Management (UserManagement.vue)
- [ ] Implement Administrator (Administrators.vue)
- [ ] Implement Guru (TeacherUsers.vue)
- [ ] Implement Siswa (StudentUsers.vue)
- [ ] Implement Database (DatabaseManagement.vue)
- [ ] Implement Backup/Restore (BackupRestore.vue)
- [ ] Implement Update (SystemUpdate.vue) - *Backend also not implemented*

## Additional Features
- [ ] Implement Teacher Duty (Piket) (TeacherDuty.vue)
- [ ] Implement Student Permission (StudentPermission.vue)

## New Features from SIM SKANSA
- [ ] Implement Teaching Activities (TeachingActivities.vue)
- [ ] Implement Extracurricular Activities (ExtracurricularActivities.vue)
- [x] Implement Prayer Attendance (PrayerAttendance.vue) - Dashboard only
- [ ] Implement Career Guidance (CareerGuidance.vue)
- [ ] Implement Counseling (BK) (Counseling.vue)
- [ ] Implement Home Visits (HomeVisits.vue)
- [x] Implement Student Internships (PKL) (PklInternships.vue) - Dashboard only
- [x] Implement PKL Journal (JurnalPkl.vue) - Dashboard only
- [ ] Implement Student Mutations (StudentMutations.vue)
- [x] Implement QR Attendance System (AttendanceQr.vue) - Dashboard only
- [ ] Implement Location Tracking (LocationTracking.vue)

## Special Features (Frontend)
- [ ] Implement Soal gambar menjodohkan UI
- [ ] Implement Soal gambar tanpa text UI
- [ ] Implement Search/paging rekap nilai UI
- [ ] Implement Search kelas/rombel UI
- [ ] Implement Search status ujian UI
- [ ] Implement NIS list siswa di menu edit kelas UI
- [ ] Implement Detect new tab during exam UI - *Requires frontend implementation*
- [ ] Implement Maps Integration UI
- [x] Implement QR Code Generation UI - Dashboard only
- [ ] Implement Import/Export Excel UI
- [x] Implement Prayer Attendance Tracking UI - Dashboard only
- [x] Implement PKL/Internship Management UI - Dashboard only
- [ ] Implement Counseling Records UI

## Integration Steps (From CHECKLIST.md)
- [x] Setup vue-element-admin
- [x] Configure API Connection (Added: master.js, elearning.js, exam.js, attendance.js)
- [x] Customize Views (Added: Dashboard, DataMaster, E-Learning, Exam, Attendance dashboards)
- [x] Authentication Integration (Basic setup)
- [ ] Theme Customization
- [ ] Database Integration (Backend seems ready)
