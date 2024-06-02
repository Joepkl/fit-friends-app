<template>
  <section v-if="selectedMeetupTab === 0" class="relative">
    <!-- Overlay -->
    <div v-if="meetups.length" class="absolute z-30 bottom-0 w-full h-5 bg-gradient-to-t from-dark-grey-transparent" />
    <ul v-if="meetups.length" class="flex flex-col gap-2 max-h-[300px] overflow-y-scroll pb-2">
      <!-- Meetups -->
      <li v-for="(item, index) in meetups" :key="index" class="bg-light-grey rounded-default p-3 relative">
        <!-- Users -->
        <div v-for="(user, i) in item.users" :key="i" class="mb-1">
          <button
            v-if="user.username !== userProfile?.username"
            @click="goToProfile(user.username)"
            class="flex items-center gap-[6px]"
          >
            <div
              class="block w-6 h-auto rounded-full border-2 overflow-hidden"
              :class="getColorClass(user.status, null, true)"
            >
              <img class="p-[2px] relative top-[4px] left-[1px]" :src="AccountIcon" alt="Profile picture" />
            </div>
            <p :class="getColorClass(user.status, true)">{{ user.username }}</p>
          </button>
        </div>
        <!-- Details meetup -->
        <div class="mt-2">
          <p><span class="text-green">Date: </span>{{ item.date }}</p>
          <p class="mt-1"><span class="text-green">Time: </span>{{ item.time }}</p>
          <p class="mt-1"><span class="text-green">Location: </span>{{ item.gym }}</p>
        </div>
        <!-- Remove meetup button -->
        <CButton
          @click="openCancelMeetupModal(item.users[0].username, item.id)"
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
import { computed } from "vue";
import { useRouter } from "vue-router";

/** Helpers */
import { getColorClass } from "@/helpers/userHelpers";

/** Images */
import AccountIcon from "@/assets/icons/ic_account.svg";
import CloseIcon from "@/assets/icons/ic_close_green.svg";

/** Routes */
import { USER_PROFILE_ROUTE } from "@/router/appRoutes";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Constants */
import type Meetup from "@/constants/Meetup";

/** Components */
import CButton from "@/components/ui/CButton.vue";

defineProps<{
  selectedMeetupTab: number;
  meetups: Array<Meetup>;
}>();


const store = useStore();
const emits = defineEmits(["openCancelMeetupModal"]);
const router = useRouter();

const userProfile = computed(() => store.getUserProfile);

function goToProfile(username: string) {
  router.push({ name: USER_PROFILE_ROUTE.name, params: { username: username } });
}

function openCancelMeetupModal(username: string, meetupId: number) {
  emits("openCancelMeetupModal", username, meetupId);
}
</script>
