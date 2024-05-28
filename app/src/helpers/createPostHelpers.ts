/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

const store = useStore();

const currentPostEmpty = {
  author: "",
  date: "",
  time: "",
  description: "",
  proudOf: [],
  achievements: [],
  likes: 0,
  comments: [],
  status: 0,
  isLikedByMe: false,
};

function removeInputFromLocalStorage() {
  store.setCreatePostInput(currentPostEmpty);
}

export { removeInputFromLocalStorage };
