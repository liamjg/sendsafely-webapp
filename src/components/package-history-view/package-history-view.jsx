import React from 'react';

import './package-history-view.scss';

import SentPackagesTable from './sent-package-table';
import ReceivedPackagesTable from './received-package-table/';

const PackageHistoryView = ({ userData, setUserData }) => (
  <div className='package-view'>
    <div className='package-view-header'>
      <div className='package-view-title'>
        <h2>SendSafely package browser</h2>
        <p>{userData.email}</p>
      </div>
      <button onClick={() => setUserData(null)}>Logout</button>
    </div>
    <div className='package-view-content'>
      <div className='package-panel'>
        <SentPackagesTable userData={userData} />
      </div>
      <div className='package-panel'>
        <ReceivedPackagesTable userData={userData} />
      </div>
    </div>
  </div>
);
export default PackageHistoryView;
