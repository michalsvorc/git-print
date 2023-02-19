import type { ExecaReturnValue, Options } from "execa";
import { execa } from "execa";

type Args = readonly string[];

export function executeCommand(command: string) {
  return function executeCommandWith(
    args: Args,
    options?: Options
  ): Promise<ExecaReturnValue> {
    return execa(command, args, options);
  };
}
