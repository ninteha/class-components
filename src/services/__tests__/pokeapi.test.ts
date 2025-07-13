import { fetchPokemon } from '../pokeapi';

// Mock fetch globally
const mockFetch = jest.fn();
window.fetch = mockFetch;

describe('fetchPokemon', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('returns empty array for empty search', async () => {
    const results = await fetchPokemon('');
    expect(results).toEqual([]);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('returns empty array for whitespace search', async () => {
    const results = await fetchPokemon('   ');
    expect(results).toEqual([]);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('fetches pokemon data successfully', async () => {
    const mockResponse = {
      results: [
        { name: 'pikachu', url: 'url1' },
        { name: 'raichu', url: 'url2' },
      ],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const results = await fetchPokemon('pika');
    expect(results).toEqual([
      { name: 'pikachu', description: 'A Pokemon named pikachu' },
    ]);
  });

  it('handles API errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(fetchPokemon('nonexistent')).rejects.toThrow(
      'API Error: 404 Not Found'
    );
  });

  it('handles network errors', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    await expect(fetchPokemon('pikachu')).rejects.toThrow('Network error');
  });

  it('limits results to 10 items', async () => {
    const mockResponse = {
      results: Array.from({ length: 20 }, (_, i) => ({
        name: `pokemon${i}`,
        url: `url${i}`,
      })),
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const results = await fetchPokemon('pokemon');
    expect(results).toHaveLength(10);
  });

  it('handles non-Error objects in catch', async () => {
    mockFetch.mockRejectedValueOnce('string error');
    await expect(fetchPokemon('pikachu')).rejects.toThrow(
      'Failed to fetch Pokemon data'
    );
  });
});
