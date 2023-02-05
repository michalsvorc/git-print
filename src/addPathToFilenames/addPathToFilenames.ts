import * as path from "path";

export function addPathToFilenames(filenames: readonly string[]) {
  return function addPathToFilenamesCwd(cwd: string) {
    return filenames.map((filename) => path.resolve(cwd, filename));
  };
}
