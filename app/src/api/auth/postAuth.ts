/** Base function */
import { postData } from "@/api/helpers/post";

/** Constants */
import type AccountSettings from '@/constants/AccountSettings';

/** Create an account */
export async function postCreateAccount(email: string, username: string, password: string) {
  const endpoint = "register";
  const bodyData = {
    email: email,
    username: username,
    password: password,
  };
  const response = await postData(`${import.meta.env.VITE_API_BASE_URL}auth/${endpoint}`, bodyData);

  if (response.isSuccess) {
    return true;
  } else {
    console.log(response.status)
    throw new Error(response.error);
  }
}

/** Login to account */
export async function postLoginAccount(username: string, password: string) {
  const endpoint = "login";
  const bodyData = {
    username: username,
    password: password,
  };
  const response = await postData(`${import.meta.env.VITE_API_BASE_URL}auth/${endpoint}`, bodyData);

  if (response.isSuccess) {
    return { responseData: response.responseData };
  } else {
    throw new Error(response.error);
  }
}

/** Save account settings */
export async function saveAccountSettings(settings: AccountSettings) {
  const endpoint = "settings";
  const bodyData = settings;
  const response = await postData(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, bodyData);

  if (response.isSuccess) {
    return { responseData: response.responseData };
  } else {
    throw new Error(response.error);
  }
}
