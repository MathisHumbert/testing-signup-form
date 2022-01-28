import { render, screen } from '@testing-library/react';
import App from './App';

test('input should be initially empty', () => {
  render(<App />);
});
