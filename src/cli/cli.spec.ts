import { beforeEach, describe, expect, it, vi } from "vitest";
import { cli } from "./cli.js";
import * as readInputArguments from "./readInputArguments.js";
import * as main from "../main.js";
import type minimist from "minimist";
import type { InputArguments, StatusDictionary } from "../types.js";
import * as castInputArguments from "../arguments/castInputArguments.js";
import * as formatOutput from "../output/formatOutput.js";

vi.mock("minimist");

describe("Command line usage", () => {
  const readInputArgumentsMock = vi
    .spyOn(readInputArguments, "readInputArguments")
    .mockReturnValue({
      _: [],
      a: "1",
    } as minimist.ParsedArgs);
  const mainLibraryMock = vi.spyOn(main, "main").mockResolvedValue(new Map());

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call method to read input arguments", async () => {
    await cli();

    expect(readInputArgumentsMock).toHaveBeenCalledTimes(1);
  });

  it("should call method to cast input arguments", async () => {
    const castInputArgumentsSpy = vi.spyOn(
      castInputArguments,
      "castInputArguments"
    );
    const expectedInputArguments = {
      _: [],
      a: "1",
      b: "2",
      c: "3",
    };
    readInputArgumentsMock.mockReturnValueOnce(expectedInputArguments);

    await cli();

    expect(castInputArgumentsSpy).toHaveBeenCalledTimes(1);
    expect(castInputArgumentsSpy).toHaveBeenCalledWith(expectedInputArguments);
  });

  it("should call the main library method with casted arguments", async () => {
    const expectedCastedArguments = { c: "1", d: "2", e: "3" };
    vi.spyOn(castInputArguments, "castInputArguments").mockReturnValueOnce(
      expectedCastedArguments as unknown as InputArguments
    );

    await cli();

    expect(mainLibraryMock).toHaveBeenCalledTimes(1);
    expect(mainLibraryMock).toHaveBeenCalledWith(expectedCastedArguments);
  });

  it("should format output of the status dictionary returned by the main library method", async () => {
    const formattedOutputSpy = vi.spyOn(formatOutput, "formatOutput");
    const expectedStatusDictionary = new Map();
    expectedStatusDictionary.set("f", "1");
    expectedStatusDictionary.set("g", "2");
    expectedStatusDictionary.set("h", "3");
    mainLibraryMock.mockResolvedValueOnce(
      expectedStatusDictionary as unknown as StatusDictionary
    );

    await cli();

    expect(formattedOutputSpy).toHaveBeenCalledTimes(1);
    expect(formattedOutputSpy).toHaveBeenCalledWith(expectedStatusDictionary);
  });
});
