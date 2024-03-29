'use client';

import { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModalInputs from './AuthModalInputs';
import useAuth from '../../hooks/useAuth';
import { AuthenticationContext } from './AuthContext';
import { Alert, CircularProgress } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signin, signup } = useAuth();
  const { loading, data, error } = useContext(AuthenticationContext);

  const renderContent = (signinContent: string, signoutContent: string) => {
    {
      return isSignIn ? signinContent : signoutContent;
    }
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  });
  const [disableSubmit, setDisableSubmit] = useState(true);

  const handleClick = () => {
    if (isSignIn) {
      signin({ email: inputs.email, password: inputs.password }, handleClose);
    } else {
      signup(inputs, handleClose);
    }
  };

  useEffect(() => {
    if (isSignIn) {
      if (inputs.password && inputs.email) {
        return setDisableSubmit(false);
      }
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.phone &&
        inputs.city &&
        inputs.password
      ) {
        return setDisableSubmit(false);
      }
    }
    setDisableSubmit(true);
  }, [inputs]);
  return (
    <div>
      <button
        onClick={handleOpen}
        className={`
          ${renderContent('bg-blue-400 text-white mr-3', '')}
          border p-1 px-4 rounded
          `}
      >
        {renderContent('Sign in', 'Sign up')}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {loading ? (
            <div className='py-24 px-2 h-[600px] flex justify-center'>
              <CircularProgress />
            </div>
          ) : (
            <div className='p-2 h-[600px]'>
              {error ? (
                <Alert className='mb-4' severity='error'>
                  {error}
                </Alert>
              ) : null}
              <div className='uppercase font-bold text-center pb-2 border-b mb-2'>
                <p className='text-sm'>{renderContent('Sign In', 'Create Account')}</p>
              </div>
              <div className='m-auto'>
                <h2 className='text-2xl font-light text-center'>
                  {renderContent('Log Into Your Account', 'Create Your OpenTable Account')}
                </h2>
                <AuthModalInputs
                  inputs={inputs}
                  handleChangeInput={handleChangeInput}
                  isSignIn={isSignIn}
                />
                <button
                  onClick={handleClick}
                  disabled={disableSubmit}
                  className='uppercase bg-red-600 w-full text-white p-3 roundedd text-sm mb-5 disabled:bg-gray-400'
                >
                  {renderContent('Sign In', 'Create Account')}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
