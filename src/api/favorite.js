import http from './api'

export function addFavorite(data) {
  return http.post(`/favorite`,data)
}
export function fetchFavorites() {
  return http.get(`/favorites`)
}

export function fetchFavoriteByUser() {
  return http.get(`user/favorite`)
}
export function deleteFavorite(id) {
  return http.delete(`/user/favorite/${id}`)
}
