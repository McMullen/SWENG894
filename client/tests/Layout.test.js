import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Layout from '../src/components/Layout';
import Banner from '../src/components/Banner';

jest.mock('../src/components/Banner', () => {
  return {
    __esModule: true,
    default: () => <div>Banner Mock</div>,
  };
});

describe('Layout Component', () => {
  const setup = (initialPath = '/') => {
    render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<div>Home Page</div>} />
            <Route path="/register" element={<div>Register Page</div>} />
            <Route path="/dashboard" element={<div>Dashboard Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  test('does not show Banner on the home page', () => {
    setup('*');
    expect(screen.queryByText('Banner Mock')).not.toBeInTheDocument();
  });

  test('does not show Banner on the register page', () => {
    setup('/register');
    expect(screen.queryByText('Banner Mock')).not.toBeInTheDocument();
  });

  test('shows Banner on other pages', () => {
    setup('/dashboard');
    expect(screen.getByText('Banner Mock')).toBeInTheDocument();
  });
});
