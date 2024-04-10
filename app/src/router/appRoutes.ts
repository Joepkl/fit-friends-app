const HomePage = () => import("@/pages/app/HomePage.vue");
const OnboardingPage = () => import("@/pages/app/OnboardingPage.vue");

const HOME_ROUTE = {
  path: "/home",
  name: "Home",
  component: HomePage,
  meta: {
    requiresAuth: true,
    pageTitle: "Home",
  },
};

const ONBOARDING_ROUTE = {
  path: "/onboarding",
  name: "Onboarding",
  component: OnboardingPage,
  meta: {
    requiresAuth: true,
    pageTitle: "Onboarding",
  },
};

const appRoutes = [HOME_ROUTE, ONBOARDING_ROUTE];

export default appRoutes;
export { HOME_ROUTE, ONBOARDING_ROUTE };
