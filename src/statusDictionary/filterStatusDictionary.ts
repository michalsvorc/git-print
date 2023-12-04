import type { GitStatusArguments, StatusDictionary } from "../types.js";

import { regExpStatusDictionary } from "../constants.js";

function buildOmit(filterOptions: Omit<GitStatusArguments, "cwd">) {
  const { deleted, untracked, staged, unstaged } = filterOptions;
  const regExpList = [];
  !deleted && regExpList.push(regExpStatusDictionary.get("deleted"));
  !untracked && regExpList.push(regExpStatusDictionary.get("untracked"));
  !staged && regExpList.push(regExpStatusDictionary.get("staged"));
  !unstaged && regExpList.push(regExpStatusDictionary.get("unstaged"));

  if (!regExpList.length) {
    return new RegExp("^$");
  }

  return new RegExp(`^${regExpList.join("|")}$`);
}

export function filterStatusDictionary(statusDictionary: StatusDictionary) {
  return function filterStatusDictionaryOptions(
    filterOptions: Omit<GitStatusArguments, "cwd">
  ): StatusDictionary {
    const keys = Array.from(statusDictionary.keys());
    const omitRegExp = buildOmit(filterOptions);
    const validKeys = keys.filter((key) => !omitRegExp.test(key));

    const filteredStatusDictionary: StatusDictionary = new Map();

    for (const key of validKeys) {
      filteredStatusDictionary.set(
        key,
        // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
        statusDictionary.get(key) as readonly string[]
      );
    }

    return filteredStatusDictionary;
  };
}
