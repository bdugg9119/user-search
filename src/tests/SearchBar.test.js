import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';

import { SearchBar } from '../components';

const submitQuery = () => {};

test('It renders correctly', () => {
  render(<SearchBar handleSubmit={submitQuery} resultsCount={0}/>);

  screen.getByRole(/radiogroup/i);
  screen.getByPlaceholderText(/enter name/i);
  screen.getByRole('button', {name: /search/i });
  screen.getByLabelText(/text button group/i);
  screen.getByLabelText(/pagination navigation/i);
});

test('Clicking on radio button changes value', () => {
  render(<SearchBar handleSubmit={submitQuery} resultsCount={0}/>);

  const labelRadio = screen.getByLabelText(/email/i);
  expect(labelRadio.checked).toEqual(false);
  fireEvent.click(labelRadio);
  expect(labelRadio.checked).toEqual(true)
});

test('It renders input text', () => {
  render(<SearchBar handleSubmit={submitQuery} resultsCount={0}/>);

  const textField = screen.getByRole('textbox');
  fireEvent.change(textField, {target: { value: 'React Testing'}});
  expect(textField.value).toBe('React Testing');
});

test('It errors on invalid input', async () => {
  render(<SearchBar handleSubmit={submitQuery} resultsCount={0}/>);

  const searchButton = screen.getByRole('button', {name: /search/i });
  fireEvent.click(searchButton);
  const error = await screen.findAllByText(/enter a valid/i);
  expect(error.length).toBe(1);
});
