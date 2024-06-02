import type PostContent from "@/constants/PostContent"

const today = new Date();
const hours = today.getHours();
const minutes = today.getMinutes();

const Posts: Array<PostContent> = [
{
    author: "Mike_330",
    date: getDate(0, 0, 0),
    time: getTime(0, 0),
    description: "Had a great workout, despite not feeling like going today.",
    proudOf: ["That I went to the gym ;)", "Benchpress 60kg a few times."],
    achievements: [],
    likes: 12,
    comments: [
      {
        author: "Sarah.B",
        comment: "Nice job Mike!",
        status: 0,
      },
      {
        author: "BillyJones",
        comment: "Keep it up!",
        status: 2,
      },
    ],
    status: 2,
    isLikedByMe: false,
  },
  {
    author: "WilliamPT",
    date: getDate(1, 0, 0),
    time: getTime(1, 12),
    description: "Finally got my incline dumbbell goal after two weeks!",
    proudOf: [],
    achievements: [
      {
        category: 1,
        id: 10,
        level: 4,
      },
    ],
    likes: 23,
    comments: [
      {
        author: "GregBlake",
        comment: "Now I have to do my best to keep up with you ;)",
        status: 0,
      },
      {
        author: "sammy_02",
        comment: "Nicely done William!",
        status: 1,
      },
      {
        author: "Sarah.B",
        comment: "Hard work pays off.",
        status: 0,
      },
      {
        author: "Mike_330",
        comment: "I am almost there too!",
        status: 2,
      },
      {
        author: "jayJo.K",
        comment: "Nicee",
        status: 1,
      },
      {
        author: "mikeyB",
        comment: "We need to train together soon haha.",
        status: 2,
      },
    ],
    status: 1,
    isLikedByMe: false,
  },
  {
    author: "lianne_22",
    date: getDate(1, 0, 0),
    time: getTime(2, 5),
    description: "Legdayyyy",
    proudOf: ["Squatted for the first time."],
    achievements: [
      {
        category: 2,
        id: 13,
        level: 1,
      },
    ],
    likes: 7,
    comments: [
      {
        author: "Sarah.B",
        comment: "Argg hate squats haha.",
        status: 0,
      },
      {
        author: "BillyJones",
        comment: "Keep it up!",
        status: 2,
      },
    ],
    status: 1,
    isLikedByMe: false,
  },
  {
    author: "Sarah.B",
    date: getDate(2, 0, 0),
    time: getTime(3, 18),
    description: "Quick session to reach my weekly goal.",
    proudOf: [],
    achievements: [],
    likes: 3,
    comments: [],
    status: 0,
    isLikedByMe: false,
  },
]

function getDate(dayOffset: number, monthOffset: number, yearOffset: number) {
  const month = today.getMonth() + 1 - monthOffset
  const formattedMonth = (month.toString().padStart(2, '0'));

  if (today.getDate() - dayOffset < 1) {
    return `${(30 + today.getDate() - dayOffset).toString().padStart(2, '0')}-${formattedMonth}-${today.getFullYear() -
      yearOffset}`;
  }
  return `${(today.getDate() - dayOffset).toString().padStart(2, '0')}-${formattedMonth}-${today.getFullYear() - yearOffset}`;
  
}

function getTime(hourOffset: number, minuteOffset: number) {
  return `${hours - hourOffset}:${getMinutes(minutes - minuteOffset)}`;
}

function getMinutes(minutes: number) {
  if (minutes < 0) {
    return 60 + minutes;
  }
  return minutes < 10 ? `0${minutes}` : minutes;
}

export default Posts;