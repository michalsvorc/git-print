import type { StatusDictionary } from "../types.js";

export function formatOutput(
  statusDictionary: StatusDictionary
): readonly string[] {
  function extractDictionaryValuesFrom(dictionary: StatusDictionary) {
    const dictionaryValuesIterator = dictionary.values();
    const dictionaryValuesArray = Array.from(dictionaryValuesIterator);

    return dictionaryValuesArray;
  }

  function uniqueArrayValuesFrom(array: string[]) {
    const set = new Set(array);
    return Array.from(set);
  }

  let output;

  output = extractDictionaryValuesFrom(statusDictionary);
  output = output.flat();
  output = uniqueArrayValuesFrom(output);

  return output;
}
