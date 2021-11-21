import React, { useState, useRef, useCallback } from 'react';

import { RESPONSE_SUCCESS, deletePackage } from '../../client';

import useSentPackages from './use-sent-packages';

const DEFAULT_PAGE_SIZE = 5;

const SentPackagesTable = ({ userData }) => {
  const [actions, setActions] = useState([]);

  const { loading, packages, resetLoader, loadNextRow } = useSentPackages(
    userData.apiKey,
    userData.apiSecret,
    DEFAULT_PAGE_SIZE
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

  const handleDelete = async (packageId) => {
    const res = await deletePackage(
      userData.apiKey,
      userData.apiSecret,
      packageId
    );
    if (res.response === RESPONSE_SUCCESS) {
      resetLoader();
    }
    setActions([...actions, `Delete package ${packageId} [${res.response}]`]);
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
      <div ref={lastPackageElementRef} className={'loading-text'}>
        {loading ? 'Loading...' : `Loaded all packages (${packages.length})`}
      </div>
    </div>
  );
};

export default SentPackagesTable;
