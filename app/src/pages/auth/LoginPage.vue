<template>
  <div class="page-wrapper">
    <img class="w-14 mb-10" src="@/assets/icons/ic_logo.svg" alt="Logo" />
    <h1>Login</h1>
    <p class="flex flex-col mt-4 mb-8">
      <span>Welcome back!</span>
      <span>Sign in to your account to continue.</span>
    </p>
    <form class="relative">
      <!-- Username -->
      <div class="flex flex-col mb-4">
        <label for="username">Username</label>
        <input
          @change="handleUsernameChange"
          v-model="username"
          :class="{ error: isUsernameValid === false }"
          id="username"
          type="text"
        />
      </div>
      <!-- Password -->
      <div class="flex flex-col mb-4">
        <label for="password">Password</label>
        <input
          v-model="password"
          @input="isPasswordValid = true"
          :class="{ error: isPasswordValid === false }"
          ref="passwordEl"
          id="password"
          type="password"
        />
      </div>
      <!-- Password visibility toggle -->
      <label class="container"
        >Show password
        <input type="checkbox" @click="togglePasswordVisibility" id="show-password" />
        <span class="checkmark"></span>
      </label>
      <!-- Error message -->
      <div class="mt-4">
        <p v-if="errors.length" class="error">{{ errors[0] }}</p>
        <p v-if="isCapslockActive" class="error mt-2">Caps lock is active.</p>
      </div>
    </form>
    <!-- CTA -->
    <button @click="login" class="button-primary mt-6" :class="{ disabled: !isDataValid }">Login</button>
    <p class="mt-4">Don't have an account? <a class="button-link" @click="goToRegister">Register</a></p>
    <div class="mt-2 flex gap-1">
      <p>Forgot password?</p>
      <CButton @click="openPasswordModal" button-class="link" text="Set new password" />
    </div>
  </div>
  <!-- Modal -->
  <CModal @close-modal="closePasswordModal" :isActive="isPasswordModalActive" :content="ForgotPasswordContent">
    <div class="flex flex-col mt-6">
      <label for="emailResend">Email</label>
      <input
        v-model="email"
        @change="validateEmail"
        :class="{ error: isEmailValid === false }"
        type="text"
        id="emailResend"
      />
      <p v-if="isEmailValid === false" class="error mt-2">Please enter a valid email address.</p>
      <CButton
        @click="sendPasswordReset"
        button-class="primary"
        text="Send link"
        :is-disabled="!isEmailValid"
        class="mt-6"
      />
    </div>
  </CModal>
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

/** Components */
import CModal from "@/components/ui/CModal.vue";
import CButton from "@/components/ui/CButton.vue";

/** Constants */
import { ForgotPasswordContent } from "@/constants/ModalContent";

const store = useStore();
const router = useRouter();

const username = ref<string | null>(null);
const isUsernameValid = ref<boolean | null>(null);
const password = ref<string | null>(null);
const isPasswordValid = ref<boolean | null>(null);
const email = ref<string | null>(null);
const isEmailValid = ref<boolean | null>(null);
const passwordEl = ref<HTMLInputElement | null>(null);
const errors = ref<string[]>([]);
const isCapslockActive = ref(false);
const isPasswordModalActive = ref(false);

const isDataValid = computed(() => {
  return username.value && isUsernameValid.value && password.value && isPasswordValid.value;
});

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

function openPasswordModal() {
  isPasswordModalActive.value = true;
}

function closePasswordModal() {
  isPasswordModalActive.value = false;
}

function handleUsernameChange() {
  validateUsername();
  removeCredentialsError();
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
  const errorMessage = "This username doesn't belong to any registered user.";
  setError(false, errorMessage);
}

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
  if (username.value && password.value) {
    try {
      const response = await postLoginAccount(username.value, password.value);
      if (response.accessToken) {
        store.setIsAuthenticated(true);
        store.setAccessToken(response.accessToken);
        goToHome();
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError(true, errorMessage);
      if (errorMessage === "This username doesn't belong to any registered user.") {
        isUsernameValid.value = false;
      } else {
        isPasswordValid.value = false;
      }
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

function sendPasswordReset() {
  // TODO: Implement password reset when API is ready
  closePasswordModal();
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
@/constants/ModalContent
