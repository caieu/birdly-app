import { Avatar } from './avatar';
import { useState } from 'react';
import { Button } from './button';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/features/users';
import { useAppDispatch } from '../redux/hooks';
import { createPost } from '../redux/features/posts';
import { PostType } from '../interfaces/IPost';
import { TextArea } from './text-area';
import clsx from 'clsx';

export const POST_CHARACTER_LIMIT = 777;

interface PostComposerProps {
  type?: PostType;
  postReferenceId?: string;
  onCreatePost?: () => void;
  rows?: number;
  className?: string;
}

export const PostComposer = ({
  type = PostType.POST,
  postReferenceId,
  onCreatePost,
  rows = 3,
  className,
}: PostComposerProps) => {
  const [content, setContent] = useState<string>();

  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const onPost = () => {
    dispatch(
      createPost({ content, type, userId: currentUser.id, postReferenceId }),
    );
    setContent(undefined);
    onCreatePost?.();
  };

  return (
    <div className={clsx(className, 'flex items-start space-x-4')}>
      <div className="flex-shrink-0">
        <Avatar user={currentUser} />
      </div>
      <div className="min-w-0 flex-1">
        <form action="#" className="relative">
          <div className="border border-slate-500 rounded-lg shadow-sm overflow-hidden focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500">
            <label htmlFor="content" className="sr-only">
              Add your content
            </label>
            <TextArea rows={rows} content={content} onChange={setContent} />
            <div className="py-2" aria-hidden="true">
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 inset-x-0 px-3 py-2 flex justify-between items-end">
            <div className="text-white flex">{`${
              POST_CHARACTER_LIMIT - (content?.length ?? 0)
            } characters left`}</div>
            <div className="flex-shrink-0">
              <Button label="Post" onClick={onPost} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
