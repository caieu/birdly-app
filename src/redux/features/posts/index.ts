import { createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';
import { IPost, PostType } from '../../../interfaces/IPost';
import { IPostFilter } from '../../../interfaces/IPostFilter';
import { RootState } from '../../store';
import {
  initializeDataAction,
  postAction,
  setPostsFilterAction,
} from '../posts/actions';

export interface PostsFilterState {
  userType: string;
  searchText: string;
}

export interface PostsState {
  posts: Record<string, IPost>;
  filter: PostsFilterState;
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: {} as Record<string, IPost>,
    filter: { userType: 'all', searchText: '' },
  },
  reducers: {
    initializePostsData: initializeDataAction,
    setPostsFilter: setPostsFilterAction,
    post: postAction,
  },
});

export const {
  initializePostsData,
  setPostsFilter,
  post: createPost,
} = postsSlice.actions;

export const fetchPosts =
  (filter?: IPostFilter) =>
  ({ posts: { posts } }: RootState) => {
    const postsArray = (Object.values(posts) as IPost[]).sort(
      (a, b) =>
        DateTime.fromISO(b.createdAt).toMillis() -
        DateTime.fromISO(a.createdAt).toMillis(),
    );
    if (!filter) return postsArray;

    let filteredPosts: IPost[] = postsArray;
    const { userIds, searchText } = filter;
    if (userIds) {
      filteredPosts = filteredPosts.filter(post =>
        filter.userIds?.includes(post.userId),
      );
    }
    if (searchText && searchText !== '') {
      filteredPosts = filteredPosts.filter(
        post =>
          post.type !== PostType.REPOST && post.content?.includes(searchText),
      );
    }

    return filteredPosts;
  };

export const selectFilter = ({ posts: { filter } }: RootState) => filter;

export const fetchPost =
  (postId?: string) =>
  ({ posts: { posts } }: RootState) => {
    if (!postId) return null;
    return posts[postId];
  };

export default postsSlice.reducer;
