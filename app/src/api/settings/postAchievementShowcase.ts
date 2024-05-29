/** Base function */
import { postData } from "@/api/helpers/post";

/** Constants */
import type ShowCaseAchievement from "@/constants/ShowCaseAchievement";

/** Set showcase achievement */
export async function setShowcaseAchievement(showcaseAchievement: ShowCaseAchievement, username: string) {
  const endpoint = "settings/showcase";
  const bodyData = {
    username: username,
    achievement: showcaseAchievement,
  };
  const response = await postData(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, bodyData);

  if (response.isSuccess) {
    return { responseData: response.responseData };
  } else {
    throw new Error(response.error);
  }
}

/** Set personal goal */
export async function setPersonalGoal(personalGoal: ShowCaseAchievement, username: string) {
  const endpoint = "settings/goals";
  const bodyData = {
    username: username,
    achievement: personalGoal,
  };
  const response = await postData(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, bodyData);

  if (response.isSuccess) {
    return { responseData: response.responseData };
  } else {
    throw new Error(response.error);
  }
}

