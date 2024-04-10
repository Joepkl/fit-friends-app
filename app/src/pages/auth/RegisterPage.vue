<template>
  <div class="page-wrapper">
    <img class="w-14 mb-10" src="@/assets/icons/ic_logo.svg" alt="Logo" />
    <h1>Register</h1>
    <p class="flex flex-col mt-4 mb-8">
      <span>Welcome to the platform!</span>
      <span>Create an account to continue.</span>
    </p>
    <!-- Inputs -->
    <form class="relative">
      <!-- Email -->
      <div class="flex flex-col mb-4">
        <label for="email">Email</label>
        <input
          v-model="email"
          :class="{ error: isEmailValid === false }"
          @change="handleEmailChange"
          id="email"
          type="text"
        />
      </div>
      <div class="flex flex-col mb-4">
        <!-- Username -->
        <label for="username">Username</label>
        <input
          v-model="username"
          @change="removeCredentialsError"
          @input="validateUsername"
          :class="{ error: isUsernameValid === false }"
          id="username"
          type="text"
        />
      </div>
      <!-- Password -->
      <div class="flex flex-col mb-4">
        <label for="password">Password</label>
        <input @input="validatePassword" v-model="password" id="password" type="password" ref="passwordEl" />
      </div>
      <!-- Password confirmation -->
      <div class="flex flex-col mb-4">
        <label for="confirm-password">Confirm password</label>
        <input
          @input="validatePassword"
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
      <!-- Error messages -->
      <div class="mt-4">
        <p v-if="errors.length" class="error">{{ errors[0] }}</p>
        <p v-if="isCapslockActive" class="error mt-2">Caps lock is active.</p>
      </div>
    </form>
    <!-- CTA -->
    <button @click="createAccount" :class="{ disabled: !isDataValid }" class="button-primary mt-6">
      Create account
    </button>
    <p class="mt-4">Already have an account? <a class="button-link" @click="goToLogin">Login</a></p>
  </div>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";
import { ref, computed, onMounted, onUnmounted } from "vue";

/** Routes */
import { LOGIN_ROUTE } from "@/router/authRoutes";
import { ONBOARDING_ROUTE } from "@/router/appRoutes";

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
const isUsernameValid = ref<boolean | null>(null);
const isPasswordValid = ref<boolean | null>(null);
const errors = ref<string[]>([]);
const isCapslockActive = ref(false);

const isDataValid = computed(() => {
  return isEmailValid.value && username.value && isUsernameValid.value && password.value && isPasswordValid.value;
});

function handleEmailChange() {
  validateEmail();
  removeCredentialsError();
}

function setError(isActive: boolean, errorMessage: string) {
  if (isActive) {
    if (!errors.value.includes(errorMessage)) {
      errors.value.push(errorMessage);
    }
  } else {
    const errorIndex = errors.value.indexOf(errorMessage);
    if (errorIndex !== -1) {
      errors.value.splice(errorIndex, 1);
    }
  }
}

function validateEmail() {
  const errorMessage = "Please enter a valid email address.";
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.value && email.value.match(validRegex)) {
    isEmailValid.value = true;
    setError(false, errorMessage);
  } else {
    isEmailValid.value = false;
    setError(true, errorMessage);
  }
}

function checkCapslock(e: KeyboardEvent) {
  if (e.code === "CapsLock") {
    if (e.getModifierState("CapsLock")) {
      isCapslockActive.value = true;
    } else {
      isCapslockActive.value = false;
    }
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

function validatePassword() {
  const errorMessage = "Passwords do not match";
  if (password.value !== confirmPassword.value) {
    isPasswordValid.value = false;
    setError(true, errorMessage);
  } else {
    isPasswordValid.value = true;
    setError(false, errorMessage);
  }
}

function validateUsername() {
  const errorMessage = "Username cannot contain spaces.";
  if (username.value && (username.value as string).includes(" ")) {
    setError(true, errorMessage);
    isUsernameValid.value = false;
  } else {
    setError(false, errorMessage);
    isUsernameValid.value = true;
  }
}

function removeCredentialsError() {
  const errorMessage = "The username or email you provided is already registered. Please use a different one.";
  setError(false, errorMessage);
  validateUsername();
}

async function login() {
  if (username.value && password.value) {
    try {
      const response = await postLoginAccount(username.value, password.value);
      if (response.accessToken) {
        store.setIsAuthenticated(true);
        store.setAccessToken(response.accessToken);
        goToOnboarding();
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
      // Account or username already exists
      errors.value.push((error as Error)?.message);
      isUsernameValid.value = false;
      isEmailValid.value = false;
    }
  }
}

function goToLogin() {
  router.push(LOGIN_ROUTE);
}

function goToOnboarding() {
  router.push(ONBOARDING_ROUTE);
}

onMounted(() => {
  document.addEventListener("keydown", checkCapslock);
  document.addEventListener("keyup", checkCapslock);
});

onUnmounted(() => {
  document.removeEventListener("keydown", checkCapslock);
  document.removeEventListener("keyup", checkCapslock);
});
</script>
