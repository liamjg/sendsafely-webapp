import React, { useState } from 'react';

import axios from 'axios';

import './App.scss';

import LoginForm from './pages/login-form';
import PackageHistory from './pages/package-history';

import calculateSignature from './prerequest';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(undefined);

  const submitHandler = (data) => {
    const headers = { 'Content-Type': 'application/json' };

    const body = {
      email: data.username,
      password: data.password,
      keyDescription: 'SendSafely CLI Key (auto generated)',
    };

    axios
      .put('https://app.sendsafely.com/auth-api/generate-key', body, {
        headers,
      })
      .then((response) => {
        if (response.data.response === 'SUCCESS') {
          const userData = {
            email: response.data.email,
            apiKey: response.data.apiKey,
            apiSecret: response.data.apiSecret,
          };
          getSentPackages(userData);
          setUserData(userData);
          setError(false);
          setErrorMessage('');
          setLoggedIn(true);
        } else if (response.data.response === 'AUTHENTICATION_FAILED') {
          setError(true);
          setErrorMessage(response.data.message);
          setLoggedIn(false);
        }
      });
  };

  const getSentPackages = (userData) => {
    const baseUrl = 'https://demo.sendsafely.com/api/v2.0/';
    const path = 'package/';
    const body = '';

    const url = baseUrl + path;
    const timestamp = new Date().toISOString().substr(0, 19) + '+0000';

    let data = userData.apiKey + path + timestamp + body;

    console.log(data);

    console.log(userData);

    const signature = calculateSignature(
      userData.apiKey,
      userData.apiSecret,
      path,
      body,
      timestamp
    );

    axios
      .get(url, {
        headers: {
          'ss-api-key': userData.apiKey,
          'ss-request-signature': signature,
          'ss-request-timestamp': timestamp,
        },
      })
      .then((response) => {
        console.log(response);
      });
  };

  const view = loggedIn ? (
    <PackageHistory userData={userData} />
  ) : (
    <LoginForm
      error={error}
      errorMessage={errorMessage}
      onSubmit={submitHandler}
    />
  );

  return <div className='main-content'>{view}</div>;
};

export default App;
