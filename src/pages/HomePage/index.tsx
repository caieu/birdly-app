import { useEffect, useState } from 'react';
import { Feed } from '../../components/Feed';
import { PageContainer } from '../../components/PageContainer';
import { IPostFilter } from '../../interfaces/IPostFilter';
import { selectFilter, fetchPosts } from '../../redux/features/posts';
import { selectCurrentUser } from '../../redux/features/users';
import { useAppSelector } from '../../redux/hooks';

export const HomePage = () => {
  const [filter, setFilter] = useState<IPostFilter>();
  const { userType, searchText } = useAppSelector(selectFilter);
  const posts = useAppSelector(fetchPosts(filter));
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    setFilter({
      userIds:
        userType === 'following'
          ? [...(currentUser?.following ?? [])]
          : undefined,
      searchText: searchText !== '' ? searchText : undefined,
    });
  }, [currentUser?.following, userType, searchText]);

  return (
    <PageContainer>
      <Feed posts={posts} showPostComposer listClassName="px-4" />
    </PageContainer>
  );
};
