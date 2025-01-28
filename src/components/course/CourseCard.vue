<template>
  <course-filter @filter-changed="applyFilter" />
  <custom-title icon="mdi-book">Everything from Share Story</custom-title>
  <v-row v-if="courses.length != 0">
    <v-col cols="12" md="3" v-for="course in courses" :key="course.name">
      <v-card>
        <v-img
          :src="course.image"
          class="align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          max-width="300px"
          height="200px"
          cover
        >
          <v-card-title class="text-white" v-text="course.title"></v-card-title>
        </v-img>
        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-rating
              :model-value="4.5"
              color="amber"
              density="compact"
              size="small"
              half-increments
              readonly
            ></v-rating>

            <div class="text-grey ms-4">4.5 (413)</div>
          </v-row>

          <div class="mt-6 text-subtitle-1">$ {{ course.price }}</div>
          <div class="text-subtitle-1">{{ course.lessons }} Lessons</div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            size="small"
            :color="isFavorite(course.id) ? 'red' : 'medium-emphasis'"
            :icon="isFavorite(course.id) ? 'mdi-heart' : 'mdi-heart-outline'"
            @click="toggleFavorite(course.id)"
          ></v-btn>
          <v-btn
            :color="isAddToCart(course.id) ? 'red' : 'medium-emphasis'"
            :icon="isAddToCart(course.id) ? 'mdi-cart' : 'mdi-cart-outline'"
            size="small"
            @click="toggleAddToCart(course.id)"
          ></v-btn>
          <v-btn
            color="medium-emphasis"
            class="bg-primary"
            size="small"
            @click="handleBuyNowClick(course.id)"
          >
            Buy now
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col v-for="i in 4">
      <v-skeleton-loader
        :loading="loading"
        class="mx-auto"
        elevation="2"
        max-width="390"
        type="card,list-item-two-line, actions"
        boilerplate
      ></v-skeleton-loader>
    </v-col>
  </v-row>

  <checkout-dialog
    :dialog="checkoutDialog"
    :courseId="selectedCourseId"
    :price="selectedCoursePrice"
    :name="selectedCourseName"
    @update:dialog="checkoutDialog = $event"
    @payment-success="handlePaymentSuccess"
    />

</template>
<script>
  import CourseFilter from '../filters/CourseFilter.vue'
  import { mapActions, mapState } from 'pinia'
  import { useCourseStore } from '../../stores/course'
  import { useFavoriteStore } from '../../stores/favorite'
  import CheckoutDialog from '../payment/CheckoutDialog.vue'
  import { useCartStore } from '../../stores/cart'

  export default {
    components: {
      CourseFilter,
      CheckoutDialog
    },
    data() {
      return {
        form: {
          course_id: ''
        },
        checkoutDialog: false,
        selectedCourseId: null,
        selectedCoursePrice: null,
        selectedCourseName: null,
        showLoginDialog: false,
        loading: false
      }
    },
    created() {
      this.getCourses({})
      const token = localStorage.getItem('authToken')
      if (token) {
        this.getFavoriteByUser()
        this.getCarts()
      }
    },
    computed: {
      ...mapState(useCourseStore, ['courses']),
      ...mapState(useFavoriteStore, ['wishlist']),
      ...mapState(useCartStore, ['carts']),
      isFavorite() {
        return courseId => {
          return this.wishlist && this.wishlist.some(fav => fav.id === courseId)
        }
      },
      isAddToCart() {
        return courseId => {
          return this.carts && this.carts.some(cart => cart.id === courseId)
        }
      }
    },
    methods: {
      ...mapActions(useCourseStore, ['getCourses']),
      ...mapActions(useFavoriteStore, [
        'addFavorite',
        'getFavoriteByUser',
        'removeFavorite'
      ]),
      ...mapActions(useCartStore, ['addCart', 'getCarts']),
      async toggleFavorite(courseId) {
        const isFav = this.isFavorite(courseId)
        if (isFav) {
          await this.removeFavorite(courseId)
            .then(() => {
              this.$root.$notif('Favorite removed successfully', {
                type: 'success',
                color: 'primary'
              })
            })
            .catch(error => {
              console.log(error)
              this.$root.$notif(error.message || error, {
                type: 'error',
                color: 'error'
              })
            })
        } else {
          this.form.course_id = courseId
          await this.addFavorite(this.form)
            .then(() => {
              this.$root.$notif('Favorite added successfully', {
                type: 'success',
                color: 'primary'
              })
            })
            .catch(() => {
              this.$root.$notif('Please login or register first.', {
                type: 'warning',
                color: 'warning'
              })
            })
        }

        await this.getFavoriteByUser()
      },

      async toggleAddToCart(courseId) {
        this.form.course_id = courseId
        await this.addCart(this.form)
          .then(() => {
            this.$root.$notif('Cart added successfully', {
              type: 'success',
              color: 'primary'
            })
          })
          .catch(error => {
            if (localStorage.getItem('authToken')) {
              this.$root.$notif(error.response.data.error || error, {
                type: 'error',
                color: 'error'
              })
            } else {
              this.$root.$notif('Please login or register first.', {
                type: 'warning',
                color: 'warning'
              })
            }
          })

        this.getCarts()
      },

      handleBuyNowClick(courseId) {
        console.log(courseId)
        this.selectedCourseId = courseId
        this.selectedCourseName = courseId
        this.selectedCoursePrice = courseId
        if (localStorage.getItem('authToken')) {
          this.checkoutDialog = true

          const selectedCourse = this.courses.find(
            course => course.id === courseId
          )
          if (selectedCourse) {
            this.selectedCourseId = selectedCourse.id
            this.selectedCourseName = selectedCourse.title
            this.selectedCoursePrice = selectedCourse.price
          }
        } else {
          this.$root.$notif('Please login or register first.', {
            type: 'warning',
            color: 'warning'
          })
        }
      },
      closeCheckoutDialog() {
        this.checkoutDialog = false
      },
      handlePaymentSuccess() {
        this.closeCheckoutDialog()
      },

      applyFilter(filter) {
        this.getCourses(filter)
      }
    },

    filters: {
      currency(value) {
        return `$${value.toFixed(2)}`
      }
    }
  }
</script>
