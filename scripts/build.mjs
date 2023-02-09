/* eslint-disable no-console */
/* eslint-disable node/no-unpublished-import */
import { execa } from "execa";
import tsconfig from "../tsconfig.build.json" assert { type: "json" };

const env = {
  NODE_ENV: process.env.NODE_ENV ?? "pruduction",
};
const executionOptions = { env };
const { outDir } = tsconfig.compilerOptions;

try {
  if (env.NODE_ENV === "production") {
    console.info(`Cleaning directories: ${outDir}`);
    await execa("del-cli", [outDir], executionOptions);
  }

  console.info(`Build env: ${JSON.stringify(env)}`);
  await execa("yarn", ["compile"], executionOptions);
} catch (error) {
  console.error(error);
}
