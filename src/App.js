import React from 'react';

import LoginForm from './components/login-form';
import PackageHistoryView from './components/package-history-view';
import useSessionStorage from './use-session-storage';

const App = () => {
  const [userData, setUserData] = useSessionStorage('user', null);

  if (!userData) {
    return <LoginForm setUserData={setUserData} />;
  }
  return <PackageHistoryView userData={userData} setUserData={setUserData} />;
};

export default App;
