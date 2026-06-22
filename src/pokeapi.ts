import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cache: Cache) {
    this.cache = cache;
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;

    const cached = this.cache.get<ShallowLocations>(url);
    if (cached !== undefined) {
      return cached;
    }

    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data: ShallowLocations = await response.json();
    this.cache.add(url, data);

    return data;
  }

  async fetchLocation(locationName: string) {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.cache.get<ShallowLocations>(url);
    if (cached !== undefined) {
      return cached;
    }

    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data: Location = await response.json();
    this.cache.add(url, data);

    return data;
  }

  async fetchPokemon(pokemonName: string) {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    const cached = this.cache.get<Pokemon>(url);
    if (cached !== undefined) {
      return cached;
    }

    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data: Pokemon = await response.json();
    this.cache.add(url, data);

    return data;
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    // url: string;
  }[];
};

export type Location = {
  pokemon_encounters: {
    pokemon: {
      name: string;
      // url: string
    };
  }[];
};

export type Pokemon = {
  base_experience: number;
  name: string;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
};
