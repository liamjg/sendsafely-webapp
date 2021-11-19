import React, { useState } from 'react';

import './App.scss';

import LoginForm from './components/login-form';
import PackageHistory from './components/package-history';

const App = () => {
  const [userData, setUserData] = useState(undefined);

  return (
    <div className='main-content'>
      {!userData ? (
        <LoginForm setUserData={setUserData} />
      ) : (
        <PackageHistory userData={userData} />
      )}
    </div>
  );
};

export default App;
