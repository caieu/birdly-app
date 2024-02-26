import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { IUser } from '../../interfaces/IUser';

export const Header = ({
  user,
  createdAt,
}: {
  user: IUser;
  createdAt: string;
}) => {
  return (
    <div className="flex items-center justify-between">
      <Link to={`/users/${user.userName}`}>
        <h3 className="text-sm font-bold">{`${user.firstName} ${user.lastName}`}</h3>
      </Link>
      <p className="text-sm text-white">
        {DateTime.fromISO(createdAt).toLocaleString(DateTime.DATETIME_SHORT)}
      </p>
    </div>
  );
};
