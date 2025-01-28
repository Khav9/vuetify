import { defineStore } from 'pinia'
import {
  addFavorite,
  fetchFavorites,
  fetchFavoriteByUser,
  deleteFavorite
} from '../api/favorite'
export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorites: [],
    wishlist: []
  }),
  actions: {
    async addFavorite(data) {
      const response = await addFavorite(data)
      return response
    },
    async getFavorites() {
      const response = await fetchFavorites()
      this.favorites = response.data
    },
    async getFavoriteByUser() {
      const response = await fetchFavoriteByUser()
      this.wishlist = response.data.courses
    },
    async removeFavorite(id) {
      const response = await deleteFavorite(id)
      return response
      // this.wishlist = response.data.courses
    }
  }
})
