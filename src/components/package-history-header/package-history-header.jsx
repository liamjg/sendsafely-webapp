import React from 'react';

import './package-history-header.scss';

const PackageHistoryHeader = ({ userData, setUserData }) => (
  <div className='package-view-header'>
    <div>
      <h2>SendSafely package browser</h2>
      <p>{userData.email}</p>
    </div>
    <button onClick={() => setUserData(null)}>Logout</button>
  </div>
);
export default PackageHistoryHeader;
