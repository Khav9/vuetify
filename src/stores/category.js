import { defineStore } from 'pinia'
import { fetchCategories } from '../api/category'
export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: []
  }),
  actions: {
    async getCategories() {
      const response = await fetchCategories()
      this.categories = response.data
    }
  }
})
