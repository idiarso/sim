import request from '@/utils/request'

/**
 * Get school profile information
 * @returns {Promise} Promise with school profile data
 */
export function getSchoolProfile() {
  return request({
    url: '/api/v1/school-profile',
    method: 'get'
  })
}

/**
 * Update school profile
 * @param {Object} data - School profile data
 * @returns {Promise} Promise with updated school profile
 */
export function updateSchoolProfile(data) {
  return request({
    url: '/api/v1/school-profile',
    method: 'put',
    data
  })
}

/**
 * Upload school logo
 * @param {FormData} formData - Form data with logo file
 * @returns {Promise} Promise with upload result
 */
export function uploadSchoolLogo(formData) {
  return request({
    url: '/api/v1/school-profile/logo',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * Upload principal signature
 * @param {FormData} formData - Form data with signature file
 * @returns {Promise} Promise with upload result
 */
export function uploadPrincipalSignature(formData) {
  return request({
    url: '/api/v1/school-profile/signature',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
