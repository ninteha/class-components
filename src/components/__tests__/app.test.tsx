import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import App from '../../App';
import * as pokeapi from '../../services/pokeapi';
import type { PokemonItem } from '../../types/pokeapi';

jest.mock('../../services/pokeapi');

const mockPokemon = {
  name: 'pikachu',
  description: 'A Pokemon named pikachu',
};

describe('App', () => {
  const mockFetchPokemon = pokeapi.fetchPokemon as jest.Mock;

  beforeEach(() => {
    mockFetchPokemon.mockClear();
    localStorage.clear();
    // Default mock implementation
    mockFetchPokemon.mockResolvedValue([]);
  });

  it('renders search bar and results', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /search/i })
      ).toBeInTheDocument();
    });
  });

  it('loads search term from localStorage', async () => {
    localStorage.setItem('searchTerm', 'pikachu');
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue('pikachu');
    });
  });

  it('searches for pokemon and displays results', async () => {
    mockFetchPokemon.mockResolvedValueOnce([]);
    mockFetchPokemon.mockResolvedValueOnce([mockPokemon]);
    render(<App />);
    await waitFor(() => expect(mockFetchPokemon).toHaveBeenCalledTimes(1));

    const searchInput = screen.getByRole('textbox');
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'pikachu' } });
      fireEvent.click(screen.getByRole('button', { name: /search/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();
      expect(screen.getByText(mockPokemon.description)).toBeInTheDocument();
    });
  });

  it('shows loading state while fetching', async () => {
    let resolvePromise: (value: PokemonItem[]) => void;
    const promise = new Promise<PokemonItem[]>((resolve) => {
      resolvePromise = resolve;
    });
    // First call for componentDidMount
    mockFetchPokemon.mockResolvedValueOnce([]);
    // Second call for button click
    mockFetchPokemon.mockImplementationOnce(() => promise);

    render(<App />);
    await waitFor(() => expect(mockFetchPokemon).toHaveBeenCalledTimes(1));

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /search/i }));
    });

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    await act(async () => {
      resolvePromise([]);
      await promise;
    });

    await waitFor(() => {
      expect(screen.getByTestId('no-results')).toBeInTheDocument();
    });
  });

  it('shows error message when API fails', async () => {
    const errorMessage = 'API Error: 404 Not Found';
    // First call for componentDidMount
    mockFetchPokemon.mockResolvedValueOnce([]);
    // Second call for button click
    mockFetchPokemon.mockRejectedValueOnce(new Error(errorMessage));

    render(<App />);
    await waitFor(() => expect(mockFetchPokemon).toHaveBeenCalledTimes(1));

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /search/i }));
    });

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent(errorMessage);
    });
  });

  it('throws error when error button is clicked', async () => {
    render(<App />);
    await waitFor(() => expect(mockFetchPokemon).toHaveBeenCalledTimes(1));
    expect(() => {
      fireEvent.click(screen.getByRole('button', { name: /test error/i }));
    }).toThrow('Test Error');
  });
});
