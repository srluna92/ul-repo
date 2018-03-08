import { UserInfo } from '@firebase/auth-types';
export class User implements UserInfo {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
  feedback: string[];
  home: string | 'search';
}
