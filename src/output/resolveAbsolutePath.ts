import * as path from "path";

export function resolveAbsolutePath(cwd: string, filename: string) {
  return path.resolve(cwd, filename);
}
