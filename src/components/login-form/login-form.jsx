import React, { useState } from 'react';

import './login-form.scss';

import { RESPONSE_SUCCESS, RESPONSE_AUTH_FAILED } from '../../client';

import { generateAPIKey } from '../../client';

const LoginForm = ({ setUserData }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await generateAPIKey(username, password);

    setLoading(false);

    if (res.response === RESPONSE_SUCCESS) {
      setUserData({ apiKey: res.apiKey, apiSecret: res.apiSecret });
    } else if (res.response === RESPONSE_AUTH_FAILED) {
      setErrorMessage(res.message);
    }
  };

  return (
    <div className='login-modal'>
      <form className='login-form' onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type={'text'}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type={'password'}
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
  );
};

export default LoginForm;