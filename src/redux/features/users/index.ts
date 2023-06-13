import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../../interfaces/IUser';
import { RootState } from '../../store';
import { followUserAction, initializeDataAction } from './actions';

export interface UsersState {
  users: Record<string, IUser>;
  currentUser: string;
}

export interface FetchUserFilter {
  userName?: string;
  userId?: string;
}

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: {} as Record<string, IUser>,
    currentUser: '',
  },
  reducers: {
    initializeUsersData: initializeDataAction,
    followUser: followUserAction,
  },
});

export const { followUser, initializeUsersData } = usersSlice.actions;

export const selectCurrentUser = ({
  users: { users, currentUser },
}: RootState) => users[currentUser];

export const fetchUsers = ({ users: { users } }: RootState) =>
  Object.values(users);

export const fetchUser =
  ({ userName, userId }: FetchUserFilter) =>
  ({ users: { users } }: RootState) => {
    if (userId) return users[userId];
    return Object.values(users).find(user => user.userName === userName);
  };

export default usersSlice.reducer;
