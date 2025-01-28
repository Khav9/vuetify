<template>
    <v-dialog v-model="dialog" width="auto">
      <v-card width="600" rounded="lg">
        <v-toolbar class="bg-primary" title="Change Password">
          <v-spacer></v-spacer>
          <v-btn icon @Click="cancel">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-form ref="form" @submit.prevent="saveChangePassword" class="pa-5">
          <v-text-field
            :append-inner-icon="visibleCurrent ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visibleCurrent ? 'text' : 'password'"
            placeholder="Enter current password"
            prepend-inner-icon="mdi-lock-outline"
            v-model="currentPassword"
            :rules="currentPasswordRole"
            :error-messages="currentPasswordError"
            variant="outlined"
            @click:append-inner="visibleCurrent = !visibleCurrent"
            color="textField"
          ></v-text-field>
          <v-text-field
            :append-inner-icon="visibleNew ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visibleNew ? 'text' : 'password'"
            placeholder="Enter your new password"
            prepend-inner-icon="mdi-lock-outline"
            v-model="newPassword"
            :rules="newPasswordRole"
            variant="outlined"
            class="mt-4"
            @click:append-inner="visibleNew = !visibleNew"
            color="textField"
          ></v-text-field>
          <v-text-field
            :append-inner-icon="visibleConfirm ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visibleConfirm ? 'text' : 'password'"
            placeholder="Enter your confirm new password"
            prepend-inner-icon="mdi-lock-outline"
            v-model="confirmPassword"
            :rules="confirmPasswordRoles"
            :error-messages="confirmPasswordError"
            variant="outlined"
            class="mt-4"
            @click:append-inner="visibleConfirm = !visibleConfirm"
            color="textField"
          ></v-text-field>
  
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-btn
              @Click="cancel"
              class="mt-4"
              color="primary"
              variant="outlined"
            >
              {{ $t('btn.cancel') }}
            </v-btn>
            <v-btn type="submit" color="primary" class="mt-4 ms-1">
              {{ $t('btn.saveChange') }}
            </v-btn>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </template>
  <script>
    import { useAuthStore } from '../../stores/auth'
    import { mapActions } from 'pinia'
    export default {
      emits: ['cancel', 'password-changed'],
      data() {
        return {
          snackbarVisible: false,
          dialog: false,
          visibleCurrent: false,
          visibleNew: false,
          visibleConfirm: false,
  
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
          currentPasswordError: '',
          confirmPasswordError: '',
  
          currentPasswordRole: [
            v => !!v || 'Current password is required.',
            v => (v && v.length >= 8) || 'Password must be 8  characters or more!'
          ],
          newPasswordRole: [
            v => !!v || 'New password is required.',
            v => (v && v.length >= 8) || 'Password must be 8  characters or more!'
          ],
          confirmPasswordRoles: [
            v => !!v || 'Confirm new password is required.',
            v => (v && v.length >= 8) || 'Password must be 8  characters or more!'
          ]
        }
      },
      methods: {
        ...mapActions(useAuthStore, ['changePassword']),
  
        validatePasswords() {
          this.currentPasswordError = ''
          this.newPasswordError = ''
          this.confirmPasswordError = ''
  
          let valid = true
  
          if (!this.currentPassword || this.currentPassword.length < 8) {
            this.currentPasswordError =
              'Current password is required and must be 8 characters or more!'
            valid = false
          }
  
          if (!this.newPassword || this.newPassword.length < 8) {
            this.newPasswordError =
              'New password is required and must be 8 characters or more!'
            valid = false
          }
  
          if (!this.confirmPassword || this.confirmPassword.length < 8) {
            this.confirmPasswordError =
              'Confirm new password is required and must be 8 characters or more!'
            valid = false
          }
  
          if (this.newPassword !== this.confirmPassword) {
            this.confirmPasswordError = 'Confirm password does not match'
            valid = false
          }
  
          return valid
        },
        saveChangePassword() {
          if (this.validatePasswords()) {
            const data = {
              current_password: this.currentPassword,
              new_password: this.newPassword,
              new_password_confirmation: this.confirmPassword
            }
            this.changePassword(data)
              .then(() => {
                this.currentPassword = ''
                this.newPassword = ''
                this.confirmPassword = ''
                this.$root.$notif(this.$t('alert.successChange'), {
                  type: 'success',
                  color: 'primary'
                })
                this.$emit('password-changed')
              })
              .catch(error => {
                if (error.response.status === 400) {
                  this.currentPasswordError = 'Current password is incorrect.'
                }
              })
          }
        },
        cancel() {
          this.$emit('cancel')
        }
      }
    }
  </script>
  
  <style scoped>
    .snackbar {
      margin-bottom: 38%;
    }
  </style>
  