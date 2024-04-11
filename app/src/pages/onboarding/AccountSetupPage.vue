<template>
  <div class="page-wrapper">
    <h1>Account</h1>
    <p class="mt-4">Get started by setting up your account details.</p>
    <!-- Inputs -->
    <form class="mt-6">
      <ul class="flex flex-col gap-4">
        <!-- Username -->
        <li class="flex flex-col">
          <label for="username">Username *</label>
          <input id="username" type="text" />
        </li>
        <!-- Age -->
        <li class="flex flex-col">
          <label for="age">Age</label>
          <input id="age" type="number" />
        </li>
        <!-- Bio -->
        <li class="flex flex-col">
          <label for="bio">Bio</label>
          <input id="bio" type="text" />
        </li>
        <!-- Share data with friends -->
        <li class="flex flex-col">
          <label class="container">
            Agree to share data with friends *
            <input type="checkbox" />
            <span class="checkmark"></span>
          </label>
          <button @click.prevent="showDataModal" class="button-link w-fit ml-6">More info</button>
        </li>
      </ul>
    </form>
    <!-- Modal -->
    <CModal @close-modal="closeDataModal" :isActive="isDataModalActive" :content="ShareDataContent" />
    <!-- CTA -->
    <CButton text="Save" button-class="primary" @click="saveAccount" class="ml-auto" />
  </div>
</template>

<script setup lang="ts">
/** Vue */
import { ref, computed } from "vue";

/** Components */
import CButton from "@/components/ui/CButton.vue";
import CModal from "@/components/ui/CModal.vue";

/** Constants */
import { ShareDataContent } from "@/constants/ModalContent";

const isDataModalActive = ref(false);

function saveAccount() {
  console.log("Save account");
}

function showDataModal() {
  console.log("hi");
  isDataModalActive.value = true;
}

function closeDataModal() {
  isDataModalActive.value = false;
}
</script>
