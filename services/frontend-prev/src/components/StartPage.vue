<template>
  <div class="auth-container">
    <h1>Bangladesh Railway Ticketing</h1>

    <!-- Buttons for Login and Sign Up -->
    <div v-if="!showLoginForm && !showSignupForm" class="button-container">
      <button class="btn" @click="showLoginForm = true">Login</button>
      <button class="btn" @click="showSignupForm = true">Sign Up</button>
    </div>

    <!-- Login Form -->
    <div v-if="showLoginForm" class="login-form">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="login-email">Email</label>
          <input type="email" id="login-email" v-model="loginEmail" required />
        </div>

        <div class="input-group">
          <label for="login-password">Password</label>
          <input type="password" id="login-password" v-model="loginPassword" required />
        </div>

        <button type="submit" class="btn">Login</button>
        <button type="button" class="btn back" @click="showLoginForm = false">Back</button>
        <button type="button" class="btn back" @click="switchToSignup">Don't have an account?</button>
      </form>
    </div>

    <!-- Signup/Registration Form -->
    <div v-if="showSignupForm" class="signup-form">
      <h2>Sign Up</h2>
      <form @submit.prevent="register">
        <div class="input-group">
          <label for="signup-name">Name</label>
          <input type="text" id="signup-name" v-model="signupName" required />
        </div>

        <div class="input-group">
          <label for="signup-email">Email</label>
          <input type="email" id="signup-email" v-model="signupEmail" required />
        </div>

        <div class="input-group">
          <label for="signup-password">Password</label>
          <input type="password" id="signup-password" v-model="signupPassword" required />
        </div>

        <div class="input-group">
          <label for="signup-confirm-password">Confirm Password</label>
          <input type="password" id="signup-confirm-password" v-model="signupConfirmPassword" required />
        </div>
        <div class="input-group">
          <label for="signup-mobile">Mobile</label>
          <input type="tel" id="signup-mobile" v-model="signupMobile" required />
        </div>

        <button type="submit" class="btn">Sign Up</button>
        <button type="button" class="btn back" @click="showSignupForm = false">Back</button>
        <button type="button" class="btn back" @click="switchToLogin">Already have an account?</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api';

export default {
  data() {
    return {
      loginEmail: '',
      loginPassword: '',
      signupName: '',
      signupEmail: '',
      signupPassword: '',
      signupConfirmPassword: '',
      signupMobile: '',
      showLoginForm: false,
      showSignupForm: false,
    };
  },
  methods: {
    async login() {
      // Call backend API to login the user
      try {
        const response = await api.login({
          email: this.loginEmail,
          password: this.loginPassword,
        });
        alert(response.data.message);
        // Handle successful login (e.g., redirect to dashboard)
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed, please try again.');
      }
    },
    async register() {
      // Validate passwords match
      if (this.signupPassword !== this.signupConfirmPassword) {
        alert("Passwords do not match");
        return;
      }

      // Call backend API to register the user
      try {
        const response = await api.register({
          name: this.signupName,
          email: this.signupEmail,
          password: this.signupPassword,
          mobile: this.signupMobile,
        });
        alert(response.data.message);
        // Handle successful registration (e.g., redirect to login or dashboard)
      } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed, please try again.');
      }
    },
    switchToSignup() {
      this.showLoginForm = false;
      this.showSignupForm = true;
    },
    switchToLogin() {
      this.showLoginForm = true;
      this.showSignupForm = false;
    },
  },
};
</script>

<style scoped>
.auth-container {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  text-align: center;
}

.button-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button.btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.btn:hover {
  background-color: #0056b3;
}

button.back {
  margin-top: 1rem;
  background-color: #6c757d;
}

button.back:hover {
  background-color: #5a6268;
}
</style>
