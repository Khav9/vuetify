import http from './api'

export function fetchCourses(filter) {
  return http.get(`/courses`,{ params: filter })
}
