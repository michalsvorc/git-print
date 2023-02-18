import { describe, expect, it, vi } from "vitest";
import defaultArgs from "./defaultArgs.js";
import { getArgs } from "./getArgs.js";
import minimist from "minimist";

vi.mock("minimist");

describe("Parse args", () => {
  it("should call service for parsing user input", () => {
    getArgs();

    expect(minimist).toHaveBeenCalledTimes(1);
  });

  it("should be called with default argumets", () => {
    getArgs();

    expect(minimist).toHaveBeenCalledWith(
      [],
      expect.objectContaining({ default: defaultArgs })
    );
  });

  it("should be called with option to recognize flags as boolean arguments", () => {
    getArgs();

    expect(minimist).toHaveBeenCalledWith(
      [],
      expect.objectContaining({ boolean: true })
    );
  });
});
