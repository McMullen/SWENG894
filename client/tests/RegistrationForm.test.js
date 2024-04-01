import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import RegistrationForm from '../src/components/auth/RegistrationForm';
import axios from 'axios';

jest.mock('axios');

describe('RegistrationForm', () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  test('renders the registration form with all fields', () => {
    render(<RegistrationForm />);
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });
/**
  test('allows user to enter input into the form fields', async () => {
    render(<RegistrationForm />);
    
    await userEvent.type(screen.getByPlaceholderText('Name'), 'John Doe');
    expect(screen.getByPlaceholderText('Name')).toHaveValue('John Doe');
    
    await userEvent.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    expect(screen.getByPlaceholderText('Email')).toHaveValue('john@example.com');
    
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password');
    expect(screen.getByPlaceholderText('Password')).toHaveValue('password');
  });

  test('submits the form data', async () => {
    axios.post.mockResolvedValue({data: 'User registered'});

    render(<RegistrationForm />);

    await userEvent.type(screen.getByPlaceholderText('Name'), 'John Doe');
    await userEvent.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password');
    
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
        '/api/users/register',
        expect.any(String),
        {"headers": {"Content-Type": "application/json"}}
    )8/;
  });*/

});
