import { useState } from 'react';
import { SearchIcon } from '../../icons/SearchIcon';
import { setPostsFilter } from '../../redux/features/posts';
import { useAppDispatch } from '../../redux/hooks';

export const SearchBar = () => {
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useAppDispatch();

  const onTextChange = ({
    target: { value: text },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(text);
    dispatch(setPostsFilter({ searchText: text }));
  };

  return (
    <div className="w-full sm:max-w-xs">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
          <SearchIcon aria-hidden="true" />
        </div>
        <input
          id="search"
          name="search"
          className="block w-full bg-gray-700 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 focus:placeholder-gray-500 sm:text-sm"
          placeholder="Search"
          type="search"
          value={searchText}
          onChange={onTextChange}
        />
      </div>
    </div>
  );
};
