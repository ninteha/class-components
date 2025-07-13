import { Component } from 'react';
import type { PokemonItem as PokemonItemType } from '../types/pokeapi';
import PokemonItemComponent from './pokemon-item';

interface Props {
  loading: boolean;
  error: string | null;
  results: PokemonItemType[];
}

class Results extends Component<Props> {
  static defaultProps = {
    results: [],
  };

  renderContent() {
    const { loading, error, results } = this.props;

    if (loading) {
      return (
        <p className="loading" data-testid="loading">
          Loading...
        </p>
      );
    }

    if (error) {
      return (
        <p className="error" data-testid="error">
          {error}
        </p>
      );
    }

    if (!results || results.length === 0) {
      return (
        <p className="no-results" data-testid="no-results">
          No results found.
        </p>
      );
    }

    return (
      <ul className="results-list" data-testid="results-list">
        {results.map((pokemon) => (
          <PokemonItemComponent key={pokemon.name} pokemon={pokemon} />
        ))}
      </ul>
    );
  }

  render() {
    return <div className="results-container">{this.renderContent()}</div>;
  }
}

export default Results;
