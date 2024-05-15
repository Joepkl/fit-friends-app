<template>
  <section v-if="selectedGymTab === 0">
    <ul>
      <li v-for="(user, index) in Users" :key="index" class="bg-light-grey mt-3 p-3 flex rounded-default">
        <button @click="goToProfile(user.username)" class="flex items-center gap-[6px]">
          <div
            class="block w-6 h-auto rounded-full border-2 overflow-hidden"
            :class="getColorClass(user.status, null, true)"
          >
            <img class="p-[2px] relative top-[4px] left-[1px]" :src="AccountIcon" alt="Profile picture" />
          </div>
          <p :class="getColorClass(user.status, true)">{{ user.username }}</p>
        </button>
        <!-- Remove friend button -->
        <CButton @click="showInviteModal(user.username)" text="Invite" button-class="link" class="ml-auto" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";

/** Helpers */
import { getColorClass } from "@/helpers/userHelpers";

/** Routes */
import { USER_PROFILE_ROUTE } from "@/router/appRoutes";

/** Components */
import CButton from "@/components/ui/CButton.vue";

/** Images */
import AccountIcon from "@/assets/icons/ic_account.svg";

/** Placeholder data */
import Users from "@/constants/placeholders/Users";

defineProps<{
  selectedGymTab: number;
}>();

const emits = defineEmits(["showInviteModal"]);

const router = useRouter();

function showInviteModal(username: string) {
  emits("showInviteModal", username);
}

function goToProfile(username: string) {
  router.push({ name: USER_PROFILE_ROUTE.name, params: { username: username } });
}
</script>
