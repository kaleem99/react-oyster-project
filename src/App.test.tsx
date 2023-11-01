import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// '{"time":"00:50","Link":"Just some more generic text"} --> {"time":"01:00","Link":"You are still watching this video"} --> {"time":"01:10","Link":"You have watched 01 minute and 10 seconds of the video."}';
