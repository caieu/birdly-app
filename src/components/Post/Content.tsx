export const Content = ({ content }: { content?: string }) => {
  if (!content) return null;
  return <p className="text-sm">{content}</p>;
};
