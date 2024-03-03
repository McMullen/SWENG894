import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BabyDashboard from '../src/components/BabyDashboard/BabyDashboard';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useParams: () => ({
    babyId: '1',
  }),
}));

jest.mock('../src/services/auth', () => ({
  getAuthToken: () => 'dummyAuthToken',
}));

describe('BabyDashboard', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url.includes('/api/baby/babyInfo/')) {
        return Promise.resolve({
          data: {
            babyName: 'Baby Name',
            birthDate: '2020-01-01',
            birthWeight: '3.5 kg',
          },
        });
      } else if (url.includes('/api/milestone/get-all/')) {
        return Promise.resolve({
          data: [
            { id: '1', name: 'First Smile', date: '2020-02-01', description: 'First smile description' },
          ],
        });
      }
      return Promise.reject(new Error('not found'));
    });
  });

  test('renders baby information and milestones after fetching', async () => {
    render(
      <BrowserRouter>
        <BabyDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Baby's Name:/i)).toBeInTheDocument();
      expect(screen.getByText(/First Smile/i)).toBeInTheDocument();
    });
  });
});
