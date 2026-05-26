import type { IChord } from "@/lib/chords";

export interface StorageSchema {
  "favorite-chords": IChord[]
}

const defaultStorage: StorageSchema = {
  "favorite-chords": [
    { root: "C", type: "maj" },
    { root: "C", type: "maj7" },
    { root: "C", type: "7" },
    { root: "C", type: "min" },
    { root: "D", type: "min" },
    { root: "D", type: "maj" },
    { root: "D", type: "m7" },
    { root: "E", type: "min" },
    { root: "E", type: "maj" },
    { root: "E", type: "m7" },
    { root: "F", type: "maj" },
    { root: "F", type: "maj7" },
    { root: "F", type: "min" },
    { root: "G", type: "maj" },
    { root: "G", type: "7" },
    { root: "A", type: "min" },
    { root: "A", type: "maj" },
    { root: "A", type: "m7" },
    { root: "B", type: "min" },
    { root: "B", type: "maj" },
  ]
};

export type StorageKey = keyof StorageSchema;

const KEY_PREFIX = "chorlab.";

function prefixed(key: StorageKey): string {
  return KEY_PREFIX + key;
}

function isStorageAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getStorageItem<K extends StorageKey>(
  key: K,
): StorageSchema[K] {
  if(!isStorageAvailable()) return defaultStorage[key];

  const raw = window.localStorage.getItem(prefixed(key));
  if(raw === null) {
    setStorageItem(key, defaultStorage[key]);
    return defaultStorage[key];
  }

  try {
    return JSON.parse(raw) as StorageSchema[K];
  } catch {
    setStorageItem(key, defaultStorage[key]);
    return defaultStorage[key];
  }
}

export function setStorageItem<K extends StorageKey>(
  key: K,
  value: StorageSchema[K],
): void {
  if(!isStorageAvailable()) return;
  window.localStorage.setItem(prefixed(key), JSON.stringify(value));
}

export function removeStorageItem(key: StorageKey): void {
  if(!isStorageAvailable()) return;
  window.localStorage.removeItem(prefixed(key));
}
