import type { StatusDictionary, StatusOutput } from "../types.js";
import { resolveAbsolutePath } from "../output/resolveAbsolutePath.js";

export function createStatusDictionary(
  cwd: string,
  statusOutput: StatusOutput
): StatusDictionary {
  const statusDictionary: StatusDictionary = new Map();

  const statusFilenamePairs: [string, string][] = statusOutput.map((line) => {
    const status = line.substring(0, 2);
    const filename = line.substring(3, line.length);

    const filenameAbsolutePath = resolveAbsolutePath(cwd, filename);
    return [status, filenameAbsolutePath];
  });

  return statusFilenamePairs.reduce((dictionary, pair) => {
    const status: string = pair[0];
    const filename: string = pair[1];

    const dictionaryKeyExists: boolean = dictionary.has(status);

    if (dictionaryKeyExists) {
      const existingFilenameValues = dictionary.get(status);

      dictionary.set(status, [...(existingFilenameValues ?? []), filename]);
    } else {
      dictionary.set(status, [filename]);
    }

    return dictionary;
  }, statusDictionary);
}
