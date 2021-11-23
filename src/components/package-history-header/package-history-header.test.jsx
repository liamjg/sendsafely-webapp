import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PackageHistoryHeader from './package-history-header';

test('Renders', () => {
  const userData = { email: 'testEmail' };

  render(<PackageHistoryHeader userData={userData} />);

  screen.getByText('SendSafely package browser');
  screen.getByText(userData.email);
  screen.getByText('Logout');
});

test('Logout sets user data to null', () => {
  const userData = { email: 'testEmail' };

  const mockSetUserData = jest.fn();

  render(
    <PackageHistoryHeader userData={userData} setUserData={mockSetUserData} />
  );

  const logoutButtonComponent = screen.getByText('Logout');

  fireEvent.click(logoutButtonComponent);

  expect(mockSetUserData.mock.calls[0][0]).toBeNull();
});
