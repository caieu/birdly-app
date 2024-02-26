import { QuoteIcon } from '../../icons/QuoteIcon';
import { RepostIcon } from '../../icons/RepostIcon';
import { PostType } from '../../interfaces/IPost';
import { Button } from '../Button';
import { PostComposer } from '../PostComposer';
import { motion, AnimatePresence } from 'framer-motion';

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
      <AnimatePresence>
        {showQuoteInput && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 100, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <PostComposer
              type={PostType.QUOTE}
              postReferenceId={postReferenceId}
              onCreatePost={onCreatePost}
              rows={1}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
