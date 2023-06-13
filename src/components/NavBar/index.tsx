import { Link } from 'react-router-dom';
import { PosterrIcon } from '../../icons/PosterrIcon';
import { selectCurrentUser } from '../../redux/features/users';
import { useAppSelector } from '../../redux/hooks';
import { Avatar } from '../Avatar';
import { SearchBar } from '../SearchBar';
import { Toggle } from '../Toggle';

export const NavBar = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <div className="px-2 sm:px-4 lg:px-8 fixed w-full top-0 z-30 bg-gray-900/75 backdrop-blur-md border-b">
      <div className="relative h-16 flex justify-between">
        <div className="relative z-10 px-2 flex lg:px-0">
          <Link
            to="/"
            className="flex-shrink-0 flex items-center cursor-pointer"
          >
            <PosterrIcon />
            <div className="pl-2">Birdly</div>
          </Link>
        </div>
        <div className="relative z-0 flex-1 px-2 flex items-center justify-center sm:absolute sm:inset-0">
          <SearchBar />
        </div>
        <div className="relative z-10 ml-4 flex items-center">
          <div className="pr-2 border-r">
            <Toggle />
          </div>
          <div className="pl-4">
            <Avatar user={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
};
