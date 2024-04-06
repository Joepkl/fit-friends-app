<template>
  <!-- Hamburger menu -->
  <button @click="toggleMenu" class="hamburger-menu w-[30px] h-[20px] relative z-30" :class="{ open: isMenuOpen }">
    <span class="block absolute h-[4px] w-full bg-green rounded-[9px] opacity-100 left-0 top-0" />
    <span class="block absolute h-[4px] w-full bg-green rounded-[9px] opacity-100 left-0 top-2" />
    <span class="block absolute h-[4px] w-full bg-green rounded-[9px] opacity-100 left-0 top-2" />
    <span class="block absolute h-[4px] w-full bg-green rounded-[9px] opacity-100 left-0 top-4" />
  </button>
  <!-- Menu items -->
  <ul
    class="menu-items fixed right-0 w-0 bg-light-grey top-0 pt-20 z-20 h-[100dvh] flex flex-col gap-8 overflow-hidden"
    :class="{ 'open w-60': isMenuOpen }"
  >
    <li
      v-for="(item, index) in menuItems"
      :key="index"
      class="font-semibold pl-8 pr-default py-2 whitespace-nowrap hover:text-green"
    >
      <a :href="item.link">{{ item.name }}</a>
    </li>
  </ul>
  <!-- Overlay -->
  <div
    @touchstart="toggleMenu"
    class="fixed h-[100dvh] inset-0 z-10"
    :class="{ block: isMenuOpen, hidden: !isMenuOpen }"
  />
</template>

<script setup lang="ts">
/** Vue */
import { computed, onMounted, ref } from "vue";

const isMenuOpen = ref(false);
const menuItems = ref([
  { name: "Menu item 1", link: "#" },
  { name: "Menu item 2", link: "#" },
  { name: "Menu item 3", link: "#" },
  { name: "Menu item 4", link: "#" },
  { name: "Menu item 5", link: "#" },
]);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<style>
.hamburger-menu {
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
}

.hamburger-menu span {
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.25s ease-in-out;
  -moz-transition: 0.25s ease-in-out;
  -o-transition: 0.25s ease-in-out;
  transition: 0.25s ease-in-out;
}

.hamburger-menu.open span:nth-child(1) {
  top: 8px;
  width: 0%;
  left: 50%;
}

.hamburger-menu.open span:nth-child(2) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

.hamburger-menu.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.hamburger-menu.open span:nth-child(4) {
  top: 8px;
  width: 0%;
  left: 50%;
}

.menu-items {
  -webkit-transition: 0.2s ease-in-out;
  -moz-transition: 0.2s ease-in-out;
  -o-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
}

.menu-items.open {
  -webkit-transition: 0.4s ease-in-out;
  -moz-transition: 0.4s ease-in-out;
  -o-transition: 0.4s ease-in-out;
  transition: 0.4s ease-in-out;
}
</style>
