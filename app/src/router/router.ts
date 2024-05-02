/** Vue */
import { computed } from "vue";
import { createRouter, createWebHistory } from "vue-router";

/** Routes */
import authRoutes from "@/router/authRoutes";
import appRoutes from "@/router/appRoutes";
import onboardingRoutes from "@/router/onboardingRoutes";
import { AUTHENTICATION_ROUTE } from "@/router/authRoutes";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...authRoutes, ...appRoutes, ...onboardingRoutes],
});

/** Add <title> tag based on Route's meta.pageTitle */
router.beforeEach((to, from, next) => {
  let pageTitle = import.meta.env.VITE_APP_TITLE;
  if (to?.meta?.pageTitle) {
    pageTitle = `${to.meta.pageTitle} - ${pageTitle}`;
  }
  document.title = pageTitle;
  /** Add route guard for authentication */
  // if (to?.meta?.requiresAuth) {
  //   const store = useStore();
  //   const isAuthenticated = computed(() => store.getIsAuthenticated);
  //   if (!isAuthenticated.value) {
  //     next(AUTHENTICATION_ROUTE);
  //     return;
  //   }
  // }
  next();
});

export default router;
