import type { ExecaReturnValue } from "execa";
import { executeCommand } from "../executeCommand/index.js";

export function gitRoot(): Promise<ExecaReturnValue> {
  const commandArguments = ["rev-parse", "--show-toplevel"];

  return executeCommand("git")(commandArguments);
}
