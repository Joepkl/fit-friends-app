<template>
  <section class="bg-light-grey rounded-default p-4">
    <div class="flex">
      <!-- Username and profile picture -->
      <a @click="goToProfile" class="flex items-center gap-2">
        <div
          class="block w-8 h-auto rounded-full border-2 overflow-hidden"
          :class="getColorClass(content.status, null, true)"
        >
          <img class="p-1 relative top-[5px] left-[1px]" :src="AccountIcon" alt="Profile picture" />
        </div>
        <h2 class="text-[18px] font-medium" :class="getColorClass(content.status, true)">{{ content.author }}</h2>
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
        <li v-for="(item, index) in content.achievements" :key="index" class="flex items-center mt-2">
          <img :src="getAchievementIcon(item.level)" class="w-12" alt="Achievement icon" />
          <p class="ml-2">
            {{ AllAchievements[item.category][item.achievement].title }} {{ getAchievementLevel(item.level) }}
          </p>
        </li>
      </ul>
    </div>
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
    <!-- Likes -->
    <div class="flex gap-2">
      <p class="text-green">{{ content.likes }}</p>
      <CButton @click="likePost" :image="content.isLikedByMe ? LikeFillIcon : LikeOutlineIcon" class="w-5 h-5" />
    </div>
  </div>
  <!-- All comments -->
  <div v-if="isCommentsToggled" class="relative">
    <div class="absolute z-50 top-0 w-full h-10 bg-gradient-to-b from-light-grey-transparent" />
    <ul ref="allCommentsEl" class="relative z-10 flex flex-col max-h-[270px] overflow-scroll">
      <li v-for="(comment, index) in content.comments" :key="index" class="mt-3">
        <button class="flex items-center gap-1">
          <div
            class="block w-6 h-auto rounded-full border-2 overflow-hidden"
            :class="getColorClass(comment.status, null, true)"
          >
            <img class="p-[2px] relative top-[4px] left-[1px]" :src="AccountIcon" alt="Profile picture" />
          </div>
          <p :class="getColorClass(comment.status, true)">{{ comment.author }}</p>
        </button>
        <p class="mt-1">{{ comment.comment }}</p>
      </li>
    </ul>
  </div>

  <!-- Need this for the dynamic TW class to apply styling -->
  <h2 class="hidden border-gold text-gold"></h2>
  <h2 class="hidden text-silver border-silver"></h2>
  <h2 class="hidden border-bronze text-bronze"></h2>
</template>

<script setup lang="ts">
/** Vue */
import { nextTick, ref } from "vue";

/** Images */
import AccountIcon from "@/assets/icons/ic_account.svg";
import DumbbellGoldIcon from "@/assets/icons/ic_dumbbell_gold.svg";
import DumbbellSilverIcon from "@/assets/icons/ic_dumbbell_silver.svg";
import DumbbellBronzeIcon from "@/assets/icons/ic_dumbbell_bronze.svg";
import LikeOutlineIcon from "@/assets/icons/ic_like_outline.svg";
import LikeFillIcon from "@/assets/icons/ic_like_fill.svg";

/** Components */
import CButton from "@/components/ui/CButton.vue";

/** Constants */
import type PostContent from "@/constants/PostContent";
import { AllAchievements } from "@/constants/Achievements";

const emits = defineEmits(["goToProfile", "likePost", "unlikePost"]);

const props = defineProps<{
  content: PostContent;
}>();


const statusColors = ["bronze", "silver", "gold"];
const isCommentsToggled = ref(false);
const allCommentsEl = ref<HTMLElement | null>(null);

function goToProfile(): void {
  emits("goToProfile");
}

function likePost() {
  if(!props.content.isLikedByMe) {
    emits("likePost");
  } else {
     emits("unlikePost");
  }
}

function toggleComments() {
  isCommentsToggled.value = !isCommentsToggled.value;
  nextTick(() => {
    if(allCommentsEl.value) {
      allCommentsEl.value.scrollTop = allCommentsEl.value.scrollHeight;
    }
  })
}

function getAchievementIcon(level: number) {
  if(level === 1) {
    return DumbbellBronzeIcon;
  }
    if(level === 2) {
    return DumbbellSilverIcon;
  }
    if(level === 3) {
    return DumbbellGoldIcon;
  }
}

function getAchievementLevel(level:number) {
  if(level === 1) {
    return "I";
  }
  if(level === 2) {
    return "II";
  }
  if(level === 3) {
    return "  III";
  }
    if(level === 4) {
    return "  IV";
  }
    if(level === 5) {
    return "  V";
  }
    if(level === 6) {
    return "  VI";
  }
}

function getColorClass(status: number, isText: boolean | null = null, isBorder: boolean | null = null, isBackground: boolean | null = null) {
  let prefix;
  if(isText) {
    prefix = "text-";
  } else if(isBorder) {
    prefix = "border-";
  } else if(isBackground) {
    prefix = "bg-";
  }
  return prefix + statusColors[status];
}
</script>
