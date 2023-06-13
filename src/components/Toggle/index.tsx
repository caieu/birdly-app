import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { setPostsFilter } from '../../redux/features/posts';

export const Toggle = () => {
  const [enabled, setEnabled] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter) {
      setEnabled(filter === 'following');
    }
  }, [searchParams]);

  const onToggle = (enabled: boolean) => {
    setEnabled(enabled);
    const userType = enabled ? 'following' : 'all';
    setSearchParams({ userType });
    dispatch(setPostsFilter({ userType }));
  };

  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch.Label as="span" className="mr-2">
        <span
          className={classNames(
            'text-sm font-medium transition-colors ease-in-out',
            enabled && 'text-gray-500',
          )}
        >
          All
        </span>
      </Switch.Label>
      <Switch
        checked={enabled}
        onChange={onToggle}
        className={classNames(
          enabled ? 'bg-orange-600' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-4 w-7 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200',
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-3' : 'translate-x-0',
            'pointer-events-none inline-block h-3 w-3 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-2">
        <span
          className={classNames(
            'text-sm font-medium transition-colors ease-in-out',
            !enabled && 'text-gray-500',
          )}
        >
          Following
        </span>
      </Switch.Label>
    </Switch.Group>
  );
};
