import execa from "execa";

import type { CommandReturnValue, Path } from "../types";

export function executeCommand(command: string) {
  return function executeCommandWithArguments(args: ReadonlyArray<string>) {
    return function executeCommandPath(cwd: Path): Promise<CommandReturnValue> {
      return execa(command, args, { cwd });
    };
  };
}
