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
      <ul class="flex flex-col gap-4">
        <!-- Email -->
        <li class="flex flex-col">
          <label for="email">Email</label>
          <input
            v-model="email"
            :class="{ error: isEmailValid === false }"
            @change="handleEmailChange"
            id="email"
            type="text"
            placeholder="johndoe@gmail.com"
            autocomplete="off"
          />
        </li>
        <!-- Username -->
        <li class="flex flex-col">
          <label for="username">Username</label>
          <input
            v-model="username"
            @change="removeCredentialsError"
            @input="validateUsername"
            :class="{ error: isUsernameValid === false }"
            id="username"
            type="text"
            placeholder="john_doe123"
            autocomplete="off"
          />
        </li>
        <!-- Password -->
        <li class="flex flex-col">
          <label for="password">Password</label>
          <input
            @input="validatePassword"
            v-model="password"
            id="password"
            type="password"
            ref="passwordEl"
            placeholder="**********"
            autocomplete="off"
          />
        </li>
        <!-- Password confirmation -->
        <li class="flex flex-col">
          <label for="confirm-password">Confirm password</label>
          <input
            @input="validatePassword"
            @keydown.enter="handleEnterKey"
            v-model="confirmPassword"
            :class="{ error: isPasswordValid === false }"
            ref="confirmPasswordEl"
            type="password"
            id="confirm-password"
            placeholder="**********"
            autocomplete="off"
          />
        </li>
        <!-- Password visibility toggle -->
        <li class="flex flex-col">
          <label class="container"
            >Show password
            <input type="checkbox" @click="togglePasswordVisibility" id="show-password" />
            <span class="checkmark"></span>
          </label>
        </li>
        <!-- Error messages -->
        <li class="flex flex-col">
          <p v-if="errors.length" class="error">{{ errors[0] }}</p>
          <p v-if="isCapslockActive" class="error mt-2">Caps lock is active.</p>
        </li>
      </ul>
    </form>
    <!-- CTA -->
    <button @click="createAccount" :class="{ disabled: !isDataValid }" class="button button-primary mt-6">
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
import { ONBOARDING_ROUTE } from "@/router/onboardingRoutes";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** API calls */
import { postCreateAccount, postLoginAccount } from "@/api/auth/postAuth";

const store = useStore();
const router = useRouter();

const passwordEl = ref<HTMLInputElement | null>(null);
const confirmPasswordEl = ref<HTMLInputElement | null>(null);

const email = ref<string | null>(null);
const username = ref<string | null>(null);
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

function handleEnterKey() {
  if (isDataValid.value) {
    createAccount();
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
  if (password.value !== confirmPassword.value && confirmPasswordEl.value) {
    isPasswordValid.value = false;
    setError(true, errorMessage);
    confirmPasswordEl.value.placeholder = "";
  } else {
    isPasswordValid.value = true;
    setError(false, errorMessage);
  }
}

function validateUsername() {
  // Check for spaces
  const errorMessage = "Username can't contain spaces.";
  const usernameString = username.value !== null ? (username.value as string) : null;
  if (username.value && usernameString && usernameString.includes(" ")) {
    setError(true, errorMessage);
    isUsernameValid.value = false;
  } else {
    setError(false, errorMessage);
    isUsernameValid.value = true;
  }
  // Set max length
  if (username.value && usernameString && usernameString.length > 12) {
    username.value = usernameString.slice(0, 12);
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
      const data = response.responseData;
      if (data.token) {
        store.setIsAuthenticated(true);
        store.setAccessToken(data.token);
        store.setUserProfile(data.user);
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
