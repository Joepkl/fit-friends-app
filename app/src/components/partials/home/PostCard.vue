<template>
  <section class="bg-light-grey rounded-default p-4">
    <div class="flex">
      <!-- Username and profile picture -->
      <a @click="goToProfile(content.author)" class="flex items-center gap-2" tabindex="0">
        <div
          class="block w-8 h-auto rounded-full border-2 overflow-hidden"
          :class="getColorClass(content.status, null, true)"
        >
          <img class="p-1 relative top-[5px] left-[1px]" :src="AccountIcon" alt="Profile picture" />
        </div>
        <h2 class="text-[18px] font-medium" :class="getColorClass(content.status, true)">@{{ content.author }}</h2>
      </a>
      <!-- Date -->
      <ul class="text-right leading-4 ml-auto relative top-2 text-green">
        <li>{{ content.date }}</li>
        <li>{{ content.time }}</li>
      </ul>
    </div>
    <!-- Description -->
    <p v-if="content.description" class="mt-4">{{ content.description }}</p>
    <!-- Proud of in this workout -->
    <div v-if="content.proudOf?.length" class="mt-4">
      <p class="text-green">Proud of in this workout:</p>
      <ul class="list-disc pl-4 leading-5">
        <li v-for="(item, index) in content.proudOf" :key="index">{{ item }}</li>
      </ul>
    </div>
    <!-- Achievements -->
    <div v-if="content.achievements?.length" class="mt-4">
      <p class="text-green">Accomplished achievements</p>
      <ul>
        <li v-for="(item, index) in content.achievements" :key="index">
          <button @click="goToAchievement(item.id)" class="flex items-center mt-2">
            <img
              :src="getAchievementIconFromPercentage(item.level as number, item.maxLevel as number, item.category)"
              class="w-12"
              alt="Achievement icon"
            />
            <p class="ml-2">
              {{ getAchievementInfo(item.id)?.title }}
              {{ getAchievementLevel(item.level as number) }}
            </p>
          </button>
        </li>
      </ul>
    </div>
    <!-- Remove post button -->
    <button v-if="isMyPost()" @click="toggleDeletePostModal" class="w-5 h-6 block ml-auto">
      <img :src="GarbageOutlineIcon" alt="Remove Icon" />
    </button>
  </section>
  <div class="flex justify-between mt-2">
    <!-- Comments -->
    <button
      @click="toggleComments"
      v-if="content.comments && content.comments.length > 0 && !isCommentsToggled"
      class="text-green"
    >
      View {{ content.comments.length }} comments
    </button>
    <button
      @click="toggleComments"
      v-else-if="content.comments && content.comments.length > 0 && isCommentsToggled"
      class="text-green"
    >
      Close comments
    </button>
    <p v-else class="text-green">0 comments</p>
    <!-- Like and comment -->
    <div class="flex gap-2">
      <p class="text-green">{{ content.likes }}</p>
      <CButton @click="likePost" :image="content.isLikedByMe ? LikeFillIcon : LikeOutlineIcon" class="w-5 h-5" />
      <CButton @click="toggleCommenting" :image="CommentOutlineIcon" class="w-5 h-5" />
    </div>
  </div>
  <!-- All comments -->
  <div v-if="isCommentsToggled" class="relative mt-2">
    <div class="absolute z-30 top-0 w-full h-5 bg-gradient-to-b from-dark-grey-transparent" />
    <ul ref="allCommentsEl" class="relative z-10 flex flex-col gap-3 max-h-[210px] overflow-y-scroll pt-2">
      <li v-for="(comment, index) in content.comments" :key="index" class="flex">
        <!-- Comment -->
        <div class="w-full">
          <button @click="goToProfile(comment.author)" class="flex items-center gap-1">
            <div
              class="block w-6 h-auto rounded-full border-2 overflow-hidden"
              :class="getColorClass(comment.status, null, true)"
            >
              <img class="p-[2px] relative top-[4px] left-[1px]" :src="AccountIcon" alt="Profile picture" />
            </div>
            <p :class="getColorClass(comment.status, true)">{{ comment.author }}</p>
          </button>
          <p class="mt-1">{{ comment.comment }}</p>
        </div>
        <!-- Remove comment -->
        <button v-if="isMyComment(index)" @click="toggleRemoveCommentModal(index)" class="w-5 h-6">
          <img :src="GarbageOutlineIcon" alt="Remove Icon" />
        </button>
      </li>
    </ul>
    <!-- Write comment -->
    <div v-if="isWritingComment" class="flex mt-2 gap-2">
      <input @input="capitalizeComment" @keydown.enter="sendComment" v-model="comment" type="text" class="w-full" />
      <CButton @click="sendComment" text="Send" button-class="primary" class="h-[36px]" />
    </div>
  </div>
  <!-- Remove comment modal -->
  <CModal
    @close-modal="toggleRemoveCommentModal"
    :isActive="isRemoveCommentModalActive"
    :content="RemoveCommentContent"
    :hide-close-button="true"
  >
    <div class="mt-8 flex flex-wrap justify-end">
      <CButton @click="toggleRemoveCommentModal" button-class="outline" text="Cancel" class="mr-6" />
      <CButton @click="removeComment" button-class="warning" text="Remove" />
    </div>
  </CModal>
  <!-- Remove post modal -->
  <CModal
    @close-modal="toggleDeletePostModal"
    :isActive="isDeletePostModalActive"
    :content="DeletePostContent"
    :hide-close-button="true"
  >
    <div class="mt-8 flex flex-wrap justify-end">
      <CButton @click="toggleDeletePostModal" button-class="outline" text="Cancel" class="mr-6" />
      <CButton @click="deletePost" button-class="warning" text="Delete" />
    </div>
  </CModal>

  <!-- Need this for the dynamic TW class to apply styling -->
  <h2 class="hidden border-gold text-gold"></h2>
  <h2 class="hidden text-silver border-silver"></h2>
  <h2 class="hidden border-bronze text-bronze"></h2>
