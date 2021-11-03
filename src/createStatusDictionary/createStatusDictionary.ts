import {
  MutableStatusDictionary,
  StatusDictionary,
  StatusOutput,
} from "../types";

export function createStatusDictionary(
  statusOutput: StatusOutput
): StatusDictionary {
  const statusDictionary: MutableStatusDictionary = new Map();
  for (const line of statusOutput) {
    const status = line.substring(0, 2);
    const filename = line.substring(3, line.length);

    statusDictionary.set(status, [
      ...(statusDictionary.get(status) || []),
      filename,
    ]);
  }

  return statusDictionary;
}
