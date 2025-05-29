import request from '@/utils/request'

// Jadwal Pelajaran
export function getSchedules(query) {
  return request({
    url: '/api/v1/schedule',
    method: 'get',
    params: query
  })
}

export function getSchedule(id) {
  return request({
    url: `/api/v1/schedule/${id}`,
    method: 'get'
  })
}

export function createSchedule(data) {
  return request({
    url: '/api/v1/schedule',
    method: 'post',
    data
  })
}

export function updateSchedule(data) {
  return request({
    url: `/api/v1/schedule/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteSchedule(id) {
  return request({
    url: `/api/v1/schedule/${id}`,
    method: 'delete'
  })
}

// Materi
export function getLearningMaterials(query) {
  return request({
    url: '/api/v1/learning-materials',
    method: 'get',
    params: query
  })
}

export function getLearningMaterial(id) {
  return request({
    url: `/api/v1/learning-materials/${id}`,
    method: 'get'
  })
}

export function createLearningMaterial(data) {
  return request({
    url: '/api/v1/learning-materials',
    method: 'post',
    data
  })
}

export function updateLearningMaterial(data) {
  return request({
    url: `/api/v1/learning-materials/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteLearningMaterial(id) {
  return request({
    url: `/api/v1/learning-materials/${id}`,
    method: 'delete'
  })
}

// Tugas
export function getAssignments(query) {
  return request({
    url: '/api/v1/assignments',
    method: 'get',
    params: query
  })
}

export function getAssignment(id) {
  return request({
    url: `/api/v1/assignments/${id}`,
    method: 'get'
  })
}

export function createAssignment(data) {
  return request({
    url: '/api/v1/assignments',
    method: 'post',
    data
  })
}

export function updateAssignment(data) {
  return request({
    url: `/api/v1/assignments/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteAssignment(id) {
  return request({
    url: `/api/v1/assignments/${id}`,
    method: 'delete'
  })
}

// Jadwal Materi/Tugas
export function getMaterialSchedules(query) {
  return request({
    url: '/api/v1/schedule/materials',
    method: 'get',
    params: query
  })
}

export function getMaterialSchedule(id) {
  return request({
    url: `/api/v1/schedule/materials/${id}`,
    method: 'get'
  })
}

export function createMaterialSchedule(data) {
  return request({
    url: '/api/v1/schedule/materials',
    method: 'post',
    data
  })
}

export function updateMaterialSchedule(data) {
  return request({
    url: `/api/v1/schedule/materials/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteMaterialSchedule(id) {
  return request({
    url: `/api/v1/schedule/materials/${id}`,
    method: 'delete'
  })
}
