<template>
  <v-container class="pa-0">
    <v-row class="py-0 mt-4">
      <v-col cols="12" md="12">
        <v-btn color="orange" class="mr-4">Math</v-btn>
        <v-btn variant="outlined" class="mr-4">English</v-btn>
        <v-btn variant="outlined" class="mr-4">Coding</v-btn>
        <v-btn variant="outlined" class="mr-4">Grand12</v-btn>
        <v-btn variant="outlined" class="mr-4">រូបវិទ្យា</v-btn>
      </v-col>
    </v-row>

    <course-card />

    <h2 class="mt-12">Popular Blogs</h2>
    <p>
      Discover the hottest topics everyone is talking about! Check out the top
      blogs in our system—crafted with care and fueled by your reactions. 🌟
      Dive in now and see what’s trending!
    </p>
    <v-row class="mt-4">
      <v-col cols="12" md="3" v-for="course in courses" :key="course.title">
        <v-card class="pa-2">
          <router-link :to="`/course`" class="text-decoration-none">
            <v-img :src="course.image" height="200"></v-img>
            <v-card-title>{{ course.title }}</v-card-title>
          </router-link>
          <v-card-subtitle>
            25 Jan 25 (2d ago){{ course.period }} min read
          </v-card-subtitle>
          <v-card-actions>
            <!-- :color="isFavorite(course.id) ? 'red' : 'medium-emphasis'"
            :icon="isFavorite(course.id) ? 'mdi-heart' : 'mdi-heart-outline'" -->
            <v-btn size="small" icon="mdi-heart-outline"></v-btn>
            <span>{{ course.reacts }}</span>
            <!-- @click="toggleFavorite(course.id)" -->

            <v-btn
              color="medium-emphasis"
              icon="mdi-comment-outline"
              size="small"
            ></v-btn>
            <span>{{ course.comments }}</span>
            <v-spacer></v-spacer>
            <v-btn color="medium-emphasis" class="bg-primary" size="small">
              <!-- @click="handleBuyNowClick(course)" -->
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Mobile App Download Section -->
    <v-row class="my-12 align-center">
      <v-col cols="12" md="6">
        <v-img src="/que-es-un-blog-1.webp" height="400"></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <h2>Ready to Explore Inspiring Stories?</h2>
        <p>
          Join us to access a world of captivating blogs, insightful articles,
          and stories that ignite your curiosity and fuel your imagination.
        </p>

        <v-row class="py-8 px-3">
          <v-btn color="black" variant="outlined" class="mr-4">
            <v-icon left>mdi-apple</v-icon>
            App Store
          </v-btn>
          <v-btn color="black" variant="outlined">
            <v-icon left>mdi-google-play</v-icon>
            Google Play
          </v-btn>
          <v-btn color="black" variant="outlined" class="ml-4">
            <v-icon left>mdi-book-open-page-variant</v-icon>
            Blogs
          </v-btn>
        </v-row>
      </v-col>
    </v-row>

    <!-- Footer -->
    <v-footer color="grey lighten-3" class="pa-6">
      <v-row>
        <v-col cols="12" md="4">
          <h3>About</h3>
          <p>Some information about the company and its mission.</p>
        </v-col>
        <v-col cols="12" md="4">
          <h3>Help and Solutions</h3>
          <p>Links to help center, FAQs, and more.</p>
        </v-col>
        <v-col cols="12" md="4">
          <h3>Support</h3>
          <p>Contact information and support resources.</p>
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>

<script setup>
  import CourseCard from '../../components/course/CourseCard.vue'

  const courses = [
    {
      title: 'Graphic Design Course',
      description: '10 min',
      image:
        'https://curtindubai.ac.ae/wp-content/uploads/2023/05/Graphic-Design-Course-Banner-1920x960-1.jpg',
      reacts: 7,
      comments: 10,
      period: 10
    },
    {
      title: 'Web Development Course',
      description: '5 min',
      image:
        'https://bootcamprankings.com/wp-content/uploads/2021/01/How-to-Learn-Web-Development-768x763.png',
      reacts: 194,
      comments: 10,
      period: 5
    },
    {
      title: 'Machine Learning Intro',
      description: '1 h',
      image:
        'https://149860134.v2.pressablecdn.com/wp-content/uploads/LLM_cric.jpeg',
      reacts: '2k',
      comments: '1k',
      period: 15
    }
  ]
</script>

<style scoped>
  .text-orange {
    color: #ff9800;
  }
  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: #8a5555; */
  }
</style>
