<template>
  <section class="bg-light-grey p-4 rounded-default relative">
    <h2 class="text-green mb-4">Showcase</h2>
    <CButton v-if="isLoggedInAccount" @click="toggleEdit" :image="EditIcon" class="absolute right-4 top-4 w-6 h-6" />
    <ul class="flex justify-between text-center">
      <!-- Showcase achievements -->
      <li v-for="(achievement, index) in achievements" :key="'else-' + index" class="flex w-[68px]">
        <div v-if="achievement" class="relative">
          <a @click="goToAchievement(achievement.id as number)" class="block rounded-default">
            <img
              :src="getAchievementIconFromPercentage(achievement.level as number, achievement.maxLevel as number, achievement.category)"
              class="w-[56px] h-[56px] mx-auto"
              alt="Achievement icon"
            />
            <p class="mt-2">
              {{ getAchievementInfo(achievement.id as number)?.title }}
              {{ getAchievementLevel(achievement.level as number) }}
            </p>
          </a>
          <!-- Remove achievement button -->
          <CButton
            v-if="isEditActive"
            @click="removeAchievement(achievement)"
            :image="CloseIconGreen"
            class="w-5 h-5 absolute top-[-10px] right-[-2px]"
          />
        </div>
        <!-- No achievement selected -->
        <a
          v-else
          @click="handleAchievementClick"
          class="border-2 block border-white rounded-default p-4 w-[56px] h-[56px]"
        >
          <img v-if="isLoggedInAccount" src="@/assets/icons/ic_add.svg" alt="Add icon" class="w-5 h-5" />
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { ref } from "vue";
import { useRouter } from "vue-router";

/** Routes */
import { ACHIEVEMENTS_ROUTE, ACHIEVEMENT_DETAILS_ROUTE } from "@/router/appRoutes";

/** Constants */
import type SingleAchievement from "@/constants/SingleAchievement";

/** Images */
import CloseIconGreen from "@/assets/icons/ic_close_green.svg";
import EditIcon from "@/assets/icons/ic_edit.svg";

/** Components */
import CButton from "@/components/ui/CButton.vue";

/** Helpers */
import { getAchievementIconFromPercentage, getAchievementLevel, getAchievementInfo } from "@/helpers/achievementHelpers";

const props = defineProps<{
  achievements: Array<SingleAchievement | null>;
  isLoggedInAccount: boolean;
}>();

const emits = defineEmits(["showcaseAchievementRemoved"]);

const router = useRouter();
const isEditActive = ref(false);

function toggleEdit() {
  isEditActive.value = !isEditActive.value;
}

function handleAchievementClick() {
  if (props.isLoggedInAccount) {
    goToAchievements();
  }
}

function removeAchievement(achievement: SingleAchievement) {
  emits("showcaseAchievementRemoved", achievement);
}

function goToAchievements() {
  router.push(ACHIEVEMENTS_ROUTE);
}

function goToAchievement(id: number) {
  router.push({ name: ACHIEVEMENT_DETAILS_ROUTE.name, params: { id: id } });
}
</script>
