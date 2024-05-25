<template>
  <CHeader />
  <section class="page-wrapper-header">
    <AccountIntro :user-profile="currentUser" :is-edit-active="false" :isLoggedInAccount="false" :is-friend="true" />
    <AchievementShowCase
      :achievements="currentUser?.showcaseAchievements || []"
      :is-logged-in-account="false"
      class="mt-6"
    />
    <ConsistencyCard
      :weekly-goal="currentUser?.settings?.weeklyGoal || 1"
      :consistency-streak="currentUser?.weeklyConsistencyStreak || 0"
      :status="currentUser?.status || 0"
      :weekly-frequency="currentUser?.weeklyFrequency || 0"
    />
    <PersonalGoalsCard :personal-goals="currentUser?.personalGoals || []" :is-logged-in-account="false" />
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { ref } from "vue";
import { useRouter } from "vue-router";

/** Placeholder data */
import Users from "@/constants/placeholders/Users";

/** Constants */
import type UserProfile from "@/constants/UserProfile"

/** Components */
import CHeader from "@/components/partials/layout/CHeader.vue";
import AccountIntro from "@/components/partials/account/AccountIntro.vue";
import AchievementShowCase from "@/components/partials/account/AchievementShowCase.vue";
import ConsistencyCard from "@/components/partials/account/ConsistencyCard.vue";
import PersonalGoalsCard from "@/components/partials/account/PersonalGoalsCard.vue";

const router = useRouter();

const currentUser = ref<UserProfile | null>(null);

setCurrentProfile();
function setCurrentProfile() {
  const currentUsername = router.currentRoute.value.params.username;
  const user = Users.find((user) => user.username === currentUsername);
  if(user) {
    currentUser.value = user;
  }
}

scrollToTop();
function scrollToTop() {
  window.scrollTo(0, 0);
}
</script>
