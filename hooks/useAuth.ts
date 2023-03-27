import axios from 'axios';
import { useContext } from 'react';
import { AuthenticationContext } from '../app/components/AuthContext';

const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(AuthenticationContext);

  const signin = async ({ email, password }: { email: string; password: string }) => {
    setAuthState({ data: null, error: null, loading: true });
    try {
      const res = await axios.post('http://localhost:3000/api/auth/signin', { email, password });
      setAuthState({ data: res.data, error: null, loading: false });
    } catch (error: any) {
      setAuthState({ data: null, error: error.response.data.errorMessage, loading: false });
    }
  };
  const signup = async () => {};
  return { signin, signup };
};

export default useAuth;
