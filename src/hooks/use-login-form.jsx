import { useState, useEffect } from 'react';

const useLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // clear the error message if input is changed
  useEffect(() => {
    if ((username || password) && errorMessage) setErrorMessage('');
  }, [username, password, errorMessage]);

  return {
    username,
    password,
    errorMessage,
    loading,
    setUsername,
    setPassword,
    setErrorMessage,
    setLoading,
  };
};

export default useLoginForm;
