import request from '@/utils/request'

// Data Umum
export function getMasterData(query) {
  return request({
    url: '/api/v1/master',
    method: 'get',
    params: query
  })
}

// Tahun Pelajaran
export function getAcademicYears(query) {
  return request({
    url: '/api/v1/master/academic-years',
    method: 'get',
    params: query
  })
}

export function getAcademicYear(id) {
  return request({
    url: `/api/v1/master/academic-years/${id}`,
    method: 'get'
  })
}

export function createAcademicYear(data) {
  return request({
    url: '/api/v1/master/academic-years',
    method: 'post',
    data
  })
}

export function updateAcademicYear(data) {
  return request({
    url: `/api/v1/master/academic-years/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteAcademicYear(id) {
  return request({
    url: `/api/v1/master/academic-years/${id}`,
    method: 'delete'
  })
}

// Jurusan
export function getDepartments(query) {
  return request({
    url: '/api/v1/master/departments',
    method: 'get',
    params: query
  })
}

export function getDepartment(id) {
  return request({
    url: `/api/v1/master/departments/${id}`,
    method: 'get'
  })
}

export function createDepartment(data) {
  return request({
    url: '/api/v1/master/departments',
    method: 'post',
    data
  })
}

export function updateDepartment(data) {
  return request({
    url: `/api/v1/master/departments/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteDepartment(id) {
  return request({
    url: `/api/v1/master/departments/${id}`,
    method: 'delete'
  })
}

// Mata Pelajaran
export function getSubjects(query) {
  return request({
    url: '/api/v1/master/subjects',
    method: 'get',
    params: query
  })
}

export function getSubject(id) {
  return request({
    url: `/api/v1/master/subjects/${id}`,
    method: 'get'
  })
}

export function createSubject(data) {
  return request({
    url: '/api/v1/master/subjects',
    method: 'post',
    data
  })
}

export function updateSubject(data) {
  return request({
    url: `/api/v1/master/subjects/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteSubject(id) {
  return request({
    url: `/api/v1/master/subjects/${id}`,
    method: 'delete'
  })
}

// Kelas / Rombel
export function getClasses(query) {
  return request({
    url: '/api/v1/master/classes',
    method: 'get',
    params: query
  })
}

export function getClass(id) {
  return request({
    url: `/api/v1/master/classes/${id}`,
    method: 'get'
  })
}

export function createClass(data) {
  return request({
    url: '/api/v1/master/classes',
    method: 'post',
    data
  })
}

export function updateClass(data) {
  return request({
    url: `/api/v1/master/classes/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteClass(id) {
  return request({
    url: `/api/v1/master/classes/${id}`,
    method: 'delete'
  })
}

// Guru
export function getTeachers(query) {
  return request({
    url: '/api/v1/master/teachers',
    method: 'get',
    params: query
  })
}

export function getTeacher(id) {
  return request({
    url: `/api/v1/master/teachers/${id}`,
    method: 'get'
  })
}

export function createTeacher(data) {
  return request({
    url: '/api/v1/master/teachers',
    method: 'post',
    data
  })
}

export function updateTeacher(data) {
  return request({
    url: `/api/v1/master/teachers/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteTeacher(id) {
  return request({
    url: `/api/v1/master/teachers/${id}`,
    method: 'delete'
  })
}

// Siswa
export function getStudents(query) {
  return request({
    url: '/api/v1/student',
    method: 'get',
    params: query
  })
}

export function getStudent(id) {
  return request({
    url: `/api/v1/student/${id}`,
    method: 'get'
  })
}

export function createStudent(data) {
  return request({
    url: '/api/v1/student',
    method: 'post',
    data
  })
}

export function updateStudent(data) {
  return request({
    url: `/api/v1/student/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteStudent(id) {
  return request({
    url: `/api/v1/student/${id}`,
    method: 'delete'
  })
}

// Ekstrakurikuler
export function getExtracurriculars(query) {
  return request({
    url: '/api/v1/extracurricular',
    method: 'get',
    params: query
  })
}

export function getExtracurricular(id) {
  return request({
    url: `/api/v1/extracurricular/${id}`,
    method: 'get'
  })
}

export function createExtracurricular(data) {
  return request({
    url: '/api/v1/extracurricular',
    method: 'post',
    data
  })
}

export function updateExtracurricular(data) {
  return request({
    url: `/api/v1/extracurricular/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteExtracurricular(id) {
  return request({
    url: `/api/v1/extracurricular/${id}`,
    method: 'delete'
  })
}
