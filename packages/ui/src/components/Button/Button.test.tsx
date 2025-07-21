import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('Button renders text', () => {
  render(<Button>Click</Button>);
  expect(screen.getByText(/click/i)).toBeInTheDocument();
});
