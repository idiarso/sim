import request from '@/utils/request'

// Kehadiran Harian
export function getDailyAttendance(query) {
  return request({
    url: '/api/v1/class-attendance',
    method: 'get',
    params: query
  })
}

export function getClassAttendanceByDate(classId, date) {
  return request({
    url: `/api/v1/class-attendance/class/${classId}/date/${date}`,
    method: 'get'
  })
}

export function createBulkAttendance(data) {
  return request({
    url: '/api/v1/class-attendance/bulk',
    method: 'post',
    data
  })
}

export function updateAttendance(id, data) {
  return request({
    url: `/api/v1/class-attendance/${id}`,
    method: 'put',
    data
  })
}

export function getStudentAttendanceSummary(query) {
  return request({
    url: '/api/v1/class-attendance/student/summary',
    method: 'get',
    params: query
  })
}

// Kehadiran Bulanan
export function getMonthlyAttendance(query) {
  return request({
    url: '/api/v1/class-attendance/monthly',
    method: 'get',
    params: query
  })
}

// Prayer Attendance
export function getPrayerAttendance(query) {
  return request({
    url: '/api/v1/prayer-attendance',
    method: 'get',
    params: query
  })
}

export function getPrayerAttendanceById(id) {
  return request({
    url: `/api/v1/prayer-attendance/${id}`,
    method: 'get'
  })
}

export function createPrayerAttendance(data) {
  return request({
    url: '/api/v1/prayer-attendance',
    method: 'post',
    data
  })
}

export function updatePrayerAttendance(id, data) {
  return request({
    url: `/api/v1/prayer-attendance/${id}`,
    method: 'put',
    data
  })
}

export function deletePrayerAttendance(id) {
  return request({
    url: `/api/v1/prayer-attendance/${id}`,
    method: 'delete'
  })
}

// PKL/Internship Attendance
export function getPklAttendance(query) {
  return request({
    url: '/api/v1/pkl-internships',
    method: 'get',
    params: query
  })
}

export function getPklAttendanceById(id) {
  return request({
    url: `/api/v1/pkl-internships/${id}`,
    method: 'get'
  })
}

export function createPklAttendance(data) {
  return request({
    url: '/api/v1/pkl-internships',
    method: 'post',
    data
  })
}

export function updatePklAttendance(id, data) {
  return request({
    url: `/api/v1/pkl-internships/${id}`,
    method: 'put',
    data
  })
}

export function deletePklAttendance(id) {
  return request({
    url: `/api/v1/pkl-internships/${id}`,
    method: 'delete'
  })
}

// PKL Journal
export function getPklJournals(query) {
  return request({
    url: '/api/v1/jurnal-pkl',
    method: 'get',
    params: query
  })
}

export function getPklJournalById(id) {
  return request({
    url: `/api/v1/jurnal-pkl/${id}`,
    method: 'get'
  })
}

export function createPklJournal(data) {
  return request({
    url: '/api/v1/jurnal-pkl',
    method: 'post',
    data
  })
}

export function updatePklJournal(id, data) {
  return request({
    url: `/api/v1/jurnal-pkl/${id}`,
    method: 'put',
    data
  })
}

export function deletePklJournal(id) {
  return request({
    url: `/api/v1/jurnal-pkl/${id}`,
    method: 'delete'
  })
}

// QR Attendance
export function getQrAttendance(query) {
  return request({
    url: '/api/v1/attendance-qr',
    method: 'get',
    params: query
  })
}

export function generateQrCode(data) {
  return request({
    url: '/api/v1/attendance-qr/generate',
    method: 'post',
    data
  })
}

export function scanQrCode(data) {
  return request({
    url: '/api/v1/attendance-qr/scan',
    method: 'post',
    data
  })
}
