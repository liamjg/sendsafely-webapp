import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginForm from './login-form';

test('Renders', () => {
  render(<LoginForm />);

  screen.getByText('SendSafely package browser login');
  screen.getByText('Username:');
  screen.getByText('Password:');
});
