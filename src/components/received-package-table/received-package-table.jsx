import React, { useCallback, useRef } from 'react';

import usePackages from '../../hooks/use-packages';

import { getReceivedPackagesPaginated } from '../../utilities/client';

import './received-package-table.scss';

const DEFAULT_PAGE_SIZE = 5;

const ReceivedPackagesTable = ({ userData }) => {
  const { loading, packages, loadNextRow } = usePackages(
    userData.apiKey,
    userData.apiSecret,
    DEFAULT_PAGE_SIZE,
    getReceivedPackagesPaginated
  );

  const observer = useRef();

  const lastPackageElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadNextRow();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, loadNextRow]
  );

  return (
    <div className='received-package-table'>
      <h2>Packages received</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Sender</th>
            <th>Recipient(s)</th>
            <th>Filename(s)</th>
          </tr>
        </thead>
        <tbody>
          {packages.length > 0 &&
            packages.map((pkg) => {
              return (
                <tr key={pkg.packageId}>
                  <td>{pkg.packageUpdateTimestamp}</td>
                  <td>{pkg.packageUserName}</td>
                  <td>(me)</td>
                  <td>{pkg.filenames.map((filename) => `${filename}\n`)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div ref={lastPackageElementRef} className={'loading-text'}>
        {loading ? 'Loading...' : `Loaded all packages (${packages.length})`}
      </div>
    </div>
  );
};

export default ReceivedPackagesTable;
