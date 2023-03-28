'use client';

import Link from 'next/link';
import AuthModal from './AuthModal';
import { useContext } from 'react';
import { AuthenticationContext } from './AuthContext';
import { deleteCookie } from 'cookies-next';
import useAuth from '../../hooks/useAuth';

const NavBar = () => {
  const { data, loading } = useContext(AuthenticationContext);
  const { signout } = useAuth();
  return (
    <nav className='bg-white p-2 flex justify-between'>
      <Link href='/' className='font-bold text-gray-700 text-2xl'>
        OpenTable
      </Link>
      <div>
        {loading ? null : (
          <div className='flex'>
            {data ? (
              <button
                onClick={signout}
                className='border p-1 px-4 rounded bg-blue-400 text-white mr-3'
              >
                Sign out
              </button>
            ) : (
              <>
                <AuthModal isSignIn={true} />
                <AuthModal isSignIn={false} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
