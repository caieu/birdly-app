import { DateTime } from 'luxon';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IPost, PostType } from '../../interfaces/IPost';
import { createPost, fetchPost } from '../../redux/features/posts';
import { fetchUser, selectCurrentUser } from '../../redux/features/users';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Avatar } from '../Avatar';
import { PostOptions } from './PostOptions';
import clsx from 'clsx';

interface PostProps {
  post: IPost;
  hidePostOptions?: boolean;
  className?: string;
}

export const Post = ({ post, hidePostOptions, className }: PostProps) => {
  const { userId, content, createdAt, type, postReferenceId } = post;
  const location = useLocation();
  const user = useAppSelector(fetchUser({ userId }));
  const currentUser = useAppSelector(selectCurrentUser);
  const repostContent = useAppSelector(
    fetchPost(type !== PostType.POST ? postReferenceId : undefined),
  );
  const dispatch = useAppDispatch();
  const [showQuoteInput, setShowQuoteInput] = useState(false);

  const showPostOptions =
    (!hidePostOptions && type === PostType.POST) || type === PostType.POST;

  if (!user) return null;

  const onRepost = () => {
    dispatch(
      createPost({
        type: PostType.REPOST,
        userId: currentUser.id,
        postReferenceId: post.id,
      }),
    );
  };

  const onQuote = () => {
    setShowQuoteInput(!showQuoteInput);
  };

  const renderPostContent = () => {
    if (!content) return null;
    return <p className="text-sm pt-2">{content}</p>;
  };

  const renderRepost = () => {
    if (type === PostType.POST || !repostContent) return null;
    return (
      <div className="ring-1 ring-white px-4 rounded-sm m-4">
        <Post post={repostContent} hidePostOptions />
      </div>
    );
  };

  const renderPostOptions = () => (
    <PostOptions
      show={showPostOptions}
      onQuote={onQuote}
      showQuoteInput={showQuoteInput}
      onRepost={onRepost}
      onCreatePost={() => setShowQuoteInput(false)}
      postReferenceId={post.id}
    />
  );

  return (
    <div className={clsx(className, 'py-4')}>
      <div className="flex space-x-3">
        <Avatar user={user} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <Link
              to={`/users/${user.userName}`}
              state={{ backgroundLocation: location }}
            >
              <h3 className="text-sm font-bold">{`${user.firstName} ${user.lastName}`}</h3>
            </Link>
            <p className="text-sm text-white">
              {DateTime.fromISO(createdAt).toLocaleString(
                DateTime.DATETIME_SHORT,
              )}
            </p>
          </div>
          {renderPostContent()}
          {renderRepost()}
          {renderPostOptions()}
        </div>
      </div>
    </div>
  );
};
