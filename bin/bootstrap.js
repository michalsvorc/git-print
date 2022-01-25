#!/usr/bin/env node

var shell = require("shelljs");

if (!shell.which("git")) {
  shell.echo("Error: command not found: git.");
  shell.exit(1);
}

if (shell.exec("git config core.hooksPath .hooks").code !== 0) {
  shell.echo("Error: git hooks registration failed.");
  shell.exit(1);
} else {
  shell.echo("Success: git hooks registered.");
}
