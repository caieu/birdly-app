import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { setPostsFilter } from '../../redux/features/posts';
import { FilterUserType } from '../../enums/FilterUserType';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import clsx from 'clsx';

export const PostsFilter = () => {
  const [filter, setFilter] = useState(FilterUserType.ALL);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter) {
      setFilter(filter as FilterUserType);
    }
  }, [searchParams]);

  const onFilter = (filter: FilterUserType) => {
    setFilter(filter);
    setSearchParams({ userType: filter });
    dispatch(setPostsFilter({ userType: filter }));
  };

  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <Menu.Button className="capitalize inline-flex w-full justify-center rounded-md bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {filter}
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="bg-slate-700 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              <button
                onClick={() => onFilter(FilterUserType.ALL)}
                className={clsx(
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  filter === FilterUserType.ALL && 'bg-slate-800',
                )}
              >
                All
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                onClick={() => onFilter(FilterUserType.FOLLOWING)}
                className={clsx(
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  filter === FilterUserType.FOLLOWING && 'bg-slate-800',
                )}
              >
                Following
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
