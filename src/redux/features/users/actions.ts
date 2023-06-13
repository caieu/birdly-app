import { PayloadAction } from '@reduxjs/toolkit';
import { UsersState } from '.';
import { IUser } from '../../../interfaces/IUser';
import { generateUser } from '../../../mocks/Users';

const INITIAL_USER_COUNT = 30;

export interface FollowUserPayload {
  userThatIsFollowingId: string;
  userThatIsFollowedId: string;
}

export const initializeDataAction = (state: UsersState) => {
  if (Object.values(state.users).length) return state;

  const users: IUser[] = [...Array(INITIAL_USER_COUNT)].map(() =>
    generateUser(),
  );

  const currentUser = users[0];
  currentUser.following = [];
  state.currentUser = currentUser.id;

  for (const user of users) {
    state.users[user.id] = user;
  }

  return state;
};

export const followUserAction = (
  state: UsersState,
  {
    payload: { userThatIsFollowedId, userThatIsFollowingId },
  }: PayloadAction<FollowUserPayload>,
) => {
  const followingUser = state.users[userThatIsFollowingId];
  const followedUser = state.users[userThatIsFollowedId];

  const following = followingUser.following.includes(userThatIsFollowedId)
    ? followingUser.following.filter(id => id !== userThatIsFollowedId)
    : [...followingUser.following, userThatIsFollowedId];

  const followers = followedUser.followers.includes(userThatIsFollowingId)
    ? followedUser.followers.filter(id => id !== userThatIsFollowingId)
    : [...followedUser.followers, userThatIsFollowingId];

  state.users = {
    ...state.users,
    [followingUser.id]: { ...followingUser, following },
    [followedUser.id]: { ...followedUser, followers },
  };

  return state;
};
