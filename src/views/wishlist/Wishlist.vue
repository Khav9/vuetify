<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="(course, index) in wishlist"
        :key="course.id"
        cols="12"
        sm="4"
        md="3"
      >
        <v-card>
          <v-img :src="course.image" height="200px" cover></v-img>
          <v-card-title>{{ course.title }}</v-card-title>
          <v-card-text>
            <p class="text-h6">${{ course.price }}</p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="error"
              variant="outlined"
              size="small"
              @click="handleFavorite(course.id)"
            >
              Remove
            </v-btn>
            <v-btn color="medium-emphasis" class="bg-primary" size="small">
              Buy now
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-alert v-if="wishlist.length === 0" type="info" class="mt-6">
      Your wishlist is empty. Start adding your favorite courses!
    </v-alert>
  </v-container>
</template>

<script>
  import { mapActions, mapState } from 'pinia'
  import { useFavoriteStore } from '../../stores/favorite'
  export default {
    name: 'WishlistPage',
    data() {
      return {}
    },
    computed: {
      ...mapState(useFavoriteStore, ['wishlist'])
    },
    methods: {
      ...mapActions(useFavoriteStore, ['getFavoriteByUser','removeFavorite']),
      handleFavorite(courseId) {
        this.removeFavorite(courseId)
          .then(() => {
            this.$root.$notif('Item removed from wishlist', {
              type: 'success',
              color: 'primary'
            })
          })
          .catch(error => {
            console.error(error)
            this.$root.$notif('Failed to remove item', {
              type: 'error',
              color: 'error'
            })
          })
        this.getFavoriteByUser()
      }
    },
    created() {
      this.getFavoriteByUser()
    }
  }
</script>

<style scoped>
  .v-container {
    max-width: 1200px;
    margin: auto;
  }
</style>
