import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import BabyRegistration from '../src/components/BabyRegistration/BabyRegistration';
import axios from 'axios';

jest.mock('axios');

describe('BabyRegistration', () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  test('submits the form with baby registration data', async () => {
    axios.post.mockResolvedValue({ data: { message: 'Baby registered successfully' } });

    render(<BabyRegistration />);

    await userEvent.type(screen.getByLabelText(/Baby's Name:/i), 'John');
    await userEvent.type(screen.getByLabelText(/Birth Date:/i), '2022-01-01');
    await userEvent.selectOptions(screen.getByLabelText(/Sex:/i), ['male']);
    await userEvent.type(screen.getByLabelText(/Birth Weight:/i), '3kg');
    await userEvent.type(screen.getByLabelText(/Birth Height:/i), '50cm');

    fireEvent.click(screen.getByRole('button', { name: /Register Baby/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/api/baby/add',
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'Authorization': expect.stringContaining('Bearer ')
        })
      })
    );
  });
});
