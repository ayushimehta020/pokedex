import { State } from "./state.js";

export async function commandMapBack(state: State): Promise<void> {
  if (state.prevLocationURLs === null) {
    console.log("you're on the first page");
    return;
  }

  const locations = await state.pokeapi.fetchLocations(state.prevLocationURLs);

  state.nextLocationURLs = locations.next;
  state.prevLocationURLs = locations.previous;

  for (const location of locations.results) {
    console.log(location.name);
  }
}
