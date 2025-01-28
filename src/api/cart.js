import http from './api'

export function addCart(data) {
  return http.post(`/cart`,data)
}
export function getCarts() {
  return http.get(`/carts`)
}
export function deleteCart(id) {
  return http.delete(`/cart/${id}`)
}
