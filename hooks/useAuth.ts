import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useContext } from 'react';
import { AuthenticationContext } from '../app/components/AuthContext';

const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(AuthenticationContext);

  const signin = async (
    { email, password }: { email: string; password: string },
    handleClose: () => void
  ) => {
    setAuthState({ data: null, error: null, loading: true });
    try {
      const res = await axios.post('http://localhost:3000/api/auth/signin', { email, password });
      setAuthState({ data: res.data, error: null, loading: false });
      handleClose();
    } catch (error: any) {
      setAuthState({ data: null, error: error.response.data.errorMessage, loading: false });
    }
  };
  const signup = async (
    {
      email,
      password,
      firstName,
      lastName,
      city,
      phone,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      city: string;
      phone: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({ data: null, error: null, loading: true });
    try {
      const res = await axios.post('http://localhost:3000/api/auth/signup', {
        email,
        password,
        firstName,
        lastName,
        city,
        phone,
      });
      setAuthState({ data: res.data, error: null, loading: false });
      handleClose();
    } catch (error: any) {
      setAuthState({ data: null, error: error.response.data.errorMessage, loading: false });
    }
  };

  return { signin, signup };
};

export default useAuth;
