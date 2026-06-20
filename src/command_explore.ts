import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
  const locationName = args[0];
  if (!locationName) {
    console.log("Please provide a location name.");
    return;
  }

  const data = await state.pokeapi.fetchLocation(locationName);

  console.log(`Exploring ${locationName}...`);
  console.log("Found Pokemon:");

  for (const encounter of data.pokemon_encounters) {
    console.log(` - ${encounter.pokemon.name}`);
  }
}
