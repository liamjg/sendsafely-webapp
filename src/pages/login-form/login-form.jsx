import React, { useState } from 'react';

import './login-form.scss';

const LoginForm = ({ error, errorMessage, onSubmit }) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      username,
      password,
    });

    setPassword('');
    setUsername('');
  };

  return (
    <div className='login-modal'>
      <form className='login-form' onSubmit={handleSubmit}>
        <div>
          <label>{'Username:'}</label>
          <input
            type={'text'}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>{'Password:'}</label>
          <input
            type={'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <div className='error-message'>
            <p>{errorMessage}</p>
          </div>
        )}
        <div>
          <button type='submit' disabled={!password || !username}>
            {'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
