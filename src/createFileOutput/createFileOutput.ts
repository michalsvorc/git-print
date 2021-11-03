import { StatusDictionary } from "../types";

export function createFileOutput(
  statusDictionary: StatusDictionary
): ReadonlyArray<string> {
  const valuesFromDictionary = statusDictionary.values();
  const valuesFlat = Array.from(valuesFromDictionary).flat();
  const valuesSet = new Set(valuesFlat);
  const values = Array.from(valuesSet);

  return values;
}
