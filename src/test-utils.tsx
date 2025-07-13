import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import ErrorBoundary from './components/error-boundary';

export function renderWithErrorBoundary(ui: ReactElement) {
  return render(<ErrorBoundary>{ui}</ErrorBoundary>);
}

export const mockPokemon = {
  name: 'pikachu',
  description: 'Electric mouse Pokemon',
};
