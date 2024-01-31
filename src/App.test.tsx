import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('This' , () => {
  it('should play the game', () => {
    render(<App />);
    const firstPlayer = screen.getByTestId('firstPlayer');
    const secondPlayer = screen.getByTestId('secondPlayer');
    const submit = screen.getByTestId('submit');

    fireEvent.input(firstPlayer, { target: {value: 'ABC'}});
    fireEvent.input(secondPlayer, { target: {value: 'XYZ'}});
    fireEvent.submit(submit);

    expect(screen).toBeInTheDocument();
  });
});