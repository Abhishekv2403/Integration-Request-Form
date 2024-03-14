<template>
  <v-container class="py-3">
    <v-row justify="center">
      <v-col cols="12" sm="6" md="6">
        <v-card class="elevation-2" style="border-radius: 10px;">
          <v-card-title class="primary white--text" style="border-radius: 10px 10px 0px 0px;">
            <h3 class="headline mb-0">Integration Request Form</h3>
          </v-card-title>
          <v-card-text>
            <div class="login-wrapper">
              <button @click="login" class="login-button">
                <v-icon left>mdi-google</v-icon>
                Login with Google
              </button>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '~/plugins/firebase.js';

export default {

  props: ['formData'],

  data() {
    return {
      userEmail: null,
      userInitial: null
    }
  },

  mounted() {
    this.getUserData();
  },

  methods: {
    async login() {
      try {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const user = result.user;
        const uid = user.uid;
        const email = user.email;
        console.log('User UID:', uid);
        console.log('User email:', email);
        localStorage.setItem('email', JSON.stringify(email));
        localStorage.removeItem('formData');
        this.$router.push('/action')
      } catch (error) {
        console.error('Error logging in:', error)
      }
    },

    async getUserData() {
      try {
        const user = auth.currentUser;
        if (user) {
          const email = user.email;
          const initial = email.charAt(0).toUpperCase();
          this.userEmail = email;
          this.userInitial = initial;
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    },

    logout() {
      localStorage.removeItem('formData');
      this.$router.push('/');
    },
  }
}
</script>

<style>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.login-button {
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #2d4059; 
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #4285F4 ; 
}

.login-button v-icon {
  margin-right: 10px;
}
</style>
