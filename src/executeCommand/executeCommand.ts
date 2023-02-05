import type { ExecaReturnValue, Options } from "execa";
import { execa } from "execa";

export function executeCommand(command: string) {
  return function executeCommandArguments(args: readonly string[]) {
    return function executeCommandArguments(
      options?: Options
    ): Promise<ExecaReturnValue> {
      return execa(command, args, options);
    };
  };
}
