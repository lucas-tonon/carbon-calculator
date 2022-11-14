import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import Home from '../index';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('Home Page should render everything as expected', () => {
  render(<Home />);

  const pageContainer = screen.getByTestId('page-container');
  const cardContentContainer = screen.getByTestId('card-content-container');
  const cardActionsContainer = screen.getByTestId('card-actions-container');

  const pageTitleTypography = screen.getByTestId('page-title');
  const description = screen.getByTestId('description');

  expect(pageContainer).toBeInTheDocument();
  expect(cardContentContainer).toBeInTheDocument();
  expect(cardActionsContainer).toBeInTheDocument();

  expect(pageTitleTypography).toBeInTheDocument()
  expect(pageTitleTypography).toHaveTextContent('What is your Carbon Footprint?');

  expect(description).toBeInTheDocument();
});


test('Home Page should navigate properly to the Calculator Page', () => {
  render(<Home />);

  const goToCalculatorButton = screen.getByTestId('navigate-calculator');

  fireEvent.click(goToCalculatorButton);

  expect(mockedUsedNavigate).toHaveBeenCalledWith('/calculator');
});
