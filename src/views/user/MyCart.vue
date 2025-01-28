<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="(cart, index) in carts"
        :key="cart.id"
        cols="12"
        sm="4"
        md="3"
      >
        <v-card>
          <v-img :src="cart.image" height="200px" cover></v-img>
          <v-card-title>{{ cart.title }}</v-card-title>
          <v-card-text>
            <p class="text-h6">${{ cart.price }}</p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="error"
              variant="outlined"
              size="small"
              @click="handleRemoveCart(cart.id)"
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

    <v-alert v-if="carts.length === 0" type="info" class="mt-6">
      Your wishlist is empty. Start adding your favorite courses!
    </v-alert>
  </v-container>
</template>

<script>
  import { mapActions, mapState } from 'pinia'
  import { useCartStore } from '../../stores/cart'

  export default {
    data() {
      return {
        form: {
          course_id: ''
        }
      }
    },
    created() {
      const token = localStorage.getItem('authToken')
      if (token) {
        this.getCarts()
      }
    },
    computed: {
      ...mapState(useCartStore, ['carts'])
    },
    methods: {
      ...mapActions(useCartStore, ['getCarts', 'removeCart']),
      handleRemoveCart(courseId) {
        this.removeCart(courseId)
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
        this.getCarts()
      }
    }
  }
</script>

<style scoped>
  .v-container {
    max-width: 1200px;
    margin: auto;
  }
</style>

