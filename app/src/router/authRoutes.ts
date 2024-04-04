const LoginPage = () => import("@/pages/auth/LoginPage.vue");
const RegisterPage = () => import("@/pages/auth/RegisterPage.vue");
const AuthenticationPage = () => import("@/pages/auth/AuthenticationPage.vue");

const BASE_ROUTE = {
  path: "/",
  redirect: "/authentication",
  meta: { requiresAuth: false },
};

const AUTHENTICATION_ROUTE = {
  path: "/authentication",
  name: "Authentication",
  component: AuthenticationPage,
  meta: {
    requiresAuth: false,
    pageTitle: "Authentication",
  },
};

const LOGIN_ROUTE = {
  path: "/login",
  name: "Login",
  component: LoginPage,
  meta: {
    requiresAuth: false,
    pageTitle: "Login",
  },
};

const REGISTER_ROUTE = {
  path: "/register",
  name: "Register",
  component: RegisterPage,
  meta: {
    requiresAuth: false,
    pageTitle: "Register",
    backRoute: LOGIN_ROUTE,
  },
};

const authRoutes = [BASE_ROUTE, AUTHENTICATION_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE];

export default authRoutes;
export {
  // BASE_ROUTE,
  AUTHENTICATION_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
};
