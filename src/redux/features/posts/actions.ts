import { faker } from '@faker-js/faker';
import { PayloadAction } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';
import { PostsState } from '.';
import { IPost, PostType } from '../../../interfaces/IPost';
import { IUser } from '../../../interfaces/IUser';
import { generatePost } from '../../../mocks/posts';

const INITIAL_POSTS_COUNT = 50;
const DAILY_POST_LIMIT = 5;

export interface InitializeDataPayload {
  users: IUser[];
}

export interface SetPostsFilterPayload {
  userType?: string;
  searchText?: string;
}

export interface PostPayload {
  content?: string;
  postReferenceId?: string;
  userId: string;
  type: PostType;
}

const getRandomUser = (users: IUser[]): IUser =>
  users[Math.floor(Math.random() * users.length)];

const checkIfTodaysPost = (post: IPost) =>
  DateTime.fromISO(post.createdAt)
    .startOf('day')
    .toLocaleString(DateTime.DATE_FULL) ===
  DateTime.now().startOf('day').toLocaleString(DateTime.DATE_FULL);

export const initializeDataAction = (
  state: PostsState,
  { payload: { users } }: PayloadAction<InitializeDataPayload>,
) => {
  if (Object.values(state.posts).length) return;
  const posts = [...Array(INITIAL_POSTS_COUNT)].map(count =>
    generatePost(getRandomUser(users)),
  );

  for (const post of posts) {
    state.posts[post.id] = post;
  }

  return state;
};

export const setPostsFilterAction = (
  state: PostsState,
  {
    payload: { userType = 'all', searchText = '' },
  }: PayloadAction<SetPostsFilterPayload>,
) => {
  state.filter = { userType, searchText };

  return state;
};

export const postAction = (
  state: PostsState,
  {
    payload: { content, postReferenceId, userId, type },
  }: PayloadAction<PostPayload>,
) => {
  const userPosts = Object.values(state.posts).filter(post => {
    return post.userId === userId && checkIfTodaysPost(post);
  });

  if (userPosts.length >= DAILY_POST_LIMIT)
    return console.log('User reached daily post limit.');

  const newPost: IPost = {
    id: faker.datatype.uuid(),
    content,
    userId,
    type,
    postReferenceId,
    createdAt: new Date().toISOString(),
  };
  state.posts[newPost.id] = newPost;

  return state;
};
