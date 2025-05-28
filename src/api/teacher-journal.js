import request from '@/utils/request'

/**
 * Get teacher journal list with pagination and filters
 * @param {Object} query - Query parameters
 * @returns {Promise} Promise with teacher journal list
 */
export function fetchList(query) {
  return request({
    url: '/api/v1/teacher-journals',
    method: 'get',
    params: query
  })
}

/**
 * Get teacher journal by ID
 * @param {Number} id - Journal ID
 * @returns {Promise} Promise with teacher journal data
 */
export function fetchJournal(id) {
  return request({
    url: `/api/v1/teacher-journals/${id}`,
    method: 'get'
  })
}

/**
 * Create new teacher journal
 * @param {Object} data - Journal data
 * @returns {Promise} Promise with created journal
 */
export function createJournal(data) {
  return request({
    url: '/api/v1/teacher-journals',
    method: 'post',
    data
  })
}

/**
 * Update existing teacher journal
 * @param {Object} data - Journal data with ID
 * @returns {Promise} Promise with updated journal
 */
export function updateJournal(data) {
  return request({
    url: `/api/v1/teacher-journals/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * Delete teacher journal
 * @param {Number} id - Journal ID
 * @returns {Promise} Promise with deletion result
 */
export function deleteJournal(id) {
  return request({
    url: `/api/v1/teacher-journals/${id}`,
    method: 'delete'
  })
}

/**
 * Get journal statistics for dashboard
 * @param {Object} query - Query parameters (date range, teacher_id)
 * @returns {Promise} Promise with journal statistics
 */
export function getJournalStats(query) {
  return request({
    url: '/api/v1/teacher-journals/stats',
    method: 'get',
    params: query
  })
}

/**
 * Get teacher journal report
 * @param {Object} query - Query parameters for report
 * @returns {Promise} Promise with report data
 */
export function getJournalReport(query) {
  return request({
    url: '/api/v1/teacher-journals/report',
    method: 'get',
    params: query
  })
}
