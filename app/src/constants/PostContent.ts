import type SingleAchievement from "@/constants/SingleAchievement"
import type Comment from "@/constants/Comment"

export default interface PostContent {
  author: string;
  date: string;
  time: string;
  description: string | null;
  proudOf: Array<string | null>;
  achievements: Array<SingleAchievement> | null;
  likes: number;
  comments: Array<Comment> | null;
  status: number;
  isLikedByMe: boolean;
}
