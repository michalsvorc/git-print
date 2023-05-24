export type StatusDictionary = Map<string, readonly string[]>;
export type StatusOutput = readonly string[];
export interface GitArgumentsOptions {
  readonly untracked: boolean;
}
export interface FilterOptions {
  readonly deleted: boolean;
  readonly staged: boolean;
  readonly unstaged: boolean;
}

export interface Arguments {
  readonly cwd: string;
  readonly deleted: boolean;
  readonly staged: boolean;
  readonly stagedOnly: boolean;
  readonly unstaged: boolean;
  readonly untracked: boolean;
}

export type DefaultArguments = Omit<Arguments, "cwd">;
