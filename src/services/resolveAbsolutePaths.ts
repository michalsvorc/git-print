import * as path from "path";

export function resolveAbsolutePaths(cwd: string) {
  return function resolveAbsolutePathsTo(filenames: readonly string[]) {
    return filenames.map((filename) => path.resolve(cwd, filename));
  };
}
