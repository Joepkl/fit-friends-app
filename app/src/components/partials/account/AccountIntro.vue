<template>
  <section>
    <button
      class="block w-full mx-auto max-w-24 h-auto rounded-full border-2 overflow-hidden"
      :class="getColorClass(userProfile?.status as number, null, true)"
    >
      <img class="p-3 relative top-4 left-[2px]" :src="AccountIcon" alt="Profile picture" />
    </button>
    <div class="flex mt-4 justify-center items-center">
      <div>
        <h1 :class="getColorClass(userProfile?.status as number, true)">
          @{{ userProfile?.username
          }}<span v-if="userProfile?.settings?.age" class="text-white font-medium"
            >, {{ userProfile?.settings?.age }}
          </span>
        </h1>
      </div>
      <CButton v-if="isLoggedInAccount" @click="emitEditActive()" :image="EditIcon" class="relative left-5 w-6 h-6" />
    </div>
    <p class="text-center mt-4">{{ userProfile?.settings?.bio }}</p>
  </section>
</template>

<script setup lang="ts">
/** Images */
import AccountIcon from "@/assets/icons/ic_account.svg";
import EditIcon from "@/assets/icons/ic_edit.svg";

/** Components */
import CButton from "@/components/ui/CButton.vue";

/** Constants */
import type UserProfile from '@/constants/UserProfile';

defineProps<{
  isEditActive: boolean;
  isLoggedInAccount: boolean;
  userProfile: UserProfile | null;
}>();

const emits = defineEmits(["editIsActive"]);
const statusColors = ["bronze", "silver", "gold"];

function emitEditActive() {
  emits("editIsActive");
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
