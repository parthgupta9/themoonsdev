import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../store';
import { setUser, clearUser } from '../store/userSlice';

const useAuthSession = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get('/api/user', {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(setUser(response.data.user));
        } catch (error) {
          console.error('Failed to fetch user:', error);
          dispatch(clearUser());
        }
      }
    };

    fetchUser();
  }, [token, dispatch]);

  return { user };
};

export default useAuthSession;
