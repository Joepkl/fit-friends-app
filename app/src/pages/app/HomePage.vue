<template>
  <CHeader />
  <section class="page-wrapper-header">
    <h1 class="mb-8">Home</h1>
    <ul v-if="isDataSharingEnabled" class="flex flex-col gap-4">
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
    <DataSharingInfo v-else />
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
import DataSharingInfo from "@/components/partials/account/DataSharingInfo.vue";

const store = useStore();

const posts = computed(() => store.getPosts);

const userProfile = computed(() => store.getUserProfile);
const isDataSharingEnabled = computed(() => userProfile.value?.settings?.shareData);

const postsCopy = ref(posts.value);

function handleLikePost(index: number) {
  postsCopy.value[index].isLikedByMe = true;
  postsCopy.value[index].likes++;
  updatePostsStore();
}

function handleUnLikePost(index: number) {
  postsCopy.value[index].isLikedByMe = false;
  postsCopy.value[index].likes--;
  updatePostsStore();
}

function handleCommentPost(index: number, comment: string) {
  if (userProfile.value) {
    postsCopy.value[index].comments?.push({
      author: userProfile.value.username,
      comment: comment,
      status: userProfile.value.status,
    });
  }
  updatePostsStore();
}

function handleRemoveComment(postIndex: number, commentIndex: number) {
  postsCopy.value[postIndex].comments?.splice(commentIndex, 1);
  updatePostsStore();
}

function updatePostsStore() {
  store.setPosts(postsCopy.value);
}

scrollToTop();
function scrollToTop() {
  window.scrollTo(0, 0);
}
</script>
