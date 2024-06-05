export default interface Comment {
  id: number;
  users: user[];
  gym: string;
  date: string;
  time: string;
  isJoining: boolean;
  isPrivate: boolean;
  isCanceld: boolean;
  isHidden: boolean;
}

interface user {
  username: string;
  status: number;
}
