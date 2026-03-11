import React from 'react';
import { render, screen } from '@testing-library/react';
import { Contact } from '../Contact';

const mockText = {
  sectionTitle: 'Get In Touch',
  subtitle: "Let's Work Together",
  description: 'Feel free to reach out.',
  email: 'Email',
  phone: 'Phone',
  messageBtn: 'Send Me a Message',
  formName: 'Your Name',
  formEmail: 'Your Email',
  formMessage: 'Your Message',
  formSend: 'Send Message',
  formSending: 'Sending...',
  formSuccess: "Message sent!",
  formError: 'Failed to send.',
  formNamePlaceholder: 'John Doe',
  formEmailPlaceholder: 'john@example.com',
  formMessagePlaceholder: 'Hello...',
};

test('renders Contact section', () => {
  render(<Contact text={mockText} />);
  expect(screen.getByText("Let's Work Together")).toBeInTheDocument();
  expect(screen.getByText('Send Message')).toBeInTheDocument();
});
