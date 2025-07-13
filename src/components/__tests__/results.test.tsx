import { render, screen } from '@testing-library/react';
import Results from '../results';
import { mockPokemon } from '../../test-utils';

describe('Results', () => {
  it('shows loading state', () => {
    render(<Results loading={true} error={null} results={[]} />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('shows error message', () => {
    const error = 'Failed to fetch';
    render(<Results loading={false} error={error} results={[]} />);
    expect(screen.getByTestId('error')).toHaveTextContent(error);
  });

  it('shows no results message when results array is empty', () => {
    render(<Results loading={false} error={null} results={[]} />);
    expect(screen.getByTestId('no-results')).toBeInTheDocument();
  });

  it('renders list of pokemon', () => {
    render(<Results loading={false} error={null} results={[mockPokemon]} />);
    const list = screen.getByTestId('results-list');
    expect(list).toBeInTheDocument();
    expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();
    expect(screen.getByText(mockPokemon.description)).toBeInTheDocument();
  });
});
