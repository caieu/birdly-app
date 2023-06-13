import { POST_CHARACTER_LIMIT } from '../PostComposer';

interface TextAreaProps {
  content?: string;
  onChange: (text?: string) => void;
  rows: number;
  characterLimit?: number;
}

export const TextArea = ({
  content,
  onChange,
  rows = 3,
  characterLimit = POST_CHARACTER_LIMIT,
}: TextAreaProps) => {
  const onTextChange = ({
    target: { value: text },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (text.length > characterLimit) return;
    onChange(text);
  };

  return (
    <textarea
      rows={rows}
      name="content"
      id="content"
      className="block w-full px-3 py-3 border-0 resize-none sm:text-sm bg-transparent outline-none text-white"
      placeholder="Add your content..."
      value={content}
      onChange={onTextChange}
    />
  );
};
