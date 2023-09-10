import { render, screen } from '@testing-library/react';
import App from './App';
import TaskTemplate from './TaskTemplate';
test('renders learn react link', () => {
  render(<TaskTemplate/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
