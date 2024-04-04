<template>
  <div class="page-wrapper">
    <h1>Auth screen login</h1>
    <button class="button-primary">Button</button>
    <button class="button-link">Link</button>
  </div>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";

/** Routes */
import { HOME_ROUTE } from "@/router/appRoutes";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** API calls */
import { fetchTrendingMovies, fetchUpcomingMovies } from "@/api/fetchMovies";

const store = useStore();
const router = useRouter();
</script>
