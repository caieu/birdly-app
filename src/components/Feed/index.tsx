import clsx from 'clsx';
import { IPost } from '../../interfaces/IPost';
import { Post } from '../Post';
import { PostComposer } from '../PostComposer';
import { Virtuoso } from 'react-virtuoso';

interface FeedProps {
  posts?: IPost[];
  showPostComposer?: boolean;
  header?: React.ReactNode;
  className?: string;
  listClassName?: string;
}

export const Feed = ({
  posts,
  showPostComposer,
  header,
  className,
  listClassName,
}: FeedProps) => {
  return (
    <div className={clsx(className, 'flex flex-col h-full')}>
      <Virtuoso
        data={posts}
        style={{ flex: 1 }}
        className="scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
        itemContent={(index, post) => (
          <Post
            key={post.id}
            post={post}
            className="border-b border-slate-700 w-full px-4"
          />
        )}
        components={{
          Header: () => {
            const composer = showPostComposer ? (
              <PostComposer
                className={clsx(
                  listClassName,
                  'border-b border-slate-700 py-4',
                )}
              />
            ) : null;
            return (
              <>
                {header}
                {composer}
              </>
            );
          },
        }}
      />
    </div>
  );
};
