import { IPost } from '../../interfaces/IPost';
import { Post } from '../Post';
import { PostComposer } from '../PostComposer';

interface FeedProps {
  posts?: IPost[];
  showPostComposer?: boolean;
}

export const Feed = ({ posts, showPostComposer }: FeedProps) => {
  return (
    <div className="divide-y divide-gray-100 p-4">
      {showPostComposer && (
        <div className="pb-4">
          <PostComposer />
        </div>
      )}
      {posts?.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
