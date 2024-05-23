<template>
  <CHeader />
  <section class="page-wrapper-header">
    <h1 class="mb-8">Home</h1>
    <ul class="flex flex-col gap-4">
      <li v-for="(post, index) in postsCopy" :key="index">
        <PostCard
          @like-post="handleLikePost"
          @unlike-post="handleUnLikePost"
          @posted-comment="handleCommentPost"
          @remove-comment="handleRemoveComment"
          :content="post"
          :post-index="index"
        />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { ref, computed } from "vue";

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

const userProfile = computed(() => store.getUserProfile);

function handleLikePost(index: number) {
  postsCopy.value[index].isLikedByMe = true;
  postsCopy.value[index].likes++;
}

function handleUnLikePost(index: number) {
  postsCopy.value[index].isLikedByMe = false;
  postsCopy.value[index].likes--;
}

function handleCommentPost(index: number, comment: string) {
  if (userProfile.value) {
    postsCopy.value[index].comments?.push({
      author: userProfile.value.username,
      comment: comment,
      status: userProfile.value.status,
    });
  }
}

function handleRemoveComment(postIndex: number, commentIndex: number) {
  postsCopy.value[postIndex].comments?.splice(commentIndex, 1);
}

scrollToTop();
function scrollToTop() {
  window.scrollTo(0, 0);
}
</script>
