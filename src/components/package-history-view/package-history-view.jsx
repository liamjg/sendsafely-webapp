import React from 'react';

import './package-history-view.scss';

import SentPackagesTable from '../sent-package-table';
import ReceivedPackagesTable from '../received-package-table';

import PackageHistoryHeader from '../package-history-header';

const PackageHistoryView = ({ userData, setUserData }) => (
  <div className='package-history-view'>
    <div className='package-history-header'>
      <PackageHistoryHeader userData={userData} setUserData={setUserData} />
    </div>
    <div className='package-history-content'>
      <div className='package-history-panel'>
        <SentPackagesTable userData={userData} />
      </div>
      <div className='package-history-panel'>
        <ReceivedPackagesTable userData={userData} />
      </div>
    </div>
  </div>
);
export default PackageHistoryView;
