export interface IUser {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  pictureUrl?: string;
  coverImageUrl?: string;
  joinedAt: string;
  followers: string[];
  following: string[];
}
