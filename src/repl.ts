// npm i --save-dev @types/node

import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(/\s+/);
}

export async function startREPL(state: State) {
  // const stateInit = initState();
  const rl = state.interface;
  rl.prompt();
  rl.on("line", async (input) => {
    const cleaned = cleanInput(input);
    if (cleaned.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = cleaned[0];
    const args = cleaned.slice(1);
    const command = state.commands[commandName];

    if (!command) {
      console.log("Unknown command");
      rl.prompt();
      return;
    }

    try {
      await command.callback(state, ...args);
    } catch (err: any) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(`An unknown error occured: ${err}`);
      }
    }
    rl.prompt();
  });
}
