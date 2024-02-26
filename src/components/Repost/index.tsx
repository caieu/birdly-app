import { IPost, PostType } from '../../interfaces/IPost';
import { Post } from '../Post';

export const Repost = ({
  type,
  repostContent,
}: {
  type: PostType;
  repostContent?: IPost | null;
}) => {
  if (type === PostType.POST || !repostContent) return null;
  return (
    <div className="ring-1 ring-slate-500 px-4 rounded-sm">
      <Post post={repostContent} hidePostOptions />
    </div>
  );
};
