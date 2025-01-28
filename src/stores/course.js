import { defineStore } from 'pinia'
import { fetchCourses } from '../api/course'
export const useCourseStore = defineStore('course', {
  state: () => ({
    courses:[]
  }),
  actions: {
    async getCourses(params) {
      const response = await fetchCourses(params)
      this.courses = response.data
    }
  }
})
