const OnboardingPage = () => import("@/pages/onboarding/OnboardingPage.vue");
const AccountSetupPage = () => import("@/pages/onboarding/AccountSetupPage.vue");

const ONBOARDING_ROUTE = {
  path: "/onboarding",
  name: "Onboarding",
  component: OnboardingPage,
  meta: {
    requiresAuth: true,
    pageTitle: "Onboarding",
  },
};

const ACCOUNT_SETUP_ROUTE = {
  path: "/account-setup",
  name: "Account setup",
  component: AccountSetupPage,
  meta: {
    requiresAuth: true,
    pageTitle: "Account setup",
  },
};

const onboardingRoutes = [ONBOARDING_ROUTE, ACCOUNT_SETUP_ROUTE];

export default onboardingRoutes;
export { ONBOARDING_ROUTE, ACCOUNT_SETUP_ROUTE };
