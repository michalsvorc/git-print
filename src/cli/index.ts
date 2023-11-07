#!/usr/bin/env node
/* eslint-disable node/shebang */
import { cli } from "./cli.js";

void cli().then((output) => process.stdout.write(`${output.join(" ")}\n`));
