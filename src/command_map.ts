import { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
  const locations = await state.pokeapi.fetchLocations(
    state.nextLocationURLs ?? undefined,
  );

  state.nextLocationURLs = locations.next;
  state.prevLocationURLs = locations.previous;

  for (const location of locations.results) {
    console.log(location.name);
  }
}
