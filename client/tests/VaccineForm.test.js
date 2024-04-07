import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import VaccineForm from '../src/components/HealthRecord/Vaccine/VaccinationForm';
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

describe('VaccineForm', () => {
    beforeEach(() => {
      axios.post.mockClear();
      mockNavigate.mockClear();
    });

    test('renders all form inputs correctly', () => {
        render(<VaccineForm onSave={jest.fn()} />);
    
        expect(screen.getByLabelText('Vaccine Name:')).toBeInTheDocument();
        expect(screen.getByLabelText('Date Given:')).toBeInTheDocument();
        expect(screen.getByLabelText('Next Due Date:')).toBeInTheDocument();
        expect(screen.getByLabelText('Notes:')).toBeInTheDocument();
      });
});