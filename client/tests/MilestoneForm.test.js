import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import MilestoneForm from '../src/components/Milestone/MilestoneForm';
import axios from 'axios';

jest.mock('axios');
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ babyId: '123' }),
}));
jest.mock('../src/services/auth', () => ({
  getAuthToken: jest.fn().mockReturnValue('fakeToken'),
}));

describe('MilestoneForm', () => {
  beforeEach(() => {
    axios.post.mockClear();
    mockNavigate.mockClear();
  });

  test('renders all form inputs correctly', () => {
    render(<MilestoneForm onSave={jest.fn()} />);

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Age')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
  });

  test('updates state on input change', async () => {
    render(<MilestoneForm onSave={jest.fn()} />);

    const nameInput = screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'First Smile');
    expect(nameInput).toHaveValue('First Smile');

  });

  test('submits form data correctly', async () => {
    axios.post.mockResolvedValue({ data: { message: 'Milestone added successfully' } });

    render(<MilestoneForm onSave={jest.fn()} />);

    await userEvent.type(screen.getByPlaceholderText('Name'), 'First Smile');
    await userEvent.type(screen.getByPlaceholderText('Date'), '2021-04-01');
    await userEvent.type(screen.getByPlaceholderText('Age'), '6 months');
    await userEvent.selectOptions(screen.getByRole('combobox'), ['First Steps']);
    await userEvent.type(screen.getByPlaceholderText('Description'), 'First steps description');

    fireEvent.click(screen.getByText('Add'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `/api/milestone/new/123`,
        expect.any(String),
        { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer fakeToken` } }
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith(`/baby-dashboard/123`);
  });
});
