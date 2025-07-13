import { Component } from 'react';
import SearchBar from './components/search-bar';
import Results from './components/results';
import type { PokemonItem } from './types/pokeapi';
import { fetchPokemon } from './services/pokeapi';
import './App.css';

interface State {
  searchTerm: string;
  loading: boolean;
  error: string | null;
  results: PokemonItem[];
  errorTest: boolean;
}

class App extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      loading: false,
      error: null,
      results: [],
      errorTest: false,
    };
  }

  componentDidMount(): void {
    this.fetchData();
  }

  handleSearch = (term: string) => {
    this.setState({ searchTerm: term }, () => {
      localStorage.setItem('searchTerm', term);
      this.fetchData();
    });
  };

  fetchData = async () => {
    const { searchTerm } = this.state;
    this.setState({ loading: true, error: null, results: [] });
    try {
      const data = await fetchPokemon(searchTerm);
      this.setState({ results: data, loading: false });
    } catch (err) {
      if (err instanceof Error) {
        this.setState({ error: err.message, loading: false });
      } else {
        this.setState({ error: 'An unknown error occurred', loading: false });
      }
    }
  };

  throwError = () => {
    this.setState({ errorTest: true });
  };

  render() {
    const { searchTerm, loading, error, results, errorTest } = this.state;

    if (errorTest) {
      throw new Error('Test Error');
    }

    return (
      <div className="app__container">
        <section className="controls">
          <SearchBar defaultValue={searchTerm} onSearch={this.handleSearch} />
        </section>
        <section className="results-section">
          <Results loading={loading} error={error} results={results} />
          <div className="results-footer">
            <button
              type="button"
              onClick={this.throwError}
              className="error-btn"
            >
              Test Error
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
