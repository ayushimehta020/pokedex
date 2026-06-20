import { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays names of 20 location areas in Pokemon",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Display the previous 20 location areas in Pokemon",
      callback: commandMapBack,
    },
    explore: {
      name: "explore",
      description: "Displays the list of Pokemon in the given location area",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Catch the given Pokemon",
      callback: commandCatch,
    },
  };
}
