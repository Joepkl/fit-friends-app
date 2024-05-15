/** Images */
import DumbbellGoldIcon from "../assets/icons/ic_dumbbell_gold.svg";
import DumbbellSilverIcon from "../assets/icons/ic_dumbbell_silver.svg";
import DumbbellBronzeIcon from "../assets/icons/ic_dumbbell_bronze.svg";
import TimeGoldIcon from "../assets/icons/ic_time_gold.svg";
import TimeSilverIcon from "../assets/icons/ic_time_silver.svg";
import TimeBronzeIcon from "../assets/icons/ic_time_bronze.svg";

export function getAchievementIcon(level: number, category: number) {
  // Monthly achievements
  if (category === 0) {
    if (level === 1) {
      return TimeBronzeIcon;
    } else if (level === 2) {
      return TimeSilverIcon;
    } else {
      return TimeGoldIcon;
    }
  }
  // Regular achievements
  else {
    if (level === 1) {
      return DumbbellBronzeIcon;
    } else if (level === 2) {
      return DumbbellSilverIcon;
    } else {
      return DumbbellGoldIcon;
    }
  }
}

export function getAchievementLevel(level: number) {
  if (level === 1) {
    return "I";
  }
  if (level === 2) {
    return "II";
  }
  if (level === 3) {
    return "  III";
  }
  if (level === 4) {
    return "  IV";
  }
  if (level === 5) {
    return "  V";
  }
  if (level === 6) {
    return "  VI";
  }
}
