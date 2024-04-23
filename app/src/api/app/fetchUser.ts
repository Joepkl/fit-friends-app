/** Store */ // @ts-ignore
import { useStore } from "@/stores/store.ts";
import { fetchData, handleResponse } from "@/api/helpers/fetch";

const store = useStore();

/** Fetch user account */
export async function fetchUserAccount(username: string) {
  const endpoint = `user/${username}`;
  const response = await fetchData(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`);

  if (handleResponse(response) && response.responseData) {
    store.setUserProfile(response.responseData);
  }
}
