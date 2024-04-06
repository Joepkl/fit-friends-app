const TimelinePage = () => import("@/pages/app/TimelinePage.vue");

const TIMELINE_ROUTE = {
  path: "/timeline",
  name: "Home",
  component: TimelinePage,
  meta: {
    requiresAuth: true,
    pageTitle: "Timeline",
  },
};

const appRoutes = [TIMELINE_ROUTE];

export default appRoutes;
export { TIMELINE_ROUTE };
