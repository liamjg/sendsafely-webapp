import React, { useState } from 'react';

import './app.scss';

import LoginForm from './components/login-form';
import PackageHistoryView from './components/package-history-view';

const App = () => {
  const [userData, setUserData] = useState(undefined);

  return (
    <div className='main-content'>
      {!userData ? (
        <LoginForm setUserData={setUserData} />
      ) : (
        <PackageHistoryView userData={userData} setUserData={setUserData} />
      )}
    </div>
  );
};

export default App;
