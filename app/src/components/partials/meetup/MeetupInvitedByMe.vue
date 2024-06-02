<template>
  <section v-if="selectedMeetupTab === 2" class="relative">
    <!-- Overlay -->
    <div
      v-if="myInvites.length"
      class="absolute z-30 bottom-0 w-full h-5 bg-gradient-to-t from-dark-grey-transparent"
    />
    <ul v-if="myInvites.length" class="flex flex-col gap-2 max-h-[330px] overflow-y-scroll pb-2">
      <li v-for="(item, index) in myInvites" :key="index" class="bg-light-grey rounded-default p-3 relative">
        <div v-for="(user, i) in item.users" :key="i">
          <button v-if="user.username !== userProfile?.username" class="flex items-center gap-[6px]">
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
        <div class="mt-3 flex flex-col gap-1">
          <p><span class="text-green">Date: </span>{{ formatDate(item.date) }}</p>
          <p><span class="text-green">Time: </span>{{ item.time }}</p>
          <p><span class="text-green">Location: </span>{{ item.gym }}</p>
          <p><span class="text-green">Private meetup: </span>{{ item.isPrivate ? "Yes" : "No" }}</p>
        </div>
        <!-- Remove meetup button -->
        <CButton
          @click="openCancelInviteModal(item.users[0].username, item.id)"
          :image="CloseIcon"
          class="w-4 h-4 absolute top-3 right-3"
        />
      </li>
    </ul>
    <p v-else>No invites sent by you are open at the moment.</p>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { computed } from "vue";

/** Constants */
import type Meetup from "@/constants/Meetup";

/** Components */
import CButton from "@/components/ui/CButton.vue";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Images */
import AccountIcon from "@/assets/icons/ic_account.svg";
import CloseIcon from "@/assets/icons/ic_close_green.svg";

/** Helpers */
import { getColorClass } from "@/helpers/userHelpers";

defineProps<{
  selectedMeetupTab: number;
  myInvites: Array<Meetup>;
}>();

const emits = defineEmits(["openCancelInviteModal"]);

const store = useStore();


const userProfile = computed(() => store.getUserProfile);

function openCancelInviteModal(username: string, inviteId: number) {
  emits("openCancelInviteModal", username, inviteId);
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
}
</script>
