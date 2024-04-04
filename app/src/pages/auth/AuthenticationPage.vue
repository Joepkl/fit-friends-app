<template>
  <div class="page-wrapper">
    <img class="w-1/2 max-w-[100px] mx-auto mt-[20vh]" src="@/assets/icons/ic_logo.svg" alt="Logo" />
    <h1 class="text-white text-3xl text-center mt-4">Fit Friends</h1>
    <div class="flex flex-col mt-20 items-center gap-6">
      <button class="button-primary" @click="goToLogin">Login</button>
      <button class="button-primary" @click="goToRegister">Create account</button>
    </div>
  </div>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";

/** Routes */
import { REGISTER_ROUTE } from "@/router/authRoutes";
import { LOGIN_ROUTE } from "@/router/authRoutes";

const router = useRouter();

function goToRegister() {
  router.push(REGISTER_ROUTE);
}

function goToLogin() {
  router.push(LOGIN_ROUTE);
}
</script>
