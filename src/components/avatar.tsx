import { IUser } from '../interfaces/IUser';
import AvatarPlaceholder from '../assets/images/avatar-placeholder.jpeg';
import { Link, useLocation } from 'react-router-dom';

interface AvatarProps {
  user?: IUser;
}

export const Avatar = ({ user }: AvatarProps) => {
  const location = useLocation();

  if (!user) return null;

  const { pictureUrl, userName } = user;

  return (
    <Link
      to={`/users/${userName}`}
      state={{ backgroundLocation: location }}
      className="flex-shrink-0 relative cursor-pointer"
    >
      <img
        className="inline-block h-10 w-10 rounded-full"
        src={pictureUrl ?? AvatarPlaceholder}
        alt={userName}
      />
    </Link>
  );
};
