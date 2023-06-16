import { IPost } from '../../interfaces/IPost';
import { Post } from '../Post';
import { PostComposer } from '../PostComposer';
import { Virtuoso } from 'react-virtuoso';

interface FeedProps {
  posts?: IPost[];
  showPostComposer?: boolean;
}

export const Feed = ({ posts, showPostComposer }: FeedProps) => {
  return (
    <div className="flex flex-col px-4 h-full">
      <Virtuoso
        data={posts}
        style={{ flex: 1 }}
        className="scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
        itemContent={(index, post) => (
          <Post key={post.id} post={post} className="pr-2 border-b" />
        )}
        components={{
          Header: () => {
            if (!showPostComposer) return null;
            return <PostComposer className="pr-2 border-b pb-4 pt-20" />;
          },
        }}
      />
    </div>
  );
};
