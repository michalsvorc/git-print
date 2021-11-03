import { main } from "./main";

main().then((output) => {
  process.stdout.write(`${output.join(" ")}\n`);
});
