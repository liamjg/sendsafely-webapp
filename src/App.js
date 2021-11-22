import React, { useState } from 'react';

import LoginForm from './components/login-form';
import PackageHistoryView from './components/package-history-view';

const App = () => {
  const [userData, setUserData] = useState(null);

  if (!userData) {
    return <LoginForm setUserData={setUserData} />;
  }
  return <PackageHistoryView userData={userData} setUserData={setUserData} />;
};

export default App;
