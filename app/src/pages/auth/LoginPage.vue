<template>
  <div class="page-wrapper">
    <h1>Login</h1>
    <p class="flex flex-col mt-4 mb-8">
      <span>Welcome back!</span>
      <span>Sign in to your account to continue.</span>
    </p>
    <div class="relative">
      <div class="flex flex-col mb-4">
        <label for="email">Email</label>
        <input v-model="email" id="email" type="text" />
      </div>
      <div class="flex flex-col mb-4">
        <label for="password">Password</label>
        <input v-model="password" ref="passwordEl" id="password" type="password" />
      </div>
      <!-- Password visibility toggle -->
      <label class="container"
        >Show password
        <input type="checkbox" @click="togglePasswordVisibility" id="show-password" />
        <span class="checkmark"></span>
      </label>
      <!-- Error message -->
      <p v-if="errors" class="error absolute bottom-[-35px]">{{ errors }}</p>
    </div>
    <!-- CTA -->
    <button @click="login" class="button-primary mt-12">Login</button>
    <p class="mt-4">Don't have an account? <a class="button-link" @click="goToRegister">Register</a></p>
  </div>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";
import { ref } from "vue";

/** Routes */
import { REGISTER_ROUTE } from "@/router/authRoutes";
import { TIMELINE_ROUTE } from "@/router/appRoutes";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** API calls */
import { postLoginAccount } from "@/api/auth/postAuth";

const store = useStore();
const router = useRouter();

const email = ref<string | null>(null);
const password = ref<string | null>(null);
const passwordEl = ref<HTMLInputElement | null>(null);
const errors = ref<string | null>(null);

function togglePasswordVisibility() {
  if (passwordEl.value) {
    const pwEl = passwordEl.value as HTMLInputElement;
    if (pwEl.type === "password") {
      pwEl.type = "text";
    } else {
      pwEl.type = "password";
    }
  }
}

async function login() {
  if (email.value && password.value) {
    try {
      const response = await postLoginAccount(email.value, password.value);
      if (response.accessToken) {
        store.setIsAuthenticated(true);
        store.setAccessToken(response.accessToken);
        goToTimeline();
      }
    } catch (error) {
      errors.value = (error as Error).message;
    }
  }
}

function goToRegister() {
  router.push(REGISTER_ROUTE);
}

function goToTimeline() {
  router.push(TIMELINE_ROUTE);
}
</script>
