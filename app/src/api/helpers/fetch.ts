/** Vue */
import { computed } from "vue";

/** Store */ // @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Constants */
import type ApiResponse from '@/constants/ApiResponse';

const store = useStore();
const accessToken = computed(() => store.getAccessToken);

/** Base POST data function */
export async function fetchData(url:string):Promise<ApiResponse> {
  store.setIsLoading(true);
  store.increaseActiveApiCalls();
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json"
    }

    // Add bearer token if available
    if (accessToken.value) {
      headers.Authorization = `Bearer ${accessToken.value}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers
    })
    
    // 4xx or 5xx status code error -> not caught by try catch
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error status: ${response.status}. Message: ${errorData.errors[0]}`);
    }

    const data = await response.json();
    return { isSuccess: true, responseData: data.user };
  } 
  catch(err) {
    console.log(err);
    return { isSuccess: false, error: (err as Error).message || 'Unknown error' };
  }
  finally {
    store.isLoading = false;
    store.decreaseActiveApiCalls();
  }
}

/** Handle API response */
export function handleResponse(response: ApiResponse) {
  if(response.isSuccess) {
    return response;
  } else {
    throw new Error(response.error || 'An error occured')
  }
}