import type { FilterOptions, StatusDictionary } from "../types.js";

import { STAGED, STATUS_DELETED, UNSTAGED } from "../constants.js";

export function filterStatusDictionary(statusDictionary: StatusDictionary) {
  return function filterStatusDictionaryOptions(
    filterOptions: FilterOptions
  ): StatusDictionary {
    const { deleted, staged, unstaged } = filterOptions;
    const keys = Array.from(statusDictionary.keys());

    const validKeys = keys
      .filter((key) => deleted || !STATUS_DELETED.test(key))
      .filter((key) => staged || !STAGED.test(key))
      .filter((key) => unstaged || !UNSTAGED.test(key));

    const filteredDictionary: StatusDictionary = new Map();

    for (const key of validKeys) {
      filteredDictionary.set(
        key,
        // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
        statusDictionary.get(key) as readonly string[]
      );
    }

    return filteredDictionary;
  };
}
