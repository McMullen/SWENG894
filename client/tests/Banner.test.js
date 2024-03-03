import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Banner from '../src/components/Banner';
import { logout } from '../src/services/auth';

jest.mock('../src/services/auth', () => ({
  logout: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Banner', () => {
  beforeEach(() => {
    logout.mockClear();
    mockNavigate.mockClear();
  });

  test('renders the banner with the title and logout button', () => {
    render(<Banner />);

    expect(screen.getByText('Baby Bytes')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
  });

  test('calls logout and navigates to the home page on logout button click', async () => {
    render(<Banner />);

    await userEvent.click(screen.getByRole('button', { name: 'Logout' }));

    expect(logout).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
