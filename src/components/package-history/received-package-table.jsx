import React, { useState, useEffect, useRef } from 'react';

import { getReceivedPackagesPaginated } from '../../client';

import useIsOnscreen from './is-onscreen-hook';

const DEFAULT_PAGE_SIZE = 5;

const ReceivedPackagesTable = ({ userData }) => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [nextRowIndex, setNextRowIndex] = useState(0);

  const itemRef = useRef(null);

  const isOnscreen = useIsOnscreen(itemRef);

  const getNextPage = async () => {
    setIsLoading(true);

    const apiKey = userData.apiKey;
    const apiSecret = userData.apiSecret;

    const res = await getReceivedPackagesPaginated(
      apiKey,
      apiSecret,
      nextRowIndex,
      DEFAULT_PAGE_SIZE
    );

    setHasNextPage(res.pagination.hasOwnProperty('nextRowIndex'));
    setPackages([...packages, ...res.packages]);
    setNextRowIndex(nextRowIndex + DEFAULT_PAGE_SIZE);
    setIsLoading(false);
  };

  const handleView = async (packageId, packageCode) => {
    console.log(packageId, packageCode);
  };

  useEffect(() => {
    if (hasNextPage) {
      getNextPage();
    }
  }, [isOnscreen]);

  return (
    <div className='package-table'>
      <h2>Packages received:</h2>
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
          {packages.length > 0 &&
            packages.map((pkg) => {
              return (
                <tr key={pkg.packageId}>
                  <td>{pkg.packageUpdateTimestamp}</td>
                  <td>{pkg.packageUserName}</td>
                  <td>(me)</td>
                  <td>{pkg.filenames.map((filename) => `${filename}\n`)}</td>
                  <td>
                    <button
                      onClick={() => handleView(pkg.packageId, pkg.packageCode)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {!isLoading && (
        <div ref={itemRef} className={'loading-text'}>
          {hasNextPage
            ? 'Loading...'
            : `Loaded all packages (${packages.length})`}
        </div>
      )}
    </div>
  );
};

export default ReceivedPackagesTable;
