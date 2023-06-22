import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from './pages/home';
import { UserPage } from './pages/user';
import { initializePostsData } from './redux/features/posts';
import { initializeUsersData, fetchUsers } from './redux/features/users';
import { useAppDispatch, useAppSelector } from './redux/hooks';

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const users = useAppSelector(fetchUsers);

  useEffect(() => {
    dispatch(initializeUsersData());
  }, [dispatch]);

  useEffect(() => {
    if (users.length) {
      dispatch(initializePostsData({ users }));
    }
  }, [dispatch, users]);

  return (
    <div className="bg-gray-900 h-screen">
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/users/:userName" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
