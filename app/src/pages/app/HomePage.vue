<template>
  <CHeader />
  <div class="page-wrapper-header">
    <h1 class="mb-6">Home</h1>
    <ul class="flex flex-col gap-4">
      <li v-for="(post, index) in posts" :key="index">
        <PostCard @like-post="handleLikePost(index)" @unlike-post="handleUnLikePost(index)" :content="post" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
/** Vue */
import { ref, computed } from "vue";
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

function getMinutes(minutes: number) {
  return minutes < 10 ? `0${minutes}` : minutes;
}

function getTime(hourOffset: number, minuteOffset: number) {
  return `${hours - hourOffset}:${getMinutes(minutes - minuteOffset)}`;
}

function getDate(dayOffset: number, monthOffset: number, yearOffset: number) {
  return `${today.getDate() - dayOffset}-${today.getMonth() + 1 - monthOffset}-${today.getFullYear() - yearOffset}`;
}

function handleLikePost(index: number) {
  posts.value[index].isLikedByMe = true;
  posts.value[index].likes++;
}

function handleUnLikePost(index: number) {
  posts.value[index].isLikedByMe = false;
  posts.value[index].likes--;
}

const posts = ref([
  {
    author: "Mike_330",
    date: getDate(0, 0, 0),
    time: getTime(0, 0),
    description: "Had a great workout, despite not feeling like going today.",
    proudOf: ["That I went to the gym ;)", "Benchpress 60kg a few times."],
    achievements: [],
    likes: 12,
    comments: [
      {
        author: "Sarah.B",
        comment: "Nice job Mike!",
        status: 0,
      },
      {
        author: "BillyJones",
        comment: "Keep it up!",
        status: 2,
      },
    ],
    status: 2,
    isLikedByMe: false,
  },
  {
    author: "WilliamPT",
    date: getDate(1, 0, 0),
    time: getTime(1, 12),
    description: "Finally got my incline dumbbell goal after two weeks!",
    proudOf: [],
    achievements: [
      {
        category: 1,
        achievement: 3,
        level: 3,
      },
    ],
    likes: 23,
    comments: [
      {
        author: "GregBlake",
        comment: "Now I have to do my best to keep up with you ;)",
        status: 0,
      },
      {
        author: "sammy_02",
        comment: "Nicely done William!",
        status: 1,
      },
      {
        author: "Sarah.B",
        comment: "Hard work pays off.",
        status: 0,
      },
      {
        author: "Mike_330",
        comment: "I am almost there too!",
        status: 2,
      },
      {
        author: "sammy_02",
        comment: "Nicee",
        status: 1,
      },
      {
        author: "mikeyB",
        comment: "We need to train together soon haha.",
        status: 2,
      },
    ],
    status: 1,
    isLikedByMe: false,
  },
  {
    author: "lianne_22",
    date: getDate(1, 0, 0),
    time: getTime(2, 5),
    description: "Legdayyyy",
    proudOf: ["Squatted for the first time."],
    achievements: [
      {
        category: 2,
        achievement: 0,
        level: 1,
      },
    ],
    likes: 7,
    comments: [
      {
        author: "Sarah.B",
        comment: "Argg hate squats haha.",
        status: 0,
      },
      {
        author: "BillyJones",
        comment: "Keep it up!",
        status: 2,
      },
    ],
    status: 1,
    isLikedByMe: false,
  },
  {
    author: "Sarah.B",
    date: getDate(2, 0, 0),
    time: getTime(3, 18),
    description: "Quick session to reach my weekly goal.",
    proudOf: [],
    achievements: [],
    likes: 3,
    comments: [],
    status: 0,
    isLikedByMe: false,
  },
]);

scrollToTop();
function scrollToTop() {
  window.scrollTo(0, 0);
}
</script>
