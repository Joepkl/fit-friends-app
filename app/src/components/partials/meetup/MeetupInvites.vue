<template>
  <section v-if="selectedMeetupTab === 1">
    <ul v-if="invites.length" class="flex flex-col gap-2">
      <li v-for="(item, index) in invites" :key="index" class="bg-light-grey rounded-default p-3 relative">
        <!-- Users -->
        <div v-for="(user, i) in item.users" :key="i" class="mb-1">
          <button class="flex items-center gap-[6px]">
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
        <div class="mt-3">
          <p><span class="text-green">Date: </span>{{ item.date }}</p>
          <p class="mt-1"><span class="text-green">Time: </span>{{ item.time }}</p>
          <p class="mt-1"><span class="text-green">Location: </span>{{ item.gym }}</p>
        </div>
        <!-- Remove meetup button -->
        <CButton
          @click="openCancelInviteModal(item.users[0].username, item.id)"
          :image="CloseIcon"
          class="w-4 h-4 absolute top-3 right-3"
        />
      </li>
    </ul>
    <p v-else>You have no open invites at the moment.</p>
  </section>
</template>

<script setup lang="ts">
/** Helpers */
import { getColorClass } from "@/helpers/userHelpers";

/** Constants */
import type Meetup from "@/constants/Meetup";

/** Images */
import AccountIcon from "@/assets/icons/ic_account.svg";
import CloseIcon from "@/assets/icons/ic_close_green.svg";

/** Components */
import CButton from "@/components/ui/CButton.vue";

defineProps<{
  selectedMeetupTab: number;
  invites: Array<Meetup>;
}>();

const emits = defineEmits(["openCancelInviteModal"]);

function openCancelInviteModal(username: string, inviteId: number) {
  emits("openCancelInviteModal", username, inviteId);
}
</script>
