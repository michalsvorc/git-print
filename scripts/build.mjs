/* eslint-disable no-console */
/* eslint-disable node/no-unpublished-import */
import { execa } from "execa";
import tsconfig from "../tsconfig.build.json" assert { type: "json" };

const env = {
  NODE_ENV: process.env.NODE_ENV ?? "pruduction",
};
const executionOptions = { env };
console.info(`Build env: ${JSON.stringify(env)}`);

if (env.NODE_ENV === "production") {
  const { outDir } = tsconfig.compilerOptions;
  console.info(`Cleaning directories: ${outDir}`);
  await execa("del-cli", [outDir], executionOptions);
}

await execa("yarn", ["compile"], executionOptions);
