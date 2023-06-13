import { QuoteIcon } from '../../icons/QuoteIcon';
import { RepostIcon } from '../../icons/RepostIcon';
import { PostType } from '../../interfaces/IPost';
import { Button } from '../Button';
import { PostComposer } from '../PostComposer';

interface PostOptionsProps {
  show?: boolean;
  onRepost?: () => void;
  onQuote?: () => void;
  showQuoteInput?: boolean;
  postReferenceId?: string;
  onCreatePost?: () => void;
}

export const PostOptions = ({
  show,
  onQuote,
  onRepost,
  showQuoteInput,
  postReferenceId,
  onCreatePost,
}: PostOptionsProps) => {
  if (!show) return null;
  return (
    <>
      <div className="flex space-x-2">
        <Button
          icon={<RepostIcon />}
          label="Repost"
          transparent
          onClick={onRepost}
        />
        <Button
          icon={<QuoteIcon />}
          label="Quote"
          transparent
          onClick={onQuote}
          isSelected={showQuoteInput}
        />
      </div>
      {showQuoteInput && (
        <div className="pt-4 pb-2">
          <PostComposer
            type={PostType.QUOTE}
            postReferenceId={postReferenceId}
            onCreatePost={onCreatePost}
            rows={1}
          />
        </div>
      )}
    </>
  );
};
