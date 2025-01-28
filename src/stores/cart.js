import { defineStore } from 'pinia'
import { addCart, getCarts, deleteCart } from '../api/cart'
export const useCartStore = defineStore('cart', {
  state: () => ({
    // favorites: [],
    carts: []
  }),
  actions: {
    async addCart(data) {
      const response = await addCart(data)
      return response
    },
    async getCarts() {
      const response = await getCarts()
      this.carts = response.data
    },
    // async getFavoriteByUser() {
    //   const response = await fetchFavoriteByUser()
    //   this.wishlist = response.data.courses
    // },
    async removeCart(id) {
      const response = await deleteCart(id)
      return response
      // this.wishlist = response.data.courses
    }
  }
})
