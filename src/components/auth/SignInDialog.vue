<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card rounded="lg">
      <v-card-title class="text-center">Sign In</v-card-title>
      <v-card-subtitle class="text-center mb-3">
        Sign in with your email or Google
      </v-card-subtitle>

      <v-card-text>
        <v-form ref="signInForm" v-model="valid">
          <v-text-field
            v-model="form.email"
            label="Email"
            :rules="[rules.required, rules.email]"
            required
            variant="outlined"
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            label="Password"
            type="password"
            :rules="[rules.required]"
            required
            variant="outlined"
          ></v-text-field>
          <v-btn
            type="button"
            :disabled="!valid"
            class="mt-4"
            color="primary"
            block
            @click="submitForm"
          >
            Sign In
          </v-btn>
        </v-form>

        <!-- <v-divider class="my-4"></v-divider>

        <v-btn color="red darken-1" class="mb-3" block @click="googleSignIn">
          <v-icon start>mdi-google</v-icon>
          Sign In with Google
        </v-btn> -->
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions } from 'pinia'
import { useAuthStore } from '../../stores/auth'

  export default {
    name: 'SignInDialog',
    data() {
      return {
        dialog: false,
        valid: false,
        form: {
          email: '',
          password: ''
        },
        rules: {
          required: value => !!value || 'Required.',
          email: value =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
            'E-mail must be valid.'
        }
      }
    },
    methods: {
      ...mapActions(useAuthStore, ['userLogin']),
      submitForm() {
        if (this.valid) {
          console.log("working here", this.form);
          this.userLogin(this.form)
          
            .then(res => {
              const token = res.data.access_token
              console.log(token);
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
        google.accounts.id.initialize({
          client_id: 'YOUR_GOOGLE_CLIENT_ID',
          callback: this.handleGoogleResponse
        })
        google.accounts.id.prompt() // Trigger the Google Sign-In prompt
      },
      handleGoogleResponse(response) {
        console.log('Google sign-in response:', response)
        // Process the Google OAuth response here
      }
    },
    mounted() {
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }
  }
</script>
