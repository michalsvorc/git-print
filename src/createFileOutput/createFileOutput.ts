import type { StatusDictionary } from "../types.js";

export function createFileOutput(
  statusDictionary: StatusDictionary
): readonly string[] {
  const valuesFromDictionary = statusDictionary.values();
  const valuesFlat = Array.from(valuesFromDictionary).flat();
  const valuesSet = new Set(valuesFlat);
  const values = Array.from(valuesSet);

  return values;
}