</template>

<script setup lang="ts">
/** Vue */
import { ref, computed, nextTick, watch } from "vue";
import { useRouter } from "vue-router";

/** Images */
import AccountIcon from "@/assets/icons/ic_account.svg";
import LikeOutlineIcon from "@/assets/icons/ic_like_outline.svg";
import LikeFillIcon from "@/assets/icons/ic_like_fill.svg";
import CommentOutlineIcon from "@/assets/icons/ic_comment_outline.svg";
import GarbageOutlineIcon from "@/assets/icons/ic_garbage_outline.svg";

/** Components */
import CButton from "@/components/ui/CButton.vue";
import CModal from "@/components/ui/CModal.vue";

/** Constants */
import type PostContent from "@/constants/PostContent";
import { RemoveCommentContent, DeletePostContent } from "@/constants/ModalContent";

/** Routes */
import { USER_PROFILE_ROUTE, ACHIEVEMENT_DETAILS_ROUTE, ACCOUNT_ROUTE } from "@/router/appRoutes";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Helpers */
import { getAchievementIconFromPercentage, getAchievementLevel, getAchievementInfo } from "@/helpers/achievementHelpers";
import { getColorClass } from "@/helpers/userHelpers";

const emits = defineEmits(["likePost", "unlikePost", "postedComment", "removeComment", "deletePost"]);

const props = defineProps<{
  content: PostContent;
  postIndex: number;
}>();

const router = useRouter();
const store = useStore();

const comment = ref("");
const isCommentsToggled = ref(false);
const allCommentsEl = ref<HTMLElement | null>(null);
const isWritingComment = ref(false);
const isRemoveCommentModalActive = ref(false);
const isDeletePostModalActive = ref(false);
const selectedCommentIndex = ref<number | null>(null);

const userProfile = computed(() => store.getUserProfile);


// Watch for changes in comments
watch(
  () => props.content.comments, () => {
    // Wait for DOM update
    nextTick(() => {
      scrollToBottomComments();
    });
  },
  { deep: true }
);

function goToProfile(username: string) {
  if(username === userProfile.value?.username) {
    router.push(ACCOUNT_ROUTE);
  } else {
    router.push({ name: USER_PROFILE_ROUTE.name, params: { username: username } });
  }
}

function likePost() {
  if(!props.content.isLikedByMe) {
    emits("likePost", props.postIndex);
  } else {
     emits("unlikePost", props.postIndex);
  }
}

function toggleCommenting() {
  if(!isCommentsToggled.value) {
    toggleComments();
  }
  isWritingComment.value = !isWritingComment.value;
  if(!isWritingComment.value) {
    toggleComments();
  }
}

function toggleDeletePostModal() {
  isDeletePostModalActive.value = !isDeletePostModalActive.value;
}

function deletePost() {
  emits("deletePost");
  toggleDeletePostModal();
}

function toggleRemoveCommentModal(commentIndex?: number) {
  if(commentIndex) {
    selectedCommentIndex.value = commentIndex;
  }
  isRemoveCommentModalActive.value = !isRemoveCommentModalActive.value;
}

function removeComment() {
  emits("removeComment", props.postIndex, selectedCommentIndex.value);
  toggleRemoveCommentModal();
}

function capitalizeComment() {
  if(comment.value) {
    comment.value = comment.value.charAt(0).toUpperCase() + comment.value.slice(1);
  }
}

function sendComment() {
  emits("postedComment", props.postIndex, comment.value);
  comment.value = "";
}

function isMyComment(index: number) {
  if(props.content.comments) {
    const author = props.content.comments[index].author;
    return author === userProfile.value?.username;
  }
}

function isMyPost() {
  return props.content.author === userProfile.value?.username;
}

function toggleComments() {
  isCommentsToggled.value = !isCommentsToggled.value;
  isWritingComment.value = false;
  // Wait for DOM update
  nextTick(() => {
    scrollToBottomComments();
  })
}

function scrollToBottomComments() {
  if (allCommentsEl.value) {
    allCommentsEl.value.scrollTop = allCommentsEl.value.scrollHeight;
  }
}

function goToAchievement(id: number) {
  router.push({ name: ACHIEVEMENT_DETAILS_ROUTE.name, params: { id: id } });
}
</script>
