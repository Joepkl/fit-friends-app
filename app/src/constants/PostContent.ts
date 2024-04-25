import type Achievement from "@/constants/Achievement"

export default interface PostContent {
  author: string;
  date: string;
  time: string;
  description: string | null;
  proudOf: Array<string> | null;
  achievements: Array<Achievement> | null;
  likes: number;
  comments: Array<string> | null;
  status: number;
}
