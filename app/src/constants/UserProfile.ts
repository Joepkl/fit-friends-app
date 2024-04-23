import type AccountSettings from '@/constants/AccountSettings';

export default interface UserProfile {
  _id: string;
  username: string;
  password: string;
  email: string;
  settings: null | AccountSettings;
  __v: number;
}
