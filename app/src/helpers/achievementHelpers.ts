/** Images */
import DumbbellGoldIcon from "../assets/icons/ic_dumbbell_gold.svg";
import DumbbellSilverIcon from "../assets/icons/ic_dumbbell_silver.svg";
import DumbbellBronzeIcon from "../assets/icons/ic_dumbbell_bronze.svg";
import DumbbellDisabledIcon from "../assets/icons/ic_dumbbell_disabled.svg";
import TimeGoldIcon from "../assets/icons/ic_time_gold.svg";
import TimeSilverIcon from "../assets/icons/ic_time_silver.svg";
import TimeBronzeIcon from "../assets/icons/ic_time_bronze.svg";
import TimeDisabledIcon from "../assets/icons/ic_time_disabled.svg";

/** Constants */
import { AllAchievements } from "@/constants/Achievements";

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

export function getAchievementIconFromPercentage(level: number, maxLevel: number, category: number) {
  const levelPercentage = (level / maxLevel) * 100;

  // Monthly stack icon
  if (category === 0) {
    if (levelPercentage < 1) {
      return TimeDisabledIcon;
    } else if (levelPercentage < 34) {
      return TimeBronzeIcon;
    } else if (levelPercentage < 67) {
      return TimeSilverIcon;
    } else {
      return TimeGoldIcon;
    }
  }
  // Dumbbell stack icon
  else {
    if (levelPercentage < 1) {
      return DumbbellDisabledIcon;
    } else if (levelPercentage < 34) {
      return DumbbellBronzeIcon;
    } else if (levelPercentage < 67) {
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

export function getAchievementInfo(id: number) {
  for (let i = 0; i < AllAchievements.length; i++) {
    const keys = Object.keys(AllAchievements[i]);
    for (let j = 0; j < keys.length; j++) {
      if (AllAchievements[i][j].id === id) {
        return AllAchievements[i][j];
      }
    }
  }
}
