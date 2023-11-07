export type StatusDictionary = Map<string, readonly string[]>;
export type StatusOutput = readonly string[];

export interface CWDArguments {
  cwd: string;
}

export interface GitStatusArguments {
  readonly deleted: boolean;
  readonly staged: boolean;
  readonly stagedOnly: boolean;
  readonly unstaged: boolean;
  readonly untracked: boolean;
}

export type InputArguments = Partial<CWDArguments & GitStatusArguments>;
