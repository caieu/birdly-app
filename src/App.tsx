import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { UserPage } from './pages/UserPage';
import { initializePostsData } from './redux/features/posts';
import { initializeUsersData, fetchUsers } from './redux/features/users';
import { useAppDispatch, useAppSelector } from './redux/hooks';

function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
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
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<HomePage />}>
          <Route path="/users/:userName" element={<UserPage />}></Route>
        </Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/users/:userName" element={<UserPage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
