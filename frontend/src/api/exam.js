import request from '@/utils/request'

// Jenis Ujian
export function getExamTypes(query) {
  return request({
    url: '/api/v1/exam-types',
    method: 'get',
    params: query
  })
}

export function getExamType(id) {
  return request({
    url: `/api/v1/exam-types/${id}`,
    method: 'get'
  })
}

export function createExamType(data) {
  return request({
    url: '/api/v1/exam-types',
    method: 'post',
    data
  })
}

export function updateExamType(data) {
  return request({
    url: `/api/v1/exam-types/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteExamType(id) {
  return request({
    url: `/api/v1/exam-types/${id}`,
    method: 'delete'
  })
}

// Sesi
export function getExamSessions(query) {
  return request({
    url: '/api/v1/exam-sessions',
    method: 'get',
    params: query
  })
}

export function getExamSession(id) {
  return request({
    url: `/api/v1/exam-sessions/${id}`,
    method: 'get'
  })
}

export function createExamSession(data) {
  return request({
    url: '/api/v1/exam-sessions',
    method: 'post',
    data
  })
}

export function updateExamSession(data) {
  return request({
    url: `/api/v1/exam-sessions/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteExamSession(id) {
  return request({
    url: `/api/v1/exam-sessions/${id}`,
    method: 'delete'
  })
}

// Ruang
export function getExamRooms(query) {
  return request({
    url: '/api/v1/exam-rooms',
    method: 'get',
    params: query
  })
}

export function getExamRoom(id) {
  return request({
    url: `/api/v1/exam-rooms/${id}`,
    method: 'get'
  })
}

export function createExamRoom(data) {
  return request({
    url: '/api/v1/exam-rooms',
    method: 'post',
    data
  })
}

export function updateExamRoom(data) {
  return request({
    url: `/api/v1/exam-rooms/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteExamRoom(id) {
  return request({
    url: `/api/v1/exam-rooms/${id}`,
    method: 'delete'
  })
}

// Bank Soal
export function getQuestionBanks(query) {
  return request({
    url: '/api/v1/question-banks',
    method: 'get',
    params: query
  })
}

export function getQuestionBank(id) {
  return request({
    url: `/api/v1/question-banks/${id}`,
    method: 'get'
  })
}

export function createQuestionBank(data) {
  return request({
    url: '/api/v1/question-banks',
    method: 'post',
    data
  })
}

export function updateQuestionBank(data) {
  return request({
    url: `/api/v1/question-banks/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteQuestionBank(id) {
  return request({
    url: `/api/v1/question-banks/${id}`,
    method: 'delete'
  })
}

// Jadwal Ujian
export function getExamSchedules(query) {
  return request({
    url: '/api/v1/exam-schedules',
    method: 'get',
    params: query
  })
}

export function getExamSchedule(id) {
  return request({
    url: `/api/v1/exam-schedules/${id}`,
    method: 'get'
  })
}

export function createExamSchedule(data) {
  return request({
    url: '/api/v1/exam-schedules',
    method: 'post',
    data
  })
}

export function updateExamSchedule(data) {
  return request({
    url: `/api/v1/exam-schedules/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteExamSchedule(id) {
  return request({
    url: `/api/v1/exam-schedules/${id}`,
    method: 'delete'
  })
}

// Hasil Ujian
export function getExamResults(query) {
  return request({
    url: '/api/v1/exam-results',
    method: 'get',
    params: query
  })
}

export function getExamResult(id) {
  return request({
    url: `/api/v1/exam-results/${id}`,
    method: 'get'
  })
}

export function updateExamResult(data) {
  return request({
    url: `/api/v1/exam-results/${data.id}`,
    method: 'put',
    data
  })
}
