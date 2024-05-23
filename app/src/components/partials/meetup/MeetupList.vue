<template>
  <section v-if="selectedMeetupTab === 0">
    <ul v-if="meetups.length">
      <li v-for="(item, index) in meetups" :key="index" class="bg-light-grey rounded-default p-3 relative">
        <button @click="goToProfile(item.username)" class="flex items-center gap-[6px]">
          <div
            class="block w-6 h-auto rounded-full border-2 overflow-hidden"
            :class="getColorClass(item.userStatus, null, true)"
          >
            <img class="p-[2px] relative top-[4px] left-[1px]" :src="AccountIcon" alt="Profile picture" />
          </div>
          <p :class="getColorClass(item.userStatus, true)">{{ item.username }}</p>
        </button>
        <!-- Details meetup -->
        <div class="mt-3">
          <p><span class="text-green">Date: </span>{{ item.date }}</p>
          <p class="mt-1"><span class="text-green">Time: </span>{{ item.time }}</p>
          <p class="mt-1"><span class="text-green">Location: </span>{{ item.gym }}</p>
        </div>
        <!-- Remove meetup button -->
        <CButton
          @click="openCancelMeetupModal(item.username, item.id)"
          :image="CloseIcon"
          class="w-4 h-4 absolute top-3 right-3"
        />
      </li>
    </ul>
    <p v-else>No meetups planned yet.</p>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";

/** Helpers */
import { getColorClass } from "@/helpers/userHelpers";

/** Images */
import AccountIcon from "@/assets/icons/ic_account.svg";
import CloseIcon from "@/assets/icons/ic_close_green.svg";

/** Routes */
import { USER_PROFILE_ROUTE } from "@/router/appRoutes";

/** Constants */
import type Meetup from "@/constants/Meetup";

/** Components */
import CButton from "@/components/ui/CButton.vue";

defineProps<{
  selectedMeetupTab: number;
  meetups: Array<Meetup>;
}>();

const emits = defineEmits(["openCancelMeetupModal"]);
const router = useRouter();

function goToProfile(username: string) {
  router.push({ name: USER_PROFILE_ROUTE.name, params: { username: username } });
}

function openCancelMeetupModal(username: string, meetupId: number) {
  emits("openCancelMeetupModal", username, meetupId);
}
</script>
