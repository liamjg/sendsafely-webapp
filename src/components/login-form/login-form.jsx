import React, { useState, useEffect } from 'react';

import './login-form.scss';

import { RESPONSE_SUCCESS, RESPONSE_AUTH_FAILED } from '../../utilities/client';

import { generateAPIKey } from '../../utilities/client';

const LoginForm = ({ setUserData }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ((username || password) && errorMessage) setErrorMessage('');
  }, [username, password, errorMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await generateAPIKey(username, password);

    setLoading(false);
    setUsername('');
    setPassword('');

    if (res?.response === RESPONSE_SUCCESS) {
      setUserData({
        apiKey: res.apiKey,
        apiSecret: res.apiSecret,
        email: res.email,
      });
    } else if (res?.response === RESPONSE_AUTH_FAILED) {
      setErrorMessage(res.message);
    } else {
      setErrorMessage('No response from API');
    }
  };

  return (
    <>
      <div className='login-background' />
      <div className='login-form'>
        <h3>SendSafely login</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && (
            <div className='error-message'>
              <p>{errorMessage}</p>
            </div>
          )}
          <div>
            <button type='submit' disabled={!password || !username || loading}>
              {loading ? 'Logging in...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
