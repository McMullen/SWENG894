import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from '../src/components/ProtectedRoute';
import { isAuthenticated } from '../src/services/auth';

jest.mock('../src/services/auth', () => ({
  isAuthenticated: jest.fn(),
}));

describe('ProtectedRoute Component', () => {
  const ChildComponent = () => <div>Protected Content</div>;

  test('renders children when authenticated', () => {
    isAuthenticated.mockImplementation(() => true);

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <ChildComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  test('redirects to home when not authenticated', () => {
    isAuthenticated.mockImplementation(() => false);

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <ChildComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
