import { Modal } from '../../components/Modal';
import { ProfileHeader } from '../../components/ProfileHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { Feed } from '../../components/Feed';
import { useAppSelector } from '../../redux/hooks';
import { fetchUser, selectCurrentUser } from '../../redux/features/users';
import { fetchPosts, createPost } from '../../redux/features/posts';

export const UserPage = () => {
  const navigate = useNavigate();
  const { userName } = useParams();
  const currentUser = useAppSelector(selectCurrentUser);
  const user = useAppSelector(fetchUser({ userName }));
  const posts = useAppSelector(fetchPosts({ userIds: [user?.id ?? ''] }));
  const isCurrentUser = currentUser?.userName === userName;

  if (!user) return null;

  return (
    <Modal onClose={() => navigate(-1)}>
      <ProfileHeader
        user={user}
        hideFollowButton={isCurrentUser}
        postCount={posts.length}
      />
      <Feed posts={posts} showPostComposer={isCurrentUser} />
    </Modal>
  );
};
