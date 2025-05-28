import request from '@/utils/request'

/**
 * Get PKL internship list with pagination and filters
 * @param {Object} query - Query parameters
 * @returns {Promise} Promise with internship list
 */
export function fetchInternships(query) {
  return request({
    url: '/api/v1/pkl-internships',
    method: 'get',
    params: query
  })
}

/**
 * Get PKL internship by ID
 * @param {Number} id - Internship ID
 * @returns {Promise} Promise with internship data
 */
export function getInternship(id) {
  return request({
    url: `/api/v1/pkl-internships/${id}`,
    method: 'get'
  })
}

/**
 * Create new PKL internship
 * @param {Object} data - Internship data
 * @returns {Promise} Promise with created internship
 */
export function createInternship(data) {
  return request({
    url: '/api/v1/pkl-internships',
    method: 'post',
    data
  })
}

/**
 * Update existing PKL internship
 * @param {Object} data - Internship data with ID
 * @returns {Promise} Promise with updated internship
 */
export function updateInternship(data) {
  return request({
    url: `/api/v1/pkl-internships/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * Delete PKL internship
 * @param {Number} id - Internship ID
 * @returns {Promise} Promise with deletion result
 */
export function deleteInternship(id) {
  return request({
    url: `/api/v1/pkl-internships/${id}`,
    method: 'delete'
  })
}

/**
 * Get journals for a specific PKL internship
 * @param {Number} internshipId - Internship ID
 * @param {Object} query - Query parameters
 * @returns {Promise} Promise with journal list
 */
export function getInternshipJournals(internshipId, query) {
  return request({
    url: `/api/v1/pkl-internships/${internshipId}/journals`,
    method: 'get',
    params: query
  })
}

/**
 * Get companies/offices for select dropdown
 * @returns {Promise} Promise with company list
 */
export function fetchCompanies() {
  return request({
    url: '/api/v1/offices',
    method: 'get'
  })
}

/**
 * Get teachers for supervisor selection dropdown
 * @returns {Promise} Promise with teacher list
 */
export function fetchTeachers() {
  return request({
    url: '/api/v1/master/teachers',
    method: 'get'
  })
}

/**
 * Get students for internship assignment
 * @param {Object} query - Query parameters (class_id, etc.)
 * @returns {Promise} Promise with student list
 */
export function fetchStudents(query) {
  return request({
    url: '/api/v1/student',
    method: 'get',
    params: query
  })
}

/**
 * Generate internship certificate
 * @param {Number} id - Internship ID
 * @returns {Promise} Promise with certificate data (PDF)
 */
export function generateCertificate(id) {
  return request({
    url: `/api/v1/pkl-internships/${id}/certificate`,
    method: 'get',
    responseType: 'blob'
  })
}

/**
 * Approve or reject internship
 * @param {Number} id - Internship ID
 * @param {Object} data - Status data { status, notes }
 * @returns {Promise} Promise with updated status
 */
export function updateInternshipStatus(id, data) {
  return request({
    url: `/api/v1/pkl-internships/${id}/status`,
    method: 'put',
    data
  })
}
