import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../src/components/Login/LoginForm';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: { token: 'fakeToken' } })),
}));
jest.mock('../src/services/auth', () => ({
  setAuthToken: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('LoginForm', () => {
  test('renders correctly', () => {
    render(
      <BrowserRouter>
        <LoginForm onNavigateToRegister={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
  });

  test('updates email and password fields on user input', () => {
    render(
      <BrowserRouter>
        <LoginForm onNavigateToRegister={() => {}} />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password');
  });
});
