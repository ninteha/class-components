import { Component } from 'react';
import type { PokemonItem as PokemonItemType } from '../types/pokeapi';

interface Props {
  pokemon: PokemonItemType;
}

class PokemonItem extends Component<Props> {
  render() {
    const { pokemon } = this.props;
    return (
      <li className="results-item">
        <strong>{pokemon.name}</strong>
        <span>{pokemon.description}</span>
      </li>
    );
  }
}

export default PokemonItem;
