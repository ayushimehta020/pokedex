import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
  const pokemonName = args[0];
  const data = await state.pokeapi.fetchPokemon(pokemonName);
  const roll = Math.random() * data.base_experience;

  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  if (roll < 50) {
    console.log(`${pokemonName} was caught!`);
    state.pokedex[data.name] = data;
    console.log("You may now inspect it with the inspect command.");
  } else {
    console.log(`${pokemonName} escaped!`);
  }
}
