export default interface Route {
  path: string;
  name: string;
  component: any;
  meta: {
    requiresAuth: boolean;
    pageTitle: string;
  };
}
