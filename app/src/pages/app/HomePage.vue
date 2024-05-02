<template>
  <CHeader />
  <section class="page-wrapper-header">
    <h1 class="mb-6">Home</h1>
    <ul class="flex flex-col gap-4">
      <li v-for="(post, index) in postsCopy" :key="index">
        <PostCard @like-post="handleLikePost(index)" @unlike-post="handleUnLikePost(index)" :content="post" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { ref } from "vue";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Components */
import CHeader from "@/components/partials/layout/CHeader.vue";
import PostCard from "@/components/partials/home/PostCard.vue";

/** Placeholder data */
import Posts from "@/constants/placeholders/Posts";

const store = useStore();

const postsCopy = ref(Posts);

function handleLikePost(index: number) {
  postsCopy.value[index].isLikedByMe = true;
  postsCopy.value[index].likes++;
}

function handleUnLikePost(index: number) {
  postsCopy.value[index].isLikedByMe = false;
  postsCopy.value[index].likes--;
}

scrollToTop();
function scrollToTop() {
  window.scrollTo(0, 0);
}
</script>
