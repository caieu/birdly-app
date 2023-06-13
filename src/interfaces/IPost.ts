export enum PostType {
  POST = 'POST',
  REPOST = 'REPOST',
  QUOTE = 'QUOTE',
}

export interface IPost {
  id: string;
  userId: string;
  type: PostType;
  content?: string;
  createdAt: string;
  postReferenceId?: string;
}
