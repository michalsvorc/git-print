import shell from "shelljs";

function checkExec() {
  return shell.which("git");
}

checkExec() ||
  (shell.echo("Sorry, this script requires git.") && shell.exit(1));

export function getProjectPath() {
  return shell
    .exec("git worktree list --porcelain", { silent: true })
    .split("\n")[0]
    .replace("worktree ", "");
}

export function registerHooks(dirHooks: string) {
  return shell.exec(`git config core.hooksPath ${dirHooks}`);
}
