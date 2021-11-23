import axios from 'axios';

import calculateSignature from './prerequest';

export const RESPONSE_SUCCESS = 'SUCCESS';
export const RESPONSE_AUTH_FAILED = 'AUTHENTICATION_FAILED';

const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
};

export const generateAPIKey = async (username, password) => {
  const headers = { 'Content-Type': 'application/json' };

  const body = {
    email: username,
    password: password,
    keyDescription: 'SendSafely CLI Key (auto generated)',
  };

  return await axios
    .put('https://app.sendsafely.com/auth-api/generate-key', body, {
      headers,
    })
    .then((res) => res.data)
    .catch((error) => {
      handleError(error);
    });
};

export const getSentPackagesPaginated = async (
  apiKey,
  apiSecret,
  rowIndex,
  pageSize
) => {
  const baseUrl = 'https://demo.sendsafely.com';
  const path = '/api/v2.0/package';
  const body = '';

  const url = baseUrl + path;
  const timestamp = new Date().toISOString().substr(0, 19) + '+0000';

  const signature = calculateSignature(
    apiKey,
    apiSecret,
    path,
    body,
    timestamp
  );

  return await axios
    .get(url, {
      headers: {
        'ss-api-key': apiKey,
        'ss-request-signature': signature,
        'ss-request-timestamp': timestamp,
      },
      params: {
        rowIndex: rowIndex,
        pageSize: pageSize,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      handleError(error);
    });
};

export const getReceivedPackagesPaginated = async (
  apiKey,
  apiSecret,
  rowIndex,
  pageSize
) => {
  const baseUrl = 'https://demo.sendsafely.com';
  const path = '/api/v2.0/package/received';
  const body = '';

  const url = baseUrl + path;
  const timestamp = new Date().toISOString().substr(0, 19) + '+0000';

  const signature = calculateSignature(
    apiKey,
    apiSecret,
    path,
    body,
    timestamp
  );

  return await axios
    .get(url, {
      headers: {
        'ss-api-key': apiKey,
        'ss-request-signature': signature,
        'ss-request-timestamp': timestamp,
      },
      params: {
        rowIndex: rowIndex,
        pageSize: pageSize,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      handleError(error);
    });
};

export const deletePackage = async (apiKey, apiSecret, packageId) => {
  const baseUrl = 'https://demo.sendsafely.com';
  const path = `/api/v2.0/package/${packageId}`;
  const body = '';

  const url = baseUrl + path;
  const timestamp = new Date().toISOString().substr(0, 19) + '+0000';

  const signature = calculateSignature(
    apiKey,
    apiSecret,
    path,
    body,
    timestamp
  );

  return await axios
    .delete(url, {
      headers: {
        'ss-api-key': apiKey,
        'ss-request-signature': signature,
        'ss-request-timestamp': timestamp,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      handleError(error);
    });
};
