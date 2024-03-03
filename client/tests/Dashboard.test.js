import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../src/components/Dashboard/Dashboard';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Dashboard', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        { id: '1', babyName: 'Baby One', birthDate: '2020-01-01' },
        { id: '2', babyName: 'Baby Two', birthDate: '2021-02-02' }
      ]
    });
    mockNavigate.mockClear();
  });

  test('renders babies list and allows selection', async () => {
    render(<BrowserRouter><Dashboard /></BrowserRouter>);

    await waitFor(() => {
      expect(screen.getByText('Baby One')).toBeInTheDocument();
      expect(screen.getByText('Baby Two')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Baby One'));

    await waitFor(() => {
      expect(screen.getByText('Name: Baby One')).toBeInTheDocument();
    });
  });

  test('navigates to add baby page on button click', async () => {
    render(<BrowserRouter><Dashboard /></BrowserRouter>);

    fireEvent.click(screen.getByText('Add a new baby'));

    expect(mockNavigate).toHaveBeenCalledWith('/add-baby');
  });
});
