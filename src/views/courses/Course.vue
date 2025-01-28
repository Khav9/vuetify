<template>
  <v-container>
    <course-card />
  </v-container>
</template>

<script>
  import CourseCard from '../../components/course/CourseCard.vue'
  import CourseFilter from '../../components/filters/CourseFilter.vue'
  export default {
    name: 'CoursePage',
    components: {
      CourseCard,
      CourseFilter
    },
    data() {
      return {
        courses: [
          {
            title: 'Graphic Design Course',
            description: '80 Lessons',
            image: 'path/to/graphic.jpg',
            rating: 4.7,
            lessons: '80'
          },
          {
            title: 'Web Development Course',
            description: '90 Lessons',
            image: 'path/to/web.jpg',
            rating: 4.5,
            lessons: '90'
          },
          {
            title: 'Machine Learning Intro',
            description: '50 Lessons',
            image: 'path/to/ml.jpg',
            rating: 4.3,
            lessons: '50'
          }
        ]
      }
    }
  }
</script>

<style></style>
