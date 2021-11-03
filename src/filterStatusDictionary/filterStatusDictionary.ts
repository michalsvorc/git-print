import { STAGED, STATUS_DELETED, UNSTAGED } from "../constants";

import {
  FilterOptions,
  MutableStatusDictionary,
  StatusDictionary,
} from "src/types";

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

    const filteredDictionary: MutableStatusDictionary = new Map();

    for (const key of validKeys) {
      filteredDictionary.set(
        key,
        statusDictionary.get(key) as ReadonlyArray<string>
      );
    }

    return filteredDictionary;
  };
}
