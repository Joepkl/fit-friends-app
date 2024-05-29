/** Base function */
import { deleteData } from "@/api/helpers/delete";

/** Constants */
import type ShowCaseAchievement from "@/constants/ShowCaseAchievement";

/** Remove achievement from showcase */
export async function removeShowcaseAchievement(showcaseAchievement: ShowCaseAchievement, username: string) {
  const endpoint = "settings/showcase";
  const bodyData = {
    username: username,
    achievementId: showcaseAchievement.id,
    achievementLevel: showcaseAchievement.level,
  };
  const response = await deleteData(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, bodyData);

  if (response.isSuccess) {
    return true;
  } else {
    throw new Error(response.error);
  }
}

/** Remove achievement from personal goals */
export async function removePersonalGoal(showcaseAchievement: ShowCaseAchievement, username: string) {
  const endpoint = "settings/goals";
  const bodyData = {
    username: username,
    achievementId: showcaseAchievement.id,
    achievementLevel: showcaseAchievement.level,
  };
  const response = await deleteData(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, bodyData);

  if (response.isSuccess) {
    return true;
  } else {
    throw new Error(response.error);
  }
}
