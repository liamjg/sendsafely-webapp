import React, { useState, useEffect, useCallback } from 'react';

import './package-history.scss';

import { RESPONSE_SUCCESS, getSentPackages, deletePackage } from '../../client';

import LoadingSpinner from '../loading-spinner';

const PackageHistory = ({ userData }) => {
  const [packageData, setPackageData] = useState(undefined);

  const loadSentPackages = useCallback(async () => {
    const res = await getSentPackages(userData.apiKey, userData.apiSecret);
    setPackageData(res);
  }, [userData.apiKey, userData.apiSecret]);

  useEffect(() => {
    loadSentPackages();
  }, [loadSentPackages]);

  const handleDelete = async (id) => {
    const res = await deletePackage(userData.apiKey, userData.apiSecret, id);

    if (RESPONSE_SUCCESS) {
      loadSentPackages();
    } else {
      console.log(res);
    }
  };

  if (!packageData) {
    return <LoadingSpinner />;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Sender</th>
          <th>Recipient(s)</th>
          <th>Filename(s)</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {packageData.packages.map((pkg) => {
          return (
            <tr key={pkg.packageId}>
              <td>{pkg.packageUpdateTimestamp}</td>
              <td>{pkg.packageUserName}</td>
              <td>{pkg.recipients.map((recipient) => `${recipient}\n`)}</td>
              <td>{pkg.filenames.map((filename) => `${filename}\n`)}</td>
              <td>
                <button onClick={() => handleDelete(pkg.packageId)}>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PackageHistory;
