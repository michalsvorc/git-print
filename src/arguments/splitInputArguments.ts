import type {
  CWDArguments,
  GitStatusArguments,
  InputArguments,
} from "src/types.js";

export function splitInputArguments(
  inputArguments: InputArguments | undefined
): {
  cwdInputArguments: Partial<CWDArguments>;
  gitStatusInputArguments: Partial<GitStatusArguments>;
} {
  if (!inputArguments) {
    return {
      cwdInputArguments: {
        cwd: undefined,
      },
      gitStatusInputArguments: {
        deleted: undefined,
        staged: undefined,
        stagedOnly: undefined,
        unstaged: undefined,
        untracked: undefined,
      },
    };
  }

  const cwdInputArguments: Partial<CWDArguments> = {
    cwd: inputArguments.cwd,
  };
  const gitStatusInputArguments: Partial<GitStatusArguments> = {
    deleted: inputArguments.deleted,
    staged: inputArguments.staged,
    stagedOnly: inputArguments.stagedOnly,
    unstaged: inputArguments.unstaged,
    untracked: inputArguments.untracked,
  };
  return {
    cwdInputArguments,
    gitStatusInputArguments,
  };
}
