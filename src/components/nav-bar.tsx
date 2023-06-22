import { Link } from 'react-router-dom';
import { PosterrIcon } from '../icons/PosterrIcon';
import { selectCurrentUser } from '../redux/features/users';
import { useAppSelector } from '../redux/hooks';
import { Avatar } from './avatar';
import { SearchBar } from './search-bar';
import { PostsFilter } from './post-filter';

export const NavBar = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <nav className="px-2 sm:px-4 lg:px-8 w-full top-0 z-30 bg-gray-900/75 backdrop-blur-md border-b border-slate-700">
      <div className="flex relative h-16 justify-between gap-4">
        <div className="relative z-10 flex lg:px-0">
          <Link
            to="/"
            className="flex-shrink-0 flex items-center cursor-pointer gap-2"
          >
            <PosterrIcon />
            <div className="hidden sm:inline">Birdly</div>
          </Link>
        </div>
        <div className="relative z-0 flex-1  flex items-center justify-center sm:absolute sm:inset-0">
          <SearchBar />
        </div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="hidden sm:inline">
            <PostsFilter />
          </div>
          <div>
            <Avatar user={currentUser} />
          </div>
        </div>
      </div>
    </nav>
  );
};
