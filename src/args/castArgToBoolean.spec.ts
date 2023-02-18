import { describe, expect, it } from "vitest";
import { castArgToBoolean } from "./castArgToBoolean.js";

describe("cast argumet to Boolean", () => {
  it('should return Boolean true for string "true"', () => {
    const expected = true;

    expect(castArgToBoolean("true")).toBe(expected);
  });

  it('should return Boolean false for string "true"', () => {
    const expected = false;

    expect(castArgToBoolean("false")).toBe(expected);
  });

  it("should return Boolean false for all other cases", () => {
    const expected = false;

    expect(castArgToBoolean("string")).toBe(expected);
    expect(castArgToBoolean(1)).toBe(expected);
    expect(castArgToBoolean(null)).toBe(expected);
    expect(castArgToBoolean(undefined)).toBe(expected);
  });
});
