const HomePage = () => import("@/pages/app/HomePage.vue");

const HOME_ROUTE = {
  path: "/home",
  name: "Home",
  component: HomePage,
  meta: {
    requiresAuth: true,
    pageTitle: "Home",
  },
};

const appRoutes = [HOME_ROUTE];

export default appRoutes;
export { HOME_ROUTE };
