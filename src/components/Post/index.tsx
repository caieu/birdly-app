import clsx from 'clsx';
import { useState } from 'react';
import { IPost, PostType } from '../../interfaces/IPost';
import { createPost, fetchPost } from '../../redux/features/posts';
import { fetchUser, selectCurrentUser } from '../../redux/features/users';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Avatar } from '../Avatar';
import { PostOptions } from '../PostOptions';
import { Content } from './Content';
import { Header } from './Header';
import { Repost } from '../Repost';

interface PostProps {
  post: IPost;
  hidePostOptions?: boolean;
  className?: string;
}

export const Post = ({ post, hidePostOptions, className }: PostProps) => {
  const { userId, content, createdAt, type, postReferenceId } = post;
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

  return (
    <div className={clsx(className, 'py-4')}>
      <div className="flex gap-x-3">
        <Avatar user={user} />
        <div className="flex flex-col flex-1 gap-2">
          <Header user={user} createdAt={createdAt} />
          <Content content={content} />
          <Repost type={type} repostContent={repostContent} />
          <PostOptions
            show={showPostOptions}
            onQuote={onQuote}
            showQuoteInput={showQuoteInput}
            onRepost={onRepost}
            onCreatePost={() => setShowQuoteInput(false)}
            postReferenceId={post.id}
          />
        </div>
      </div>
    </div>
  );
};
