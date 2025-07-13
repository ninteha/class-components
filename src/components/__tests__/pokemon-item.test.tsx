import { render, screen } from '@testing-library/react';
import PokemonItem from '../pokemon-item';
import { mockPokemon } from '../../test-utils';

describe('PokemonItem', () => {
  it('renders pokemon name and description', () => {
    render(<PokemonItem pokemon={mockPokemon} />);
    expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();
    expect(screen.getByText(mockPokemon.description)).toBeInTheDocument();
  });
});
