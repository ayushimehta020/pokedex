import { describe, expect, test } from "vitest";
import { Cache } from "./pokecache.js";

describe("cache", () => {
  test.concurrent.each([
    ["pikachu", 25],
    ["bulbasaur", 1],
    ["charmander", 4],
  ])("stores %s", (name, value) => {
    const cache = new Cache(1000);

    cache.add(name, value);

    expect(cache.get(name)).toBe(value);

    cache.stopReapLoop();
  });
});
