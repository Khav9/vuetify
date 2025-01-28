<template>
  <v-dialog v-model="dialog" max-width="500px" style="z-index: 200;">
    <v-card rounded="lg">
      <v-card-title class="text-center">Register</v-card-title>
      <v-card-subtitle class="text-center mb-3">
        Sign up with your email or Google
      </v-card-subtitle>

      <v-card-text>
        <v-form ref="registerForm" v-model="valid">
          <v-text-field
            v-model="form.name"
            label="Your Name"
            :rules="[rules.required]"
            variant="outlined"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.email"
            label="Email"
            :rules="[rules.required, rules.email]"
            variant="outlined"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            label="Password"
            type="password"
            :rules="[rules.required, rules.minPassword]"
            variant="outlined"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.password_confirmation"
            label="Password Confirmation"
            type="password"
            :rules="[rules.required, rules.minPassword]"
            variant="outlined"
            required
          ></v-text-field>
          <v-btn
            type="button"
            :disabled="!valid"
            class="mt-4"
            color="primary"
            block
            @click="handleRegister"
          >
            Sign Up
          </v-btn>
        </v-form>

        <v-divider class="my-4"></v-divider>
<!-- 
        <v-btn color="red darken-1" class="mb-3" block @click="googleSignIn">
          <v-icon start>mdi-google</v-icon>
          Sign Up with Google
        </v-btn> -->
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions } from 'pinia'
  import { useAuthStore } from '../../stores/auth'

  export default {
    name: 'RegisterDialog',
    data() {
      return {
        dialog: false,
        valid: false,
        form: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        },
        rules: {
          required: value => !!value || 'Required.',
          email: value =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
            'E-mail must be valid.',
          minPassword: value =>
            value.length >= 6 || 'Password must be at least 6 characters long.'
        }
      }
    },
    methods: {
      ...mapActions(useAuthStore, ['userRegister']),
      handleRegister() {
        if (this.valid) {
          this.userRegister(this.form)
            .then(res => {
              const token = res.data.access_token
              localStorage.setItem('authToken', token)
              this.$root.$notif(this.$t('messages.loginSuccess'), {
                type: 'success',
                color: 'primary'
              })
              this.dialog = false
            })
            .catch(error => {
              const errorEmail = error.response.data.error.email[0]
              this.$root.$notif(errorEmail, {
                type: 'error',
                color: 'primary'
              })
            })
        }
      },
      openDialog() {
        this.dialog = true
      },
      googleSignIn() {
        // Google OAuth logic
        google.accounts.id.initialize({
          client_id: 'YOUR_GOOGLE_CLIENT_ID',
          callback: this.handleGoogleResponse
        })
        google.accounts.id.prompt() // Trigger the Google Sign-In prompt
      },
      handleGoogleResponse(response) {
        console.log('Google sign-in response:', response)
        // Process Google OAuth response (e.g., send ID token to backend)
      }
    },
    mounted() {
      // Load Google Identity Services SDK
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }
  }
</script>
