import { describe, it, expect, vi, afterEach } from "vitest";
import shuffle from "../../src/utils/shuffle";

describe("shuffle", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a new array and does not mutate original", () => {
    const original = [1, 2, 3, 4];
    const copy = [...original];

    const result = shuffle(original);

    expect(result).not.toBe(original);
    expect(original).toEqual(copy);
  });

  it("returns an array with the same elements", () => {
    const input = [1, 2, 3, 4, 5];

    const result = shuffle(input);

    expect(result).toHaveLength(input.length);
    expect(result).toEqual(expect.arrayContaining(input));
  });

  it("shuffles elements when Math.random is controlled", () => {
    // Mock Math.random so swaps are predictable
    vi.spyOn(Math, "random").mockReturnValue(0);

    const input = [1, 2, 3];
    const result = shuffle(input);

    // With the mocked Math.random, the expected output is [2, 3, 1]
    expect(result).toEqual([2, 3, 1]);
  });

  it("returns an empty array when input is empty", () => {
    const result = shuffle([]);

    expect(result).toEqual([]);
  });

  it("returns the same single element when array has one item", () => {
    const result = shuffle([42]);

    expect(result).toEqual([42]);
  });
});
