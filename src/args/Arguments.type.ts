export interface Arguments {
  readonly cwd: string;
  readonly deleted: boolean;
  readonly staged: boolean;
  readonly stagedOnly: boolean;
  readonly unstaged: boolean;
  readonly untracked: boolean;
}
