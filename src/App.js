import React, { useState } from 'react';

import './app.scss';

import LoginForm from './components/login-form';
import PackageHistoryView from './components/package-history-view';

//TODO: Routing?
const App = () => {
  const [userData, setUserData] = useState(undefined);
  return (
    <div className='main-content'>
      {!userData ? (
        <LoginForm setUserData={setUserData} />
      ) : (
        <PackageHistoryView userData={userData} />
      )}
    </div>
  );
};

export default App;
