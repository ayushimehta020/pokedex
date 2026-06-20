export type CacheEntry<T> = {
  createAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  add<T>(key: string, val: T) {
    this.#cache.set(key, { createAt: Date.now(), val });
  }

  get<T>(key: string) {
    const entry = this.#cache.get(key);
    return entry === undefined ? undefined : entry.val;
  }

  #reap() {
    const cutoff = Date.now() - this.#interval;

    for (const [key, entry] of this.#cache) {
      if (entry.createAt < cutoff) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    if (this.#reapIntervalId === undefined) {
      this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }
  }

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  stopReapLoop() {
    if (this.#reapIntervalId !== undefined) {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
    }
  }
}
