<template>
  <div class="page-wrapper">
    <img class="w-14 mb-10" src="@/assets/icons/ic_logo.svg" alt="Logo" />
    <h1>Login</h1>
    <p class="flex flex-col mt-4 mb-8">
      <span>Welcome back!</span>
      <span>Sign in to your account to continue.</span>
    </p>
    <form class="relative">
      <!-- Email -->
      <div class="flex flex-col mb-4">
        <label for="email">Email</label>
        <input v-model="email" id="email" type="text" />
      </div>
      <!-- Password -->
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
      <div class="mt-4">
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="isCapslockActive" class="error mt-2">Caps lock is active.</p>
      </div>
    </form>
    <!-- CTA -->
    <button @click="login" class="button-primary mt-6" :class="{ disabled: !isDataValid }">Login</button>
    <p class="mt-4">Don't have an account? <a class="button-link" @click="goToRegister">Register</a></p>
  </div>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";
import { ref, computed, onMounted, onUnmounted } from "vue";

/** Routes */
import { REGISTER_ROUTE } from "@/router/authRoutes";
import { HOME_ROUTE } from "@/router/appRoutes";

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
const errorMessage = ref<string | null>(null);
const isCapslockActive = ref(false);

const isDataValid = computed(() => {
  return email.value && password.value;
});

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

function checkCapslock(e: KeyboardEvent) {
  if (e.code === "CapsLock") {
    if (e.getModifierState("CapsLock")) {
      isCapslockActive.value = true;
    } else {
      isCapslockActive.value = false;
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
        goToHome();
      }
    } catch (error) {
      errorMessage.value = (error as Error).message;
    }
  }
}

function goToRegister() {
  router.push(REGISTER_ROUTE);
}

function goToHome() {
  router.push(HOME_ROUTE);
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
