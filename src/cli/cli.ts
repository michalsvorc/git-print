import type { GitStatusArguments } from "../types.js";
import { castInputArguments } from "../arguments/castInputArguments.js";
import { formatOutput } from "../output/formatOutput.js";
import { main } from "../main.js";
import { readInputArguments } from "./readInputArguments.js";

export async function cli() {
  const inputArguments = readInputArguments();
  const castedArguments = castInputArguments(inputArguments);
  const statusDictionary = await main(castedArguments as GitStatusArguments);
  const formattedOutput = formatOutput(statusDictionary);

  return formattedOutput;
}
