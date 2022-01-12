import execa, { ExecaReturnValue, Options } from "execa";

export function executeCommand(command: string) {
  return function executeCommandArguments(args: ReadonlyArray<string>) {
    return function executeCommandArguments(
      options?: Options
    ): Promise<ExecaReturnValue> {
      return execa(command, args, options);
    };
  };
}
