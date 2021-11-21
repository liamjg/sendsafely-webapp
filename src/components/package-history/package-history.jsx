import React from 'react';

import './package-history.scss';

import SentPackagesTable from './sent-package-table';
import ReceivedPackagesTable from './received-package-table';

const PackageHistory = ({ userData }) => {
  return (
    <div className='package-history-view'>
      <div className='package-panel'>
        <SentPackagesTable userData={userData} />
      </div>
      {/* <div className='package-panel'>
        <ReceivedPackagesTable userData={userData} />
      </div> */}
    </div>
  );
};

export default PackageHistory;
