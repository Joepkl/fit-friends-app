<template>
  <div class="page-wrapper">
    <h1>Login</h1>
    <p class="flex flex-col mt-4 mb-8">
      <span>Welcome back!</span>
      <span>Sign in to your account to continue.</span>
    </p>
    <div class="flex flex-col mb-4">
      <label for="username">Username</label>
      <input id="username" type="text" />
    </div>
    <div class="flex flex-col">
      <label for="password">Password</label>
      <input id="password" type="text" />
    </div>
    <button @click="login" class="button-primary mt-8">Login</button>
    <p class="mt-4">Don't have an account? <a class="button-link" @click="goToRegister">Register</a></p>
  </div>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";

/** Routes */
import { REGISTER_ROUTE } from "@/router/authRoutes";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** API calls */
import { fetchTrendingMovies, fetchUpcomingMovies } from "@/api/fetchMovies";

const store = useStore();
const router = useRouter();

function login() {
  alert("Login");
}

function goToRegister() {
  router.push(REGISTER_ROUTE);
}
</script>
