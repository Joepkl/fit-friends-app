<template>
  <section class="bg-light-grey mt-6 p-4 rounded-default relative">
    <h2 class="text-green">Personal goals</h2>
    <CButton v-if="isLoggedInAccount" @click="toggleEdit" :image="EditIcon" class="absolute right-4 top-4 w-6 h-6" />
    <ul class="flex flex-col gap-4 mt-4">
      <!-- No goals and not logged in account -->
      <li v-if="!hasGoals && !isLoggedInAccount" class="flex items-center">
        <a class="border-2 block border-white rounded-default w-[56px] h-[56px]"></a>
        <p class="ml-4">This user has set no goals yet.</p>
      </li>
      <!-- Showcase selected goals -->
      <li v-else v-for="(goal, index) in personalGoals" :key="index" class="flex items-center relative">
        <div v-if="goal" class="flex items-center">
          <a @click="goToGoal(goal.id)" class="block rounded-default">
            <img
              :src="getAchievementIconFromPercentage(goal.level as number, goal.maxLevel as number, goal.category)"
              class="w-[56px] h-[56px]"
              alt="Achievement icon"
            />
          </a>
          <p class="ml-4">
            {{ getAchievementInfo(goal.id as number)?.title }}
            {{ getAchievementLevel(goal.level as number) }}
          </p>
          <!-- Remove achievement button -->
          <CButton v-if="isEditActive" @click="removePersonalGoal(goal)" :image="CloseIconGreen" class="w-5 h-5 ml-5" />
        </div>
        <!-- No goal selected -->
        <a
          v-else
          @click="handleAchievementClick"
          class="border-2 border-white rounded-default w-[56px] h-[56px] flex items-center justify-center"
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

/** Images */
import CloseIconGreen from "@/assets/icons/ic_close_green.svg";
import EditIcon from "@/assets/icons/ic_edit.svg";

/** Components */
import CButton from "@/components/ui/CButton.vue";

/** Constants */
import type SingleAchievement from "@/constants/SingleAchievement"

/** Helpers */
import { getAchievementIconFromPercentage, getAchievementLevel, getAchievementInfo } from "@/helpers/achievementHelpers";

const props = defineProps<{
  personalGoals: Array<SingleAchievement | null>;
  isLoggedInAccount: boolean;
}>();

const emits = defineEmits(["personalGoalRemoved"]);

const hasGoals = hasUserGoals();
const isEditActive = ref(false);

function toggleEdit() {
  isEditActive.value = !isEditActive.value;
}

function hasUserGoals() {
  for (const goal of props.personalGoals) {
    if (goal) {
      return true;
    }
  }
  return false;
}

function removePersonalGoal(achievement: SingleAchievement) {
  emits("personalGoalRemoved", achievement);
}

const router = useRouter();

function goToAchievements() {
  router.push(ACHIEVEMENTS_ROUTE);
}

function handleAchievementClick() {
  if (props.isLoggedInAccount) {
    goToAchievements();
  }
}

function goToGoal(id: number) {
  router.push({ name: ACHIEVEMENT_DETAILS_ROUTE.name, params: { id: id } });
}
</script>
