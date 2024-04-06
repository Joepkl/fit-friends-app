<template>
  <div class="page-wrapper">
    <img class="w-14 mb-10" src="@/assets/icons/ic_logo.svg" alt="Logo" />
    <h1>Register</h1>
    <p class="flex flex-col mt-4 mb-8">
      <span>Welcome to the platform!</span>
      <span>Create an account to continue.</span>
    </p>
    <!-- Inputs -->
    <div class="relative">
      <div class="flex flex-col mb-4">
        <label for="email">Email</label>
        <input
          v-model="email"
          :class="{ 'error test': isEmailValid === false }"
          @change="validateEmail"
          id="email"
          type="text"
        />
      </div>
      <div class="flex flex-col mb-4">
        <label for="username">Username</label>
        <input v-model="username" id="username" type="text" />
      </div>
      <div class="flex flex-col mb-4">
        <label for="password">Password</label>
        <input @change="valdatePassword" v-model="password" id="password" type="password" ref="passwordEl" />
      </div>
      <div class="flex flex-col mb-4">
        <label for="confirm-password">Confirm password</label>
        <input
          @change="valdatePassword"
          v-model="confirmPassword"
          :class="{ error: isPasswordValid === false }"
          ref="confirmPasswordEl"
          type="password"
          id="confirm-password"
        />
      </div>
      <!-- Password visibility toggle -->
      <label class="container"
        >Show password
        <input type="checkbox" @click="togglePasswordVisibility" id="show-password" />
        <span class="checkmark"></span>
      </label>
      <!-- Error message -->
      <p v-if="errors.length" class="error absolute bottom-[-35px]">{{ errors[0] }}</p>
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
import { TIMELINE_ROUTE } from "@/router/appRoutes";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** API calls */
import { postCreateAccount, postLoginAccount } from "@/api/auth/postAuth";

const store = useStore();
const router = useRouter();

const passwordEl = ref(null);
const confirmPasswordEl = ref(null);

const email = ref<string | null>(null);
const username = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const isEmailValid = ref<boolean | null>(null);
const isPasswordValid = ref<boolean | null>(null);
const errors = ref<string[]>([]);

const isDataValid = computed(() => {
  return isEmailValid.value && username.value && password.value && isPasswordValid.value;
});

function validateEmail() {
  const errorMessage = "Please enter a valid email address.";
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.value && email.value.match(validRegex)) {
    isEmailValid.value = true;
    const emailErrorIndex = errors.value.indexOf(errorMessage);
    if (emailErrorIndex !== -1) {
      errors.value.splice(emailErrorIndex, 1);
    }
  } else {
    isEmailValid.value = false;
    errors.value.push(errorMessage);
  }
}

function togglePasswordVisibility() {
  if (passwordEl.value && confirmPasswordEl.value) {
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

function valdatePassword() {
  const errorMessage = "Passwords do not match";
  if (password.value !== confirmPassword.value) {
    isPasswordValid.value = false;
    errors.value?.push(errorMessage);
  } else {
    isPasswordValid.value = true;
    // Remove error message
    const passwordErrorIndex = errors.value.indexOf(errorMessage);
    if (passwordErrorIndex !== -1) {
      errors.value.splice(passwordErrorIndex, 1);
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
      errors.value.push((error as Error)?.message);
    }
  }
}

async function createAccount() {
  if (email.value && username.value && password.value) {
    try {
      await postCreateAccount(email.value, username.value, password.value);
      await login();
    } catch (error) {
      errors.value.push((error as Error)?.message);
    }
  }
}

function goToLogin() {
  router.push(LOGIN_ROUTE);
}

function goToTimeline() {
  router.push(TIMELINE_ROUTE);
}
</script>
