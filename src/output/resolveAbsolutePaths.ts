import * as path from "path";

export function resolveAbsolutePaths(
  cwd: string,
  filenames: readonly string[]
) {
  return filenames.map((filename) => path.resolve(cwd, filename));
}
