import { main } from "./main.js";

const output = await main();

process.stdout.write(`${output.join(" ")}\n`);
