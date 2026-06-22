import { State } from "./state.js";

export async function commandPokedex(state: State) {
  const names = Object.keys(state.pokedex);

  if (names.length === 0) {
    console.log("You haven't caught any Pokemon yet.");
    return;
  }

  console.log("Your Pokedex:");
  for (const name of names) {
    console.log(` - ${name}`);
  }
}
