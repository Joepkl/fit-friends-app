<template>
  <CHeader />
  <div class="page-wrapper-header">
    <h1 class="mb-6">Home</h1>
    <ul class="flex flex-col gap-4">
      <li v-for="(post, index) in posts" :key="index"><PostCard :content="post" /></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Components */
import CHeader from "@/components/partials/layout/CHeader.vue";
import PostCard from "@/components/partials/home/PostCard.vue";

const store = useStore();
const router = useRouter();

const today = new Date();
const hours = today.getHours();
const minutes = today.getMinutes();

const posts = [
  {
    author: "Mike_330",
    date: `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`,
    time: `${hours}:${minutes < 10 ? "0" : ""}${minutes}`,
    description: "Had a great workout, despite not feeling like going today.",
    proudOf: ["That I went to the gym ;)", "Benchpress 60kg a few times."],
    achievements: [],
    likes: 12,
    comments: ["Nice job!", "Keep it up!"],
    status: 2,
  },
  {
    author: "WilliamPT",
    date: `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`,
    time: `${hours - 1}:${minutes < 10 ? "0" : ""}${minutes - 12}`,
    description: "Finally got my incline dumbbell goal after two weeks!",
    proudOf: [],
    achievements: [
      {
        category: 1,
        achievement: 3,
        level: 3,
      },
    ],
    likes: 12,
    comments: ["Nice job!", "Keep it up!"],
    status: 1,
  },
];

scrollToTop();
function scrollToTop() {
  window.scrollTo(0, 0);
}
</script>
