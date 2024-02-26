import { useParams } from 'react-router-dom';
import { Feed } from '../components/Feed';
import { PageContainer } from '../components/PageContainer';
import { ProfileHeader } from '../components/ProfileHeader';
import { fetchPosts } from '../redux/features/posts';
import { fetchUser, selectCurrentUser } from '../redux/features/users';
import { useAppSelector } from '../redux/hooks';

export const UserPage = () => {
  const { userName } = useParams();
  const currentUser = useAppSelector(selectCurrentUser);
  const user = useAppSelector(fetchUser({ userName }));
  const posts = useAppSelector(fetchPosts({ userIds: [user?.id ?? ''] }));
  const isCurrentUser = currentUser?.userName === userName;

  if (!user) return null;

  return (
    <PageContainer>
      <Feed
        posts={posts}
        showPostComposer={isCurrentUser}
        listClassName="px-4"
        header={
          <ProfileHeader
            user={user}
            hideFollowButton={isCurrentUser}
            postCount={posts.length}
          />
        }
      />
    </PageContainer>
  );
};
