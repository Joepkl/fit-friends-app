<template>
  <div class="page-wrapper">
    <h1>Register</h1>
    <p class="flex flex-col mt-4 mb-8">
      <span>Welcome to the platform!</span>
      <span>Create an account to continue.</span>
    </p>
    <!-- Inputs -->
    <div class="relative">
      <div class="flex flex-col mb-4">
        <label for="email">Email</label>
        <input v-model="email" id="email" type="text" />
      </div>
      <div class="flex flex-col mb-4">
        <label for="username">Username</label>
        <input v-model="username" id="username" type="text" />
      </div>
      <div class="flex flex-col mb-4">
        <label for="password">Password</label>
        <input v-model="password" id="password" type="password" ref="passwordEl" />
      </div>
      <div class="flex flex-col mb-4">
        <label for="confirm-password">Confirm password</label>
        <input
          @change="checkPassword"
          v-model="confirmPassword"
          ref="confirmPasswordEl"
          type="password"
          id="confirm-password"
        />
      </div>
      <!-- Hide/show password -->
      <!-- <label for="show-password">Show password</label> -->
      <!-- <input type="checkbox" @click="togglePasswordVisibility" class="ml-2" id="show-password" /> -->
      <label class="container"
        >Show password
        <input type="checkbox" @click="togglePasswordVisibility" id="show-password" />
        <span class="checkmark"></span>
      </label>
      <!-- Error message -->
      <p v-if="error" class="error absolute bottom-[-35px]">{{ error }}</p>
    </div>
    <!-- CTA -->
    <button @click="createAccount" :class="{ disabled: !isDataValid }" class="button-primary mt-12">
      Create account
    </button>
    <p class="mt-4">Already have an account? <a class="button-link" @click="goToLogin">Login</a></p>
  </div>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

/** Routes */
import { LOGIN_ROUTE } from "@/router/authRoutes";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** API calls */
import { postCreateAccount, postLoginAccount } from "@/api/auth/postAuth";

const store = useStore();
const router = useRouter();

const passwordEl = ref(null);
const confirmPasswordEl = ref(null);

const email = ref(null);
const username = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const isPasswordValid = ref(false);
const error = ref<string | null>(null);

const isDataValid = computed(() => {
  return email.value && username.value && password.value && isPasswordValid.value;
});

function togglePasswordVisibility() {
  if (passwordEl.value) {
    const pwEl = passwordEl.value as HTMLInputElement;
    const pwConfirmEl = confirmPasswordEl.value as HTMLInputElement;
    if (pwEl.type === "password") {
      pwEl.type = "text";
      pwConfirmEl.type = "text";
    } else {
      pwEl.type = "password";
      pwConfirmEl.type = "password";
    }
  }
}

function checkPassword() {
  if (password.value !== confirmPassword.value) {
    isPasswordValid.value = false;
    error.value = "Passwords do not match";
  } else {
    isPasswordValid.value = true;
  }
}

async function login() {
  if (email.value && password.value) {
    const response = await postLoginAccount(email.value, password.value);
    if (response) {
      console.log(response.accessToken);
    }
  }
}

async function createAccount() {
  if (email.value && username.value && password.value) {
    if (await postCreateAccount(email.value, username.value, password.value)) {
      await login();
    } else {
      console.log("Something went wrong");
    }
  }
}

function goToLogin() {
  router.push(LOGIN_ROUTE);
}
</script>
