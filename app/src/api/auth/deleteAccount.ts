/** Base function */
import { deleteData } from "@/api/helpers/delete";

export async function deleteAccount(username: string) {
  const endpoint = `user/${username}`;
  const response = await deleteData(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`);

  if (response.isSuccess) {
    return true;
  } else {
    throw new Error(response.error);
  }
}
