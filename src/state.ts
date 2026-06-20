import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";
import { Cache } from "./pokecache.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  interface: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationURLs: string | null;
  prevLocationURLs: string | null;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const commands = getCommands();
  const cache = new Cache(5 * 60 * 1000);
  return {
    interface: rl,
    commands,
    pokeapi: new PokeAPI(cache),
    nextLocationURLs: null,
    prevLocationURLs: null,
  };
}
