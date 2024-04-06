/** Store */ // @ts-ignore
import { useStore } from "@/stores/store.ts";
import { postData } from "@/api/helpers/post";

const store = useStore();

/** Create an account */
export async function postCreateAccount(email: string, username: string, password: string) {
  const endpoint = "register";
  const bodyData = {
    email: email,
    username: username,
    password: password,
  };
  const response = await postData(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, bodyData);

  if (response.isSuccess) {
    return true;
  } else {
    throw new Error(response.error);
  }
}

/** Login to account */
export async function postLoginAccount(email: string, password: string) {
  const endpoint = "login";
  const bodyData = {
    email: email,
    password: password,
  };
  const response = await postData(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, bodyData);

  if (response.isSuccess) {
    return { accessToken: response.token };
  } else {
    throw new Error(response.error);
  }
}
