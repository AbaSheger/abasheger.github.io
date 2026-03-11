import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Chatbot from '../Chatbot';

// Mock useLanguage
jest.mock('../../contexts/LanguageContext', () => ({
  useLanguage: () => ({ language: 'en' }),
}));

test('renders chatbot toggle button', () => {
  render(<Chatbot />);
  expect(screen.getByRole('button', { name: /chat/i })).toBeInTheDocument();
});

test('opens chatbot on button click', () => {
  render(<Chatbot />);
  const btn = screen.getByRole('button', { name: /chat/i });
  fireEvent.click(btn);
  expect(screen.getByText(/Ask me about Abenezer/i)).toBeInTheDocument();
});
