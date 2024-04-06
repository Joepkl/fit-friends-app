/** Store */ // @ts-ignore
import { useStore } from "@/stores/store.ts";

const store = useStore();

interface ApiResponse {
  isSuccess?: boolean;
  error?: string;
  token?: string | null;
}

/** Base POST data function */
export async function postData(url: string, bodyData: any): Promise<ApiResponse> {
  store.setIsLoading(true);
  store.increaseActiveApiCalls();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
      },
      body: JSON.stringify(bodyData),
    });

    // 4xx or 5xx status code error -> not caught by try catch
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    const token = responseData.token;
    return { isSuccess: true, token: token || null };
  } catch (err) {
    console.log(err);
    return { isSuccess: false, error: (err as Error).message || "Unknown error" };
  } finally {
    store.isLoading = false;
    store.decreaseActiveApiCalls();
  }
}
