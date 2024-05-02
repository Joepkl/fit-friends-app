export default interface Comment {
  id: number;
  username: string;
  gym: string;
  date: string;
  time: string;
  userStatus: number;
  isAccepted?: boolean;
}
