/** Vue */
import { computed } from "vue";

/** Store */ // @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Constants */
import type ApiResponse from '@/constants/ApiResponse';
const store = useStore();
const accessToken = computed(() => store.getAccessToken);

/** Base POST data function */
export async function deleteData(url: string): Promise<ApiResponse> {
  store.setIsLoading(true);
  store.increaseActiveApiCalls();
  let responseStatus = 0;

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json"
    }

    // Add bearer token if available
    if (accessToken.value) {
      headers.Authorization = `Bearer ${accessToken.value}`;
    }

    const response = await fetch(url, {
      method: "DELETE",
      headers,
    });

    responseStatus = response.status;

    // 4xx or 5xx status code error -> not caught by try catch
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const responseData = await response.json();
    return { isSuccess: true, responseData };
  } catch (err) {
    console.log(err);
    return { isSuccess: false, error: (err as Error).message || "Unknown error", status: responseStatus };
  } finally {
    store.isLoading = false;
    store.decreaseActiveApiCalls();
  }
}
