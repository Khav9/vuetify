import { defineStore } from 'pinia'

import { register, login, logout, fetchUser } from '@/api/auth.js' // get form auth

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authUser: [],
    isAuthenticated: false
  }),
  // getters: {
  //   isAuthenticated: state => !!state.authToken
  // },
  actions: {
    async userLogin(data) {
      try {
        // Send login request
        const response = await login(data);

        // Check if the response contains the token
        if (response.data.access_token) {
          this.isAuthenticated = true;
    
          // Store the token in localStorage
          localStorage.setItem('authToken', response.data.access_token);
    
          // Optionally store other user details if provided by the backend
          this.authUser = response.data.user;
    
          console.log('Login successful:', response.data);
        } else {
          console.error('Token not found in response:', response.data);
        }
    
        return response;
      } catch (error) {
        // Handle errors (e.g., network issues, validation errors)
        if (error.response) {
          // API responded with an error
          console.error('Login failed:', error.response.data);
          return { success: false, message: error.response.data.message || 'Login failed' };
        } else {
          // Other errors (e.g., network issues)
          console.error('Network error:', error);
          return { success: false, message: 'Network error. Please try again.' };
        }
      }
    },

    async userRegister(data) {
      try {
        const response = await register(data); // Assuming 'register' is an API call function
    
        if (response.data.access_token) {
          this.isAuthenticated = true;
          const access_token = response.data.access_token
          localStorage.setItem('authToken', access_token);
          console.log('Register successful:', response.data);
    
          return response; // Return the response if successful
        } else {
          console.error('Token not found in response:', response.data);
          return { error: 'Access token missing in response' };
        }
      } catch (error) {
        // Handle any errors from the API call or unexpected issues
        console.error('Error during registration:', error);
        return { error: error.message || 'An unexpected error occurred' };
      }
    },
    

    async logout() {
      const response = await logout()
      localStorage.removeItem('authToken')
      this.isAuthenticated = false
      return response
    },
    // async changePassword(data) {
    //   return await changeNewPassword(data)
    // },
    async getUser() {
      const response = await fetchUser()
      this.authUser = response.data
      if (this.authUser['profile']){
        this.authUser['profile'] = import.meta.env.VITE_APP_IMG_URL + response.data['profile']
      }
    }
  }
})
