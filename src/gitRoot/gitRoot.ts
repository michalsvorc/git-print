import type { ExecaReturnValue } from "execa";
import { execute } from "../command/execute.js";

export function gitRoot(): Promise<ExecaReturnValue> {
  const command = "git";
  const args = ["rev-parse", "--show-toplevel"];

  return execute(command)(args);
}
