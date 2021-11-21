import React, { useState, useEffect, useRef, useCallback } from 'react';

import useIsOnscreen from './is-onscreen-hook';

import {
  RESPONSE_SUCCESS,
  deletePackage,
  getSentPackagesPaginated,
} from '../../client';

const DEFAULT_PAGE_SIZE = 5;

const SentPackagesTable = ({ userData }) => {
  const [packages, setPackages] = useState([]);
  const [actions, setActions] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [nextRowIndex, setNextRowIndex] = useState(0);

  const handleDelete = async (packageId) => {
    const res = await deletePackage(
      userData.apiKey,
      userData.apiSecret,
      packageId
    );

    if (res.response === RESPONSE_SUCCESS) {
      setPackages([]);
      setNextRowIndex(0);
      setHasNextPage(true);
    }

    setActions([...actions, `Delete package ${packageId} [${res.response}]`]);
  };

  useEffect(() => {
    getNextPage();
  }, []);

  const getNextPage = () => {
    if (hasNextPage) {
      getPage(nextRowIndex);
      setNextRowIndex((page) => page + DEFAULT_PAGE_SIZE);
    }
  };

  const getPage = async (nextRowIndex) => {
    const apiKey = userData.apiKey;
    const apiSecret = userData.apiSecret;

    const res = await getSentPackagesPaginated(
      apiKey,
      apiSecret,
      nextRowIndex,
      DEFAULT_PAGE_SIZE
    );

    if (res.pagination.hasOwnProperty('nextRowIndex')) {
      setHasNextPage(true);
    } else {
      setHasNextPage(false);
    }

    setPackages([...packages, ...res.packages]);
  };

  return (
    <div className='package-table'>
      <h2>Packages sent:</h2>
      <ul>
        {actions.map((action) => (
          <li>{action}</li>
        ))}
      </ul>
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
            packages.map((pkg) => (
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
            ))}
        </tbody>
      </table>
      <div>
        <button disabled={!hasNextPage} onClick={() => getNextPage()}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default SentPackagesTable;
