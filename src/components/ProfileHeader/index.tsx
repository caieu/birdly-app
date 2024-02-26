import { Button } from '../Button';
import { DateTime } from 'luxon';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { followUser, selectCurrentUser } from '../../redux/features/users';
import { IUser } from '../../interfaces/IUser';

interface ProfileHeaderProps {
  user: IUser;
  postCount: number;
  hideFollowButton?: boolean;
}

export const ProfileHeader = ({
  user,
  postCount,
  hideFollowButton,
}: ProfileHeaderProps) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  if (!user) return null;

  const {
    id,
    firstName,
    lastName,
    userName,
    coverImageUrl,
    pictureUrl,
    joinedAt,
    followers,
    following,
  } = user;

  const onFollow = () => {
    dispatch(
      followUser({
        userThatIsFollowingId: currentUser.id,
        userThatIsFollowedId: id,
      }),
    );
  };

  const isFollowing = currentUser && currentUser.following.includes(id);

  return (
    <div>
      <div>
        <img
          className="h-32 w-full object-cover lg:h-48"
          src={coverImageUrl}
          alt=""
        />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              src={pictureUrl}
              alt=""
            />
          </div>
          {!hideFollowButton && (
            <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Button
                  className="justify-center"
                  label={isFollowing ? 'Unfollow' : 'Follow'}
                  onClick={onFollow}
                />
              </div>
            </div>
          )}
        </div>
        <div className="sm:block mt-6 min-w-0 flex-1">
          <h1 className="text-2xl font-bold truncate">
            {firstName} {lastName}
          </h1>
          <div className="text-sm text-gray-500">@{userName}</div>
          <div className="text-sm text-gray-500">
            {`Joined at ${DateTime.fromISO(joinedAt).toLocaleString(
              DateTime.DATE_FULL,
            )}`}
          </div>
          <div className="space-x-1 text-sm">
            <span className="space-x-1">
              <span>{following.length}</span>
              <span className="text-gray-500">Following</span>
            </span>
            <span className="space-x-1">
              <span>{followers.length}</span>
              <span className="text-gray-500">Followers</span>
            </span>
            <span className="space-x-1">
              <span>{postCount}</span>
              <span className="text-gray-500">Posts</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
