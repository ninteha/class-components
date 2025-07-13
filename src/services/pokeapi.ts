import type { PokemonItem } from '../types/pokeapi';

interface PokemonListResponse {
  count: number;
  results: Array<{ name: string; url: string }>;
}

async function fetchJson<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<T>;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch Pokemon data');
  }
}

export async function fetchPokemon(searchTerm: string): Promise<PokemonItem[]> {
  const trimmed = searchTerm.trim().toLowerCase();
  if (!trimmed) {
    return [];
  }

  try {
    const response = await fetchJson<PokemonListResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=100'
    );

    const filteredPokemon = response.results
      .filter((pokemon) => pokemon.name.includes(trimmed))
      .slice(0, 10)
      .map((pokemon) => ({
        name: pokemon.name,
        description: `A Pokemon named ${pokemon.name}`,
      }));

    return filteredPokemon;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch Pokemon data');
  }
}
